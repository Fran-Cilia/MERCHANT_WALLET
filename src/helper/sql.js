const executeQuery = async (pool, query) => {
    try {
      const client = await pool.connect();
      const { command, rowCount, rows } = await client.query(query);
      client.release();
      console.log(command, rowCount);
      return { rows, rowCount };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  
  module.exports = {
    executeQuery,
  };