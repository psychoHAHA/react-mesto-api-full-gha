class Api {
  constructor({ url }) {
    this._url = url;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Возникла ошибка'));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponse);
  }

  getAllCards() {

    console.log(localStorage.getItem('token'));
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponse);
  }

  changeUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }

  changeAvatarData(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponse);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
    }).then(this._getResponse);
  }

  handleLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      }).then(this._getResponse);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      }).then(this._getResponse);
    }
  }
}

export const api = new Api({
  url: 'http://localhost:3000',
})


//   deleteLike(cardId) {

//     return fetch(`${this._url}/cards/${cardId}/likes`, {

//       method: 'DELETE',

//       headers: this._headers,

//     }).then(this._getResponse)

//   }

// }
