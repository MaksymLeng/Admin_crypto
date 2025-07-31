import axios from "axios";

export const fetchTonBalance = async (address: string): Promise<number> => {
    try {
        const response = await axios.get(
            `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
        );
        const balance = response.data.balance;

        return Number(balance) / 10 ** 9; // перевод в TON
    } catch (error) {
        console.error("Ошибка при получении баланса TON:", error);
        return 0;
    }
};
