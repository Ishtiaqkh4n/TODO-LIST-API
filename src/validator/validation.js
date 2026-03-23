import  {body}  from "express-validator"


const PostCreationValidator = ()=>{
    return [
    body("title")
        .notEmpty()
        .withMessage("title is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required")    

    ]
}


const PostupdationValidator = ()=>{
    return [
    body("title")
        .notEmpty()
        .withMessage("title is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required")    

    ]
}

// {username,email,password

const userRegistrationValdator = ()=>{
    return [
 body("username")
    .notEmpty()
    .withMessage("Username is required"),
 body("email")
    .isEmail()
    .withMessage("Provide proper format of email")
    .toLowerCase()
    .trim(),
 body("password")
     .notEmpty()
     .withMessage("password is required")
     .trim() 
    ]
}




export {
    PostCreationValidator,
    PostupdationValidator,
    userRegistrationValdator
}