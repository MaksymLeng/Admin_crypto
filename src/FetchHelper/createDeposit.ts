import axios from 'axios';

export interface CreateDepositResponse {
    depositAddress: string;
    comment: string;
    expiresAt: number;
}

export const createDeposit = async (
    userId: number,
    amount: number
): Promise<CreateDepositResponse> => {
    const res = await axios.post<CreateDepositResponse>('/api/deposit/create', {
        userId,
        amount,
    });

    return res.data;
};
