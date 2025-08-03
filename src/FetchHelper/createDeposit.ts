import {userAPI} from "../data/variables.ts";
import type {CreateDepositResponse} from "../Types/Interface.tsx";
import axios from "axios";

export const createDeposit = async (
    userId: number,
    amount: number,
    apiKey: string,
): Promise<CreateDepositResponse> => {
    const res = await axios.post<CreateDepositResponse>(`${userAPI}/api/deposit/create`, {
        userId,
        amount,
    },
        {
            headers: {
                'x-api-key': apiKey,
            },
        }
    );

    return res.data;
};
