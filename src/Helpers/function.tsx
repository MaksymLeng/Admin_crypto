import type {JSX} from "react";

export const splitInHalf = (text: string): JSX.Element => {
    const mid = Math.floor(text.length / 2);
    return (
        <>
            {text.slice(0, mid)}<br />
            {text.slice(mid)}
        </>
    );
};
