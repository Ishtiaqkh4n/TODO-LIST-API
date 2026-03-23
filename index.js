import dotenv from "dotenv"
import app from "./app.js"
import {connectDb} from "./src/db/dbconnect.js"


dotenv.config({
    path:"./.env"
})

const port = process.env.PORT  || 8000




connectDb()
.then(()=>{
app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})
})

