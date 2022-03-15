function validateUserDetails(data, property){

    if(property === "username"){
        if(data.length < 5 || data.length > 25) 
            return {valid: false, message: "Username most contain more than 5 and less than 26 characters"}

        const pattern = '^([a-z]|[A-Z]|[0-9])*$'
        const regex = RegExp(pattern)

        if(!regex.test(data))
            return {valid: false, message: "Username should not contain special characters"}
    }
    else if(property === "email"){
        const pattern = '^([A-Z]|[a-z]|[0-9]|(\.)){3,80}@([0-9]|[a-z]|[A-Z]){2,30}\.([a-z]|[A-Z]|[0-9]){2,10}$'
        const regex = RegExp(pattern)

        if(!regex.test(data))
            return {valid: false, message: "Email is invalid"}
    }
    else if(property === "password"){
        if(data.length < 8 || data.length > 30)
            return {valid: false, message: "Password most contain minimum 8 characters"}
    }else{
        return {valid: false, message: "Enter data properly"}
    }
    

    return {valid: true};
}




function validateUser(userData){
    validate = {}

    for(let property in userData){
        validate = validateUserDetails(userData[property], property);

        if(validate.valid === false) return validate;
    }

    return validate;

}

module.exports = validateUser;