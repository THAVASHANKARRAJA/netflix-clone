import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokens.js";

export async function signup(req,res){

    const {username,email,password}=req.body;
    if(!username || !email || !password) return res.status(400).json({message:"All fields are required"});
    const emailRegex = /^[^\s@]+@[^s@]+\.[^s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({message:"invalid email"})
    }

    if(password.length < 6){
        return res.status(400).json({message:"password must be at least 6 characters"})
    }

    try {

        const existingUserByEmail = await User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({message:"email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashsedPassword = await bcrypt.hash(password,salt);

        const existingUserByUsername = await User.findOne({username:username});
        if(existingUserByUsername) return res.status(400).json({message:"username already exists"})

        const PROFILE_PICS = [
            '/avatar1.png',
            '/avatar2.png',
            '/avatar3.png'
        ];

        const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];
        const newUser = new User({
            username,
            email,
            password:hashsedPassword,
            image
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            const response =await newUser.save();
            //remove password from response
            response.password = undefined;
            res.status(200).json({user:response});
        }    
    } catch (error) {
        console.log("error is in the signup controller",error);
        res.status(500).json({message:"internal server error"});
    }

}
export async function login(req,res){

    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({message:"All fields are required"});
    const emailRegex = /^[^\s@]+@[^s@]+\.[^s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({message:"invalid email"})
    }

    if(password.length < 6){
        return res.status(400).json({message:"password length must be greater than 6"});
    }
try {
    const user = await User.findOne({email:email});
    if(!user) return res.status(404).json({message:"invalid credentials"});
    const isPasswordCorrect = bcrypt.compare(password,user.password);
    if(!isPasswordCorrect) return res.status(404).json({message:'invalid password'});
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({message:"login successful",user:user});
    
} catch (error) {
    console.log("Error is in the auth controller",error);
    res.status(500).json({message:"internal server error"});
    
}


}
export async function logout(req,res){

try {
    res.clearCookie("jwt-token");
    res.status(200).json({message:"logged out"});
    
} catch (error) {
    console.log("error in logout controller",error);
    res.status(500).json({message:"internal server error"});
    
}
}

export async function authCheck(req,res){
    try {
       
        res.status(200).json({success:true,user:req.user});

        
    } catch (error) {

        console.log("error is in the auth check controller",error);
        res.status(500).json({success:false,message:"internal server error"});
        
    }

}