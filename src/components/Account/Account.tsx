import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {onClickShow} from "../HelperFunction/onClickShow.ts";
import {ArrowUpIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import AccountHeader from "../AccountHeader/AccountHeader";
import {useEffect} from "react";
import {updateWallet} from "../../store/userSlice.ts";

const Account = () => {
    const {userData , telegramUser, walletFriendly } = useAppSelector((state) => state.user);

    const { key } = useAppSelector((state) => state.apiKey);
    const dispatch = useAppDispatch();


    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const raw  = wallet?.account?.address;
    const id = telegramUser?.id || Number(userData?.id);


    const handleDepositClick = () => {
        if (!raw) {
            tonConnectUI.openModal();
            return;
        }
        onClickShow(1, dispatch);
    };

    useEffect(() => {
        if (raw  && id && walletFriendly === '') {
            dispatch(updateWallet({
                id: id,
                address: raw,
                apiKey: key
            }));
        }
    }, [dispatch, raw, id, walletFriendly, key]);

    return (
        <>
            <div className="flex items-center justify-center">
                <AccountHeader className="top-6 lg:top-10" />
            </div>
            <div className="flex flex-col mt-20 lg:mt-40 items-center h-[55%]">
                <div className="relative bg-black/30 rounded-2xl flex justify-center h-[30%] px-3 lg:w-[60%] w-[100%] shadow-md text-white flex flex-col justify-between">
                    <h2 className="absolute -top-7 left-1/2 lg:-left-0 lg:-right-0 -translate-x-1/2 lg:-translate-0 text-3xl lg:text-5xl opacity-80 font-extrabold text-center italic mb-6 tracking-wider whitespace-nowrap">
                        DEPOSIT WITHDRAW
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className='bg-white px-1 py-4 font-bold rounded-md cursor-pointer hover:shadow-lg' onClick={handleDepositClick}>
                            <div className="w-full flex justify-center items-center gap-1 pointer-events-none">
                                <div className='text-black '>DEPOSIT</div>
                                <PlusIcon className='w-6 h-6 cursor-pointer text-[#1c0740]'></PlusIcon>
                            </div>
                        </button>
                        <button className="bg-white/20 text-white px-1 py-4 font-bold rounded-md cursor-pointer hover:shadow-lg" onClick={() => onClickShow(2, dispatch)} disabled={!raw}>
                            <div className="w-full flex justify-center items-center gap-1 pointer-events-none">
                                <div className="opacity-80">WITHDRAW</div>
                                <ArrowUpIcon className="w-6 h-6 text-white cursor-pointer"></ArrowUpIcon>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Account