import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

// GET /productos
// Obtener todos los productos

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los productos",
    });
  }
};

// POST /productos
// Crear un producto

export const createProducto = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      precio,
      categoria,
      fotoBase64,
      codigoBarras,
      latitud,
      longitud,
    } = req.body;

    if (!nombre || precio === undefined || !categoria) {
      res.status(400).json({
        mensaje: "nombre, precio y categoria son obligatorios",
      });
      return;
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio: Number(precio),
        categoria,
        fotoBase64: fotoBase64 ?? null,
        codigoBarras: codigoBarras ?? null,
        latitud: latitud != null ? Number(latitud) : null,
        longitud: longitud != null ? Number(longitud) : null,
      },
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("ERROR AL CREAR PRODUCTO:", error);

    res.status(500).json({
      mensaje: "Error al crear el producto",
    });
  }
};

// PUT /productos/:id
// Actualizar precio o fotografía

export const updateProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        mensaje: "ID inválido",
      });

      return;
    }

    const productoExistente = await prisma.producto.findUnique({
      where: {
        id,
      },
    });

    if (!productoExistente) {
      res.status(404).json({
        mensaje: "Producto no encontrado",
      });

      return;
    }

    const { precio, fotoBase64 } = req.body;

    const productoActualizado = await prisma.producto.update({
      where: {
        id,
      },

      data: {
        ...(precio !== undefined && {
          precio: Number(precio),
        }),

        ...(fotoBase64 !== undefined && {
          fotoBase64,
        }),
      },
    });

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar el producto",
    });
  }
};

// DELETE /productos/:id
// Eliminar producto

export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        mensaje: "ID inválido",
      });

      return;
    }

    const productoExistente = await prisma.producto.findUnique({
      where: {
        id,
      },
    });

    if (!productoExistente) {
      res.status(404).json({
        mensaje: "Producto no encontrado",
      });

      return;
    }

    await prisma.producto.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar el producto",
    });
  }
};
