import { initialCards, config } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js"; 
import './pages/index.css';

const popupEditCard = document.querySelector(".popup_edit-profile");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const popupPhoto = document.querySelector(".popup-image");
const formProfile = document.querySelector(".popup__form_edit-profile");
const formCardAdd = document.querySelector(".popup__form_add-photo");
const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");

const userInfo = new UserInfo({
  userNameSelector: '.profile__section-title',
  userAboutSelector: '.profile__section-subtitle'
});

const validProfile = new FormValidator(config, formProfile);
validProfile.enableValidation();
const validCard = new FormValidator(config, formCardAdd);
validCard.enableValidation();

const photoPopup = new PopupWithImage(popupPhoto);
photoPopup.setEventListeners();

const profilePopup = new PopupWithForm(popupEditCard, handleFormSubmitProfile);
profilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(popupAddPhoto, handleFormSubmitCard);
addCardPopup.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link, "#card-template");
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, ".cardsPlace");

function handleFormSubmitProfile(formData) {
  userInfo.setUserInfo(formData);
  profilePopup.close();
}

function handleFormSubmitCard(formData) {
  const newCard = createCard(formData.name, formData.link, "#card-template");
  const cardElement = newCard.generateCard();
  cardsSection.addItem(cardElement);
  addCardPopup.close();
}

function openPopupCard(img, title) {
  photoPopup.open({ src: img, alt: title, title: title });
}

function createCard(name, value, templateSelector) {
  const cardElement = new Card(name, value, templateSelector, openPopupCard);
  return cardElement;
}

cardsSection.renderItems();

buttonOpenEditProfilePopup.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  validProfile.resetValidationState();
  profilePopup.open();
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  validCard.resetValidationState();
  formCardAdd.reset();
  addCardPopup.open();
});
