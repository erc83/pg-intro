const http = require('http')
const db = require('./db')
const url = require('url')

const server = http.createServer((req,res)=>{
    if(req.url.startsWith('/?id=')){ 
        const queryObject = url.parse(req.url,true).query
        console.log(queryObject)
        db.query('select * from users where id = $1',[queryObject.id],(err, results)=>{
        if(err) console.log(err)   
        const user = JSON.stringify(results.rows[0])
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(user)
        })
    }
    if(req.url == '/') {
        db.query('select * from users',[], (err, results)=>{
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(results.rows))
        })
    }
    //crear usuario
    if(req.url == '/users' && req.method == 'POST') {
        let data 
        req.on('data', (payload) => {
            data = JSON.parse(payload)
            db.query('insert into users (name, lastname) values ($1, $2) RETURNING id, name',[data.name, data.lastName], (err, results)=>{
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(results.rows))
            })
        })
    }
    if(req.url.startsWith('/users/') && req.method == 'PUT') {
        let data 
        const userId = url.parse(req.url).pathname.split('/')[2]  
        req.on('data', (payload) => {
            data = JSON.parse(payload)
            db.query('update users set name = $1, lastname = $2 where id = $3 RETURNING *',[data.name, data.lastName, userId], (err, results)=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(JSON.stringify(results.rows))
            })
        })
    }






})

server.listen(9292, ()=>{console.log('escuchando puerto 9292')})
