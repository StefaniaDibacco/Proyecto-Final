import CarritoI from '../interfaces/carrito';
import Product from '../interfaces/producto';

const carritos: CarritoI[] = [];

class Carrito {
  // Metodo para leer mis productos
  leer(id: number | null = null): CarritoI[] {
    try {
      return carritos;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  guardar(producto: Product): CarritoI | undefined {
    try {
      const elemento = {
        id: carritos.length + 1,
        timestamp: Date.now(),
        producto,
      };

      carritos.push(elemento);
      return elemento;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error.message);
    }
  }
}

export const carritoPersistencia = new Carrito();
