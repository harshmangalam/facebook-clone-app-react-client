import { useContext, useState } from 'react'
import axios from 'axios'
import { PostContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

const useFetchComments = (post_id) => {
  const [loading, setLoading] = useState(false)
  const { postDispatch } = useContext(PostContext)

  const fetchComments = async () => {
    setLoading(true)
    try {
      let token = JSON.parse(localStorage.getItem('token'))
      const response = await axios.get(`${url}/api/post/${post_id}/comment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data) {
        console.log(response.data)
        postDispatch({
          type: 'SET_COMMENTS',
          payload: response.data.comments,
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return {
    fetchComments,
    loading,
  }
}

export default useFetchComments
