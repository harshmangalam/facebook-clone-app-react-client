import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext, UIContext } from '../App'
import { storage } from '../firebase/firebase'
const url = process.env.REACT_APP_ENDPOINT

const useUpdateProfilePic = ({ profile_pic, cover_pic, history }) => {
  const [loading, setLoading] = useState(false)

  const { userState, userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)

  const updateProfilePic = () => {
    let filename = `profile_pic/${userState.currentUser.name}-${Date.now()}-${
      profile_pic.name
    }`
    const uploadTask = storage.ref(`images/${filename}`).put(profile_pic)
    uploadTask.on(
      'state_changed',
      () => {
        setLoading(true)
      },
      (err) => {
        console.log('error from firebase')
        setLoading(false)
      },
      () => {
        storage
          .ref('images')
          .child(filename)
          .getDownloadURL()
          .then((uri) => {
            saveProfilePic(uri)
          })
      },
    )
  }

  const updateCoverPic = () => {
    let filename = `cover_pic/${userState.currentUser.name}-${Date.now()}-${
      cover_pic.name
    }`
    const uploadTask = storage.ref(`images/${filename}`).put(cover_pic)
    uploadTask.on(
      'state_changed',
      () => {
        setLoading(true)
      },
      (err) => {
        console.log('error from firebase')
        setLoading(false)
      },
      () => {
        storage
          .ref('images')
          .child(filename)
          .getDownloadURL()
          .then((uri) => {
            saveCoverImage(uri)
          })
      },
    )
  }

  const saveProfilePic = async (profile_url) => {
    setLoading(true)
    try {
      let token = JSON.parse(localStorage.getItem('token'))
      const response = await axios.put(
        `${url}/api/user/profile_pic/update`,
        { profile_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            text: response.data.message,
            color: 'success',
            display: true,
          },
        })
        userDispatch({ type: 'UPDATE_USER', payload: response.data.user })
      }
      setLoading(false)
      history.push('/home')
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const saveCoverImage = async (cover_url) => {
    setLoading(true)
    try {
      let token = JSON.parse(localStorage.getItem('token'))
      const response = await axios.put(
        `${url}/api/user/cover_pic/update`,
        { cover_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            text: response.data.message,
            color: 'success',
            display: true,
          },
        })
        userDispatch({ type: 'UPDATE_USER', payload: response.data.user })
      }
      setLoading(false)
      history.push('/home')
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return {
    updateProfilePic,
    updateCoverPic,

    loading,
  }
}

export default useUpdateProfilePic
