import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popup.querySelector(".popup-image__pic");
    this._imageCaption = this._popup.querySelector(".popup-image__title");
  }

  open(link, name) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}

// Исправил