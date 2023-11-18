import { Request, Response } from 'express';
import { Company, CompanyInput, createValidation } from '../models/company.model';


// ##################################################################################################################


const createCompany = async (req: Request, res: Response) => {

    try
    {
        const { title, active } = req.body;
        const { error } = createValidation(req.body);

        if (error)
            throw new Error( error.details[0].message );

        const companyInput : CompanyInput = {
            title,
            active
        };

        const companyCreated = await Company.create( companyInput );

        return res.status(201).json({
            data: companyCreated
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


const getAllCompany = async (req: Request, res: Response) => {

    try
    {
        const companies = await Company.find()
            .sort('-createdAt')
            .exec();

        return res.status(200).json({
            data: companies
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


const getCompany = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        const company = await Company.findOne({ _id: id });

        if (!company)
            throw Error( `Company with id "${id}" not found.` );

        return res.status(200).json({
            data: company
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


const updateCompany = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;
        const { title, active } = req.body;

        // role exists ?
        const company = await Company.findOne({ _id: id });

        if (!company)
            throw Error( `Company with id "${id}" not found.` );

        // validate
        const { error } = createValidation(req.body);

        if (error)
            throw Error( error.details[0].message );

        // update
        await Company.updateOne({ _id: id }, { title, active });

        // load updated data
        const companyUpdated = await Company.findById(id);

        return res.status(200).json({
            data: companyUpdated
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


const deleteCompany = async (req: Request, res: Response) => {

    try
    {
        const { id } = req.params;

        await Company.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Company deleted successfully.'
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


export { createCompany, deleteCompany, getAllCompany, getCompany, updateCompany };
