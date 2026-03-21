
const asynchandler = (requestobject)=>{
    return(req,req,next)=>{
        Promise.resolve(requestobject(req,res,next)
        .catch(err=> next(err))
    )
    }
}



export {
    asynchandler

}