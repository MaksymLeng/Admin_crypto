import type {Action, ModalState} from '../Types/Types'

const initialState:ModalState  = {
    showArr: [true, false],
    rates: ["LOW", "MEDIUM", "HIGH"],
    selectedRate: "LOW"
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_SHOW':
            let newShowArr = state.showArr;
            newShowArr[action.payload] = !newShowArr[action.payload];
            return {
                ...state,
                showArr: newShowArr,
            }
        case 'SET_RATE':
            return {
                ...state,
                selectedRate: action.payload,
            }
        default:
            return state;
    }
}

export default reducer
