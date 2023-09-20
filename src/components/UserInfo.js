export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._userName.textContent = name;
    if (about) this._userAbout.textContent = about;
    if (avatar) this._userAvatar.src = avatar;
  }
}
