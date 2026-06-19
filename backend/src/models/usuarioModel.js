import pool from '../config/db.js';

const UsuarioModel = {
  buscarPorCorreo: async (correo) => {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo],
    );
    return result.rows[0];
  },

  crear: async (nombre, correo, password) => {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo, password],
    );
    return result.rows[0];
  },
};

export default UsuarioModel;
