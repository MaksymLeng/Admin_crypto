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
import type {RecoveryModalProps} from "../../Types/Interface.tsx";
import {Eye} from "lucide-react";



export const RecoveryModal: FC<RecoveryModalProps> = ({isOpen, onClose}) => {
    const [show, setShow] = useState(true);
    const recoveryPhrase = [
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
    ];


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
                        className="lg:w-[calc((100%-15rem)*0.6)] w-full h-[60%] max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e]">
                        <div className="flex flex-col gap-20">
                            <div className="flex justify-between items-center mb-6  pt-7 p-6 pb-7 rounded-t-3xl">
                                <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">Recovery
                                    phrase</DialogTitle>
                                <button onClick={onClose}>
                                    <XMarkIcon className="w-5 h-5 text-gray-400"/>
                                </button>
                            </div>
                            <div className="flex items-center justify-center bg-linear-130 to-[#af5505] from-[#1c0740] mx-6 rounded-2xl h-75">
                                <button>
                                <Eye size={40}
                                     className="text-gray-500 hover:scale-103 hover:text-shadow-lg cursor-pointer"/>
                                </button>
                                {show
                                    ? <div className="grid-cols-12">
                                        {recoveryPhrase.map(phrase => {
                                           return <span>{phrase}</span>;
                                        })}
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </Transition>
    )
}