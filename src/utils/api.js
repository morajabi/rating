const apiBase = `https://api-fknaanjgow.now.sh`
const headers = {
  Authorization: 'Bearer sdfklmdsmfs2',
  'Content-type': 'application/json',
}

export const getRating = () =>
  fetch(`${apiBase}/feedback/rating`, {
    method: 'GET',
    headers,
  }).then(res => res.json())

/**
 * Submit rating
 *
 * @param {number} rating - Rating from 0 to 10
 */
export const setRating = rating =>
  fetch(`${apiBase}/feedback/rating`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ rating }),
  })

export const setClosed = () =>
  fetch(`${apiBase}/feedback/closed`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ closed: true }),
  })

export const getClosedPreference = () =>
  fetch(`${apiBase}/feedback/closed`, {
    method: 'GET',
    headers,
  })
