import "./pages/index.css";

import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";

import {
  initialCards,
  config,
  buttonOpenPopupProfile,
  buttonAddPopupProfile,
  nameInputField,
  aboutInputField
} from "./utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '97d17c4f-b130-485b-9ec0-eeb35e105a97',
    'Content-Type': 'application/json'
  }
});

function mergeInitialCards(loadedCards) {
  return initialCards.concat(loadedCards);
}

const buttonAvatarPopupProfile = document.querySelector(".profile__avatar-edit-button");

const popupAvatar = new PopupWithForm(".popup_type_avatar", ({ avatar }) => {
  document.querySelector(".profile__avatar").src = avatar;
});

popupAvatar.setEventListeners();

buttonAvatarPopupProfile.addEventListener("click", () => {
  validAvatar.resetValidationState();
  popupAvatar.open();
});

const deleteCardPopup = new PopupWithConfirmation(".popup_type_delete-card", () => {
  const cardToDelete = deleteCardPopup.cardToDelete;
  if (cardToDelete) {
    api.deleteCard(cardToDelete.getId())
      .then(() => {
        cardToDelete._removeCard();
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }
});

deleteCardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__section-title",
  userAboutSelector: ".profile__section-subtitle",
  profileAvatarSelector: ".profile__avatar"
});

const cardSection = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardSection.addItem(cardElement);
  }
}, ".cardsPlace");

api.getCards()
  .then((loadedCards) => {
    const cardsData = mergeInitialCards(loadedCards);
    cardSection.setItems(cardsData);
    cardSection.renderItems();
  })
  .catch((err) => console.log(`Ошибка получения карточек: ${err}`));

function createCard(name, link) {
  const card = new Card(
    name,
    link,
    "#element-template",
    (name, link) => {
      popupWithImage.open(name, link);
    },
    (card) => {
      deleteCardPopup.cardToDelete = card;
      deleteCardPopup.open();
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(".popup_edit-profile", ({ username, profession }) => {
  userInfo.setUserInfo({
    name: username,
    about: profession
  });
});

const addPhotoPopup = new PopupWithForm(".popup_add-photo", ({ nameAddPhoto, linkAddPhoto }) => {
  const cardElement = createCard(nameAddPhoto, linkAddPhoto);
  cardSection.addItem(cardElement);
});

const validAvatar = new FormValidator(config, document.querySelector(".popup__form_avatar"));

validAvatar.enableValidation();

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
