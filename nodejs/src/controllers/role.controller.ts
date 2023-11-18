import { Request, Response } from 'express';
import { Role, RoleInput, createValidation } from '../models/role.model';


// ##################################################################################################################


const createRole = async (req: Request, res: Response) => {

    try
    {
        const { name, description } = req.body;
        const { error } = createValidation(req.body);
        
        if (error)
            throw new Error( error.details[0].message );

        const roleInput : RoleInput = {
            name,
            description
        };

        const roleCreated = await Role.create( roleInput );

        return res.status(201).json({
            data: roleCreated
        });
    }
    catch (err : any)
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const getAllRoles = async (req: Request, res: Response) => {

    try
    {
        const roles = await Role.find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({
            data: roles
        });
    }
    catch (err : any)
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const getRole = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        const role = await Role.findOne({ _id: id });

        if (!role)
            throw Error( `Role with id "${id}" not found.` );

        return res.status(200).json({
            data: role
        });
    }
    catch ( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const updateRole = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { description, name } = req.body;

        // role exists ?
        const role = await Role.findOne({ _id: id });

        if (!role)
            throw Error( `Role with id "${id}" not found.` );

        // validate
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await Role.updateOne({ _id: id }, { name, description });

        // load updated data
        const roleUpdated = await Role.findById(id, { name, description });

        return res.status(200).json({
            data: roleUpdated
        });
    }
    catch (err : any)
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


const deleteRole = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await Role.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Role deleted successfully.'
        });
    }
    catch (err : any)
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


export { createRole, deleteRole, getAllRoles, getRole, updateRole };
