export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
      this._nameElement = document.querySelector(userNameSelector);
      this._aboutElement = document.querySelector(userAboutSelector);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        about: this._aboutElement.textContent,
      };
    }
  
    setUserInfo({ name, about }) {
      this._nameElement.textContent = name;
      this._aboutElement.textContent = about;
    }
  }
  