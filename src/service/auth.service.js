import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const APP_SECRET = 'my-todo-app-secret';
const APP_ACCESS_TOKEN_EXP_SECS = 3600;
const JWT_OPTIONS = {
    algorithm: "HS256",
    issuer: "mytodoapp.com/api",
    audience: "mytodoapp.com",
    expiresIn: APP_ACCESS_TOKEN_EXP_SECS,
}

export function createPasswordHash(password){
    // const val =  bcrypt.hash(password ,10);
    // // console.log(val)
    // return val
     return bcrypt.hash(password , 10);
}

export async function validatePassword (password , hash){
    
    return await bcrypt.compare(hash , password)
}

export function signToken(password , hash , payload){
    const isValidPassword = validatePassword(password , hash);
    if (!isValidPassword){
        throw new Error('Invalid Password');
    }else{
        console.log("password correct")
    }

    const token = jwt.sign(payload , APP_SECRET, JWT_OPTIONS );
    return {
        token,
        life: APP_ACCESS_TOKEN_EXP_SECS,
    }
}

export async function verifyToken(token) {
    const payload = jwt.verify(token, APP_SECRET, JWT_OPTIONS);
    //console.log(payload);
    return payload;
    //console log this
}