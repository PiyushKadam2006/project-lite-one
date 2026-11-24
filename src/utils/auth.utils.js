import jwt from "jsonwebtoken";
import config from "../config/config.js"



export  const generateToken = ({id, username })=>{
return jwt.sign({
    id,username
},config.JWT_SECRET,{expiresIn:"1h"})
}

export const verifiToken = (token)=>{
   return jwt.verify(token,config.JWT_SECRET)
}