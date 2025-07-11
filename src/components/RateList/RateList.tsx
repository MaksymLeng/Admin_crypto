import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {Action, RootState} from "../../Types/Types.tsx";
import type {Dispatch} from "redux";
import {setRate} from "../../actions";

export const TransactionRateDropdown = () => {
    const {rates,selectedRate} = useSelector((state: RootState) => state);
    const dispatch = useDispatch<Dispatch<Action>>();


    return (
        <div className="relative w-fit">
            <Listbox value={selectedRate} onChange={(value) => dispatch(setRate(value))}>
                <ListboxButton className="uppercase text-xl font-light flex items-center gap-2 text-white">
                    {selectedRate}
                    <ChevronDown size={16} />
                </ListboxButton>
                <ListboxOptions className="absolute mt-2 w-full bg-black/80 text-white rounded-md shadow-lg text-sm z-50">
                    {rates.map((rate) => (
                        <ListboxOption
                            key={rate}
                            value={rate}
                            className={({ active }) =>
                                `cursor-pointer px-4 w-full py-2 ${active ? "bg-white/10" : ""}`
                            }
                        >
                            {rate}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};
