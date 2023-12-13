// export const BASE_URL = 'https://auth.nomoreparties.co';
// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.psychedelicmesto.nomoredomainsmonster.ru';

function getResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error('Возникла ошибка'));
}

export const register = (email, password) => {
  return fetch(
    `${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  ).then((response) => getResponse(response));
};

export const authorize = (email, password) => {
  return fetch(
    `${BASE_URL}/signin`,

    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }
  )
    .then((response) => getResponse(response))

    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        return data;
      }
    });
};

export const getContent = (token) => {
  // const token = localStorage.getItem('jwt')
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res))
    .then((data) => data);
};
