import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "code";


export const signup = async (req, res) => {
  //query database for signup email
  try {
    const { email, password, firstName, lastName } = req.body;
    //protect passwords
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await UserModel.findOne({ email });

    //check if user exists

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const finalPsw = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //generate authentication& authorization with jasonwebtoken
    const token = jwt.sign(
      { email: finalPsw.email, userId: finalPsw._userId },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ finalPsw, token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.log(error);
  }
};

//sign in
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findEmail = await UserModel.findOne({ email });
  
    if (!findEmail) return res.status(404).json({ message: "Invalid user " });


    const findPassword = await bcrypt.compare(password, findEmail.password);

    if (!findPassword)
      return res
        .status(400)
        .json({ message: "Invalid email and passowrd combination" });

        //allow token login 
        const token = jwt.sign({email: findEmail.email, userId:findEmail._userId}, secret, {expiresIn:"1h"})
  res
      .status(200)
      .json({ findEmail, token});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



