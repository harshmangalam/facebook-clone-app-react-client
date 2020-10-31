import axios from 'axios'
const url = process.env.REACT_APP_ENDPOINT

export const fetchAllPosts = async () => {
  let token = JSON.parse(localStorage.token)

  try {
    const response = await axios.get(`${url}/api/post/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data) {
      return {
        data: response.data,
      }
    }
  } catch (err) {
    console.log(err)
  }
}

// export const fetchPostById = async (post_id) => {
//   let token = JSON.parse(localStorage.token)

//   try {
//     const response = await axios.get(`${url}/api/post/${post_id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (response.data) {
//       return {
//         data: response.data,
//       }
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

export const likeDislikePost = async (post_id) => {
  let token = JSON.parse(localStorage.token)

  try {
    const response = await axios.get(
      `${url}/api/post/${post_id}/like_dislike`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.data) {
      return {
        data: response.data,
      }
    }
  } catch (err) {
    console.log(err)
    if (err && err.response) {
      return {
        status: err.response.status,
        error: err.response.data.error,
      }
    }
  }
}

export const likeDislikeComment = async (comment_id) => {
  try {
    let token = JSON.parse(localStorage.token)
    const response = await axios.get(
      `${url}/api/post/comment/${comment_id}/like_dislike`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.data) {
      return {
        data: response.data,
      }
    }
  } catch (err) {
    console.log(err)
  }
}
