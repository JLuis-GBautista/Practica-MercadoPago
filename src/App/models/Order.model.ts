import mongoose from "mongoose";

const Order = new mongoose.Schema({
    statusOrder: {
        type: String,
        default: 'No Pagado'
    }
});

export default mongoose.model('Order', Order);