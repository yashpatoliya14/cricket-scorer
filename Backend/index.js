const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
dotenv.config()
const PORT = process.env.PORT

const matchRouter = require('./routes/matchRoutes')


mongoose.connect('mongodb+srv://yashpatoliya14:yashpatoliya14@cluster0.bjsyv.mongodb.net/cricketScorer')
    .then(() => {
        app.use(cors(
            {
                origin: "http://localhost:5173", // 🔹 Allow your frontend origin
                credentials: true,               // 🔹 Allow sending cookies & tokens
                methods: ["GET", "POST", "PUT", "DELETE"],
                allowedHeaders: ["Content-Type", "Authorization"]
            }            
        ))
        app.use(express.json())
        app.use('/v1',matchRouter)

        
    })
    app.listen(PORT, (err) => {
        if (err) {

            console.log(" :::: Error at Port ::::", err);
        
        } else {
        
            console.log(`Server start at ${PORT}`);

        }
    })