import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext, UIContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

const useFriendAction = () => {
  const [loading, setLoading] = useState(false)
  const { userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)

  const acceptFriendRequest = async (request_id) => {
    let token = JSON.parse(localStorage.getItem('token'))

    try {
      setLoading(true)

      const { data } = await axios.get(
        `${url}/api/user/friend_request/${request_id}/accept`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setLoading(false)
      if (data) {
        userDispatch({
          type: 'ADD_FRIEND',
          payload: data.user,
        })
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: request_id,
        })

        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: data.message },
        })
      }
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            display: true,
            text: err.response.data.error,
          },
        })
      }
    }
  }

  const declineFriendRequest = async (request_id) => {
    let token = JSON.parse(localStorage.getItem('token'))

    try {
      setLoading(true)

      const { data } = await axios.get(
        `${url}/api/user/friend_request/${request_id}/decline`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setLoading(false)
      if (data) {
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: request_id,
        })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: data.message },
        })
      }
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            display: true,
            text: err.response.data.error,
          },
        })
      }
    }
  }

  const sendFriendRequest = async (user_id) => {
    let token = JSON.parse(localStorage.getItem('token'))

    try {
      setLoading(true)

      const { data } = await axios.get(
        `${url}/api/user/friend_request/${user_id}/send`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setLoading(false)
      if (data) {
        userDispatch({
          type: 'ADD_FRIENDS_REQUEST_SENDED',
          payload: data.friend,
        })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: data.message },
        })
      }
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            display: true,
            text: err.response.data.error,
          },
        })
      }
    }
  }

  const cancelFriendRequest = async (request_id) => {
    let token = JSON.parse(localStorage.token)
    try {
      const { data } = await axios.get(
        `${url}/api/user/friend_request/${request_id}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (data) {
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_SENDED',
          payload: request_id,
        })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: data.message },
        })
      }
    } catch (err) {
      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            display: true,
            text: err.response.data.error,
          },
        })
      }
    }
  }

  return {
    sendFriendRequest,
    declineFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    loading,
  }
}

export default useFriendAction
