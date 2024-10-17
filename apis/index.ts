import axios from "axios";
import { NextRequest } from "next/server";

const backendURL = process.env.BACKEND_URL;

if(!backendURL) throw new Error("BACKEND_URL env variable is not defined.");

export const getApiWithAuth = (req: NextRequest) => {
    return axios.create({
        baseURL: backendURL,
        headers: {
            Authorization: req.headers.get("Authorization")
        }
    })
}