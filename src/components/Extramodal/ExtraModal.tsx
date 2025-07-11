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
import {useDispatch} from "react-redux";
import type {Action} from "../../Types/Types.tsx";
import type {Dispatch} from "redux";
import {setRecovery} from "../../actions";

export const ExtraModal: FC<ModalProps> = ({isOpen, onClose}) => {
    const dispatch = useDispatch<Dispatch<Action>>();

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
                            <div className="flex flex-col gap-10">
                                <div className="flex justify-between items-center  pt-7 p-6 pb-0 rounded-t-3xl">
                                    <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">EXTRA SETTINGS</DialogTitle>
                                    <button onClick={() => {onClose();}}>
                                        <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                    </button>
                                </div>
                                <div className="w-full lg:max-w-xl max-w-[23rem] mx-auto h-95 lg:h-110 flex flex-col gap-7 lg:gap-12 bg-gradient-to-br from-[#1c0740] to-[#af5505] p-6 rounded-2xl">
                                        {/* Toggle: Show Recovery Phrase */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-medium">Show Recovery Phrase</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" onChange={() => dispatch(setRecovery())}/>
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:bg-purple-600 transition-all"/>
                                                <span className="ml-2 text-sm text-gray-400">Enable</span>
                                            </label>
                                        </div>

                                        {/* Toggle: Enable Notifications */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-medium">Enable Notifications</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all" />
                                                <span className="ml-2 text-sm text-gray-400">On</span>
                                            </label>
                                        </div>

                                        {/* Input: Custom Nickname */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-lg mb-1">Custom Nickname</label>
                                            <input
                                                type="text"
                                                placeholder="Enter nickname"
                                                className="bg-[#1e1e1e]/80 border border-gray-600 rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>

                                        {/* Input: API Key */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-lg mb-1">API Key</label>
                                            <input
                                                type="text"
                                                placeholder="Paste your key"
                                                className="bg-[#1e1e1e]/80 border border-gray-600 rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
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