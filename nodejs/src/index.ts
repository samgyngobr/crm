import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDatabase } from './utils/databaseConnection';

import { roleRoute       } from './routes/role.route';
import { userRoute       } from './routes/user.route';
import { authRoute       } from './routes/auth.route';
import { teamRoute       } from './routes/team.route';
import { unityRoute      } from './routes/unity.route';
import { leadStatusRoute } from './routes/leadStatus.route';
import { LeadRoute       } from './routes/lead.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use( '/', roleRoute()       );
app.use( '/', userRoute()       );
app.use( '/', authRoute()       );
app.use( '/', teamRoute()       );
app.use( '/', unityRoute()      );
app.use( '/', leadStatusRoute() );
app.use( '/', LeadRoute()       );

app.get( '/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {

    await connectToDatabase();

    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
