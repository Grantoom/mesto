import { initialCards, config } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import './pages/index.css';

const popupEditCard = document.querySelector(".popup_edit-profile");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const popupPhoto = document.querySelector(".popup-image");
const formProfile = document.querySelector(".popup__form_edit-profile");
const formCardAdd = document.querySelector(".popup__form_add-photo");
const openPopupEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__section-title");
const profileAbout = document.querySelector(".profile__section-subtitle");
const openAddPopupButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".cardsPlace");

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

const cardsSection = new Section(renderCard, cardListElement);

function handleFormSubmitProfile(formData) {
  profileName.textContent = formData.username;
  profileAbout.textContent = formData.job;
  profilePopup.close();
}

function handleFormSubmitCard(formData) {
  const newCard = createCard(formData.name, formData.link, "#card-template");
  const cardElement = newCard.generateCard();
  cardsSection.addItem(cardElement);
  addCardPopup.close();
}

function renderCard(cardElement) {
  cardsSection.addItem(cardElement);
}

function openPopupCard(img, title) {
  photoPopup.open({ src: img, alt: title, title: title });
}

function createCard(name, value, dir) {
  const cardElement = new Card(name, value, dir, openPopupCard);
  return cardElement;
}

initialCards.reverse().forEach(function (item) {
  const cardElement = createCard(item.name, item.link, "#card-template");
  renderCard(cardElement.generateCard());
});

openPopupEditButton.addEventListener("click", () => {
  profilePopup.setInputValues({ username: profileName.textContent, job: profileAbout.textContent });
  validProfile.resetValidationState();
  profilePopup.open();
});

openAddPopupButton.addEventListener("click", () => {
  validCard.resetValidationState();
  formCardAdd.reset();
  addCardPopup.open();
});
