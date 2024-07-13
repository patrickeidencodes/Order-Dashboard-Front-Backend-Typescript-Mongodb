import Order from "../models/Order.js"

export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err)
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err)
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Der Auftrag wurde gelöscht.");
    } catch (err) {
        next(err)
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order);
    } catch (err) {
        next(err)
    }
}

export const getAllOrders = async (req, res, next) => {
    console.log("getAllOrders")
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
}
export const getAllIdOrders = async (req, res, next) => {
    console.log("getAllIdOrders")
    console.log(req.query.knr)
    const cnr = req.query.knr
    try {
        const orders = await Order.find( {knr: req.query.knr} )
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
}

export const getAllTypeOrders = async (req, res, next) => {
    const type = req.query.state
    try {
        const state = await Order.find({ status: type });
        res.status(200).json(state);
    } catch (err) {
        next(err)
    }
}

export const getAllTypeCustomerOrders = async (req, res, next) => {
    const type = req.query.state
    const cnr = req.query.knr
    try {
        const order = await Order.find({ status: type, knr: cnr})
        res.status(200).json(order);
    } catch (err) {
        next(err)
    }
}