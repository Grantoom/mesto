const validate = { 
  formSelector: ".popup__form", 
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__submit-button", 
  inactiveButtonClass: "popup__save_invalid", 
  inputErrorClass: "popup__input_type_error", 
  errorClass: "popup__error_visible", 
}; 
 
const showError = (inputElement, errorMessage) => { 
  inputElement.classList.add(validate.inputErrorClass); 
  errorMessage.textContent = inputElement.validationMessage; 
}; 
 
const hideError = (inputElement, errorMessage) => { 
  inputElement.classList.remove(validate.inputErrorClass); 
  errorMessage.textContent = ""; 
}; 
 
const checkInputValidity = (inputElement, formElement) => { 
  const isInputValid = inputElement.validity.valid; 
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`); 
  if (!isInputValid) { 
    showError(inputElement, errorMessage); 
  } else { 
    hideError(inputElement, errorMessage); 
  } 
}; 
 
export const disableButton = (buttonElement) => { 
  buttonElement.disabled = true; 
  buttonElement.classList.add(validate.inactiveButtonClass); 
} 
 
const enableButton = (buttonElement) => { 
  buttonElement.disabled = false; 
  buttonElement.classList.remove(validate.inactiveButtonClass); 
} 
 
export const toggleButtonState = (buttonElement, isActive) => { 
  if (!isActive) { 
    disableButton(buttonElement); 
  } else { 
    enableButton(buttonElement); 
  } 
} 
 
const setEventListener = (formElement) => { 
  const inputList = Array.from(formElement.querySelectorAll(validate.inputSelector)); 
  const submitButtonElement = formElement.querySelector(validate.submitButtonSelector); 

  toggleButtonState(submitButtonElement, formElement.checkValidity()); 
  inputList.forEach(function (inputElement) { 
    inputElement.addEventListener("input", function () { 
      toggleButtonState(submitButtonElement, formElement.checkValidity()); 
      checkInputValidity(inputElement, formElement); 
    }); 
  }); 
   
  formElement.addEventListener("submit", (evt) => { 
    evt.preventDefault(); 
    if (!formElement.checkValidity()) return; 
  }); 
} 
 
 export const enableValidation = (validationConfig) => { 
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
  formsList.forEach(function (formElement) { 
    setEventListener(formElement); 
  }); 
} 
 
enableValidation(validate);  