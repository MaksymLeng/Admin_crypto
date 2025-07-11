import {useState} from "react";
import type {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import type {RootState, UserType} from "../../Types/Types.tsx";
import type { Action } from '../../Types/Types.tsx';
import {setShow} from "../../actions";
import Logo from '../../assets/N.svg'
import {RecoveryModal} from "../RecoveryModal/RecoveryModal.tsx";
import {splitInHalf} from "../../Helpers/function.tsx";
import { TransactionRateDropdown } from "../RateList/RateList.tsx";


const DepositMenu = () => {
    const {showArr} = useSelector((state: RootState) => state);
    const dispatch = useDispatch<Dispatch<Action>>();
    const [isOpen, setIsOpen] = useState(false);

    const onClickBtn = (id:number) => {
        dispatch(setShow(id));
        if(id) {
            setIsOpen(!isOpen);
        }
    };

    const User: UserType = {
        id: '0021 3157',
        Balance: 0,
        Available: 0,
        DepositAddress: '0x86C399b68B73dEbBf3f7B491755144461A9b9151',
        WithdrawalAddress: '0x87D3a489bADCcC15f59BF055632DC63da7B07823',
        WithdrawalDate: '11/07/2025',
        RecoveryPhrase: [
            "moon",
            "cable",
            "genius",
            "tiger",
            "surface",
            "vanish",
            "cradle",
            "glory",
            "siren",
            "manual",
            "fortune",
            "border"
        ]
    }

    return (
        <div className="flex lg:flex-row flex-col gap-20 lg:gap-6 min-h-screen items-center justify-center px-4 pt-30 lg:px-0 lg:pt-0">
            {/* Левая карточка */}
            <div className="relative bg-black/30 rounded-xl p-6 lg:w-[40%] w-[90%] shadow-md text-white flex flex-col justify-between">
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
                            <button onClick={() =>onClickBtn(0)}>
                                {showArr[0]
                                    ? <Eye className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>
                                    : <EyeOff className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>}
                            </button>
                        </div>
                        <div className="flex mx-auto gap-10 xl:gap-15">
                            <div className="text-2xl font-light opacity-70">ID:</div>
                            <div className="text-2xl w-[120px] font-bold text-center">
                                {showArr[0]
                                    ? User.id
                                    : User.id.replace(/\S/g, '*')
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <RecoveryModal isOpen={isOpen} onClose={() => onClickBtn(1)} recoveryPhrase={User.RecoveryPhrase}/>
                <div className="space-y-8 py-15 text-lg font-semibold">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">BALANCE:</span>
                        <span className="text-3xl">
                            {`${User.Balance}$`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-light opacity-50">AVAILABLE:</span>
                        <span className="text-3xl">
                            {`${User.Available}$`}
                        </span>
                    </div>
                    <div className="flex justify-between text-md font-light items-end">
                        <span className="text-left opacity-50">WITHDRAWAL<br/>DATE:</span>
                        <span className=" font-bold text-white text-lg">{User.WithdrawalDate}</span>
                    </div>
                </div>

                <button className=" bg-white/20 text-white font-bold py-5 rounded-md cursor-pointer hover:shadow-lg">
                    <span className="opacity-80">DEPOSIT/WITHDRAW</span>
                </button>
            </div>

            {/* Правая часть */}
            <div className="relative bg-black/30 rounded-2xl py-6 lg:px-5 px-3 lg:w-[60%] w-[100%] shadow-md text-white flex flex-col justify-between">
                <h2 className="absolute font-montserrat -top-7 left-1/2 lg:-left-0 lg:-right-0 -translate-x-1/2 lg:-translate-0 text-3xl lg:text-5xl opacity-80 font-extrabold text-center italic mb-6 tracking-wider">
                    DEPOSIT/WITHDRAW
                </h2>

                <div className="text-sm space-y-5 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">OWNER ID:</span>
                        <span className="font-bold text-xl lg:text-3xl px-4">{showArr[0]
                            ? User.id
                            : User.id.replace(/\S/g, '*')
                        }</span>
                    </div>

                    <div className="flex justify-between items-center opacity-60">
                        <div className="font-light
                         text-left text-lg leading-none">DEPOSIT<br/>ADDRESS:</div>
                        <div className="break-all text-right">
                            {showArr[0]
                                ? splitInHalf(User.DepositAddress)
                                : splitInHalf(User.DepositAddress.replace(/\S/g, '*'))
                            }
                        </div>
                    </div>

                    <div className="flex justify-between items-center opacity-60 ">
                        <div className="font-light leading-none text-lg text-left">WITHDRAWAL<br/>ADDRESS:</div>
                        <div className="break-all text-right">
                            {showArr[0]
                                ? splitInHalf(User.WithdrawalAddress)
                                : splitInHalf(User.WithdrawalAddress.replace(/\S/g, '*'))
                            }
                        </div>
                    </div>

                    <div className="flex justify-between items-center opacity-60 py-5">
                        <span className="font-light text-xl leading-none">
                            TRANSACTION RATE:<br /> (DEFAULT)
                        </span>
                        <TransactionRateDropdown />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-bold text-xl">RECOVERY PHRASE:</span>
                        <div className="flex">
                            <button onClick={() => onClickBtn(1)}>
                                {showArr[1]
                                    ? <Eye className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>
                                    : <EyeOff className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"/>
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <button className="mt-5 bg-linear-100 from-[#79362e] via-[#7a3433] to-[#52232d] text-white font-bold py-3 rounded-xl cursor-pointer hover:shadow-lg">
                    <span className="opacity-80">EXTRA SETTINGS</span>

                </button>
            </div>
        </div>
    )
}

export default DepositMenu