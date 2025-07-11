import {User} from "../../data/User.ts";

const Account = () => {
    return (
        <>
            <div className="flex items-center justify-center">
                <h1 className="text-5xl font-bold italic text-transparent bg-clip-text bg-gradient-to-br pt-20 from-pink-700 to-purple-800">
                    Hello {User.id}
                </h1>
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