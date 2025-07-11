import type {Action} from "../Types/Types.tsx";

export const setShow = (id: number): Action<number> => {
   return {
       type: 'SET_SHOW',
       payload: id
   }
}

export const setRate = (rate: string): Action<string> => {
    return {
        type: 'SET_RATE',
        payload: rate
    }
}