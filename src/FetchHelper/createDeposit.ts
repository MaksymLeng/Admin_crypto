import {API} from "../data/variables.ts";
import type {CreateDepositResponse} from "../Types/Interface.tsx";
import axiosInstance from "./axiosInstance.ts";

export const createDeposit = async (
    userId: number,
    amount: number
): Promise<CreateDepositResponse> => {
    const res = await axiosInstance.post<CreateDepositResponse>(`${API}/api/deposit/create`, {
        userId,
        amount,
    });

    return res.data;
};
