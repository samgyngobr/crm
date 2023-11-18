import { Request, Response } from 'express';
import bcrypt from "bcrypt";

import { User, UserInput, createValidation, updateValidation } from '../models/user.model';
import { Role } from '../models/role.model';


// ##################################################################################################################


const getAllUsers = async (req: Request, res: Response) => {

    try
    {
        const users = await User
            .find({ companyId : req.user.companyId }, { "enabled": 1, "email" : 1, "name": 1, "_id": 1 } )
            .populate('role', { "name" : 1, "_id" : 1 })
            .sort('-createdAt')
            .exec();

        return res.status(200).json({ data: users });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################

const getUserNew = async (req: Request, res: Response) => {

    try
    {
        const roles = await Role.find()
            .sort('-name')
            .exec();

        return res.status(200).json({
            roles: roles
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const createUser = async (req: Request, res: Response) => {

    try
    {
        const { avatar, email, enabled, name, password, role } = req.body;
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // generate password hash
        const salt         = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);

        const userInput: UserInput = {
            name,
            email,
            password: hashPassword,
            enabled,
            role,
            avatar
        };

        // create
        const userCreated = await User.create(userInput);

        return res.status(201).json({
            error   : false,
            message : "User successfully registered",
            data    : userCreated
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const getUser = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        // get user
        const user = await User.findOne({ _id: id }).populate('role').exec();

        if (!user)
            throw Error( `User with id "${id}" not found.` );

        const roles = await Role.find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({ 
            data  : user,
            roles : roles,
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const updateUser = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { avatar, enabled, name, role } = req.body;

        // user exists?
        const user = await User.findOne({ _id: id });

        if (!user)
            throw new Error( `User with id "${id}" not found.` );

        // validate
        const { error } = updateValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await User.updateOne({ _id: id }, { avatar, enabled, name, role });

        // get updated data
        const userUpdated = await User.findById(id);

        return res.status(200).json({
            error   : false,
            message : "User updated successfully",
            data    : userUpdated
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const deleteUser = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'User deleted successfully.'
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


export { createUser, deleteUser, getAllUsers, getUser, updateUser, getUserNew };
