import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type TeamDocument = Document & {
    title     : string;
    enabled   : boolean;
};

// ##################################################################################

type TeamInput = {
    title     : TeamDocument['title'];
    enabled   : TeamDocument['enabled'];
};

// ##################################################################################

const teamSchema = new Schema(
    {
        title: {
            type     : Schema.Types.String,
            required : true,
        },
        enabled: {
            type     : Schema.Types.Boolean,
            default  : true,
            required : true,
        },
    },
    {
        collection : 'teams',
        timestamps : true,
    },
);

const Team: Model<TeamDocument> = mongoose.model<TeamDocument>('Team', teamSchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        title     : Joi.string().required().label("Title"),
        enabled   : Joi.boolean().required().label("Enabled"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

const updateValidation = (body) => {

    const schema = Joi.object({
        title   : Joi.string().required().label("Title"),
        enabled : Joi.boolean().required().label("Enabled"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

export { Team, TeamInput, TeamDocument, createValidation, updateValidation };
