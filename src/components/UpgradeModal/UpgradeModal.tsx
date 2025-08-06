import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import {Fragment, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';
import {XMarkIcon} from '@heroicons/react/24/outline'
import type { UpgradeModalProps } from "../../Types/Types.tsx";
import {userAPI} from "../../data/variables.ts";

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
    const userId = useAppSelector((state) => state.user.telegramUser?.id);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${userAPI}/api/user/level/upgrade`, { userId });
            const level = res.data?.newLevel;
            setResult(`🎉 You’ve successfully reached level ${level}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.error  || 'Upgrade failed';
                setResult(`❌ ${msg}`);
            } else if (error instanceof Error) {
                setResult(`❌ ${error.message}`);
            } else {
                setResult('❌ Unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const onCloseModal = () => {
        setResult(null);
        onClose();
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCloseModal}>
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

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="transition duration-500"
                        enterFrom="translate-y-full opacity-0"
                        enterTo="translate-y-0 opacity-300"
                        leave="transition duration-200"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="translate-y-full opacity-0"
                    >
                        <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1e1e1e]/40 px-6 py-6 text-left shadow-lg">
                            <div className="flex justify-between items-center">
                                <DialogTitle as="h3" className="text-2xl font-bold text-white">
                                    Confirm Upgrade
                                </DialogTitle>
                                <button onClick={onCloseModal}>
                                    <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer"/>
                                </button>
                            </div>

                            <div className="mt-4">
                                {result ? (
                                    <p className="text-xl font-bold text-white">{result}</p>
                                ) : (
                                    <p className="text-lg text-white">
                                        Are you sure you want to upgrade your level?
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    disabled={loading || !!result}
                                    className="inline-flex justify-center rounded-md px-4 py-2 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-300 hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                                    onClick={handleUpgrade}
                                >
                                    {loading ? 'Checking...' : 'Confirm Upgrade'}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpgradeModal;
