export const initialUIState = {
  mdScreen: false,
  drawer: false,
  navDrawerMenu: false,
  postModel: false,
  message: null,
  notifications: [],
  loading: false,
  darkMode: false,
}

export const UIReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_SCREEN':
      return {
        ...state,
        mdScreen: action.payload,
      }

    case 'SET_DRAWER':
      return {
        ...state,
        drawer: action.payload,
      }

    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      }
    case 'SET_NAV_MENU':
      return {
        ...state,
        navDrawerMenu: action.payload,
      }

    case 'SET_POST_MODEL':
      return {
        ...state,
        postModel: action.payload,
      }

    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      }

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.payload,
      }

    default:
      throw new Error(`action type ${action.type} is undefined`)
  }
}
