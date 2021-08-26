import Product from './producto';

export default interface Carrito {
  id: number;
  timestamp: number;
  producto: Product;
}
