import { useEffect, useState } from "react";
import trades from "../data/trades.json";

export const useTrades = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(trades);
            setLoading(false);
        }, 300); // имитация запроса

        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
};
