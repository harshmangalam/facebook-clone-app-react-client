import { useState } from 'react'
import axios from 'axios'

function useLocationService() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getCityAndCountry(position)
      },
      (err) => {
        locationError()
      },
      { timeout: 7000 },
    )
  }

  function getCityAndCountry(position) {
    let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
    axios
      .get(apiUrl)
      .then((result) => {
        locationSuccess(result.data)
      })
      .catch((err) => {
        locationError()
      })
  }

  function locationSuccess(result) {
    setData({
      city: result?.city,
      country: result?.country,
      lat: result?.latt,
      lng: result?.longt,
      region: result?.region,
      state: result?.state,
      timezone: result?.timezone,
    })
    setLoading(false)
  }

  function locationError() {
    setError('Could not find location . Enter location manually')

    setLoading(false)
  }

  return {
    loading,
    data,
    error,
    getLocation,
    setError,
  }
}

export default useLocationService
