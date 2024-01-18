const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    KEY: process.env.KEY,
    PORT: process.env.PORT,
    USERNAME: process.env.USERNAME
}