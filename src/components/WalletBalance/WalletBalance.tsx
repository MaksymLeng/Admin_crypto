import { useEffect, useState } from 'react';
import {fetchTonBalance} from "../../FetchHelper/fetchTonBalance.ts";
import { useTonConnectUI } from "@tonconnect/ui-react";
import {ChevronRightIcon} from "lucide-react";

const WalletBalance = ({ address }: { address: string }) => {
    const [balance, setBalance] = useState<number>(0.00);
    const [tonConnectUi] = useTonConnectUI(); // подключение хука

    const handleDisconnect = () => {
        tonConnectUi.disconnect(); // отключение кошелька
    };

    useEffect(() => {
        if (address) {
            fetchTonBalance(address).then(setBalance);
        }
    }, [address]);

    return (
        <button onClick={handleDisconnect} className="flex items-center text-white font-semibold text-xl gap-1 cursor-pointer">
            <span>{balance.toString()} TON</span>
            <ChevronRightIcon className="w-5 h-5" />
        </button>
    );
};

export default WalletBalance;
