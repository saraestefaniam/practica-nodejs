import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
    res.send('ayuda')
})

export default app