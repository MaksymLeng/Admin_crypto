import { useMemo } from "react";
import {XP_PER_EURO} from "../data/XP_PER_EURO_toBackend.ts";

function getLevel(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
}

function getXpGoal(level: number): number {
    return Math.floor(Math.pow(level / 0.1, 2));
}

export const useLeveling = (depositSum: number | undefined) => {
    return useMemo(() => {
        const totalXp = (depositSum || 0) * XP_PER_EURO;
        const level = getLevel(totalXp);
        const xpGoal = getXpGoal(level + 1);
        const xpCurrentLevel = getXpGoal(level);
        const xpProgress = totalXp - xpCurrentLevel;
        const xpNeeded = xpGoal - xpCurrentLevel;
        const progressPercent = (xpProgress / xpNeeded) * 100;

        return {
            level,
            totalXp,
            xpGoal,
            xpProgress,
            progressPercent: Math.min(100, progressPercent),
        };
    }, [depositSum]);
};
