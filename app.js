const express = require('express')
const app = express()
require('dotenv').config();
const logger = require('morgan')
const path = require('path')
const CMC_Fetch = require('./CMC_API_Fetch')

const homeRouter = require('./routes/index')

async function main(){
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(logger('dev'));
    app.use('/', homeRouter)
    CMC_Fetch()

    app.listen(process.env.PORT, (error)=>{
        if(error){
            console.log('Error, ', error.message)
        } else {
            console.log(`server start on port: ${process.env.PORT}`)
        }
    })
}

main()