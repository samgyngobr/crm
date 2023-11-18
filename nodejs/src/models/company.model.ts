import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type CompanyDocument = Document & {
    title  : string;
    active : boolean;
};

// ##################################################################################

type CompanyInput = {
    title  : CompanyDocument['title'];
    active : CompanyDocument['active'];
};

// ##################################################################################

const companySchema = new Schema(
    {
        title: {
            type     : Schema.Types.String,
            required : true,
            unique   : true,
        },
        active: {
            type    : Schema.Types.Boolean,
            default : true,
        },
    },
    {
        collection : 'companies',
        timestamps : true,
    },
);

const Company : Model<CompanyDocument> = mongoose.model<CompanyDocument>('Company', companySchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        title  : Joi.string().required().label("Title"),
        active : Joi.boolean().label("Active"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

export { Company, CompanyInput, CompanyDocument, createValidation };
