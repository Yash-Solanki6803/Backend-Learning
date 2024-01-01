import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

//using req.body
app.post('/req/body', (req, res) => {
    const {name, age} = req.body
    res.status(201).send(`Hello ${name}! You are ${age} years old.`)
})

//using req.query
app.get('/req/query', (req, res) => {
    const {name, age} = req.query
    res.status(201).send(`Hello ${name}! You are ${age} years old.`)
})

//Special case
app.get('req/params/special',(req,res)=>{
    const {name, age} = req.params
    res.status(201).send(`Hello ${name}! You are ${age} years old.`)
})

//Special case routes must be defined before the dynamic routes.

//using req.params
app.get('/req/params/:name/:age', (req, res) => {
    const {name, age} = req.params
    res.status(201).send(`Hello ${name}! You are ${age} years old.`)
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
    }
)

