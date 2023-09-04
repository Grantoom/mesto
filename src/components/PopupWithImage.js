import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__pic");
    this._caption = this._popup.querySelector(".popup-image__title");
  }

  open({ src, alt, title }) {
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = title;
    super.open();
  }
}

export default PopupWithImage;
