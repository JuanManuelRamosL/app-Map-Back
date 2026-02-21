const express = require("express");
const sequelize = require("./db");
const { Usuario, Bano, Comentario } = require("./models");

const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
// Sincronizar modelos al iniciar
sequelize.sync().then(() => {
  console.log("Tablas sincronizadas");
});

// Rutas CRUD Usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { password, ...resto } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      ...resto,
      password: hashedPassword,
    });

    res.status(201).json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ message: "Login correcto", usuario });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

app.get("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "No encontrado" });
  res.json(usuario);
});

app.put("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "No encontrado" });
  await usuario.update(req.body);
  res.json(usuario);
});

app.delete("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: "No encontrado" });
  await usuario.destroy();
  res.json({ ok: true });
});

// Rutas CRUD Baños
app.post("/banos", async (req, res) => {
  try {
    const bano = await Bano.create(req.body);
    res.status(201).json(bano);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/banos", async (req, res) => {
  const banos = await Bano.findAll();
  res.json(banos);
});

app.get("/banos/:id", async (req, res) => {
  const bano = await Bano.findByPk(req.params.id);
  if (!bano) return res.status(404).json({ error: "No encontrado" });
  res.json(bano);
});

app.put("/banos/:id", async (req, res) => {
  const bano = await Bano.findByPk(req.params.id);
  if (!bano) return res.status(404).json({ error: "No encontrado" });
  await bano.update(req.body);
  res.json(bano);
});

app.delete("/banos/:id", async (req, res) => {
  const bano = await Bano.findByPk(req.params.id);
  if (!bano) return res.status(404).json({ error: "No encontrado" });
  await bano.destroy();
  res.json({ ok: true });
});

// Endpoints de comentarios
app.post("/banos/:banoId/comentarios", async (req, res) => {
  try {
    const { usuarioId, texto, puntaje } = req.body;
    const comentario = await Comentario.create({
      usuarioId,
      banoId: req.params.banoId,
      texto,
      puntaje,
    });
    res.status(201).json(comentario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/banos/:banoId/comentarios", async (req, res) => {
  const comentarios = await Comentario.findAll({
    where: { banoId: req.params.banoId },
    include: [Usuario],
  });
  res.json(comentarios);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
