import { z } from 'zod';
import {depositSchema} from "../components/DepositModal/DepositModal.tsx";

export type Trade = {
    coin: string;
    change: string;
    cm: string;
    amount: string;
    rawAmount: number;
};

export type ModalState = {
    showArr: boolean[],
};

export type LevelInfo = {
    level: number;
    xp: number;
    xpGoal: number;
    locked: boolean;
};

export type UserType = {
    id: string;
    username: string;
    depositSum: number;
    referralCount: number;
    Balance: number;
    deposits: string[];
    levelInfo: LevelInfo;
};

export type UpgradeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type DepositValues = z.infer<typeof depositSchema>;
