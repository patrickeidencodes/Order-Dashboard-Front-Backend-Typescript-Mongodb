// @ts-nocheck
import User from "../models/USER.js"

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("Der Auftrag wurde gelöscht.");
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await user.findById(req.params.id)
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find()
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}