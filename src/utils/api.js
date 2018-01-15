const getToken = () =>
  window && typeof localStorage !== 'undefined' && localStorage.getItem('token')
    ? localStorage.getItem('token')
    : 'sample_token'
const apiBase = `https://api-fknaanjgow.now.sh`
const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-type': 'application/json',
})

const handleStatusError = res => {
  if (res.ok) {
    return res
  }
  throw new Error(res.status)
}

const bareFetchWrapper = (url, options) =>
  fetch(apiBase + url, { headers: getHeaders(), ...options })
const fetchWrapper = (...args) =>
  bareFetchWrapper(...args).then(handleStatusError)

export const getRating = () =>
  bareFetchWrapper(`/feedback/rating`, {
    method: 'GET',
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    return res
  })

/**
 * Submit rating
 *
 * @param {number} rating - Rating from 0 to 10
 */
export const setRating = rating =>
  fetchWrapper(`/feedback/rating`, {
    method: 'POST',
    body: JSON.stringify({ rating }),
  })

export const setClosed = () =>
  fetchWrapper(`/feedback/closed`, {
    method: 'PUT',
    body: JSON.stringify({ closed: true }),
  })

export const getClosedPreference = () =>
  fetchWrapper(`/feedback/closed`, {
    method: 'GET',
  }).then(res => {
    return res.json()
  })
