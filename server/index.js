// import modules

import express from 'express';

import bodyParesr from 'body-parser'; 

import mongoose from 'mongoose';

import cors from 'cors';

import helmet from 'helmet';

import morgan from 'morgan';

import dotenv from 'dotenv';

import { clientRouter } from './controllers/client.contr.js';

import { salesRouter } from './controllers/sale.contr.js';

import { generaltRouter } from './controllers/general.contr.js';

import { managementRouter } from './controllers/management.contr.js';


// configruations

dotenv.config()

const app = express()

app.use(express.json())

app.use(bodyParesr.json())

app.use(bodyParesr.urlencoded({ extended: false }))

app.use(helmet())

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(morgan("common"))

app.use(cors())

// routes

app.use("/client",clientRouter)

app.use("/sales",salesRouter)

app.use("/general",generaltRouter)

app.use("/management", managementRouter)

// connect database

const PORT = process.env.PORT || 9000

mongoose.connect(process.env.MONGO_URL
    , { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => { 
    app.listen(PORT,() => console.log("connected database successfuly ")
)
}).catch((err) => {
    console.log("error while connected to data base ",err)
})

