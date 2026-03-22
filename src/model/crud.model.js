import mongoose from "mongoose";
import { counter } from "./idcounter.js";


const Crud = mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})




Crud.pre('save',async function(){
 if(!this.New) return 
 const count = await counter.findOneAndUpdate(
    {"id":"user_id"},
    {$inc:{seq:1}},
    {new:true,upsert:true}
 )
this.id = count.seq
counter.save()

},{
    timestamps:true
}
)


export {
    Crud
}

