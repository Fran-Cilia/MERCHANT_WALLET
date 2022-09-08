require('dotenv').config();

class DatabaseConfigService {
    buildConfig() {
        return {
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        };
    }
}

module.exports = DatabaseConfigService;