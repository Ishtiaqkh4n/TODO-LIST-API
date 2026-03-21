import express from "express"


const app = express()

app.use(express.json())



app.get("",(req,res)=>{
    res.status(200).send("Hello Hello")
})



//check health og api
import healthRoute from "./src/routes/healthcheck.routes.js"
import authRoute from "./src/routes/auth.routes.js"

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/healthcheck",healthRoute)



export default app
