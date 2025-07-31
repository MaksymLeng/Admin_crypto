import axios from "axios";

export const fetchTonBalance = async (address: string): Promise<number> => {
    try {
        const response = await axios.get(
            `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
        );
        const data = response.data;

        if (!data.ok || typeof data.result !== "string") {
            console.warn("Bad response from balance API:", data);
            return 0;
        }

        const balance = Number(data.result);

        return Number.isFinite(balance) ? balance / 1e9 : 0;
    } catch (error) {
        console.error("Error fetching TON balance:", error);
        return 0;
    }
};
