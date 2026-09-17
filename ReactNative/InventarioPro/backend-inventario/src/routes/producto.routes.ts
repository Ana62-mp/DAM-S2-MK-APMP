import { Router } from "express";

import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/producto.controller.js";


const router = Router();


// GET /productos
router.get("/", getProductos);


// POST /productos
router.post("/", createProducto);


// PUT /productos/:id
router.put("/:id", updateProducto);


// DELETE /productos/:id
router.delete("/:id", deleteProducto);


export default router;