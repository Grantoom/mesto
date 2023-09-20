export default class UserInfo { 
  constructor({ userNameSelector, userAboutSelector, profileAvatarSelector }) { 
    this._userName = document.querySelector(userNameSelector); 
    this._userAbout = document.querySelector(userAboutSelector); 
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  } 
 
  getUserInfo() { 
    return { 
      name: this._userName.textContent, 
      about: this._userAbout.textContent, 
    }; 
  } 
 
  setUserInfo({ name, about }) { 
    this._userName.textContent = name; 
    this._userAbout.textContent = about; 
  }

  setAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
  } 
