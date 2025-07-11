import {type FC} from "react";
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
import {Eye} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {Action, RootState} from "../../Types/Types.tsx";
import type {Dispatch} from "redux";
import {setRecovery} from "../../actions";



export const RecoveryModal: FC<ModalProps> = ({isOpen, onClose, recoveryPhrase}) => {
    const {showRecovery} = useSelector((state: RootState) => state);
    const dispatch = useDispatch<Dispatch<Action>>();

    const onClickGlass = () => {dispatch(setRecovery())};

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
                        <div className="flex flex-col lg:gap-20 gap-10">
                            <div className="flex justify-between items-center mb-6 pt-7 p-6 pb-7 rounded-t-3xl">
                                <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">Recovery
                                    phrase</DialogTitle>
                                <button onClick={() => {onClose();}}>
                                    <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                </button>
                            </div>
                            <div className="flex flex-col items-center h-80 justify-center bg-gradient-to-br from-[#1c0740] to-[#af5505] mx-6 rounded-2xl p-6">
                                <button onClick={onClickGlass}>
                                    <Eye
                                        size={40}
                                        className="text-gray-300 hover:scale-105 transition-transform hover:text-shadow-lg cursor-pointer"
                                    />
                                </button>

                                {showRecovery && (
                                    <div className="grid grid-flow-col grid-rows-4 gap-3 pb-5 lg:gap-x-10 mt-6">
                                        {recoveryPhrase && recoveryPhrase.map((word, index) => (
                                            <div
                                                key={index}
                                                className="bg-black/20 lg:px-5 px-4 py-3 rounded-lg text-gray-100 font-medium text-center text-sm min-w-[100px]"
                                            >
                                                {index + 1}. {word}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </Transition>
    )
}