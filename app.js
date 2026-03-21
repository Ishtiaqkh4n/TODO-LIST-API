import express from "express"


const app = express()

app.use(express.json())



app.get("",(req,res)=>{
    res.status(200).send("Hello Hello")
})



//check health og api
import healthRoute from "./src/routes/healthcheck.routes.js"

app.use("api/v1/healthcheck",healthRoute)

import authRoute from "./src/routes/auth.routes.js"

app.use("api/v1/auth",authRoute)



export default app
