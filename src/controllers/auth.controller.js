import userModel from "../models/user.model.js";
import { generateToken, verifiToken } from "../utils/auth.utils.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (user) {
    res.status(400).json({ messege: "user alresdy exists" });
  }

  const newUser = await userModel.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
  });

  const token = generateToken({ id: newUser._id, username: newUser.username });

  res.cookie("token", token, {
    httpOnly: true, //only serer site pe writing ka work ho sakta he but not at usersite par
    secure: process.env.NODE_ENV === "production", //https ki requet http pe open nahi ho payegi
    sameSite: "strict", //jis website ne cokkise set kiya he vahi firse cookies set kar sakegi
    maxAge: 3600000, //one houre
  });

  return res.status(201).json({
    messege: "User register successfully ",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (!user) {
    return res.status(400).json({ messege: "Invalid credentilas" });
  }

  const isPasswordValid = await user.comparePassword(password); //password dalana bhul gaya tha , me id dale ja raha tha 

  if (!isPasswordValid) {
    return res.status(400).json({
      messege: "Invalid Credintials",
    });
  }

  const token = generateToken({ id: user._id, username: user.username });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
  });

  return res.status(200).json({
    messege: " User logged in succesfuly ",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
