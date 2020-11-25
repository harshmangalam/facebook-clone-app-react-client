import React, { useContext, useState } from 'react'
import { UIContext, UserContext } from '../App'
import axios from 'axios'
const url = process.env.REACT_APP_ENDPOINT

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false)
  const { userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)

  let token = JSON.parse(localStorage.getItem('token'))

  const editName = async (name) => {
    setLoading(true)
    try {
      const { data } = await axios.put(
        `${url}/api/user/update_profile/name`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setLoading(false)

      userDispatch({
        type: 'UPDATE_PROFILE',
        payload: { label: 'name', value: name },
      })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }

  const editEmail = async (email) => {
    setLoading(true)

    try {
      const { data } = await axios.put(
        `${url}/api/user/update_profile/email`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)

      userDispatch({
        type: 'UPDATE_PROFILE',
        payload: { label: 'email', value: email },
      })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }

  const editBio = async (bio) => {
    setLoading(true)

    try {
      const { data } = await axios.put(
        `${url}/api/user/update_profile/bio`,
        { bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)

      userDispatch({
        type: 'UPDATE_PROFILE',
        payload: { label: 'bio', value: bio },
      })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }

  const editLocation = async (location) => {
    setLoading(true)

    try {
      const { data } = await axios.put(
        `${url}/api/user/update_profile/location`,
        { location },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)

      userDispatch({
        type: 'UPDATE_PROFILE',
        payload: { label: 'location', value: location },
      })

      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }
  const editEducation = async (education) => {
    setLoading(true)

    try {
      const { data } = await axios.put(
        `${url}/api/user/update_profile/education`,
        { education },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)

      userDispatch({
        type: 'UPDATE_PROFILE',
        payload: { label: 'education', value: education },
      })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }

  const updatePassword = async ({ newPassword, currentPassword }) => {
    setLoading(true)

    try {
      const { data } = await axios.put(
        `${url}/api/auth/update_password`,
        { newPassword, currentPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            display: true,
            text: err.response.data.error,
            color: 'error',
          },
        })
      }
    }
  }

  const clearNotification = async () => {
    setLoading(true)

    try {
      const { data } = await axios.delete(
        `${url}/api/user/notifications/clear`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setLoading(false)
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { display: true, text: data.message, color: 'success' },
      })

      uiDispatch({ type: "SET_NOTIFICATIONS", payload: [] })
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            display: true,
            text: err.response.data.error,
            color: 'error',
          },
        })
      }
    }
  }

  return {
    editName,
    editEmail,
    editBio,
    editLocation,
    editEducation,
    updatePassword,
    clearNotification,
    loading,
  }
}

export default useUpdateProfile
