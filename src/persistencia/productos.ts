import moment from 'moment';
import Product from '../interfaces/producto';

let elementos = [
  {
    stock: 2,
    nombre: 'mochila',
    precio: 20,
    foto: 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-256.png',
    id: 1,
    timestamp: '',
    descripcion: 'escolar',
    codigo: 'es01',
  },
];

class Productos {
  // Metodo para leer mis productos
  leer(): Product[] {
    try {
      return elementos;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  guardar(
    nombre: string,
    precio: number,
    foto: string,
    descripcion: string,
    codigo: string,
    stock: number
  ): Product | undefined {
    try {
      if (typeof nombre !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (isNaN(precio)) throw new Error('Price tiene que ser un nro');
      if (typeof foto !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const elemento = {
        id: elementos.length + 1,
        timestamp: moment().format('DD/MM/YYYY hh:mm:ss'),
        nombre,
        descripcion,
        precio,
        foto,
        codigo,
        stock,
      };

      elementos.push(elemento);
      return elemento;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error.message);
    }
  }

  // Metodo para leer un producto
  leerUno(id: number): Product | undefined {
    try {
      const producto = elementos.find((aProduct) => aProduct.id === id);
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar productos
  actualizar(
    id: number,
    nombre: string | null = null,
    precio: number | null = null,
    foto: string | null = null,
    descripcion: string = '',
    codigo: string = '',
    stock: number
  ): Product | undefined {
    try {
      if (typeof nombre !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (typeof precio !== 'number')
        throw new Error('Price tiene que ser un nro');
      if (typeof foto !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const index = elementos.map((aProduct) => aProduct.id).indexOf(id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }

      elementos[index].nombre = nombre;
      elementos[index].precio = precio;
      elementos[index].foto = foto;
      elementos[index].descripcion = descripcion;
      elementos[index].codigo = codigo;
      elementos[index].stock = stock;

      return elementos[index];
    } catch (error) {
      console.log(error.message);
    }
  }

  // Metodo para borrar un producto
  borrarUno(id: number): Product | undefined {
    try {
      const idBuscado = id;
      const productoEliminado = elementos.find(
        (aProduct) => aProduct.id === idBuscado
      );
      elementos = elementos.filter((aProduct) => aProduct.id !== idBuscado);

      return productoEliminado;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export const productsPersistencia = new Productos();
