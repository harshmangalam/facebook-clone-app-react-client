import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from '@material-ui/core'
import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PostContext, UIContext } from '../App'
import useFetchPost from '../hooks/useFetchPost'
import Comment from '../components/Comment/Comment'

import AvartarText from '../components/UI/AvartarText'
import CommentTextArea from '../components/Comment/CommentTextArea'

import PostSubContent from '../components/Post/PostSubContent'

function Post() {
  const { postState, postDispatch } = useContext(PostContext)
  const { uiState } = useContext(UIContext)
  const params = useParams()

  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const { fetchComments } = useFetchPost()

  useEffect(() => {
    const post = postState.posts.find((post) => post.id == params.postId)
    postDispatch({ type: 'SET_CURRENT_POST', payload: post })
    fetchComments(params.postId)

    return () => {
      postDispatch({ type: 'REMOVE_CURRENT_POST' })
    }
  }, [])

  function isContent() {
    return (
      postState.post.body.feelings ||
      postState.post.body.with.length ||
      postState.post.body.at ||
      postState.post.body.date
    )
  }

  const handleFetchComments = () => {
    fetchComments(params.postId)
  }
  return (
    <div
      style={{
        paddingTop: '100px',
        minHeight: '100vh',
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item md={7} sm={12} xs={12}>
            <Card
              style={{
                width: '100%',
                height: '80vh',
                position: 'sticky',
                top: 100,
                backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
              }}
            >
              {postState.post.user && (
                <CardHeader
                  avatar={
                    postState.post.user.profile_pic ? (
                      <Avatar>
                        <img
                          src={postState.post.user.profile_pic}
                          style={{ width: '100%', height: '100%' }}
                          alt=""
                        />
                      </Avatar>
                    ) : (
                      <AvartarText
                        text={postState.post.user.name}
                        bg={postState.post.user.active ? 'seagreen' : 'tomato'}
                      />
                    )
                  }
                  title={
                    postState.post && (
                      <Typography style={{ fontWeight: '800' }}>
                        {postState.post.user.name}
                      </Typography>
                    )
                  }
                  subheader={moment(postState.post.createdAt).fromNow()}
                />
              )}
              {postState.post.body && isContent() && (
                <CardContent
                  style={{
                    marginBottom: '16px',
                    background: uiState.darkMode ? null : 'rgb(240,242,245)',
                    padding: '16px',
                  }}
                >
                  <PostSubContent post={postState.post} />
                </CardContent>
              )}

              <CardContent>
                <Typography
                  style={{
                    fontWeight: '400',
                    fontSize: '16px',
                    fontFamily: 'fantasy',
                  }}
                >
                  {postState.post.content && postState.post.content}
                </Typography>
              </CardContent>

              {postState.post.image && (
                <CardMedia
                  component="img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  image={postState.post.image}
                  title="Paella dish"
                />
              )}

              {postState.post.profilePostData &&
              Object.keys(postState.post.profilePostData).length ? (
                <>
                  <CardMedia
                    style={{ width: '100%', height: '200px' }}
                    image={postState.post.profilePostData.coverImage}
                    title={postState.post.user.name}
                  />

                  <Avatar
                    style={{
                      border: '6px solid tomato',
                      width: xsScreen ? '300px' : '400px',
                      height: xsScreen ? '300px' : '400px',
                      display: 'flex',
                      flexDirection: 'row',
                      margin: 'auto',
                      borderRadius: '100%',
                      bottom: 130,
                    }}
                  >
                    <img
                      src={postState.post.profilePostData.profileImage}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </Avatar>
                </>
              ) : null}
            </Card>
          </Grid>

          <Grid
            item
            md={5}
            sm={12}
            xs={12}
            style={{ marginBottom: !uiState.mdScreen ? '70px' : '0px' }}
          >
            <Paper
              style={{
                padding: '16px',
                backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
              }}
            >
              <CommentTextArea post={postState.post} />
            </Paper>
            {postState.post.comments && postState.post.comments.length ? (
              <>
                {postState.post.comments.map((comment) => (
                  <div key={comment.id}>
                    <Comment comment={comment} />
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {postState.post.commentPagination.totalPage ==
                  postState.post.commentPagination.currentPage ? (
                    <Typography variant="h6" color="primary">
                      No more comments
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFetchComments}
                    >
                      More Comments
                    </Button>
                  )}
                </div>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Post
