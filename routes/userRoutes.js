import {Router } from 'express'; 
import jwt from 'jsonwebtoken'; 
import asyncHandler from 'express-async-handler'; 
import { UserModel } from '../models/user.js';
import bcrypt from 'bcrypt'; 

const router = Router(); 

router.post("/login", asyncHandler(
    async(req, res) => {
        const { email, password } = req.body; 
        const user = await UserModel.findOne({ email }); 
        if(user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenRequest(user));
        }
        else{
            res.status(401).send("Invalid email or password");
        }
    }
));

router.post("/register", asyncHandler(
    async (req, res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
          res.status(HTTP_BAD_REQUEST)
          .send('User is already exist, please login!');
          return;
        }
    
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        const newUser = {
          id:'',
          name,
          email: email.toLowerCase(),
          password: encryptedPassword,
          address,
          isAdmin: false
        }
    
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenRequest(dbUser));
      }
));

router.get('/profile', asyncHandler(
    async(req, res) => {
        const id = req.user.id;
        const user = await UserModel.findById(id);
        res.send(user);
    }
))

const generateTokenRequest = (user) => {
    const token = jwt.sign({
        id: user.id, 
        email: user.email, 
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return {
        id: user.id, 
        email: user.email, 
        name: user.name, 
        address: user.address, 
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;
