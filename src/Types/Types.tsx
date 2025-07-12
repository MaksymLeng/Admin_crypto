import store from "../store";

export type RootState = ReturnType<typeof store.getState>;

export type Trade = {
    coin: string;
    change: string;
    cm: string;
    amount: string;
};

export type Action<T = any> = {
    type: string;
    payload?: T;
}

export type ModalState = {
    showArr: boolean[],
    rates: string[],
    selectedRate: string,
    showRecovery: boolean,
};

export type UserType = {
    id: string;
    name: string;
    avatar?: string;
    xp: number;
    xpGoal: number;
    level: number;
    referralCount: number;
    Balance: number;
    Available: number;
    DepositAddress: string;
    WithdrawalAddress: string;
    WithdrawalDate: string;
    RecoveryPhrase: string[];
};
