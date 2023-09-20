export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this._headers = headers;
      }

    _sendRequest(baseUrl, options) {
        return fetch(baseUrl, options)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
    
            return Promise.reject(new Error('Ошибка'));
          })
      }
    
      getCards() {
        return this._sendRequest(`${this.baseUrl}/cards`, {
          headers: this._headers
        });
      }

    createNewCard({name, link}) {
        console.log(JSON.stringify({
            name: name,
            link: link
        }));
      
      return this._sendRequest(`${this.baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
        });
    }

    deleteCard(id) {
        return this._sendRequest(`${this.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    getUserInfo() {
        return this._sendRequest(`${this.baseUrl}/users/me`, {
          headers: this._headers
        });
    }


    sendUserInfo(userData) {
        return this._sendRequest(`${this.baseUrl}/users/me`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ 
            name: userData.username, 
            about: userData.profession 
          })
        });
    }
    
    addCardLike(id) {
        return this._sendRequest(`${this.baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        });
    }


    deleteCardLike(id) {
        return this._sendRequest(`${this.baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        })
    }

    handleUserAvatar(data) {
        return this._sendRequest(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.userAvatar,
          })
        })
    }

    getAllNeededData() {
        return Promise.all([this.getCards(), this.getUserInfo()])
    }
}