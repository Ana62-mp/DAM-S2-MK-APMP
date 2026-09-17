import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "../config/api";
import { Alert } from "react-native";

// Tipo de una rutina completa
export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  fotoBase64?: string | null;
  createdAt: string;
};

// Lo que va a compartir nuestro Context
type ProductoContextType = {
  products: Producto[];
  fetchProducts: () => void;
  addProduct: (product: Omit<Producto, 'id' | 'createdAt'>) => Promise<boolean>;     
  updateProduct: (id: number, product: Omit<Producto, 'id' | 'createdAt'>) => Promise<boolean>;     
  deleteProduct: (id: number) => void;
};

// Provider
const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

export function ProductoProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<Producto[]>([]);


    const fetchProducts = async () => {
        try {
            const response = await api.get('/productos');
            setProducts(response.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor local');
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    const addProduct = async (newProduct: Omit<Producto, 'id' | 'createdAt'>) => {

        try {
            const response = await api.post('/productos', newProduct);
            setProducts([...products, response.data]);
            return true;
        } catch (error) {
            Alert.alert('Error', 'No se pudo agregar el producto');
            return false;
        }
    }


    const updateProduct = async (
        id: number,
        updatedProduct: Omit<Producto, 'id' | 'createdAt'>
    ) => {
        try {
            const response = await api.put(`/productos/${id}`, updatedProduct);
            setProducts(
                products.map(product =>
                    product.id === id ? response.data : product
                )
            );
            return true;
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el producto');
            return false;
        }
    }


    const deleteProduct = async (id: number) => {
        try {
            await api.delete(`/productos/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el producto');
        }
    }


    return (
        <ProductoContext.Provider
            value={{
                products,
                fetchProducts,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductoContext.Provider>
    )
}


export function useProductContext() {
    const context = React.useContext(ProductoContext);

    if (!context) {
        throw new Error('Debe usarse dentro de un ProductoProvider');
    }

    return context;
}
