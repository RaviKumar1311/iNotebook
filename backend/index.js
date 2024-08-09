const connectToMongo = require('./db');
const express = require('express')
const cors=require('cors')

connectToMongo();
const app =express()
const port = 5500;

app.use(cors())
app.use(express.json())

//Available Routes
app.get("/", (req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send('<h1 style="margin-left: 20px; margin-top: 20px;">Welcome to iNotebook.</h1>');
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})