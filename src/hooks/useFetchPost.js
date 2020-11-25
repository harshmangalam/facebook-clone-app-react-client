import { useContext, useState } from 'react'
import axios from 'axios'
import { PostContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

const useFetchPost = () => {
  const [loading, setLoading] = useState(false)
  const { postState, postDispatch } = useContext(PostContext)

  let token = JSON.parse(localStorage.getItem('token'))

  const fetchComments = async (post_id) => {
    if (
      postState.post.commentPagination.currentPage >
      postState.post.commentPagination.totalPage
    ) {
      return
    }
    setLoading(true)
    try {
      const res = await axios.get(
        `${url}/api/post/${post_id}/comment/?page=${postState.post.commentPagination.currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (res.data) {
        postDispatch({
          type: 'COMMENT_PAGINATION',
          payload: {
            currentPage: res.data.pagination.currentPage + 1,
            totalPage: res.data.pagination.totalPage,
            comments: res.data.comments,
          },
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const fetchPosts = async () => {
    if (
      postState.postPagination.currentPage > postState.postPagination.totalPage
    ) {
      return
    } else {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${url}/api/post/?page=${postState.postPagination.currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (data) {
          postDispatch({
            type: 'POST_PAGINATION',
            payload: {
              currentPage: data.pagination.currentPage + 1,
              totalPage: data.pagination.totalPage,
              posts: data.posts,
            },
          })
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
  }

  return {
    fetchPosts,
    fetchComments,
    loading,
  }
}

export default useFetchPost
