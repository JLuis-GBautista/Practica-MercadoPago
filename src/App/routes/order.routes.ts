import { Router } from "express";
import { Pago, failureRoute, pendingRoute, successRoute, webhook } from "../controllers/order.controllers";

const ordersRoutes = Router();

ordersRoutes.post('/orders', Pago);
ordersRoutes.get('/success', successRoute);
ordersRoutes.get('/failure', failureRoute);
ordersRoutes.get('/pending', pendingRoute);
ordersRoutes.post('/webhook', webhook);

export default ordersRoutes;