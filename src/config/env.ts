import { config } from "dotenv";

// Tipado de variables de entorno
interface Env {
  [name: string]: string;
  MONGO_URL: string;
  PORT: string;
  KEY_MERCADOPAGO: string;
  BACK_URL_BASE: string;
  NGROK_AUTHTOKEN: string;
}

config({path: '.env.dev'});
const ENV = process.env as Env;

export default ENV;