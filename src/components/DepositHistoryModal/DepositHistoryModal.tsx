// src/components/modals/DepositHistoryModal.tsx
import { type FC, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ModalProps } from "../../Types/Interface.tsx";
import { useAppSelector } from "../../store/hooks.ts";

const StatusBadge = ({ status }: { status?: string }) => {
    const label = (status || "confirmed").toUpperCase();
    const color =
        status === "failed"
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
                 txHash,
             }: {
    createdAt: string;
    amount: number;
    usdAmount?: number;
    status?: "pending" | "confirmed" | "failed";
    txHash?: string;
}) => {
    const date = new Date(createdAt).toLocaleString();
    const shortHash = txHash ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}` : null;

    return (
        <li className="grid grid-cols-12 gap-3 items-center text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10">
            <div className="col-span-5 text-gray-300">{date}</div>

            <div className="col-span-4 flex items-center gap-2 justify-end">
                <span className="text-white font-semibold">{amount} TON</span>
                {usdAmount ? <span className="text-gray-400">(~${usdAmount})</span> : null}
            </div>

            <div className="col-span-2 flex justify-end">
                <StatusBadge status={status} />
            </div>

            <div className="col-span-1 flex justify-end">
                {shortHash ? (
                    <a
                        href={`https://tonviewer.com/transaction/${txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline text-blue-300 hover:text-blue-200"
                        title="Open in explorer"
                    >
                        {shortHash}
                    </a>
                ) : (
                    <span className="text-xs text-gray-500">—</span>
                )}
            </div>
        </li>
    );
};

const DepositHistoryModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    // берём готовые данные из стора
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
                        <DialogPanel className="lg:w-[calc((100%-15rem)*0.6)] w-full md:h-[60%] h-[70%] max-w-full bg-[#1e1e1e]/40 text-white rounded-t-3xl shadow-lg border-t border-[#2e2e2e]">
                            <div className="flex flex-col gap-6">
                                {/* Header */}
                                <div className="flex items-center justify-between pt-7 p-6 pb-0 rounded-t-3xl">
                                    <DialogTitle className="text-2xl text-gray-300 font-extrabold font-montserrat">
                                        DEPOSIT HISTORY
                                    </DialogTitle>
                                    <button onClick={onClose} aria-label="Close">
                                        <XMarkIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="w-full md:max-w-3xl max-w-[95%] mx-auto h-[75%] bg-gradient-to-br from-[#1c0740] to-[#af5505] rounded-2xl p-4">
                                    {/* Subheader */}
                                    <div className="flex items-center justify-between px-2 pb-2">
                                        <div className="text-gray-300/90 text-sm">Latest first</div>
                                        <div className="text-gray-300/60 text-xs">
                                            {depositHistory?.length ? `${depositHistory.length} records` : ""}
                                        </div>
                                    </div>

                                    {/* Content area */}
                                    <div className="h-[calc(100%-2rem)] overflow-y-auto pr-1 custom-scroll">
                                        {depositError ? (
                                            <div className="flex items-center justify-center h-full text-red-300">
                                                {depositError}
                                            </div>
                                        ) : !depositHistory || depositHistory.length === 0 ? (
                                            <div className="flex items-center justify-center h-full text-gray-200/80">
                                                История депозитов пуста
                                            </div>
                                        ) : (
                                            <ul className="space-y-2">
                                                {depositHistory.map((d) => (
                                                    <Row
                                                        key={d._id}
                                                        createdAt={d.createdAt}
                                                        amount={d.amount}
                                                        usdAmount={d.usdAmount}
                                                        status={d.status}
                                                        txHash={d.txHash}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DepositHistoryModal;
