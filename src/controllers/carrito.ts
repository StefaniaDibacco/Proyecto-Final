import { Request, Response, NextFunction } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';

class Producto {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { title, price } = req.body;

    if (!title || !price || typeof title !== 'string' || isNaN(price)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  checkProductExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const id = Number(req.params.id);

      const producto = carritoPersistencia.leer(id);

      if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      }
    }
    next();
  }

  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    const producto = id
      ? carritoPersistencia.leer(id)
      : carritoPersistencia.leer();

    res.json({
      data: producto,
    });
  }

  addProducts(req: Request, res: Response) {
    const { producto } = req.body;
    const newItem = carritoPersistencia.guardar(producto);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  updateProducts(req: Request, res: Response) {
    // const id = Number(req.params.id);
    // const { title, price, thumbnail } = req.body;
    // const newItem = carritoPersistencia.actualizar(id, title, price, thumbnail);
    res.json({
      // data: newItem,
      msg: 'actualizando producto',
    });
  }

  deleteProducts(req: Request, res: Response) {
    // const id = Number(req.params.id);
    // carritoPersistencia.borrarUno(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const carritoController = new Producto();
