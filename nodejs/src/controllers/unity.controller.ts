import { Request, Response } from 'express';

import { Unity, UnityDocument, UnityInput, createValidation, updateValidation } from '../models/unity.model';


// ##################################################################################################################


const getAllUnities = async (req: Request, res: Response) => {

    try
    {
        const unities = await Unity
            .find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({ data: unities });
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


const createUnity = async (req: Request, res: Response) => {

    try
    {
        const { companyId, title, enabled } = req.body;
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        const unityInput : UnityInput = {
            companyId,
            title,
            enabled
        };

        // create
        const unityCreated = await Unity.create(unityInput);

        return res.status(201).json({
            data : unityCreated
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


const getUnity = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        // get unity
        const unity = await Unity.findOne({ _id: id }).exec();

        if (!unity)
            throw Error( `Unity with id "${id}" not found.` );

        return res.status(200).json({ data: unity });
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


const updateUnity = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { title, enabled } = req.body;

        // unity exists?
        const unity = await Unity.findOne({ _id: id });

        if (!unity)
            throw new Error( `Unity with id "${id}" not found.` );

        // validate
        const { error } = updateValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await Unity.updateOne({ _id: id }, {
            title,
            enabled
        });

        // get updated data
        const unityUpdated = await Unity.findById(id);

        return res.status(200).json({
            data: unityUpdated
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


const deleteUnity = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await Unity.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Unity deleted successfully.'
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


export { createUnity, deleteUnity, getAllUnities, getUnity, updateUnity };
