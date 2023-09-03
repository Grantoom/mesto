import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Обновленные селекторы
    this._image = this._popup.querySelector(".popup-image__pic");
    this._caption = this._popup.querySelector(".popup-image__title");
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
