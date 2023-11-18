import { Request, Response } from 'express';

import { Team, TeamDocument, TeamInput, createValidation, updateValidation } from '../models/team.model';


// ##################################################################################################################


const getAllTeams = async (req: Request, res: Response) => {

    try
    {
        const teams = await Team
            .find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({ data: teams });
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


const createTeam = async (req: Request, res: Response) => {

    try
    {
        const { title, enabled } = req.body;

        let companyId = req.user.companyId
        
        req.body.companyId = companyId;  
              
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        const teamInput : TeamInput = {
            companyId,
            title,
            enabled
        };

        // create
        const teamCreated = await Team.create(teamInput);

        return res.status(201).json({
            error   : false,
            message : "Team successfully registered",
            data    : teamCreated
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


const getTeam = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        // get team
        const team = await Team.findOne({ _id: id }).exec();

        if (!team)
            throw Error( `Team with id "${id}" not found.` );

        return res.status(200).json({ data: team });
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


const updateTeam = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { title, enabled } = req.body;

        // team exists?
        const team = await Team.findOne({ _id: id });

        if (!team)
            throw new Error( `Team with id "${id}" not found.` );

        // validate
        const { error } = updateValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await Team.updateOne({ _id: id }, {
            title,
            enabled
        });

        // get updated data
        const teamUpdated = await Team.findById(id);

        return res.status(200).json({
            error   : false,
            message : "Team updated successfully",
            data    : teamUpdated
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


const deleteTeam = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await Team.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Team deleted successfully.'
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


export { createTeam, deleteTeam, getAllTeams, getTeam, updateTeam };
