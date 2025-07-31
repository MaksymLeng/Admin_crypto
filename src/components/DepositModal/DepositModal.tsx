import { type FC} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild
} from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type {ModalProps} from "../../Types/Interface.tsx";
import tonIcon from "../../assets/ton_icon.png";
import type {DepositValues} from "../../Types/Types.tsx";
import { useAppSelector } from '../../store/hooks';


// eslint-disable-next-line react-refresh/only-export-components
export const depositSchema = z.object({
    amount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Only numbers allowed")
        .min(1, "Amount is required"),
});

export const DepositModal: FC<ModalProps> = ({isOpen, onClose}) => {
    const { walletFriendly } = useAppSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
        watch
    } = useForm<DepositValues>({
        resolver: zodResolver(depositSchema),
        mode: "onChange",
    });

    const onSubmit = (data: DepositValues) => {
        console.log("SUBMIT", data);
        reset();
        // можно дальше обрабатывать
    };

    const amount = watch("amount");

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="transition duration-500"
                    enterFrom="translate-y-full opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-300"
                    leaveFrom="translate-y-0 opacity-100"
                    leaveTo="translate-y-full opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60"/>
                </TransitionChild>

                <div className="fixed inset-0 flex items-end justify-center p-0">
                    <TransitionChild
                        as={Fragment}
                        enter="transition duration-500"
                        enterFrom="translate-y-full opacity-0"
                        enterTo="translate-y-0 opacity-300"
                        leave="transition duration-200"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="translate-y-full opacity-0"
                    >
                        <DialogPanel
                            className="lg:w-[calc((100%-15rem)*0.6)] w-full md:h-[60%] h-[70%] max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e]">
                            <div className="flex flex-col gap-10">
                                <div className="flex justify-between items-center  pt-7 p-6 pb-0 rounded-t-3xl">
                                    <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">DEPOSIT</DialogTitle>
                                    <button onClick={() => {onClose()}}>
                                        <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                    </button>
                                </div>
                                <div className="w-full md:max-w-xl max-w-[23rem] mx-auto h-95 xl:h-110 flex flex-col gap-7 lg:gap-12 bg-gradient-to-br justify-between from-[#1c0740] to-[#af5505] py-6 px-10 rounded-2xl">
                                    <div className="flex justify-start text-gray-400/80">Top-up only in TON</div>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <p className="text-gray-400/80 text-center text-lg">Your connected wallet</p>
                                        <div className="flex items-center justify-center gap-2 text-white font-semibold">
                                            <img src={tonIcon} className="w-7 h-7" alt="wallet" />
                                            <span className="text-xl">
                                              {walletFriendly ? `${walletFriendly.slice(0, 4)}...${walletFriendly.slice(-3)}` : 'Not connected'}
                                            </span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-6 text-5xl text-white font-bold">
                                        <div className="flex gap-1 mb-8 justify-center items-center">
                                              <span>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    defaultValue="0"
                                                    {...register("amount")}
                                                    inputMode="decimal"
                                                    pattern="[0-9]*"
                                                    className="bg-transparent text-white text-5xl font-bold outline-none text-center w-auto max-w-[160px]"
                                                    style={{ width: `${(amount?.length || 1) + 0.5}ch` }}
                                                    onInput={(e) => {
                                                        const input = e.target as HTMLInputElement;
                                                        let value = input.value.replace(/[^\d.]/g, '');

                                                        // Удаляем лишние точки
                                                        const parts = value.split(".");
                                                        if (parts.length > 2) {
                                                            value = parts[0] + "." + parts[1]; // только первая точка
                                                        }

                                                        // Удалить ведущие нули, но оставить одиночный 0
                                                        value = value.replace(/^0+(?=\d)/, "");

                                                        // Ограничить до 5 цифр до точки
                                                        const [whole, decimal] = value.split(".");
                                                        if (whole.length > 5) {
                                                            value = whole.slice(0, 5) + (decimal ? "." + decimal : "");
                                                        }

                                                        // Если введено только "0" — автоматически добавить точку
                                                        if (value === "0") {
                                                            value = "0.";
                                                        }

                                                        input.value = value;
                                                    }}
                                                />
                                              </span>
                                            <span className="text-gray-400 text-4xl pb-1">TON</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            className={`ml-4 w-full py-3 rounded-xl text-white text-base text-center text-lg font-semibold transition ${
                                                isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-800/40 cursor-not-allowed'
                                            }`}
                                        >
                                            Deposit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}