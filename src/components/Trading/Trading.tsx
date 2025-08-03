import type {Trade} from "../../Types/Types.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchTrades} from "../../store/tradeSlice.ts";

const Trading = () => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.trades);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        dispatch(fetchTrades());
        const interval = setInterval(() => dispatch(fetchTrades()), 120_000);
        return () => clearInterval(interval);
    }, [dispatch]);


    const bestTrade = data.reduce(
        (max, t) => (t.rawAmount > max.rawAmount ? t : max),
        data[0] || { rawAmount: 0 }
    );


    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    return (
        <div className="relative md:h-[100%] h-screen w-full text-white md:px-4 py-16 rounded-2xl">
            {/* LIVE TRADES LABEL */}
            <div className="relative  bg-linear-150 from-[#340575] to-[#340575]/30 py-8 rounded-2xl">
                <h1 className="absolute lg:top-7 top-9 left-1/2 -translate-x-1/2 lg:text-6xl text-5xl tracking-wider font-extrabold text-white z-10 whitespace-nowrap text-shadow-lg italic opacity-80">
                    LIVE TRADES
                </h1>
            </div>

            {/* CONTENT WRAPPER */}
            <div className="flex flex-col gap-10 justify-center items-start w-full max-w-6xl mx-auto mt-20">
                <div className="absolute top-46 left-0 md:left-1/4 lg:left-46 xl:left-1/3 px-4 tracking-wide py-1 text-white font-bold text-3xl z-21">
                    RECENT TRADES
                </div>

                {/* RECENT TRADES LIST */}
                <div className="relative h-[400px] w-full lg:w-2/3 bg-[#510992]/70 rounded-xl mx-auto pt-10 lg:px-6 px-2 overflow-hidden">
                    <div
                        className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-20"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(20,0,50,1), rgba(20,0,50,0))",
                        }}
                    />

                    {/* Auto scroll on desktop, manual on mobile */}
                    <div
                        className={`${
                            isMobile
                                ? "overflow-y-auto max-h-[340px] pr-2"
                                : "absolute top-0 left-0 w-full animate-scroll"
                        }`}
                    >
                        <div>
                            <ul className="space-y-3">
                                {data.map((t, i) => (
                                    <TradeItem key={i} trade={t} />
                                ))}
                            </ul>
                        </div>

                        {!isMobile && (
                            <div>
                                <ul className="space-y-3">
                                    {data.map((t, i) => (
                                        <TradeItem key={`dup-${i}`} trade={t} />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>



                {/* BEST TRADE */}
                <div className="bg-[#30056f]/80 rounded-xl lg:px-6 px-2 py-6 w-full lg:w-2/3 mx-auto relative">
                    <div className="absolute bottom-14 italic left-3 tracking-wide py-1 text-white font-bold text-2xl z-21 uppercase">
                        Best Trade 24H
                    </div>
                    {!loading && (
                        <div className="flex justify-between text-lg">
                            <div className="flex lg:gap-4 gap-1">
                                <span className="text-xl">{bestTrade.coin}</span>
                                <span className="text-green-400 text-lg">{bestTrade.change}</span>
                                <span className="flex gap-2 text-lg">
                                            CM
                                           <span className="text-green-400 text-lg">
                                               {bestTrade.cm}
                                           </span>
                                        </span>
                            </div>
                            <span className="text-green-400 text-xl">{bestTrade.amount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TradeItem = ({ trade }: { trade: Trade }) => {
    return (
        <li className="flex justify-between text-sm pb-1 lg:px-5 px-2 items-center text-center">
            <div className="flex lg:gap-4 gap-1 items-center text-center">
                <span className="text-xl">{trade.coin}</span>
                <span className="text-green-400 text-lg">{trade.change}</span>
                <span className="flex gap-2 text-lg">
          CM
          <span className="text-green-400 text-lg">{trade.cm}</span>
        </span>
            </div>
            <span className="text-green-400 text-xl">{trade.amount}</span>
        </li>
    );
};

export default Trading;
