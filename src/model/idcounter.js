import mongoose from "mongoose";

const CounterSchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    seq:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const counter = mongoose.model(CounterSchema)

export{
    counter
}