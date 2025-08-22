// src/components/modals/DepositHistoryModal.tsx
import { type FC, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ModalProps } from "../../../Types/Interface.tsx";
import { useAppSelector } from "../../../store/hooks.ts";

const StatusBadge = ({ status }: { status?: string }) => {
    const label = (status || "confirmed").toUpperCase();
    const color =
        status === "rejected"
            ? "bg-red-500/20 text-red-300 border-red-600/30"
            : status === "pending"
                ? "bg-yellow-500/20 text-yellow-300 border-yellow-600/30"
                : "bg-green-500/20 text-green-300 border-green-600/30";
    return <span className={`px-2 py-0.5 text-xs rounded border ${color}`}>{label}</span>;
};

const Row = ({
                 createdAt,
                 amount,
                 usdAmount,
                 status,
             }: {
    createdAt: string;
    amount: number;
    usdAmount?: number;
    status?: "pending" | "confirmed" | "failed";
}) => {
    const date = new Date(createdAt).toLocaleString();

    return (
        <li className="grid grid-cols-12 gap-3 items-center text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10">
            <div className="flex justify-between items-center w-full col-span-12">
                <div className="text-gray-300">{date}</div>

                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-white font-semibold">{amount} TON</span>
                        {usdAmount ? <span className="text-gray-400">(~${usdAmount})</span> : null}
                    </div>
                    <div className="flex justify-end">
                        <StatusBadge status={status} />
                    </div>
                </div>
            </div>
        </li>
    );
};

const DepositHistoryModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const { depositHistory, depositError } = useAppSelector((s) => s.user);

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

                {/* bottom-sheet контейнер */}
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
                        {/* ВАЖНО: делаем панель flex-колонкой и ограничиваем высоту, скроллится контент ниже */}
                        <DialogPanel className="lg:w-[calc((100%-15rem)*0.6)] w-full max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e] flex flex-col max-h-[80svh] md:max-h-[85vh]">
                            {/* Header (фиксированный) */}
                            <div className="flex items-center justify-between pt-7 p-6 pb-3 rounded-t-3xl shrink-0">
                                <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">
                                    DEPOSIT HISTORY
                                </DialogTitle>
                                <button onClick={onClose} aria-label="Close">
                                    <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                                </button>
                            </div>

                            {/* Scrollable content */}
                            <div className="w-full md:max-w-3xl max-w-[95%] mx-auto flex-1 bg-gradient-to-br from-[#1c0740] to-[#af5505] rounded-2xl p-4 overflow-y-auto overscroll-contain">
                                {/* Subheader (можно закрепить) */}
                                <div className="flex items-center justify-between px-2 pb-2 sticky top-0 bg-transparent">
                                    <div className="text-gray-300/90 text-md">Latest first</div>
                                    <div className="text-gray-300/60 text-xs">
                                        {depositHistory?.length ? `${depositHistory.length} records` : ""}
                                    </div>
                                </div>

                                {/* Содержимое */}
                                {depositError ? (
                                    <div className="flex items-center justify-center min-h-40 text-red-300">
                                        {depositError}
                                    </div>
                                ) : !depositHistory || depositHistory.length === 0 ? (
                                    <div className="flex items-center justify-center min-h-40 text-gray-200/80">
                                        Deposit history is empty
                                    </div>
                                ) : (
                                    <ul className="space-y-2 pb-4">
                                        {depositHistory.map((d) => (
                                            <Row
                                                key={d._id}
                                                createdAt={d.createdAt}
                                                amount={d.amount}
                                                usdAmount={d.usdAmount}
                                                status={d.status}
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DepositHistoryModal;

