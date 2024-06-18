import express from "express";

import movieRoutes from './routes/MovieRoutes.js';
import cookieparser from "cookie-parser"

const app = express();
app.use(cookieparser());

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use("/api/v1/test",(req,res)=>{
    res.json({
        message: "Hello World"
    })
})

export {app}