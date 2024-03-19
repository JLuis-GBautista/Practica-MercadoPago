import express from "express";
import ENV from "./config/env";
import connectMongo from "./config/db";
import ordersRoutes from "./App/routes/order.routes";

const app = express();

app.use(express.static('Public'));
app.use(express.json());

app.use('/', ordersRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ENV.PORT}`); 
    connectMongo();
});
