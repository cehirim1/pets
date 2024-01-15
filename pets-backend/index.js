import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.js";


//define port number
const port =5000;

//invoke express
const app = express();

//invoke the middleware - uses the use() method
app.use(morgan("dev"));
app.use(express.json({
    limit: '30mb', extended: true
}));
app.use(express.urlencoded({
    limit: '30mb', extended: true
}));
app.use(cors());
app.use('/users', userRouter) //http://localhost:5000/users/signup or signin depending on what the endpoint is configured to use

//connect databas
const mongodbURL = "mongodb+srv://ehirim87:jM1G43qCn49mhzPd@pets-application.fv9exjj.mongodb.net/cool-pets?retryWrites=true&w=majority"

//get request
app.get('/', (req, res)=>{
   res.send('hello express'); //sends the response to the client
});



mongoose.connect(mongodbURL).then(()=>{
app.listen(port, ()=>{

    console.log('listening on port 5000');
})
}).catch(err=>{
    console.log((err)=>{
        console.error(err)
    });
})

//mongodb+srv://ehirim87:jM1G43qCn49mhzPd@pets-application.fv9exjj.mongodb.net/cool-pets?retryWrites=true&w=majority
//jM1G43qCn49mhzPd


///enter node and then enter this statement to get a random crypto secret for token secret
//> require('crypto').randomBytes(64).toString('hex') 