import { Star, Medal, Trophy } from "lucide-react";
import type {JSX} from "react";

export const getLevelIcon = (level: number): JSX.Element => {
    if (level <= 1) return <Star size={20} className="text-yellow-400 mx-auto w-4 h-4" />;
    if (level <= 3) return <Medal size={20} className="text-orange-500 mx-auto w-4 h-4" />;
    if (level <= 5) return <Trophy size={20} className="text-orange-600 mx-auto w-4 h-4" />;
    if (level <= 7) return <Trophy size={20} className="text-gray-600 mx-auto w-4 h-4" />;
    return <Trophy size={20} className="text-yellow-300 mx-auto w-4 h-4" />;
};
