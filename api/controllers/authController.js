// @ts-nocheck
import User from "../models/USER.js"
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next)=> {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        /*
        const updateUser = await User.findOneAndUpdate(
            { cnr:req.body.cnr }, 
            { $set: req.body }, 
            {new:true}
        )
        */
        const newUser = new User({
            email: req.body.email,
            password: hash,
            cnr: req.body.cnr,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        await newUser.save()
        res.status(200).send("user has been created")
        //für put
        //res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    }
}

export const setPassword = async (req, res, next)=> {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const updateUser = await User.findOneAndUpdate(
            { cnr:req.body.knr, registered: false }, 
            { password: hash, registered: true }, 
            {new:true}
        )
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(400).json({ message: 'Du hast dich bereits registiert oder du bist noch nicht im System eingetragen' });
        }
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next)=> {
    try {
        const user = await User.findOne({cnr: req.body.cnr})
        
        if(!user) return next(createError(404, "User not found"))

        const correctPW = await bcrypt.compare(req.body.password, user.password);
        if(!correctPW) 
            return next(createError(400, "bad request, wrong pw or username"))
            
        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin}, 
            process.env.JWT
        )
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({...otherDetails});
    } catch (err) {
        next(err)
    }     
}

export const logout = async (req, res, next)=> {
    const token = req.cookies.authToken;
    try {
        /*
        if (token) {
            tokenBlacklist.push(token);
        }
        */
        res.clearCookie('authToken');
        res.status(200).json({ message: 'Logout erfolgreich' });
    } catch (err) {
        next(err)
    }     
}