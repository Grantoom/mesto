import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit, formValidators) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._formValidators = formValidators;
    this._formItem = this._popupItem.querySelector('.popup__form');
    this._inputList = Array.from(this._formItem.querySelectorAll('.popup__input'));
    this._popupButton = this._formItem.querySelector('.popup__submit-button');
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._callbackFormSubmit(inputValues);
    });
  }
  
  open() {
    super.open();
    if (this._formItem.getAttribute("name") in this._formValidators) {
      this._formValidators[this._formItem.getAttribute("name")].resetValidation();
      this._popupButton.disabled = true;
    }
  }
  
  close() {
    super.close();
    this._formItem.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
      this._popupButton.disabled = false;
    }
  }
}

export default PopupWithForm;