import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createLead, deleteLead, getAllLeads, getLead, updateLead } from '../controllers/lead.controller';

const LeadRoute = () => {

    const router = Router();

    router.post(  '/lead'     , auth , createLead  );
    router.get(   '/lead'     , auth , getAllLeads );
    router.get(   '/lead/:id' , auth , getLead     );
    router.put(   '/lead/:id' , auth , updateLead  );
    router.delete('/lead/:id' , auth , deleteLead  );

    return router;
};

export { LeadRoute };
