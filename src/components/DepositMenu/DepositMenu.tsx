import type {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import { Eye, EyeOff} from "lucide-react";
import type {RootState} from "../../Types/Types.tsx";
import type { Action } from '../../Types/Types.tsx';
import {setShow} from '../../store/modalSlice.ts';
import Logo from '../../assets/N.svg'
import {User} from '../../data/User.ts'
import {DepositModal} from "../DepositModal/DepositModal.tsx";
import {ArrowUpIcon, PlusIcon} from "@heroicons/react/24/outline";
import { useAppSelector } from '../../store/hooks';
import WithdrawModal  from "../WithdrawModal/WithdrawModal.tsx";

const DepositMenu = () => {
    const showArr= useSelector((state: RootState) => state.modal.showArr);
    const dispatch = useDispatch<Dispatch<Action>>();
    const user = useAppSelector((state) => state.user.telegramUser);



    const id = user?.id?.toString() ?? User.id.toString();
    const masked = id.replace(/\S/g, '*');


    const onClickShow = (id:number) => {
        dispatch(setShow(id));
    };

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