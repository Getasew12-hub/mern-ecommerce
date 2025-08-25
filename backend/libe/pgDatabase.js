import pg from "pg";
import env from "dotenv"
env.config()

const connection=process.env.NEON_KEY
const db=new pg.Pool({
connectionString:connection,
ssl:{
  rejectUnauthorized: false,
  require: false
},
max:40,
idleTimeoutMillis:3000,
connectionTimeoutMillis: 390000

})
db.on('error', (err, client) => {
  console.error('Unexpected error on an idle client in the pool:', err);
});

export default db;