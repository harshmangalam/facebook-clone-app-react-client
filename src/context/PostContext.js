export const initialPostState = {
  posts: [],
  post: {},
}

export const PostReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }

    case 'SET_CURRENT_POST':
      return {
        ...state,
        post: action.payload,
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }

    case 'LIKE_UNLIKE_POST':
      
      let l_postIndex = state.posts.findIndex(
        (post) => post.id == action.payload.id,
      )
      state.posts[l_postIndex] = action.payload
      if (state.post.id == action.payload.id) {
        state.post = action.payload
      }

      return {
        ...state,
      }

    case 'SET_POST_COMMENTS':
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
      }
    case 'ADD_POST_COMMENT':
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      }

    case 'LIKE_UNLIKE_COMMENT':
      let index1 = state.post.comments.findIndex(
        (comment) => comment.id == action.payload.id,
      )
      state.post.comments[index1] = action.payload

      return {
        ...state,
      }

    default:
      throw new Error(`action type ${action.type} is undefined`)
  }
}
