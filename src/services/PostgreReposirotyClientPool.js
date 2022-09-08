const {dotenv} = require('dotenv')
const { Pool } = require('pg');
const DatabaseConfigService = require('./DatabaseConfigService');
const databaseConfigService = new DatabaseConfigService();

class PostgreRepositoryClientPool {
    buildPool() {
        const config = databaseConfigService.buildConfig();
        return new Pool(config);
    }
}

module.exports = PostgreRepositoryClientPool;