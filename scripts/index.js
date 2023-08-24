import initialCards from './initialCards.js'; 
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupEditCard = document.querySelector('.popup_edit-profile'); 
const popupAddPhoto = document.querySelector('.popup_add-photo'); 
const popupPhoto = document.querySelector('.popup-image'); 
const closeBtnList = document.querySelectorAll('.popup__exit'); 
const formProfile = document.querySelector('.popup__form_edit-profile'); 
const formCardAdd = document.querySelector('.popup__form_add-photo'); 
const nameInput = document.querySelector('.popup__input_role_name'); 
const aboutInput = document.querySelector('.popup__input_role_about'); 
const openPopupEditButton = document.querySelector('.profile__edit-button'); 
const profileName = document.querySelector('.profile__section-title'); 
const profileAbout = document.querySelector('.profile__section-subtitle'); 
const openAddPopupButton = document.querySelector('.profile__add-button'); 
const cardListElement = document.querySelector('.cardsPlace'); 
const popupImg = popupPhoto.querySelector('.popup-image__pic'); 
const popupTitle = popupPhoto.querySelector('.popup-image__title'); 
const templateElement = document.querySelector('#card-template').content.querySelector('.element'); 
const cardsName = document.querySelector('.popup__input_NameCard'); 
const cardsDescription = document.querySelector('.popup__input_UrlCard'); 
 
const config = { 
  formSelector: ".popup__form", 
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__submit-button", 
  inactiveButtonClass: "popup__save_invalid", 
  inputErrorClass: "popup__input_type_error", 
  errorClass: "popup__error_visible", 
}; 

const validProfile = new FormValidator(config, formProfile);
validProfile.enableValidation();
const validCard = new FormValidator(config, formCardAdd);
validCard.enableValidation();


function openPopup(item) { 
  item.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleKeydownPopupClose); 
} 
 
function closePopup(popup) { 
  popup.classList.remove("popup_opened"); 
  document.removeEventListener("keydown", handleKeydownPopupClose); 
} 
 
function handleKeydownPopupClose(evt) { 
  if (evt.key === "Escape") { 
    const item = document.querySelector(".popup_opened"); 
    closePopup(item); 
  } 
} 
 
function setProfile() { 
  profileName.textContent = nameInput.value; 
  profileAbout.textContent = aboutInput.value; 
} 
 
function handleFormSubmitProfile(e) { 
  e.preventDefault(); 
  setProfile(); 
  closePopup(popupEditCard); 
} 
 
formProfile.addEventListener('submit', handleFormSubmitProfile); 
 
function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = cardsName.value;
  const valueUrl = cardsDescription.value;

  if (valueName && valueUrl) {
    const cardElement = createCard(valueName, valueUrl);
    closePopup(popupAddPhoto);
    renderCard(cardElement, "#template-elements");
    }
  }
 
formCardAdd.addEventListener('submit', handleFormSubmitCard); 
 
function createCard(name, link) { 
   
  const cardElement = templateElement.cloneNode(true); 
  cardElement.querySelector('.element__img').src = link; 
  cardElement.querySelector('.element__text').textContent = name; 
  addEventListeners(cardElement.querySelector('.element__img'), cardElement, name, link); 
  return cardElement; 
} 
 
function renderCard(cardElement) { 
  cardListElement.prepend(cardElement); 
} 
 
function addEventListeners(imgElement, cardElement, name, link) { 
  const buttonDelElement = cardElement.querySelector('.element__trash'); 
  buttonDelElement.addEventListener('click', function () { 
    cardElement.remove(); 
  }); 
 
  imgElement.addEventListener('click', () => openPopupCard(link, name)); 
  const cardLike = cardElement.querySelector('.element__vector'); 
  cardLike.addEventListener('click', (e) => {  
    e.target.classList.toggle('element__vector_active');  
  }); 
} 
 
function initializeCards() { 
  initialCards.forEach(function (item)  { 
    const card = createCard(item.name, item.link); 
    renderCard(card); 
  }); 
} 
 
initializeCards(); 
 
function openEditPopup() {
  nameInput.value = profileName.textContent; 
  aboutInput.value = profileAbout.textContent; 
  openPopup(popupEditCard);
  initalValidate(popupEditCard);
}

function initalValidate(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validate.inputSelector)); 
  const submitButtonElement = formElement.querySelector(validate.submitButtonSelector); 
  inputList.forEach(function (inputElement) { 

  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`); 
  hideError(inputElement, errorMessage)
  toggleButtonState(submitButtonElement, false); 
    
  }); 
}
 
openPopupEditButton.addEventListener('click', openEditPopup); 
 
function openPopupAdd() { 
  openPopup(popupAddPhoto); 
  initalValidate(popupAddPhoto);
  formCardAdd.reset();
} 
 
openAddPopupButton.addEventListener('click', openPopupAdd); 
 
function openPopupCard(img, title) { 
  popupImg.src = img; 
  popupImg.alt = title; 
  popupTitle.textContent = title; 
  openPopup(popupPhoto); 
} 
 
closeBtnList.forEach((item) => { 
  item.addEventListener('click', function () { 
    closePopup(item.closest('.popup')); 
  }); 
}); 
 
function closeOverlay() { 
  document.querySelectorAll(".popup").forEach((item) => 
    item.addEventListener("click", (e) => { 
      if (e.target.classList.contains("popup")) { 
        closePopup(e.target); 
      } 
    }) 
  ); 
} 
 
closeOverlay(); 