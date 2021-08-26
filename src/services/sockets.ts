import { productsPersistencia } from '../persistencia/productos';
import { formatMessages, mensajesPersistencia } from '../persistencia/mensajes';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('conectado');
    socket.on('producto-nuevo', (product: any) => {
      const { nombre, precio, foto, descripcion, codigo, stock } = product;
      console.log('producto nuevo', product);
      const resultado = productsPersistencia.guardar(
        nombre,
        precio,
        foto,
        descripcion,
        codigo,
        stock
      );
      console.log('guardé producto nuevo', resultado);
      if (resultado) {
        io.emit('producto-update', [product]);
      }
    });
    socket.on('inicio-productos', () => {
      console.log('inicio lista de productos productos');
      const productos = productsPersistencia.leer();
      if (productos.length > 0) {
        socket.emit('producto-update', productos);
      }
    });

    socket.on('inicio-messages', () => {
      console.log('ME LLEGO DATA inicio de messages');
      const mensajes = mensajesPersistencia.leer();

      socket.emit('message-update', mensajes);
    });

    socket.on('new-message', (data: any) => {
      const { author, text, time } = formatMessages(data);
      mensajesPersistencia.guardar(author, text, time);
      io.emit('message-update', [{ author, text, time }]);
    });
  });

  return io;
};
