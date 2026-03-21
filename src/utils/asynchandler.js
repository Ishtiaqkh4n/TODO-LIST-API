
const asynchandler = (requestobject)=>{
    return(req,res,next)=>{
        Promise.resolve(requestobject(req,res,next)
        .catch(err=> next(err))
    )
    }
}



export {
    asynchandler

}