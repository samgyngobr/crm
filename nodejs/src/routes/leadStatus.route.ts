import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createLeadStatus, deleteLeadStatus, getAllLeadStatus, getLeadStatus, updateLeadStatus } from '../controllers/leadStatus.controller';

const leadStatusRoute = () => {

    const router = Router();

    router.post(  '/lead/status'     , auth , createLeadStatus );
    router.get(   '/lead/status'     , auth , getAllLeadStatus );
    router.get(   '/lead/status/:id' , auth , getLeadStatus    );
    router.put(   '/lead/status/:id' , auth , updateLeadStatus );
    router.delete('/lead/status/:id' , auth , deleteLeadStatus );

    return router;
};

export { leadStatusRoute };
