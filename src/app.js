import express from "express";


import cookieparser from "cookie-parser"

const app = express();
app.use(cookieparser());

app.use(express.json());


app.use("/api/v1/test",(req,res)=>{
    res.json({
        message: "Hello World"
    })
})

export {app}