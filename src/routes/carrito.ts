import { Router } from 'express';
import { carritoController } from '../controllers/carrito';
import { checkUser } from '../middleware/user';

const router = Router();

router.get(
  '/listar/:id?',
  [checkUser, carritoController.checkProductExists],
  carritoController.getProducts
);

router.post(
  '/agregar/id_producto',
  [checkUser, carritoController.checkAddProducts],
  carritoController.addProducts
);

router.delete(
  '/borrar/:id',
  [checkUser, carritoController.checkProductExists],
  carritoController.deleteProducts
);

export default router;
