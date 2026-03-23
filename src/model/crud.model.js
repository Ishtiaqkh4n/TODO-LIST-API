import mongoose, { Schema } from "mongoose";
import { counter } from "./idcounter.js";
import mongoosepaginate from "mongoose-paginate-v2"    


const CrudSchema = mongoose.Schema({
    id:{
        type:Number,
    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})


CrudSchema.plugin(mongoosepaginate)


CrudSchema.pre('save',async function(){
 if(!this.isNew) return  
 const count = await counter.findOneAndUpdate(
    {"id":"user_id"},
    {$inc:{seq:1}},
    {new:true,upsert:true}
 )

this.id = count.seq

},{
    timestamps:true
}
)

const Crud = mongoose.model("Crud",CrudSchema)



export {
    Crud
}



