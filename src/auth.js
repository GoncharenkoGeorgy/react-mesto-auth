export const BASE_URL = 'https://auth.nomoreparties.co';

export const login = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch(err => console.log(err))
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch(err => console.log(err))
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
      .then((res) => res.json())
      .then(data => data)
  })
}