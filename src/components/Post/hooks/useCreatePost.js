import { useContext, useState } from 'react'
import axios from 'axios'
import { UIContext, PostContext } from '../../../App'
import { useHistory } from 'react-router-dom'
import { storage } from '../../../firebase/firebase'
const url = process.env.REACT_APP_ENDPOINT

const useCreatePost = ({
  postData,
  body,
  isImageCaptured,
  postImage,
  blob,
}) => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const { uiDispatch } = useContext(UIContext)
  const { postDispatch } = useContext(PostContext)

  const createPost = async (data) => {
    setLoading(true)
    let token = localStorage.token && JSON.parse(localStorage.getItem('token'))
    try {
      const response = await axios.post(`${url}/api/post/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setLoading(false)
      postDispatch({ type: 'ADD_POST', payload: response.data.post })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: {
          color: 'success',
          display: true,
          text: response.data.message,
        },
      })
      uiDispatch({ type: 'SET_POST_MODEL', payload: false })
      history.push('/')
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
      console.log(err)
    }
  }

  const createUserPost = async (uri = '') => {
    await createPost({
      ...postData,
      image: uri ? uri : '',
      body: {
        ...body,
      },
    })
  }

  const handleSubmitPost = (e) => {
    e.preventDefault()

    if (isImageCaptured) {
      let filename = `post/post-${Date.now()}.png`
      const task = storage.ref(`images/${filename}`).put(blob)

      task.on(
        'state_changed',

        function () {
          setLoading(true)
        },
        function (error) {
          console.log('error from firebase')
          setLoading(false)
          uiDispatch({ type: 'SET_POST_MODEL', payload: false })
        },
        function () {
          storage
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then((uri) => {
              createUserPost(uri)
              setLoading(false)
            })
        },
      )
    } else if (postImage) {
      let filename = `post/post-${Date.now()}-${postImage.name}`
      const uploadTask = storage.ref(`images/${filename}`).put(postImage)
      uploadTask.on(
        'state_changed',
        () => {
          setLoading(true)
        },
        (err) => {
          console.log('error from firebase')
          setLoading(false)
          uiDispatch({ type: 'SET_POST_MODEL', payload: false })
        },
        () => {
          storage
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then((uri) => {
              createUserPost(uri)
            })
        },
      )
    } else {
      createUserPost()
    }
  }
  return {
    handleSubmitPost,
    loading,
  }
}

export default useCreatePost
