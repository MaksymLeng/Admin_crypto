import {type FC, useState} from "react";
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
import type {MouseEvent} from "react";


export const DepositModal: FC<ModalProps> = ({isOpen, onClose}) => {
    const [active, setActive] = useState('Deposit');

    const onActiveMode = (e: MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value;
        
        switch (value) {
            case 'Deposit':
                setActive('Deposit');
                break;
            case 'Withdraw':
                setActive('Withdraw');
                break;
            default:
                setActive('');
        }
    }

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
                                    <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">DEPOSIT/WITHDRAW</DialogTitle>
                                    <button onClick={() => {onClose();}}>
                                        <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                    </button>
                                </div>
                                <div className="w-full md:max-w-xl max-w-[23rem] mx-auto h-95 lg:h-110 flex flex-col gap-7 lg:gap-12 bg-gradient-to-br justify-between from-[#1c0740] to-[#af5505] p-6 rounded-2xl">
                                    <div className="flex justify-start">
                                        <button
                                            className={`p-4 text-lg rounded-xl font-bold shadow-lg cursor-pointer transition ${
                                                active === 'Deposit'
                                                    ? 'bg-[#af5505]/30 text-gray-500 cursor-not-allowed'
                                                    : 'bg-[#af5505]/70 text-white hover:bg-[#af5505]/90'
                                            }`}
                                            value="Deposit"
                                            onClick={(e) => onActiveMode(e)}
                                            disabled={active === 'Deposit'}
                                        >
                                            DEPOSIT
                                        </button>
                                    </div>
                                    {active === 'Deposit' && (
                                        <div className="flex-grow flex items-center justify-center text-white text-lg">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="amount"
                                                    className="bg-[#1e1e1e]/80 border border-gray-600 rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 lg:w-100"
                                                />
                                                <button className="p-4 text-lg bg-green-800/70 shadow-lg rounded-xl font-bold cursor-pointer">
                                                    Deposit
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {active === 'Withdraw' && (
                                        <div className="flex-grow flex items-center justify-center text-white text-lg">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Wallet"
                                                    className="bg-[#1e1e1e]/80 border border-gray-600 rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 lg:w-100"
                                                />
                                                <button className="p-4 text-lg bg-red-800/70 shadow-lg rounded-xl font-bold cursor-pointer">
                                                    Withdraw
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-end">
                                        <button
                                            className={`p-4 text-lg rounded-xl font-bold shadow-lg cursor-pointer transition ${
                                                active === 'Withdraw'
                                                    ? 'bg-[#1c0740]/30 text-gray-500 cursor-not-allowed'
                                                    : 'bg-[#1c0740]/70 text-white hover:bg-[#1c0740]/90'
                                            }`}
                                            value="Withdraw"
                                            onClick={(e) => onActiveMode(e)}
                                            disabled={active === 'Withdraw'}
                                        >
                                            WITHDRAW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}