import express from 'express';
import * as user from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get('/', async (_, response) => {
    const [success, result] = await user.getAll();

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result)  };

    response.status(code).send(payload);
});

userRouter.get('/:username', async (request, response) => {
    const { username } = request.params;

    const [success, result] = await user.getByUsername(username);

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result) };

    response.status(code).send(payload);
});

userRouter.post('/:username', async (request, response) => {
    const { username } = request.params;
    const userData = request.body;

    const [success, result] = await user.create(username, userData);

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result) };

    response.status(code).send(payload);
});

userRouter.put('/:username', async (request, response) => {
    const { username } = request.params;
    const data = request.body;

    const [success, result] = await user.replaceByUsername(username, data);

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result) };

    response.status(code).send(payload);
});

userRouter.patch('/:username', async (request, response) => {
    const { username } = request.params;
    const userData = request.body;

    const [success, result] = await user.updateByUsername(username, userData);

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result) };

    response.status(code).send(payload);
});

userRouter.delete('/:username', async (request, response) => {
    const { username } = request.params;

    const [success, result] = await user.deleteByUsername(username);

    const code = success ? 200 : 400;
    const payload = success ? result : { message: result?.message || JSON.stringify(result) };

    response.status(code).send(payload);
});