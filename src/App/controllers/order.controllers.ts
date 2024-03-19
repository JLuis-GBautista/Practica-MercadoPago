import { Request, Response } from "express"
import OrderModel from "../models/Order.model";
import ENV from "../../config/env";
import { payment, preference } from "../../config/mercadoPago";

export const Pago = async(req: Request, res: Response) => {
    try {
        const orden = new OrderModel({ statusOrder: 'En proceso de pago'});
        const data = await preference.create({body: {
            external_reference: orden.id,
            items: [{
                id: '1',
                title: 'Refrigerador cuantico2',
                quantity: 1,
                unit_price: 9000,
                currency_id: 'MXN'
            }],
            back_urls: {
                success: `${ENV.BACK_URL_BASE}/success`,
                failure: `${ENV.BACK_URL_BASE}/failure`,
                pending: `${ENV.BACK_URL_BASE}/pending`
            },
            notification_url: `${ENV.BACK_URL_BASE}/webhook`
        }});
        orden.save();
        console.log(data.init_point);
        console.log(data.external_reference);
        console.log(data.back_urls, data.notification_url);
        return res.setHeader('ngrok-skip-browser-warning', 'true').status(200).json({ ok: true});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const webhook = async (req: Request, res: Response) => {
    try {
        const paymentReq = req.query;
        if(paymentReq.type === 'payment') {
            const idPay = req.query['data.id'] as string;
            console.log(req.query['data.id'], req.query)
            const pago = await payment.get({ id: idPay});
            const isPayment = pago.status === 'approved';
            if(isPayment) {
                await OrderModel.findByIdAndUpdate(pago.external_reference, { $set: {statusOrder: 'Pagado'}});
            }
            pago.collector_id
            console.log(pago, 'mi pago XD');
        }
        return res.setHeader('ngrok-skip-browser-warning', 'true').status(204).json({ ok: true});
    } catch (error) {
        console.log(error, 'un error inesperado')
        return res.status(500).json({ error });
    }
}

export const successRoute = (req: Request, res: Response) => res.setHeader('ngrok-skip-browser-warning', 'true').send("Success");
export const failureRoute = (req: Request, res: Response) => res.setHeader('ngrok-skip-browser-warning', 'true').send("Failure");
export const pendingRoute = (req: Request, res: Response) => res.setHeader('ngrok-skip-browser-warning', 'true').send("Pending");