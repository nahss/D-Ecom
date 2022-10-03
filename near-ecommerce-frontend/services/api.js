import axios from "axios";
import { async } from "regenerator-runtime";

const instance = axios.create({
    baseURL: "http://localhost:3000"
});

export async function getProducts() {
    let { data } = await instance.get("/api/products");

    return data;
}

export async function createOrder(order) {
    let { data } = await instance.post("/api/orders", order);

    return data;
}

export async function getOrderById(orderId) {
    let {data} = await instance.get(`/api/orders/${orderId}`);

    return data;
}