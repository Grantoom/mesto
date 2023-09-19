import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__type_delete");
    this._confirmCallback = confirmCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._confirmCallback();
      this.close();
    });
  }
}
