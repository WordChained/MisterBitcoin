import { userService } from "../../services/userService"


const INITIAL_STATE = {
  users: [],
  loggedinUser: userService.getLoggedinUser()
}
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users
      }
    //login
    case 'SET_USER':
      return {
        ...state,
        loggedinUser: {
          name: action.loggedinUser.name,
          coins: action.loggedinUser.coins,
          moves: action.loggedinUser.moves
        }
      }
    //signup
    case 'ADD_USER':
      return {
        ...state,
        loggedinUser: action.loggedinUser,
        users: [...state.users, action.user]
      }
    case 'SPEND_BALANCE':
      return {
        ...state,
        loggedinUser: {
          ...state.loggedinUser,
          coins: state.loggedinUser.coins - action.spendAmount
        }
      }
    case 'ADD_MOVE':
      return {
        ...state,
        loggedinUser: {
          ...state.loggedinUser,
          moves: [...state.loggedinUser.moves, action.moves]
        }
      }
    default:
      return state
  }
}