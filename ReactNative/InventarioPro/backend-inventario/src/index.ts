import express from "express";
import productoRoutes from "./routes/producto.routes.js";


const app = express();
const PORT = 3001;


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
app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});