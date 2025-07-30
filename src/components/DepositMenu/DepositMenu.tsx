import { useEffect } from 'react';
import { Eye, EyeOff} from "lucide-react";
import {setShow} from '../../store/modalSlice.ts';
import {DepositModal} from "../DepositModal/DepositModal.tsx";
import {ArrowUpIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import { updateWallet } from '../../store/userSlice';
import WithdrawModal  from "../WithdrawModal/WithdrawModal.tsx";
import {useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import WalletBalance from "../WalletBalance/WalletBalance.tsx";
import Logo from '../../assets/N.svg'
import tonIcon from '../../assets/wallet.svg'

const DepositMenu = () => {
    const showArr= useAppSelector((state) => state.modal.showArr);
    const dispatch = useAppDispatch();
    const serverUser = useAppSelector((state) => state.user.userData);
    const telegramUser = useAppSelector((state) => state.user.telegramUser);
    const walletFriendly = useAppSelector((state) => state.user.walletFriendly);

    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const raw = wallet?.account?.address;
    const id = serverUser?.id?.toString() ?? telegramUser?.id?.toString();
    const masked = id?.replace(/\S/g, '*');

    const onClickShow = (id:number) => {
        dispatch(setShow(id));
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    
    useEffect(() => {
        if (raw && serverUser?.id) {
            dispatch(updateWallet({
                id: +serverUser.id,
                address: raw
            }));
        }
    }, [wallet?.account?.address, serverUser?.id, dispatch, raw]);

    return (
        <div className="flex lg:flex-row flex-col gap-20 lg:gap-10 min-h-screen items-center justify-center px-4 pt-30 lg:px-0 lg:pt-0">
            <DepositModal isOpen={showArr[1]} onClose={() => onClickShow(1)}/>
            <WithdrawModal isOpen={showArr[2]} onClose={() => onClickShow(2)} />
            <div className="relative bg-black/30 rounded-xl p-6 lg:w-[65%] w-[100%] shadow-md text-white flex flex-col justify-between">
                {/* Верхняя карточка с ID */}
                <div className=" absolute -top-12 inset-x-6 bg-linear-130 from-[#af5505] to-[#1c0740] rounded-xl p-4 mb-6 text-white">
                    <div className="flex flex-col gap-3">
                        <div className="flex text-left lg:text-center justify-between">
                            <div className="flex gap-3">
                                <img src={Logo} alt="Logo" className="w-6 h-6"/>
                                <div className="leading-none text-left font-light opacity-50 uppercase text-sm">
                                    Personal Crypto<br />
                                    Banking System
                                </div>
                            </div>
                            <button onClick={() =>onClickShow(0)}>
                                {showArr[0]
                                    ? <Eye className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>
                                    : <EyeOff className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>}
                            </button>
                        </div>
                        <div className="flex mx-auto gap-10 xl:gap-15">
                            <div className="text-2xl font-light opacity-70">ID:</div>
                            <div className="text-2xl w-[120px] font-bold text-center">
                                {showArr[0] ? id : masked}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 py-15 text-lg font-semibold">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">BALANCE:</span>
                        <span className="text-3xl">
                            {serverUser?.Balance ?? 0}$
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-light opacity-50">AVAILABLE:</span>
                        <span className="text-3xl">
                            {serverUser?.Available ?? 0}$
                        </span>
                    </div>
                    <div className="flex justify-between text-md font-light items-end">
                        <span className="text-left opacity-50">WITHDRAWAL<br/>DATE:</span>
                        <span className=" font-bold text-white text-lg">{serverUser?.WithdrawalDate ?? '—'}</span>
                    </div>
                    <div className="flex justify-between text-md font-light items-end">
                        <div className="flex gap-1 items-center">
                            {raw
                                ? (
                                    <>
                                    <img src={tonIcon} className="w-7 h-7" alt="wallet" />
                                    <span className="text-left opacity-50 uppercase">
                                        {`Your wallet ${formatAddress(walletFriendly)}`}
                                    </span>
                                    </>)
                                : (
                                    <span className="text-left opacity-50 uppercase">
                                        Wallet not connected
                                    </span>)
                            }
                        </div>

                        {raw ? (
                            <WalletBalance address = {walletFriendly}/>
                        ) : (
                            <button
                                className="flex items-center justify-center gap-1 font-semibold cursor-pointer"
                                onClick={() => tonConnectUI.openModal()}
                            >
                                <span>Connect</span>
                                <PlusIcon className="w-5 h-5 text-white" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white text-white px-1 py-4 font-bold rounded-md cursor-pointer hover:shadow-lg" onClick={() => onClickShow(1)}>
                        <div className="w-full flex justify-center items-center gap-1 pointer-events-none">
                            <div className="text-black">DEPOSIT</div>
                            <PlusIcon className="w-6 h-6 text-[#1c0740] cursor-pointer"></PlusIcon>
                        </div>
                    </button>
                    <button className="bg-white/20 text-white px-1 py-4 font-bold rounded-md cursor-pointer hover:shadow-lg" onClick={() => onClickShow(2)}>
                        <div className="w-full flex justify-center items-center gap-1 pointer-events-none">
                            <div className="opacity-80">WITHDRAW</div>
                            <ArrowUpIcon className="w-6 h-6 text-white cursor-pointer"></ArrowUpIcon>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DepositMenu