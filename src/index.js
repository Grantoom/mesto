import "./pages/index.css";

import { initialCards, configFormSelector } from './utils/constants.js';
import {FormValidator} from "./components/FormValidator.js";
import {Card} from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import {PopupWithConfirmation} from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";

import { 
  profileEditButtonElement,
  nameInput,
  jobInput,
  cardPopupOpenButton,
  iconAvatarEdit
} from './utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '97d17c4f-b130-485b-9ec0-eeb35e105a97',
    'Content-Type': 'application/json'
  }
});

let personalId;

const newUserInfo = new UserInfo({
  userNameSelector: '.profile__section-title',
  userJobSelector: '.profile__section-subtitle',
  userAvatarSelectors: '.profile__avatar'
});

const popupWithImage = new PopupWithImage(".popup-image");

const deleteCardPopup = new PopupWithConfirmation(".popup_type_delete-card");

const cardSection = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardSection.addItem(cardElement);
  }
}, ".cardsPlace");

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(data) {

  const handleLikesCard = () => {
    api.addCardLike(data._id)
    .then((res) => {
      cardElement.updateCardLike(res);
      cardElement.createCardLike();
    })
    .catch((error) => { console.log(`При лайке карточки возникла ошибка, ${error}`) })
  }

  const handleDeleteLike = (id) => {
    api.deleteCardLike(id)
    .then((res) => {
      cardElement.updateCardLike(res);
      cardElement.createCardLike();
    })
    .catch((error) => { console.log(`При дизлайке карточки возникла ошибка, ${error}`) })
  }

  const handlePopupDelete = () => {
    deleteCardPopup.open();
    deleteCardPopup.addSubmitHandler(() => {
      api.deleteCard(data._id)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((error) => { console.log(`При закрытии карточки возникла ошибка, ${error}`) })
    });
  }
  
  const cardElement = new Card(data, '#element-template', personalId,
    handleCardClick, handleLikesCard, handleDeleteLike, handlePopupDelete);
  return cardElement.generateCard();
}

api.getData()
  .then(( [cards, userData] ) => {
    newUserInfo.setUserInfo(userData);
    personalId = userData._id;
    cardSection.renderItems(cards);
  })
  .catch((error) => console.log(error))
  
  const formValidators = {}

  const popupAddCard = new PopupWithForm('.popup_add-photo', (formValues) => {
  popupAddCard.renderLoading(true);
  api.createNewCard(formValues)
    .then((data) => {
      const cardsElements = createCard(data);
      cardSection.addItem(cardsElements);
      popupAddCard.close();
    })
    .catch((error) => { console.log(`При добавлении карточки возникла ошибка, ${error}`) })
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}, formValidators);

  const popupProfileEdit = new PopupWithForm('.popup_edit-profile', (formValues) => {
    popupProfileEdit.renderLoading(true);
    api.sendUserInfo(formValues)
      .then((res) => {
        newUserInfo.setUserInfo(res);
        popupProfileEdit.close();
      })
      .catch((error) => { console.log(`При редактировании профиля возникла ошибка, ${error}`) })
      .finally(() => {
        popupProfileEdit.renderLoading(false);
      });
  }, formValidators);


  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement)
      const formName = formElement.getAttribute('name');
  
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
  enableValidation(configFormSelector);
  
  const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
    popupAvatar.renderLoading(true);
      api.handleUserAvatar(data)
      .then((res) => {
      newUserInfo.setUserAvatar(res);
      formValidators['inputAvatar'].resetValidation();
      popupAvatar.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupAvatar.renderLoading(false))
  }, formValidators)
  popupAvatar.setEventListeners();

  const editProfilePopup = function () {
    const userData = newUserInfo.getUserInfo();
    nameInput.value = userData.username;
    jobInput.value = userData.profession;
  
    popupProfileEdit.open();
  };
  
  iconAvatarEdit.addEventListener('click', function () {
    popupAvatar.open();
  }); 
  
  profileEditButtonElement.addEventListener('click', editProfilePopup);
  cardPopupOpenButton.addEventListener('click', () => {
    popupAddCard.open(); 
    formValidators['popupFormAddCard'].resetValidation();});
  
  popupWithImage.setEventListeners();
  popupProfileEdit.setEventListeners();
  popupAddCard.setEventListeners();
  deleteCardPopup.setEventListeners();