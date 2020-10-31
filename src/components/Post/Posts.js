import React, { useContext } from 'react'
import Post from './Post'
function Posts({ posts }) {
  return (
    <div>
      {posts.length
        ? posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        : null}
    </div>
  )
}

export default Posts
