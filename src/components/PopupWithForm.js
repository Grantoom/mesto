import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const values = {};
    this._form.querySelectorAll(".popup__input").forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();
    this.resetForm();
    if (this._submitCallback.resetValidation) {
      this._submitCallback.resetValidation(); 
    }
  });
}

  resetForm() {
    this._form.reset();
  }
  
  resetValidation() {
    if (this._submitCallback.resetValidation) {
      this._submitCallback.resetValidation();
    }
  }  
}