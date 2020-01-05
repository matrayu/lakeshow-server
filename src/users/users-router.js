const express = require('express')
const path = require('path')
const UserService = require('./users-service')
const AuthService = require('../auth/auth-service')
const { requireAuth } = require('../middleware/jwt-auth')
const checkAdminPrivledges = require('../middleware/admin-auth')

const usersRouter = express.Router()
const jsonBodyParser = express.json()



usersRouter.get('/', requireAuth, checkAdminPrivledges, (req, res, next) => {
    UserService.getAllUsers(req.app.get('db'))
    .then(data => {
        let page;
        let range;
        let sort;
        let filter;

        !req.query.page ? page = 1 :  page = parseInt(req.query.page)
        !req.query.range ? range = [0,9] : range = JSON.parse(req.query.range)
        !req.query.sort ? sort = ['id', 'ASC'] : sort = JSON.parse(req.query.sort)
        !req.query.filter ? filter = null : filter = JSON.parse(req.query.filter)

        function isValidObject(objToTest) {
            if (objToTest == null) return false;
            if ("undefined" == typeof(objToTest)) return false;
            if (Object.keys(objToTest).length === 0) return false;
            return true
        }

        let filteredList = []

        if (isValidObject(filter)) {
            filter.id.map(id => {
                filteredList.push(data.filter(d => d.id == id))
            })
            data = []
            filteredList.map(d => {
                data.push(d[0])
            })
        }

        const pageCount = Math.ceil(data.length / 10);
        let sortBy = sort[0]
        let OrderBy = sort[1]
        let sorted = 0

        if (!page) { page = 1;}

        if (page > pageCount) {
            page = pageCount
        }

        if(sortBy && OrderBy){
            if(OrderBy === 'DESC') {
                sorted = -1
            }
            else {
                sorted = 1
            }
        }

        let compare = (a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];          
            
            let comparison = 0;
            if (sortA > sortB) {
                comparison = 1;
            } else if (sortA < sortB) {
                comparison = -1;
            }
            return comparison * sorted;
        }
        
        let dataOutput = data.sort(compare).slice(range[0], range[1] + 1)
        let contentRange = `data ${range[0]}-${range[1]}/${data.length}`

        return res
            .status(200)
            .set({
                'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
                'content-range': contentRange,
                'X-Total-Count': data.length,
                'Access-Control-Allow-Headers': 'content-range',
            })
            .json({
                "pagination": {
                    "page": page,
                    "pageCount": pageCount,
                },
                "sort": {
                    "field": sortBy,
                    "order": OrderBy
                },
                "filter": {},
                data: dataOutput
            });
    })
    .catch(next)
})

usersRouter.post('/', requireAuth, checkAdminPrivledges, jsonBodyParser, (req, res, next) => {
    const { password, username, first_name, last_name, dob, gender, email } = req.body

    for (const field of ['first_name', 'last_name', 'gender', 'dob', 'username', 'password', 'email'])
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            })
    
    const passwordError = UserService.validatePassword(password)
    const db = req.app.get('db')

    if (passwordError)
            return res.status(400).json({ error: passwordError })

    return UserService.hasUserWithUserName(db,username)
    .then(hasUserWithUserName => {
        if (hasUserWithUserName) {
            return res.status(400).json({
                error: `Username already taken`
            })
        }
        return UserService.hasUserWithEmail(db, email)
        .then(hasUserWithEmail => {
            if (hasUserWithEmail) {
                return res.status(400).json({
                    error: `Email has already been registered`
                }) 
            }    
            return UserService.hashPassword(password)
            .then(hashedPassword => {
                const newUser = {
                    username,
                    password: hashedPassword,
                    first_name,
                    last_name,
                    gender,
                    dob,
                    email,
                    date_created: 'now()'
                }
                return UserService.insertUser(db,newUser)
                .then(user => {
                    const sub = username
                    const payload = { user_id: user.id }
                    const token = AuthService.createJwt(sub, payload)
                    return res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/tickets`))
                        .json({ authToken: token })
                })
            })
        })
    })
    .catch(next)
})

usersRouter.delete('/', requireAuth, checkAdminPrivledges, jsonBodyParser, (req, res, next) => {
    let filter = JSON.parse(req.query.filter)

    filter.id.map(id => {
        return UserService.deleteUser(req.app.get('db'), idss)
        .then(updates => {
            return res
                .status(200)
                .json({ message: `User ${id} successfully deleted.`})
        })
        .catch(next)
    })  
})

usersRouter.get('/:user_id', requireAuth, checkAdminPrivledges, (req, res, next) => {
    return UserService.getUserNameAndEmail(req.app.get('db'),req.params.user_id)
        .then(user => {
            return res
                .status(200)
                .json({ first_name: user.first_name,email: user.email })
        })
        .catch(next)
})

usersRouter.put('/:user_id', requireAuth, checkAdminPrivledges, jsonBodyParser, (req, res, next) => {
    const { id, first_name, last_name, username, password, email, dob, phone_number, gender, admin } = req.body
    let date_modified = new Date()
    const update = { id, first_name, last_name, username, password, email, dob, phone_number, gender, admin, date_modified }

    for (const [key, value] of Object.entries(update))
        if (value == null) {
            delete update[key]
        }
    
    console.log(update)

    UserService.updateUserInfo(req.app.get('db'), update)
        .then(updates => {
            console.log(updates)
            return res.status(200).json({
                success: true,
                status: 200, 
                message: `User ${req.params.user_id} has been successfully updated.`
            })
        })
        .catch(next)
})

usersRouter.delete('/:user_id', requireAuth, checkAdminPrivledges, (req, res, next) => {
    const userId = req.params.user_id

    return UserService.deleteUser(req.app.get('db'), userId)
        .then(updates => {
            return res
                .status(200)
                .json({ message: `User ${req.params.user_id} has been successfully delete.`})
        })
        .catch(next)
})


module.exports = usersRouter