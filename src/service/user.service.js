import User from "../models/user.js";
import { createPasswordHash, signToken } from "./auth.service.js";


async function findUserByEmail(email){

    const existingUser = await User.findOne({
        email
    })

    return existingUser;
}


 async function register(fname , lname , email , password){

    const hash = await createPasswordHash(password);
    const newUser = new User({
        fname,
        lname,
        email,
        password: hash
    });
    
    await newUser.save();
    const userCpy =  JSON.parse(JSON.stringify(newUser));

    //delete userCpy?.password
    return userCpy

}

async function login(email , password){

    const acc = await User.findOne({ email})

    if (!acc){
        throw new Error ('User Not Found');
    }

    const payload = await signToken(password, acc.password, {
        email: acc.email,
        id: acc._id.toString(),
    });

    return payload;

}


export default {
    findUserByEmail,
    register,
    login
}