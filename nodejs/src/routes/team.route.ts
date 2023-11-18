import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createTeam, deleteTeam, getAllTeams, getTeam, updateTeam } from '../controllers/team.controller';

const teamRoute = () => {

    const router = Router();

    router.post(  '/teams'     , auth , createTeam  );
    router.get(   '/teams'     , auth , getAllTeams );
    router.get(   '/teams/:id' , auth , getTeam     );
    router.put(   '/teams/:id' , auth , updateTeam  );
    router.delete('/teams/:id' , auth , deleteTeam  );

    return router;
};

export { teamRoute };
