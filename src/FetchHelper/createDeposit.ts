import {userAPI} from "../data/variables.ts";
import type {CreateDepositResponse} from "../Types/Interface.tsx";
import {axiosInstanceUser} from "./axiosInstance.ts";

export const createDeposit = async (
    userId: number,
    amount: number
): Promise<CreateDepositResponse> => {
    const res = await axiosInstanceUser.post<CreateDepositResponse>(`${userAPI}/api/deposit/create`, {
        userId,
        amount,
    });

    return res.data;
};
