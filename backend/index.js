const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();

app.use(bp.json());

app.use(bp.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json("Hola");
});

app.post("/gastos", async (req, res) => {
  const gasto = await prisma.gastos.create({
    data: {
      nombre: req.body.nombre,
      cantidad: Number(req.body.cantidad),
      categoria: req.body.categoria,
    },
  });
  res.json(gasto);
});

app.get("/gastos", async (req, res) => {
  try {
    const gastos = await prisma.gastos.findMany();
    res.json(gastos);
  } catch (err) {
    res.status(500);
    res.send("Salió todo mal");
  }
});

app.delete("/gasto", async (req, res) => {
  const gasto = await prisma.gastos.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json(gasto);
});

app.put("/gastos", async (req, res) => {
  try {
    const gasto = await prisma.gastos.update({
      where: {
        id: req.body.id,
      },
      data: {
        nombre: req.body.nombre,
        cantidad: Number(req.body.cantidad),
        categoria: req.body.categoria,
        id: req.body.id,
      },
    });
    res.json(gasto);
  } catch (err) {
    res.status(500);
    res.send("Salió todo mal");
  }
});

app.delete("/gastos", async (req, res) => {
  try {
    const gasto = await prisma.gastos.deleteMany();
    res.json(gasto);
  } catch (err) {
    res.status(500);
    res.send("Salió todo mal");
  }
});

app.listen(4000, () => {});
