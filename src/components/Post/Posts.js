import React, { useContext } from 'react'
import { PostContext } from '../../App'
import Post from './Post'
function Posts() {
    const {postState} = useContext(PostContext)
  return (
    <div>
      {postState.posts.length
        ? postState.posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        : null}
    </div>
  )
}

export default Posts
