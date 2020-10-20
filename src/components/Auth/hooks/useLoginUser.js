import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext, UIContext } from '../../../App'
import { useHistory } from 'react-router-dom'
import { fetchCurrentUser } from '../../../services/AuthService'

const url = process.env.REACT_APP_ENDPOINT

const useLoginUser = (userData = null) => {
  const { uiDispatch } = useContext(UIContext)
  const { userDispatch } = useContext(UserContext)

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialState, setInitialState] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {

    setInitialState({ ...initialState, email: userData ? userData.email : '' })
    return () => {

    }
  }, [])

  const handlePasswordChange = (e) => {
    setInitialState({ ...initialState, password: e.target.value })
    setError({ ...error, password: '' })
  }

  const handleEmailChange = (e) => {
    setInitialState({ ...initialState, email: e.target.value })
    setError({ ...error, email: '' })
  }

  async function handleLoginUser(e) {
    e.preventDefault()

    setLoading(true)
    try {
      const { data } = await axios.post(`${url}/api/auth/login`, initialState)
      localStorage.setItem('token', JSON.stringify(data.data.token))
      const me = await fetchCurrentUser()
      setLoading(false)

      userDispatch({ type: 'SET_CURRENT_USER', payload: me.data.user })

      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { color: 'success', display: true, text: data.message },
      })


      history.push('/home')
    } catch (err) {
      setLoading(false)

      console.log(err)
      if (err && err.response) {
        if (err.response.status === 422) {
          setError({ ...err.response.data.error })
        }

        if (err.response.status === 400) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              color: 'error',
              display: true,
              text: err.response.data.error,
            },
          })
        }
      }
    }
  }

  return {
    loading,
    error,
    handleLoginUser,
    handleEmailChange,
    handlePasswordChange,
  }
}

export default useLoginUser
