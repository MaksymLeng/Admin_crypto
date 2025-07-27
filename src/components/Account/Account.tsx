import {User} from "../../data/User.ts";
import {useLeveling} from "../../hooks/useLeveling.ts";
import { Star, Medal, Trophy } from "lucide-react";
import { type JSX } from "react";


export const getLevelIcon = (level: number): JSX.Element => {
    if (level <= 2) return <Star size={20} className="text-yellow-400 mx-auto w-4 h-4" />;
    if (level <= 5) return <Medal size={20} className="text-orange-500 mx-auto w-4 h-4" />;
    return <Trophy size={20} className="text-purple-600 mx-auto w-4 h-4" />;
};

const Account = () => {
    const { level, totalXp, progressPercent, xpGoal} = useLeveling(User.depositSum);

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 ">
                    {/* Аватарка и ник */}
                    <div className="relative flex flex-col items-center mt-25">
                        <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {User?.name[0].toUpperCase()}
                        </div>
                        <div className="absolute top-11 -right-0 bg-[#d2a679] text-white px-1 py-1 text-xs rounded-full font-bold border-2 border-black">
                            {getLevelIcon(level)}
                        </div>
                        <h2 className="text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-purple-600">{User?.name}</h2>
                    </div>

                    {/* Прогрессбар */}
                    <div className=" relative w-[250px] bg-gray-800 rounded-full h-8 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-300 h-full"
                            style={{ width: `${progressPercent}%` }}
                        >
                        </div>
                        <span className="absolute inset-0 text-white text-lg flex items-center justify-center font-bold">
                            {totalXp} / {xpGoal} XP
                        </span>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-13 -right-40 bg-[#d2a679] text-white p-2 text-xs rounded-full font-bold border-2 border-gray-800">
                            {getLevelIcon(level)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-20 items-center h-[60%]">
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