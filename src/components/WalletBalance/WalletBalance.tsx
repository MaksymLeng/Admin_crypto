import { useEffect, useState } from 'react';
import {fetchTonBalance} from "../../FetchHelper/fetchTonBalance.ts";
import {ChevronRightIcon} from "lucide-react";

const WalletBalance = ({ address }: { address: string }) => {
    const [balance, setBalance] = useState<string>('0.00');

    useEffect(() => {
        if (address) {
            fetchTonBalance(address).then(setBalance);
        }
    }, [address]);

    return (
        <button className="flex items-center text-white font-semibold text-sm gap-1 cursor-pointer">
            <span className="font-bold text-md">{balance} TON</span>
            <ChevronRightIcon className="w-5 h-5" />
        </button>
    );
};

export default WalletBalance;
