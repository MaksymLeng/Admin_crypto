import {User} from "../../data/User.ts";

const Account = () => {
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
                            🪙
                        </div>
                        <h2 className="text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-br from-pink-700 to-purple-800" bg-gradient-to-br from-pink-700 to-purple-800>{User?.name}</h2>
                    </div>

                    {/* Прогрессбар */}
                    <div className="w-[250px] bg-gray-800 rounded-full h-8 overflow-hidden relative">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-300 h-full"
                            style={{ width: `${(User.xp / User.xpGoal) * 1000}%` }}
                        ></div>
                        <span className="absolute inset-0 text-white text-lg flex items-center justify-center font-bold">
                            XP: {User.xp} / {User.xpGoal}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="relative bg-black/30 rounded-2xl py-6 h-[60%] lg:px-5 px-3 lg:w-[60%] w-[100%] shadow-md text-white flex flex-col justify-between">
                    <h2 className="absolute font-montserrat -top-7 left-1/2 lg:-left-0 lg:-right-0 -translate-x-1/2 lg:-translate-0 text-3xl lg:text-5xl opacity-80 font-extrabold text-center italic mb-6 tracking-wider">
                        DEPOSIT HISTORY
                    </h2>
                </div>
            </div>
        </>

    );
};

export default Account