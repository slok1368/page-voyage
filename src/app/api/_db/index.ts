import pg from 'pg';

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  ssl:
    process.env.DB_HOST !== 'localhost'
      ? {
          ca: require('fs').readFileSync('@/../ssl-certs/us-east-1-bundle.pem'),
          rejectUnauthorized: true, // Set to true to enforce SSL verification
        }
      : undefined,
});
