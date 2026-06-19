import UsuarioModel from "../models/usuarioModel.js";

const registrar = async (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Faltan campos obligatorios." });
  }

  try {
    const nuevoUsuario = await UsuarioModel.crear(nombre, correo, password);
    res.status(201).json({ success: true, usuario: nuevoUsuario });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ success: false, msg: "El correo ya está registrado." });
    }
    res
      .status(500)
      .json({ success: false, msg: "Error interno en el servidor." });
  }
};

const login = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Por favor, llena todos los campos." });
  }

  try {
    const usuario = await UsuarioModel.buscarPorCorreo(correo);

    if (!usuario || usuario.password !== password) {
      return res
        .status(400)
        .json({ success: false, msg: "Correo o contraseña incorrectos." });
    }

    res.status(200).json({
      success: true,
      msg: "¡Inicio de sesión exitoso!",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "Error interno en el servidor." });
  }
};

export { registrar, login };
