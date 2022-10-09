function validate(values){
    let errors ={};
    if(!values.username.trim()){
        errors.username ="username require"
    }
    if(!values.email.trim()){
        errors.email ="email require"
    }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)){
        errors.email ="Email address is invalid"
    }
    if(!values.password.trim()){
        errors.password ="password require"
    }else if(values.password.length<4){
        errors.password ="Password needs to be 4 characters or more"
    }
    if(!values.confirmPassword.trim()){
        errors.confirmPassword='Confirm Password is required'
    }else if( values.confirmPassword !== values.password){
        errors.confirmPassword ="passwords do not match"
    }
    
    return errors;
}
export default validate