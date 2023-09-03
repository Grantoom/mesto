export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitButtonElement = form.querySelector(config.submitButtonSelector);
  }

  _showError(inputElement, errorMessage) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorMessage) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorMessage.textContent = "";
  }

  _disableButton() {
    this._submitButtonElement.disabled = true;
    this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    this._submitButtonElement.disabled = false;
    this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonState(isActive) {
    if (!isActive) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListener() {
    if (this._inputsList.length === 0) {
      return;
    }

    this._disableButton();

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const boolBtn = this._inputsList.every((item) => item.checkValidity());
        this._toggleButtonState(boolBtn);
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._enableButton();
    });
  }

  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (!isInputValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }

  resetValidationState() {
    this._inputsList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      this._hideError(inputElement, errorElement);
    });

    this._disableButton();
  }
}
