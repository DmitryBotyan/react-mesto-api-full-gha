export class Api {
  constructor({ headers }, url) {
    this._headers = headers;
    this._url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      console.log(this._headers)
      return this._getResponseData(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name, link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatusletLike(cardId, isLiked) {
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      !isLiked
        ? {
            headers: this._headers,
            method: "PUT",
          }
        : {
            headers: this._headers,
            method: "DELETE",
          }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
  
  getUserInform() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  updateProfilePhoto({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}