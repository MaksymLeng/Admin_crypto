import { useEffect, useState } from "react";
import trades from "../data/trades.json";
import type {Trade} from "../Types/Interface.tsx";

export const useTrades = () => {
    const [data, setData] = useState<Trade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(trades);
            setLoading(false);
        }, 100); // имитация запроса

        return () => clearTimeout(timer);
    }, []);

    return { data, loading };
};
