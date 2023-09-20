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

  //Исправил, но теперь возникает ошибка с PopupWithConfirmation и PopupWithForm и в index.js