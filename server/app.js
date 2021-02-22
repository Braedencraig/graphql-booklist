const express = require('express')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect(process.env.REACT_APP_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})


app.use('/graphql', graphqlHTTP({ graphiql: true, schema })) 

app.listen(4000, () => console.log('Listening for requests on port 4000'))
