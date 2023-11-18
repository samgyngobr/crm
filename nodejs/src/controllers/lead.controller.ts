import { Request, Response } from 'express';

import { Lead, LeadDocument, LeadInput, createValidation, updateValidation } from '../models/lead.model';


// ##################################################################################################################


const getAllLeads = async (req: Request, res: Response) => {

    try
    {
        const status = await Lead
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


const createLead = async (req: Request, res: Response) => {

    try
    {
        const { teamId, unityId, leadStatusId, enabled, interactions } = req.body;
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        const leadInput : LeadInput = {
            teamId,
            unityId,
            leadStatusId,
            enabled,
            interactions
        };

        // create
        const leadCreated = await Lead.create( leadInput );

        return res.status(201).json({
            data : leadCreated
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


const getLead = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        // get lead
        const lead = await Lead.findOne({ _id: id }).exec();

        if (!lead)
            throw Error( `Lead with id "${id}" not found.` );

        return res.status(200).json({ data: lead });
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


const updateLead = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { teamId, unityId, leadStatusId, enabled, interactions } = req.body;

        // lead exists?
        const lead = await Lead.findOne({ _id: id });

        if (!lead)
            throw new Error( `Lead with id "${id}" not found.` );

        // validate
        const { error } = updateValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await Lead.updateOne({ _id: id }, {
            teamId,
            unityId,
            leadStatusId,
            enabled,
            interactions
        });

        // get updated data
        const leadUpdated = await Lead.findById(id);

        return res.status(200).json({
            data: leadUpdated
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


const deleteLead = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await Lead.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Lead deleted successfully.'
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


export { createLead, deleteLead, getAllLeads, getLead, updateLead };
