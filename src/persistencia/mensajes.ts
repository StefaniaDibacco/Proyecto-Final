import moment from 'moment';

export const formatMessages = (data: { author: string; text: string }) => {
  const { author, text } = data;
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
};

interface Mensaje {
  author: string;
  text: string;
  time: string;
}
const mensajes: Mensaje[] = [];

class Mensajes {
  // funcion para leer mis mensajes
  leer(): any {
    try {
      return mensajes;
    } catch (error) {
      console.log('No hay mensajes en el listado');
      return [];
    }
  }

  // funcion para agregar mensajes
  guardar(author: string, text: string, time: string): void {
    try {
      const mensajeNuevo: Mensaje = {
        author,
        text,
        time,
      };
      mensajes.push(mensajeNuevo);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un mensaje. ' + error.message);
    }
  }
}

export const mensajesPersistencia = new Mensajes();
