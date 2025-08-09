import { Eye, EyeOff} from "lucide-react";
import {DepositModal} from "../DepositModal/DepositModal.tsx";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import WithdrawModal  from "../WithdrawModal/WithdrawModal.tsx";
import WalletBalance from "../WalletBalance/WalletBalance.tsx";
import Logo from '../../assets/N.svg'
import tonIcon from '../../assets/wallet.svg'
import {levelName} from "../../data/variables.ts";
import {onClickShow} from "../HelperFunction/onClickShow.ts";

const SettingsMenu = () => {
    const showArr= useAppSelector((state) => state.modal.showArr);
    const dispatch = useAppDispatch();
    const { userData , telegramUser, walletFriendly, rawWallet } = useAppSelector((state) => state.user);

    const formatAddress = (address: string) => {
        if (!address) return '-';
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }

    const id = telegramUser?.id || Number(userData?.id);
    const masked = id?.toString().replace(/\S/g, '*');

    return (
        <div className="flex lg:flex-row flex-col gap-20 lg:gap-10 min-h-screen items-center justify-center px-4 pt-30 lg:px-0 lg:pt-0">
            <DepositModal isOpen={showArr[1]} onClose={() => onClickShow(1, dispatch)}/>
            <WithdrawModal isOpen={showArr[2]} onClose={() => onClickShow(2, dispatch)} />
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
                            <button onClick={() =>onClickShow(0, dispatch)}>
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

                <div className="space-y-8 pt-15 pb-8 text-lg font-semibold">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">BALANCE:</span>
                        <span className="text-3xl">
                            {showArr[0] ? `${userData?.Balance ?? 0}$` : '*****'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-light opacity-50 uppercase">referral<br/>Count:</span>
                        <span className="text-3xl">
                            {showArr[0] ? `${userData?.referralCount ?? 0}` : '*****'}
                        </span>
                    </div>
                    <div className="flex justify-between text-md font-light items-center">
                        <span className="text-left opacity-50 uppercase">Rank:</span>
                        <span className=" font-bold text-white text-xl">
                          {showArr[0]
                              ? levelName[userData?.levelInfo?.level ?? 0] || 'Newbie'
                              : '*****'}
                        </span>
                    </div>
                    <div className="flex justify-between text-md font-light items-center">
                        <div className="flex gap-1">
                            {rawWallet
                                ? (
                                    <div className="flex flex-col items-start">
                                        <span className="text-left opacity-50 uppercase">
                                            Your wallet:
                                        </span>
                                        <div className="flex gap-1 items-center">
                                            <img src={tonIcon} className="w-5 h-5" alt="wallet" />
                                            <span className="text-left opacity-50 uppercase">
                                                 {formatAddress(walletFriendly)}
                                            </span>
                                        </div>
                                    </div>)
                                : (
                                    <span className="text-left opacity-50 uppercase">
                                        Wallet not connected
                                    </span>)
                            }
                        </div>

                        {rawWallet &&(
                            showArr[0] ? (
                                <WalletBalance address={rawWallet} />
                            ) : (
                                <span className="text-xl text-white font-semibold">*****</span>
                            )
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <button className='bg-white/20 px-1 py-4 font-bold rounded-md cursor-pointer uppercase opacity-80 cursor-pointer'>
                        Invite friends
                    </button>
                    <button className='bg-white/20 px-1 py-4 font-bold rounded-md cursor-pointer uppercase opacity-80 cursor-pointer'>
                        Deposit history
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu