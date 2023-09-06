import { initialCards, config, editProfileButton, addPhotoButton, nameInputField, aboutInputField } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";

const userInfo = new UserInfo({
  userNameSelector: ".profile__section-title",
  userAboutSelector: ".profile__section-subtitle",
});

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardSection.addItem(cardElement);
  },
}, ".cardsPlace");

function createCard(name, link) {
  const card = new Card(name, link, "#card-template", (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.generateCard(); 
  return cardElement;
}

const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(".popup_edit-profile", ({ nameEditProfile, aboutEditProfile }) => {
  userInfo.setUserInfo({
    name: nameEditProfile,
    about: aboutEditProfile,
  });
});
const addPhotoPopup = new PopupWithForm(".popup_add-photo", ({ nameAddPhoto, linkAddPhoto }) => {
  const cardElement = createCard(nameAddPhoto, linkAddPhoto);
  cardSection.addItem(cardElement);
});

editProfilePopup.setEventListeners();
addPhotoPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInputField.value = userData.name;
  aboutInputField.value = userData.about;

  validProfile.resetValidationState();
  validProfile._toggleButtonState();

  editProfilePopup.open();
});

addPhotoButton.addEventListener("click", () => {
  addPhotoPopup.open();
  validCard.resetValidationState();
  addPhotoPopup.resetForm();
});

const validProfile = new FormValidator(config, document.querySelector(".popup__form_edit-profile"));
const validCard = new FormValidator(config, document.querySelector(".popup__form_add-photo"));

validProfile.enableValidation();
validCard.enableValidation();

cardSection.renderItems();
