

export const fetchTonBalance = async (address: string): Promise<string> => {
    try {
        const res = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
        const data = await res.json();
        if (data.ok && data.result) {
            const ton = Number(data.result) / 1e9;
            return ton.toFixed(2); // например, 9.40
        }
    } catch (err) {
        console.error('Failed to fetch TON balance:', err);
    }
    return '0.00';
};
