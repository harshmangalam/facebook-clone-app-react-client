import { Button, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { PostContext } from '../../App'
import useFetchPost from '../../hooks/useFetchPost'
import Post from './Post'

function Posts({ posts }) {
  const { postState } = useContext(PostContext)

  const { fetchPosts } = useFetchPost()

  const handleFetchPosts = () => {
    fetchPosts()
  }
  return (
    <div>
      {posts.length
        ? posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        : null}

      <div
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      >
        {postState.postPagination.totalPage <=
        postState.postPagination.currentPage ? (
          <Typography style={{ color: 'teal' }} variant="body2">
            No more posts
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchPosts}
          >
            More Posts
          </Button>
        )}
      </div>
    </div>
  )
}

export default Posts
