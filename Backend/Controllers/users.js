import User from '../models/user.js';
import jwt from "jsonwebtoken"
import Formation from '../Models/formation.js';
export const createUser = async (req, res) => {
    
   const user={
    email:req.body.email,
    password:req.body.password,
    role:req.body.role,
    nom:req.body.nom
    }
    
    const newUser = new User({
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        nom:req.body.nom
        })
    console.log(newUser);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}
const generateAccessToken = (user) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
}
export const getuserBYEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email, password });
     console.log("user : "+user);
       const id=user[0]._id;
       console.log("this"+id);

        if (user == "") {
            res.status(401).send('utilisateur non existant');
            return
        };
        const accessToken = generateAccessToken(user);
        res.status(200).json({
            accessToken,
            
        
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const listFormationByUser = async (req, res) => {
    try {
        const formations = Formation.find();  
        formations.forEach(formation => {
            for (let j = 0; j < formation.users; j++) {
                if (formation.users[j]._id == req.user.user[0]._id) {
                    req.user.user[0].formations = formation._id;
                }
            }
        });
        res.json(req.user.user[0].formations)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getUserByFormation=async(req,res)=>{
    try{
        
        const users =await User.find({formations:req.params.formationID})
        .populate("formations").exec();
        res.status(200).json(users)


    }catch(error){res.json({message:error.message})}
}

