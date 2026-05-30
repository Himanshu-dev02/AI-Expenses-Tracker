import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET ='your_jwt_secret_key';

export default async function authMiddleware(req, res, next) {
  //grab the token
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({
        success: false,
        message: "Unauthorized"});
  }
  const token = authHeader.split(' ')[1];
  //verify the token
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    //attach the user to the request
    const user = await user.findById(payload.id).select("password");
    if(!user){
        return res.status(404).json({ 
            success: false,
            message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed", err);
    res.status(401).json({ 
        success: false,
        message: "Invalid token" });
  }
}