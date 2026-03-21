import mongoose  from "mongoose"

const connectDb = async ()=>{
    await mongoose.connect("http://localhost:127.0.0.1:27017")
}


export {
    
    connectDb

}