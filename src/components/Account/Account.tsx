import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {levelName} from "../../data/variables.ts";
import UpgradeModal from "../UpgradeModal/UpgradeModal";
import {setShow} from "../../store/modalSlice.ts";
import {onClickShow} from "../HelperFunction/onClickShow.ts";
import {getLevelIcon} from "../HelperFunction/getLevelIcon.tsx";

const Account = () => {
    const {userData , telegramUser} = useAppSelector((state) => state.user);

    const { level = 0, xp = 0, xpGoal = 1, locked = false } = userData?.levelInfo || {};

    const showArr = useAppSelector((state) => state.modal.showArr);
    const dispatch = useAppDispatch();

    const progressPercent = Math.min((xp / xpGoal) * 100, 100);

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 ">
                    <UpgradeModal isOpen={showArr[3]} onClose={() => onClickShow(3, dispatch)} />
                    <div className="relative flex flex-col items-center mt-25">
                        <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative">
                            <div className="absolute top-10 -right-3 bg-[#d2a679] text-white px-1 py-1 text-xs rounded-full font-bold border-2 border-black">
                                {getLevelIcon(level)}
                            </div>
                            {telegramUser?.username
                                ? telegramUser.username[0].toUpperCase()
                                : "?"}
                        </div>
                        <h2 className="text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-purple-600">
                            {telegramUser ?
                                telegramUser.username
                            :'????'}
                        </h2>
                    </div>
                    {level === 0 ? (
                        <div className="bg-black/20 rounded-md px-4 py-3 text-white text-center text-lg font-light tracking-wide">
                            Welcome, Newbie!<br />
                            Make your first deposit to unlock XP, rewards and ranking.
                        </div>
                    ) : (
                        <>
                        <div className="relative w-[250px] bg-gray-800 rounded-full h-8 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-300 h-full"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                            {progressPercent >= 100 && locked ? (
                                <button
                                    onClick={() => dispatch(setShow(3))}
                                    className="absolute inset-0 text-white text-lg font-bold rounded-md cursor-pointer"
                                >
                                    Upgrade Level
                                </button>
                            ):
                                (<span className="absolute inset-0 text-white text-lg flex items-center justify-center font-bold">
                                    {xp} / {xpGoal} XP
                                </span>)
                            }
                        </div>
                        <div className="relative">
                            <div className="absolute -top-13 -right-40 bg-[#d2a679] text-white p-2 text-xs rounded-full font-bold border-2 border-gray-800">
                                {getLevelIcon(level)}
                            </div>
                        </div>
                        </>
                    )}

                    <h2 className="text-2xl -mt-3 font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-blue-600">
                        {levelName[level]}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col mt-15 items-center h-[55%]">
                <div className="relative bg-black/30 rounded-2xl py-6 h-[90%] lg:px-5 px-3 lg:w-[60%] w-[100%] shadow-md text-white flex flex-col justify-between">
                    <h2 className="absolute -top-7 left-1/2 lg:-left-0 lg:-right-0 -translate-x-1/2 lg:-translate-0 text-3xl lg:text-5xl opacity-80 font-extrabold text-center italic mb-6 tracking-wider whitespace-nowrap">
                        DEPOSIT HISTORY
                    </h2>
                </div>
            </div>
        </>

    );
};

export default Account