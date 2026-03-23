import express from "express"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookieParser( ))



app.get("",(req,res)=>{
    res.status(200).send("Hello Hello")
})



//check health og api
import healthRoute from "./src/routes/healthcheck.routes.js"
import authRoute from "./src/routes/auth.routes.js"
import {router as CrudRoute} from "./src/routes/crud.routes.js"

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/healthcheck",healthRoute)
app.use("/api/v1/crud",CrudRoute)


export default app
