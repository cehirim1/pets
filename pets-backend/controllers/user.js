import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import { generateToken } from "../middleware/jwt.js";

export const signup = async (req, res) => {
  //query database for signup email
  try {
    const { email, password, firstName, lastName } = req.body;

    //check for empty fields
    if (!(email && password && firstName && lastName))
      return res.status(400).json({ message: "Please add all fields" });

    //check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    //protect passwords
    //const salt =await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user if they don't exist already
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //generate authentication& authorization with jasonwebtoken
    //allow token login
    const token = generateToken({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
    });

    //hide password
    newUser.password =undefined;

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 });
    res.status(201).json({ name: newUser.name, email: newUser.email, token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.log(error);
  }
};

//sign in
export const signin = async (req, res) => {
  try {
    const { email, password, } = req.body;

if(!(email && password)) return res.status(400).json();

    //find user by email
    const findEmail = await UserModel.findOne({ email });

    if (!findEmail) return res.status(404).json({ message: "No user with the email was found." });

    //find user by password - compare plain password with hashed password
    const findPassword = await bcrypt.compare(password, findEmail.password);

    if (!findPassword)
      return res
        .status(400)
        .json({ message: "Invalid email and passowrd combination" });

    //generate a token for user
    const token = generateToken({

     id: findEmail._id,
     
    });


//set to undefined so it doesn't appear in the response
     findEmail.password = undefined;
 
     
    //httpOnly set to true means it's stored in memory (vanishes when app closes)
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 });
  
    res.status(200).json({ User: findEmail.name, Email: findEmail.email });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const delete = async (res, req){

//   try {
//     const{email, userId}
//   } catch (error) {
    
//   }
// }
