import type {AppDispatch} from "../../store";
import { setShow } from "../../store/modalSlice";

export const onClickShow = (id: number, dispatch: AppDispatch) => {
    dispatch(setShow(id));
};
