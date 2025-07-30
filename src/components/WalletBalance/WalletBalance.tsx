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
        <div className="flex items-center text-white font-semibold text-sm gap-1">
            {balance} TON
            <ChevronRightIcon className="w-4 h-4" />
        </div>
    );
};

export default WalletBalance;
