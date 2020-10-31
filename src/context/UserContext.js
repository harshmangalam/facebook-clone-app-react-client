import { filterArray } from '../utils/FilterArray'

export const initialUserState = {
  currentUser: null,
  users: [],
  socketio: null,
  sendedFriendRequests: [],
  receivedFriendRequests: [],
  isLoggedIn: false,
  recentAccounts: [],
  selectedUserProfile: null,
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'RECENT_ACCOUNTS':
      const accounts = filterArray(action.payload)
      return {
        ...state,
        recentAccounts: accounts,
      }

    case 'ADD_RECENT_ACCOUNT':
      let account = state.recentAccounts.find(
        (account) => account.id == action.payload.id,
      )
      if (account) {
        return {
          ...state,
          recentAccounts: [...state.recentAccounts],
        }
      } else {
        let accounts = []
        accounts = localStorage.accounts
          ? JSON.parse(localStorage.accounts)
          : []
        accounts.push(action.payload)
        localStorage.setItem('accounts', JSON.stringify(accounts))

        return {
          ...state,
          recentAccounts: [action.payload, ...state.recentAccounts],
        }
      }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.label]: action.payload.value,
        },
      }

    case 'REMOVE_ACCOUNT':
      let accountArray = state.recentAccounts.filter(
        (account) => account.id != action.payload,
      )
      let accountsData = []
      accountsData = localStorage.accounts
        ? JSON.parse(localStorage.accounts)
        : []
      accountsData = accountsData.filter((acc) => acc.id != action.payload)
      localStorage.setItem('accounts', JSON.stringify(accountsData))
      return {
        ...state,
        recentAccounts: accountArray,
      }

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
      }

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    case 'ADD_USER':
      let index_io1 = state.users.findIndex(
        (user) => user.id == action.payload.id,
      )

      if (index_io1 === -1) {
        return {
          ...state,
          users: [action.payload, ...state.users],
        }
      } else {
        return {
          ...state,
        }
      }

    case 'UPDATE_USER':
      let i_01 = state.users.findIndex((user) => user.id == action.payload.id)
      if (i_01 !== -1) {
        state.users[i_01] = action.payload
      }
      return {
        ...state,
        currentUser: action.payload,
      }

    case 'REMOVE_USER':
      let f_users = state.users.filter((user) => user.id != action.payload)
      return {
        ...state,
        users: f_users,
      }

    case 'LOGOUT_USER':
      if (localStorage.token) {
        localStorage.removeItem('token')
      }
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        users: [],
        sendedFriendRequests: [],
        receivedFriendRequests: [],

        selectedUserProfile: null,
      }

    case 'FRIEND_LOGOUT':
      let id1_friend = state.currentUser.friends.findIndex(
        (user) => user.id == action.payload,
      )
      if (id1_friend !== -1) {
        state.currentUser.friends[id1_friend].active = false
      }
      return {
        ...state,
      }

    case 'FRIEND_LOGIN':
      let id2_friend = state.currentUser.friends.findIndex(
        (user) => user.id == action.payload,
      )
      if (id2_friend !== -1) {
        state.currentUser.friends[id2_friend].active = true
      }
      return {
        ...state,
      }
    case 'SET_FRIENDS_REQUEST_SENDED':
      return {
        ...state,
        sendedFriendRequests: action.payload,
      }

    case 'ADD_FRIENDS_REQUEST_SENDED':
      return {
        ...state,
        sendedFriendRequests: [action.payload, ...state.sendedFriendRequests],
      }
    case 'REMOVE_FRIENDS_REQUEST_SENDED':
      let rvs_f_filtered = state.sendedFriendRequests.filter(
        (r) => r.id !== action.payload,
      )
      return {
        ...state,
        sendedFriendRequests: rvs_f_filtered,
      }

    case 'SET_FRIENDS_REQUEST_RECEIVED':
      return {
        ...state,
        receivedFriendRequests: action.payload,
      }
    case 'ADD_FRIENDS_REQUEST_RECEIVED':
      return {
        ...state,
        receivedFriendRequests: [
          action.payload,
          ...state.receivedFriendRequests,
        ],
      }

    case 'REMOVE_FRIENDS_REQUEST_RECEIVED':
      let rv_f_filtered = state.receivedFriendRequests.filter(
        (r) => r.id != action.payload,
      )
      return {
        ...state,
        receivedFriendRequests: rv_f_filtered,
      }

    case 'ADD_FRIEND':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [action.payload, ...state.currentUser.friends],
        },
      }

    case 'ADD_SELECTED_USER_PROFILE':
      return {
        ...state,
        selectedUserProfile: action.payload,
      }

    case 'REMOVE_SELECTED_USER_PROFILE':
      return {
        ...state,
        selectedUserProfile: null,
      }

    case 'SET_SOCKETIO':
      return {
        ...state,
        socketio: action.payload,
      }

    default:
      throw new Error(`action type ${action.type} is undefined`)
  }
}
