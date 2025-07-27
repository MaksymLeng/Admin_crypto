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


export const depositSchema = z.object({
    amount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Only numbers allowed")
        .min(1, "Amount is required"),
});

type DepositValues = z.infer<typeof depositSchema>;

export const DepositModal: FC<ModalProps> = ({isOpen, onClose}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DepositValues>({
        resolver: zodResolver(depositSchema),
        mode: "onSubmit",
    });

    const onSubmit = (data: DepositValues) => {
        console.log("SUBMIT", data);
        reset();
        // можно дальше обрабатывать
    };

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
                            className="lg:w-[calc((100%-15rem)*0.6)] w-full md:h-[60%] h-[65%] max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e]">
                            <div className="flex flex-col gap-10">
                                <div className="flex justify-between items-center  pt-7 p-6 pb-0 rounded-t-3xl">
                                    <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">DEPOSIT</DialogTitle>
                                    <button onClick={() => {onClose()}}>
                                        <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                    </button>
                                </div>
                                <div className="w-full md:max-w-xl max-w-[23rem] mx-auto h-95 lg:h-110 flex flex-col gap-7 lg:gap-12 bg-gradient-to-br justify-between from-[#1c0740] to-[#af5505] p-6 rounded-2xl">
                                    <div className="flex justify-start text-gray-400">Top-up only in TON</div>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <p className="text-gray-400 text-center text-lg">Your connected wallet</p>
                                        <div className="flex items-center justify-center gap-2 text-white font-semibold">
                                            <img src="/ton_icon.svg" className="w-5 h-5" alt="wallet" />
                                            <span className="">UQD...g0t</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-end gap-3 text-5xl text-white font-bold">
                                        <span>0</span>
                                        <span className="text-gray-400 text-4xl pb-1">TON</span>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                                        <input
                                            type="text"
                                            placeholder="Amount"
                                            {...register("amount")}
                                            className="input"
                                        />
                                        {"amount" in errors && errors.amount && (
                                            <p className="text-red-500">{errors.amount.message}</p>
                                        )}
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition text-center text-lg font-semibold"
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