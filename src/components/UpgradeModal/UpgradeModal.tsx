import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';
import { X } from 'lucide-react';
import type { UpgradeModalProps } from "../../Types/Types.tsx";
import {userAPI} from "../../data/variables.ts";

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
    const userId = useAppSelector((state) => state.user.telegramUser?.id);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${userAPI}/user/level/upgrade`, { userId });
            const level = res.data?.newLevel;
            setResult(`🎉 You’ve successfully reached level ${level}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.errText || 'Upgrade failed';
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

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-[#1c0740] text-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative space-y-4">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-white hover:text-gray-400"
                    >
                        <X size={20} />
                    </button>

                    <DialogTitle className="text-2xl font-bold text-center">LEVEL UPGRADE</DialogTitle>

                    {!result ? (
                        <>
                            <p className="text-center text-white/80">
                                Check if you're eligible to upgrade your level and continue earning XP.
                            </p>
                            <button
                                onClick={handleUpgrade}
                                disabled={loading}
                                className="w-full mt-4 bg-white text-[#1c0740] font-bold py-2 rounded-md hover:shadow-lg disabled:opacity-50"
                            >
                                {loading ? 'Checking...' : 'Confirm Upgrade'}
                            </button>
                        </>
                    ) : (
                        <p className="text-center text-white text-lg">{result}</p>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default UpgradeModal;
