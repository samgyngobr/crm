import { Request, Response } from 'express';

import { LeadStatus, LeadStatusDocument, LeadStatusInput, createValidation, updateValidation } from '../models/leadStatus.model';


// ##################################################################################################################


const getAllLeadStatus = async (req: Request, res: Response) => {

    try
    {
        const status = await LeadStatus
            .find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({ data: status });
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


const createLeadStatus = async (req: Request, res: Response) => {

    try
    {
        const { companyId, title, enabled } = req.body;
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        const leadStatusInput : LeadStatusInput = {
            companyId,
            title,
            enabled
        };

        // create
        const leadStatusCreated = await LeadStatus.create(leadStatusInput);

        return res.status(201).json({
            data : leadStatusCreated
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


const getLeadStatus = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        // get status
        const status = await LeadStatus.findOne({ _id: id }).exec();

        if (!status)
            throw Error( `Status with id "${id}" not found.` );

        return res.status(200).json({ data: status });
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


const updateLeadStatus = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { title, enabled } = req.body;

        // status exists?
        const status = await LeadStatus.findOne({ _id: id });

        if (!status)
            throw new Error( `Status with id "${id}" not found.` );

        // validate
        const { error } = updateValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await LeadStatus.updateOne({ _id: id }, {
            title,
            enabled
        });

        // get updated data
        const statusUpdated = await LeadStatus.findById(id);

        return res.status(200).json({
            data: statusUpdated
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


const deleteLeadStatus = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await LeadStatus.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Status deleted successfully.'
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


export { createLeadStatus, deleteLeadStatus, getAllLeadStatus, getLeadStatus, updateLeadStatus };
