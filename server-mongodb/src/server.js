import express from 'express';
import cors from 'cors';
import * as db from './db.js';
import { mongoDBUrl } from './config.js';
import { userRouter } from './routers/user.router.js';
import { logger } from './logger.js';

try {
    console.log(`Connecting to database at '${mongoDBUrl}'...`);
    await db.connect(mongoDBUrl);
    console.log('Connection successful!');
} catch (e) {
    console.log(e);
    process.exit(1);
}

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
