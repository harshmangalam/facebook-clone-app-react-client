import axios from 'axios'
const url = process.env.REACT_APP_ENDPOINT

export const fetchCurrentUser = async () => {
  let token = localStorage.token && JSON.parse(localStorage.token)

  try {
    const { data } = await axios.get(`${url}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (data) {
      return {
        data,
      }
    }
  } catch (err) {
    if (err && err.response) {
      return {
        error: err.response.data.error,
      }
    }
  }
}

export const loginUser = async (userData, loading, setLoading) => {
  try {
    setLoading(true)
    const { data } = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/auth/login`,
      userData,
    )
    setLoading(false)
    if (data) {
      return {
        data,
      }
    }
  } catch (err) {
    setLoading(false)
    if (err && err.response) {
      return {
        error: err.response.data.error,
      }
    }
  }
}

export const LogoutUser = async () => {
  let token = localStorage.token && JSON.parse(localStorage.token)

  try {
    const { data } = await axios.get(`${url}/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (data) {
      return {
        data,
      }
    }
  } catch (err) {
    if (localStorage.token) {
      localStorage.removeItem('token')
    }
    if (err && err.response) {
      return {
        status: err.response.status,
        error: err.response.data.error,
      }
    }
  }
}
