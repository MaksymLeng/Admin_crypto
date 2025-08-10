import { useEffect } from 'react';
import {getTonBalance} from "../../FetchHelper/getTonBalance.ts";
import { useTonConnectUI } from "@tonconnect/ui-react";
import {ChevronRightIcon} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearWallet, setTonBalance} from "../../store/userSlice";

const WalletBalance = ({ address }: { address: string }) => {
    const { balanceTon} = useAppSelector((state) => state.user);
    const [tonConnectUi] = useTonConnectUI(); // подключение хука
    const dispatch = useAppDispatch();

    const handleDisconnect = () => {
        tonConnectUi.disconnect();
        dispatch(clearWallet());
    };

    useEffect(() => {
        if (address && balanceTon === 0) {
            getTonBalance(address).then((value) => dispatch(setTonBalance(value)));
        }
    }, [address, balanceTon, dispatch]);

    return (
        <button onClick={handleDisconnect} className="flex items-center text-white font-semibold text-xl gap-1 cursor-pointer">
            <span>{balanceTon.toString()} TON</span>
            <ChevronRightIcon className="w-5 h-5" />
        </button>
    );
};

export default WalletBalance;
