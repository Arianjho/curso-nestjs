import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  apiKey: process.env.API_KEY,
  database:{
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
}));
