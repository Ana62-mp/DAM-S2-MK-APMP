import express from "express";
import cors from "cors";
import prisma from "./database/prisma.js";
import productoRoutes from "./routes/producto.routes.js";


const app = express();
const PORT = Number(process.env.PORT ?? 3001);
app.use(cors());


// MIDDLEWARES
// Permite recibir JSON.
// Se aumenta a 10 MB porque recibiremos
// imágenes convertidas a Base64.
app.use(
  express.json({
    limit: "10mb",
  })
);


// RUTA DE PRUEBA
app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend InventarioPro funcionando 🚀",
  });
});


// RUTAS
app.use("/productos", productoRoutes);


// SERVIDOR
async function start() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1 FROM "Producto" LIMIT 1`;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el backend. Revisa DATABASE_URL y las migraciones de Prisma.", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

void start();
