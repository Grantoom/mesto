import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCaption = this._popupItem.querySelector('.popup-image__title');
    this._popupImage = this._popupItem.querySelector('.popup-image__pic');
  }

  open(name, link) {
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}