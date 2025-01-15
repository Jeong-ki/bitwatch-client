import { rest } from 'msw';
import response from './response';

const API_DOMAIN = 'http://localhost:9000';

export const handlers = [
  rest.get(`${API_DOMAIN}/api/user/all`, (req, res, ctx) => {
    const data = response.users;
    return res(ctx.status(200), ctx.json({ data }));
  }),
];
