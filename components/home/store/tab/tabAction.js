export const SET_SELECTED_TAB = 'SET_SELECTED_TAB'

export const setSelectedTabSuccess = (selectedtab) => ({
    type: SET_SELECTED_TAB,
    payload: { selectedtab }
})

export function setSelectedTab(selectedtab) {
    return dispatch => {
        dispatch(setSelectedTabSuccess(selectedtab))
    }
}