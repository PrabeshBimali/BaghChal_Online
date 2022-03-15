const { Pool } = require('pg')

const {PG_USER, PG_HOST, PG_NAME, PG_PASSWORD, PG_PORT} = process.env;

const pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_NAME,
    password: PG_PASSWORD,
    port: PG_PORT
})


module.exports = {
  query: async (text, params) => {
    try{
      return await pool.query(text, params)
    }catch(error){
      console.log("Error In database: ", error.message)
    }
    
  }
}