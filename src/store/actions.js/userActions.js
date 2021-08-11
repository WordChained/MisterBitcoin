import { userService } from "../../services/userService"

export function spendBalance(spendAmount) {
    return (dispatch, getState) => {
        const { loggedinUser } = getState().userModule
        console.log(loggedinUser);
        if (loggedinUser.coins < spendAmount) alert(`We're sorry ${loggedinUser.name}, you don't have enough funds`)
        dispatch({ type: 'SPEND_BALANCE', spendAmount })
    }
}
export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log(err);
        }
    }
}
export function setUser() {
    return (dispatch) => {
        const loggedinUser = userService.getUser()
        dispatch({ type: 'SET_USER', loggedinUser })
    }
}
export function login(user) {
    return (dispatch) => {
        const loggedinUser = userService.login(user)
        if (!loggedinUser) return
        dispatch({ type: 'SET_USER', loggedinUser })
    }
}
export function signup(user) {
    return (dispatch) => {
        const users = userService.signup(user)
        dispatch({ type: 'ADD_USER', users })
    }
}
export function addMove(contact, amount) {
    return (dispatch) => {
        const moves = userService.addMove(contact, amount)
        console.log(moves);
        dispatch({ type: 'ADD_MOVE', moves })
    }
}