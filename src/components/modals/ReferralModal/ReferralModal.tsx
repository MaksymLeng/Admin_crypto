// src/components/modals/ReferralModal.tsx
import { type FC, Fragment, useMemo, useState, type ReactElement } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon, GiftIcon } from "@heroicons/react/24/outline";
import type { ModalProps } from "../../../Types/Interface.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { applyReferral } from "../../../store/userSlice.ts";
import {tgBotLink} from "../../../data/variables.ts";

const Card = ({title, subtitle, icon,}: {
    title: string;
    subtitle: string;
    icon: ReactElement;
}) => (
    <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1">
            <div className="text-white font-semibold">{title}</div>
            <div className="text-gray-300/80 text-sm">{subtitle}</div>
        </div>
    </div>
);

const ReferralModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((s) => s.user);
    const { key } = useAppSelector((s) => s.apiKey);

    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const inviteLink = useMemo(() => {
        const code = userData?.refCode ?? "";
        return code ? `${tgBotLink}?startapp=${code}` : "";
    }, [userData?.refCode]);

    const hasReferrer = Boolean(userData?.invitedBy);

    const onApply = async () => {
        if (!userData?.id || !key || !input.trim()) return;
        setError(null);
        try {
            const userIdNum = Number(userData.id); // <<< фикс TS2322
            await dispatch(
                applyReferral({ userId: userIdNum, ref: input.trim(), apiKey: key })
            ).unwrap();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Failed to apply referral";
            setError(msg);
            console.error("applyReferral error:", e);
        }
    };

    const copy = async () => {
        if (!inviteLink) return;
        try {
            await navigator.clipboard.writeText(inviteLink);
        } catch (e) {
            console.warn("clipboard.writeText failed:", e);
        }
    };

    const share = async () => {
        if (!inviteLink) return;
        const nav = navigator as Navigator & {
            share?: (data: ShareData) => Promise<void>;
        };
        if (nav.share) {
            try {
                await nav.share({ title: "Join me", url: inviteLink });
            } catch (e) {
                console.warn("navigator.share cancelled/failed:", e);
            }
        } else {
            await copy();
        }
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
                    <div className="fixed inset-0 bg-black/60" />
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
                        <DialogPanel className="lg:w-[calc((100%-15rem)*0.6)] w-full max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e] pb-15
                         flex flex-col max-h-[78svh]  h-auto md:max-h-[70vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between pt-7 p-6 pb-9 rounded-t-3xl">
                                <DialogTitle className="text-2xl text-gray-200 font-extrabold uppercase">Invite Friends</DialogTitle>
                                <button onClick={onClose} aria-label="Close">
                                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex-1 w-full md:max-w-xl max-w-[23rem] mx-auto bg-gradient-to-br from-[#1c0740] to-[#af5505] rounded-2xl p-4 overflow-y-auto ">
                                <div className="text-gray-300/80 text-md mb-4">From your friends volumes</div>

                                <div className="space-y-2 mb-5">
                                    <Card
                                        title="Get 100% on your first deposit"
                                        subtitle="When entering the referral code"
                                        icon={<GiftIcon className="w-5 h-5 text-blue-300" />}
                                    />
                                </div>

                                {!hasReferrer ? (
                                    <div className="space-y-2 focus-within:mb-5">
                                        <div className="text-gray-300/90 text-sm">Enter referral code</div>
                                        <div className="flex gap-2">
                                            <input
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="e.g. ynf4uq"
                                                className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none"
                                            />
                                            <button
                                                onClick={onApply}
                                                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/10"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {error && <div className="text-red-300 text-xs">{error}</div>}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="text-gray-300/90 text-sm">Your link for friends</div>
                                        <div className="flex gap-2">
                                            <input
                                                readOnly
                                                value={inviteLink}
                                                className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2"
                                            />
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={copy}
                                                className="flex-1 rounded-xl bg-white/15 hover:bg-white/25 border border-white/10 py-2"
                                            >
                                                Copy link
                                            </button>
                                            <button
                                                onClick={share}
                                                className="flex-1 rounded-xl bg-blue-600/90 hover:bg-blue-600 py-2"
                                            >
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ReferralModal;
