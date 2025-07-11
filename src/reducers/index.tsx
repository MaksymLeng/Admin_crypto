import type {Action, ModalState} from '../Types/Types'

const initialState:ModalState  = {
    showArr: [true, false, false],
    rates: ["LOW", "MEDIUM", "HIGH"],
    selectedRate: "LOW",
    showRecovery: false
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
        case 'SET_RECOVERY':
            return {
                ...state,
                showRecovery: !state.showRecovery,
            }
        default:
            return state;
    }
}

export default reducer
