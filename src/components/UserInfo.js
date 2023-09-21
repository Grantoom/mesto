export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelectors }) {
    this._username = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._profileAvatar = document.querySelector(userAvatarSelectors);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      profession: this._userJob.textContent,
    };
  } 

  setUserInfo(data) {
    if(data.name) {
      this._username.textContent = data.name;
    }
    if(data.about) {
      this._userJob.textContent = data.about;
    }
    if(data) {
      this.setUserAvatar(data);
    }
  }

  setUserAvatar(data) {
    if(data.avatar) {
      this._profileAvatar.src = data.avatar;
    }
  }
}