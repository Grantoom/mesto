import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__type-delete");
    this._confirmCallback = confirmCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._confirmCallback();
      this.close();
    });
  }
}
