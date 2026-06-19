const verificarAcceso = (req, res, next) => {
  const claveAcceso = req.headers["clave-ganadera"];

  if (!claveAcceso || claveAcceso !== "FincaSecreta123") {
    return res.status(401).json({
      success: false,
      msg: "Acceso denegado. No tienes los permisos o te falta la clave de la finca.",
    });
  }

  next();
};

export default verificarAcceso;
