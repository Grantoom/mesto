export default class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
    this.formsList = Array.from(form.querySelectorAll(config.inputSelector));
    this.submitButtonElement = form.querySelector(config.submitButtonSelector);
  }

  showError(inputElement, errorMessage) {
    inputElement.classList.add(this.config.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }

  hideError(inputElement, errorMessage) {
    inputElement.classList.remove(this.config.inputErrorClass);
    errorMessage.textContent = "";
  }

  disableButton() {
    this.submitButtonElement.disabled = true;
    this.submitButtonElement.classList.add(this.config.inactiveButtonClass);
  }

  enableButton() {
    this.submitButtonElement.disabled = false;
    this.submitButtonElement.classList.remove(this.config.inactiveButtonClass);
  }

  toggleButtonState(isActive) {
    if (!isActive) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  setEventListener() {
    if (this.formsList.length === 0) {
      return;
    }

    this.disableButton();

    this.formsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const boolBtn = !this.formsList
          .map((item) => item.checkValidity())
          .includes(false);
        this.toggleButtonState(boolBtn);
        this.checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this.setEventListener();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.enableButton();
    });
  }

  checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    if (!isInputValid) {
      this.showError(inputElement, errorElement);
    } else {
      this.hideError(inputElement, errorElement);
    }
  }
}
