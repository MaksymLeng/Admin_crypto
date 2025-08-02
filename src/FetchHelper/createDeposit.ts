import axios from 'axios';
import {API} from "../data/variables.ts";
import type {CreateDepositResponse} from "../Types/Interface.tsx";

export const createDeposit = async (
    userId: number,
    amount: number
): Promise<CreateDepositResponse> => {
    const res = await axios.post<CreateDepositResponse>(`${API}/api/deposit/create`, {
        userId,
        amount,
    });

    return res.data;
};
