import { Eye } from "lucide-react";
import Logo from '../../assets/N.svg'

const DepositMenu = () => {
    return (
        <div className="flex lg:flex-row flex-col gap-20 lg:gap-6 min-h-screen items-center justify-center px-4 pt-30 lg:px-0 lg:pt-0">
            {/* Левая карточка */}
            <div className="relative bg-black/30 rounded-xl p-6 lg:w-[40%] w-[90%] shadow-md text-white flex flex-col justify-between">
                {/* Верхняя карточка с ID */}
                <div className=" absolute -top-12 inset-x-6 bg-linear-130 from-[#af5505] to-[#1c0740] rounded-xl p-4 mb-6 text-white">
                    <div className="flex flex-col gap-3">
                        <div className="flex text-left lg:text-center justify-between">
                            <div className="flex gap-3">
                                <img src={Logo} alt="Logo" className="w-6 h-6"/>
                                <div className="leading-none text-left font-light opacity-50 uppercase text-sm">
                                    Personal Crypto<br />
                                    Banking System
                                </div>
                            </div>
                            <Eye/>
                        </div>
                        <div className="flex mx-auto gap-10 xl:gap-15">
                            <div className="text-2xl font-light opacity-70">ID:</div>
                            <div className="text-2xl font-bold">0021 3157</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 py-15 text-lg font-semibold">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">BALANCE:</span>
                        <span className="text-3xl">0$</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-light opacity-50">AVAILABLE:</span>
                        <span className="text-3xl">0$</span>
                    </div>
                    <div className="flex justify-between text-md font-light items-end">
                        <span className="text-left opacity-50">WITHDRAWAL<br/>DATE:</span>
                        <span className=" font-bold text-white text-lg">27/12/2024</span>
                    </div>
                </div>

                <button className=" bg-white/20 text-white font-bold py-5 rounded-md cursor-pointer hover:shadow-lg">
                    <span className="opacity-80">DEPOSIT/WITHDRAW</span>
                </button>
            </div>

            {/* Правая часть */}
            <div className="relative bg-black/30 rounded-2xl py-6 lg:px-5 px-3 lg:w-[60%] w-[100%] shadow-md text-white flex flex-col justify-between">
                <h2 className="absolute font-montserrat -top-7 left-1/2 lg:-left-0 -translate-x-1/2 lg:-translate-0 text-3xl lg:text-4xl opacity-80 font-extrabold text-center italic mb-6 tracking-wider">
                    DEPOSIT/WITHDRAW
                </h2>

                <div className="text-sm space-y-5 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">OWNER ID:</span>
                        <span className="font-bold text-xl lg:text-3xl px-4">0021 3157</span>
                    </div>

                    <div className="flex justify-between items-center opacity-60">
                        <div className="font-light
                         text-left text-lg leading-none">DEPOSIT<br/>ADDRESS:</div>
                        <div className="break-all text-right">
                            0x86C399b68B73dEbBf3f7<br/>B491755144461A9b9151
                        </div>
                    </div>

                    <div className="flex justify-between items-center opacity-60 ">
                        <div className="font-light leading-none text-lg text-left">WITHDRAWAL<br/>ADDRESS:</div>
                        <div className="break-all text-right">
                            0x87D3a489bADCcC15f59B<br/>F055632DC63da7B07823
                        </div>
                    </div>

                    <div className="flex justify-between items-center opacity-60 py-5">
                        <span className="font-light text-xl leading-none">TRANSACTION RATE:<br/> (DEFAULT)</span>
                        <span className="uppercase text-xl font-light">
                            LOW
                            <span className="text-sm"> ▼</span>
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-bold text-xl">RECOVERY PHRASE:</span>
                        <span className="text-xl">
                            <Eye/>
                        </span>
                    </div>
                </div>

                <button className="mt-5 bg-linear-100 from-[#79362e] via-[#7a3433] to-[#52232d] text-white font-bold py-3 rounded-xl cursor-pointer hover:shadow-lg">
                    <span className="opacity-80">EXTRA SETTINGS</span>

                </button>
            </div>
        </div>
    )
}

export default DepositMenu