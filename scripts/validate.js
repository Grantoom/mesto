const validate = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__save_invalid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "error_visible",
  };
  
  const showError = (inputElement, errorMessage, validate) => {
    inputElement.classList.add(validate.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  };
  
  const hideError = (inputElement, errorMessage, validate) => {
    inputElement.classList.remove(validate.inputErrorClass);
    errorMessage.textContent = "";
  };
  
  const checkInputValidity = (inputElement, formElement, validate) => {
    const isInputValid = inputElement.validity.valid;
    const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
    
    if (!isInputValid) {
      showError(inputElement, errorMessage, validate);
    } else {
      hideError(inputElement, errorMessage, validate);
    }
  };
  
  function disabledButton(buttonElement, validate) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validate.inactiveButtonClass);
  }
  
  function enabledButton(buttonElement, validate) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validate.inactiveButtonClass);
  }
  
  function toggleButtonState(buttonElement, isActive, validate) {
    if (!isActive) {
      disabledButton(buttonElement, validate);
    } else {
      enabledButton(buttonElement, validate);
    }
  }
  
  function setEventListener(formElement, validate) {
    const inputList = Array.from(formElement.querySelectorAll(validate.inputSelector));
    const submitButtonElement = formElement.querySelector(validate.submitButtonSelector);
  
    toggleButtonState(submitButtonElement, formElement.checkValidity(), validate);
  
    inputList.forEach(function (inputElement) {
      inputElement.addEventListener("input", function () {
        toggleButtonState(submitButtonElement, formElement.checkValidity(), validate);
        checkInputValidity(inputElement, formElement, validate);
      });
    });
  
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!formElement.checkValidity()) return;
    });
  }
  
  function enableValidation(validate) {
    const formsList = Array.from(document.querySelectorAll(validate.formSelector));
    
    formsList.forEach(function (formElement) {
      setEventListener(formElement, validate);
    });
  }
  
  enableValidation(validate);