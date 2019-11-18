module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgresql://matrayu@localhost/lakeshow_tix',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
    PAYPAL_CID: process.env.PAYPAL_CID,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE,
    PW_RESET_CRYPTO_PASS: process.env.PW_RESET_CRYPTO_PASS
}