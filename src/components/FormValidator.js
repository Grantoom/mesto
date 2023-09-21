export class FormValidator {
  constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._formElement = formElement;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputErrorClass = config.inputErrorClass;
      this._inputList = formElement.querySelectorAll(this._inputSelector);
      this._submitButton = formElement.querySelector(this._submitButtonSelector);
    }

  _disableButtonElement(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButtonElement(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  }
  resetValidation() {
    this._toggleButtonState(this._submitButton); 

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      this._hideError(inputElement, errorElement);
    });
  }

  _toggleButtonState(buttonElement, isActive) {
    if (!isActive) {
        this._disableButtonElement(buttonElement);
    } else {
        this._enableButtonElement(buttonElement);
    }
  }
  
  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const inputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    
    if (!inputValid) {
        this._showError(inputElement, errorElement);
    } else {
        this._hideError(inputElement, errorElement);
    };
  }

  _setEventListener() {
    this._toggleButtonState(this._submitButton, this._formElement.checkValidity());

    this._inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            this._toggleButtonState(this._submitButton, this._formElement.checkValidity());
            
            this._checkInputValidity(inputItem, this._formElement);
        });
    })
  }

  enableValidation() {
    this._setEventListener();
  }
}