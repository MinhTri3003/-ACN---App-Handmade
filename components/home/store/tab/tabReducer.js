import * as tabActionTypes from './tabAction'

const initialState = {
    selectedTab: ""
}

export const tabReducer = (state = initialState, action) => {
    switch (action.type) {
        case tabActionTypes.SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload.selectedTab
            }
        default:
            return state
    }
}