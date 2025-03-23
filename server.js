import http from 'node:http'
import app from './routes/app.js'

const port = process.env.PORT || 3000

//create http server
const server = http.createServer(app)

server.on('error', err => console.error(err))
server.on('listening', () => {
    console.log(`Server started on http://localhost:${port}`)
})

server.listen(port)




