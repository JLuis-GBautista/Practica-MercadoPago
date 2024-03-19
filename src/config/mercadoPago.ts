import {MercadoPagoConfig, Payment, Preference} from "mercadopago";
import ENV from "./env";

const mercadoPago = new MercadoPagoConfig({
    accessToken: ENV.KEY_MERCADOPAGO,
    options: {
        timeout: 5000,
        idempotencyKey: 'abc'
    }
});

export const preference = new Preference(mercadoPago);
export const payment = new Payment(mercadoPago);