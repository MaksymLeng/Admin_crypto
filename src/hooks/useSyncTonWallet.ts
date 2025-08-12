import { useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setWalletRaw, updateWallet } from "../store/userSlice";

export const useSyncTonWallet = () => {
    const dispatch = useAppDispatch();
    const wallet = useTonWallet();

    const raw = wallet?.account?.address ?? "";
    const { userData, telegramUser, walletFriendly } = useAppSelector(s => s.user);
    const { key } = useAppSelector(s => s.apiKey);
    const id = telegramUser?.id || Number(userData?.id);

    // держим сырой адрес в сторе
    useEffect(() => {
        dispatch(setWalletRaw(raw));
    }, [dispatch, raw]);

    // апдейт на бэке — один раз, когда адрес появился и пока нет дружелюбного
    useEffect(() => {
        if (!raw || !id || !key) return;
        if (!walletFriendly) {
            dispatch(updateWallet({ id, address: raw, apiKey: key }));
        }
    }, [dispatch, raw, id, key, walletFriendly]);
};
