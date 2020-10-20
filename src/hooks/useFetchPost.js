import { useContext, useState } from 'react'
import axios from 'axios'
import { PostContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

const useFetchPost = (post_id) => {
  const [loading, setLoading] = useState(false)
  const { postDispatch } = useContext(PostContext)

  const fetchPost = async () => {
    setLoading(true)
    try {

      let token = JSON.parse(localStorage.getItem('token'))
      const commentsResponse = await axios.get(`${url}/api/post/${post_id}/comment`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if (commentsResponse.data) {
        postDispatch({
          type: 'SET_POST_COMMENTS',
          payload: commentsResponse.data.comments,
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return {
    fetchPost,
    loading,
  }
}

export default useFetchPost
