import { Client, Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: "gestion_ganadera",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) return console.error('Error conectado a PostgreSQL:', err.stack);
    console.log('¡Conexión exitosa a la base de datos gestion_ganadera!');
    release();
});

export default pool;