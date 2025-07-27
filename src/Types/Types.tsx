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
};

export type UserType = {
    id: string;
    username: string;
    avatar?: string;
    depositSum: number;
    referralCount: number;
    Balance: number;
    Available: number;
    WithdrawalDate: string;
};

export type TelegramUser = {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
};
