const { Pool }= require('pg')
const config = {
    user: 'erc83', 
    password: '2210',
    host: 'localhost',
    database:'lottery',
    port:5432
}

const pool = new Pool(config)

module.exports = {
    query: (text, params, callback)=>{
        return pool.query(text, params, callback)
    }
}
