import { useAppDispatch, useAppSelector } from "../../store/hooks";
import UpgradeModal from "../UpgradeModal/UpgradeModal";
import { onClickShow } from "../HelperFunction/onClickShow";
import { getLevelIcon } from "../HelperFunction/getLevelIcon";
import { levelName } from "../../data/variables";
import React from "react";
import type {accountHeaderProps} from "../../Types/Types.tsx";

const AccountHeader: React.FC<accountHeaderProps> = ({ className = "" }) => {
    const dispatch = useAppDispatch();
    const { userData, telegramUser, loading } = useAppSelector((state) => state.user);
    const showArr= useAppSelector((state) => state.modal.showArr);

    const { level, xp = 0, xpGoal = 1, locked = false } = userData?.levelInfo || {};
    const progressPercent = Math.min((xp / xpGoal) * 100, 100);

    const WelcomeNewbie = () => (
        <div className="bg-black/20 rounded-md px-4 py-3 text-white text-center text-lg font-light tracking-wide">
            Welcome, Newbie!<br />
            Make your first deposit to unlock XP, rewards and ranking.
        </div>
    );

    const BtnUpgrade = ({ onClick }: { onClick: () => void }) => (
        <button
            onClick={onClick}
            className="absolute inset-0 text-white text-lg font-bold rounded-md cursor-pointer"
        >
            Upgrade Level
        </button>
    );

    const XpGoalPercent = ({ xp, xpGoal }: { xp: number; xpGoal: number }) => (
        <span className="absolute inset-0 text-white text-lg flex items-center justify-center font-bold">
    {xp} / {xpGoal} XP
  </span>
    );

    const LoadingText = () => (
        <div className="bg-black/20 rounded-md px-4 py-3 text-white text-center text-lg font-light tracking-wide">
            Loading...
        </div>
    );

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="flex flex-col items-center gap-4 ">
                <UpgradeModal isOpen={showArr[3]} onClose={() => onClickShow(3, dispatch)} />
                <div className="relative flex flex-col items-center mt-25">
                    <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative">
                        <div className="absolute top-10 -right-3 bg-[#d2a679] text-white px-1 py-1 text-xs rounded-full font-bold border-2 border-black">
                            {level ? getLevelIcon(level) : null}
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
                {loading || level === undefined
                    ? <LoadingText />
                    : level === 0 ? <WelcomeNewbie />
                        : (
                            <>
                                <div className="relative w-[250px] bg-gray-800 rounded-full h-8 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-300 h-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                    {progressPercent >= 100 && locked
                                        ? <BtnUpgrade onClick={() => onClickShow(3, dispatch)} />
                                        : <XpGoalPercent xp={xp} xpGoal={xpGoal} />
                                    }
                                </div>
                                <div className="relative">
                                    <div className="absolute -top-13 -right-40 bg-[#d2a679] text-white p-2 text-xs rounded-full font-bold border-2 border-gray-800">
                                        {getLevelIcon(level)}
                                    </div>
                                </div>
                                <h2 className="text-2xl -mt-3 font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-blue-600">
                                    {levelName[level]}
                                </h2>
                            </>
                        )}
            </div>
        </div>
    );
};

export default AccountHeader;
