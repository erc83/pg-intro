const http = require('http')
const db = require('./db')
const url = require('url')

const server = http.createServer((req,res)=>{
    const queryObject = url.parse(req.url,true).query
    db.query('select * from users where id = $1',[queryObject.id],(err, results)=>{
        if(err) console.log(err)   
        const user = JSON.stringify(results.rows[0])
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(user)
    })
})

server.listen(9292, ()=>{console.log('escuchando puerto 9292')})
