import {type FC, Fragment } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const WithdrawModal: FC<Props> = ({ isOpen, onClose }) => {
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
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="transition duration-500"
                        enterFrom="translate-y-10 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition duration-200"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="translate-y-10 opacity-0"
                    >
                        <DialogPanel className="max-w-sm w-full bg-[#1e1e1e] text-white rounded-2xl shadow-xl p-6 border border-[#333]">
                            <div className="flex justify-between items-center mb-4">
                                <DialogTitle className="text-lg font-bold text-gray-300">Withdraw</DialogTitle>
                                <button onClick={onClose}>
                                    <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>
                            <p className="text-center text-white/80 text-lg font-semibold">
                                Withdrawal is not yet available to you.
                            </p>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default WithdrawModal;