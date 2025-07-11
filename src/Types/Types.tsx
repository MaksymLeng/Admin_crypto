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
    showArr: boolean[];
};

export type UserType = {
    id: string;
    Balance: number;
    Available: number;
    DepositAddress: string;
    WithdrawalAddress: string;
    WithdrawalDate: string; // можно заменить на Date, если парсишь дату
    RecoveryPhrase: string[];
};
