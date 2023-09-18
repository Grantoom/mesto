import { initialCards, config, buttonOpenPopupProfile, buttonAddPopupProfile, nameInputField, aboutInputField } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";

// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/cohort-75',
//   headers: {
//     authorization: '97d17c4f-b130-485b-9ec0-eeb35e105a97',
//     'Content-Type': 'application/json'
// }});

// const myId = await api.getUserID()

const confirmDeletePopup = new PopupWithConfirmation(".popup_type_delete-card", () => {
  const cardToDelete = confirmDeletePopup.cardToDelete;
  if (cardToDelete) {
    cardToDelete._removeCard();
  }
});

const buttonAvatarPopupProfile = document.querySelector(".profile__avatar-edit-button");

const popupAvatar = new PopupWithForm(".popup_type_avatar", ({ avatar }) => {
  document.querySelector(".profile__avatar").src = avatar;
});

popupAvatar.setEventListeners();

buttonAvatarPopupProfile.addEventListener("click", () => {
  
  popupAvatar.open();
});

const deleteCardPopup = new PopupWithForm(".popup_type_delete-card", () => {
  cardToRemove.remove();
  deleteCardPopup.close();
});
deleteCardPopup.setEventListeners();


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
  const card = new Card(
    name, 
    link, 
    "#card-template", 
    (name, link) => {
      popupWithImage.open(name, link);
    },
    (card) => {
      confirmDeletePopup.cardToDelete = card;
      confirmDeletePopup.open();
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

confirmDeletePopup.setEventListeners();

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

buttonOpenPopupProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInputField.value = userData.name;
  aboutInputField.value = userData.about;

  validProfile.updateInitialInputValues();
  validProfile.resetValidationState();

  editProfilePopup.open();
});

buttonAddPopupProfile.addEventListener("click", () => {
  addPhotoPopup.open();
  validCard.resetValidationState();
  addPhotoPopup.resetForm();
});

const validProfile = new FormValidator(config, document.querySelector(".popup__form_edit-profile"));
const validCard = new FormValidator(config, document.querySelector(".popup__form_add-photo"));

validProfile.enableValidation();
validCard.enableValidation();

cardSection.renderItems();
