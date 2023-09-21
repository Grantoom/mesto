export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const configFormSelector = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__input_type_error",
};

const popupProfileEditElement = document.querySelector('.popup_edit-profile');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const formElementEditProfile = popupProfileEditElement.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('#userName-input');
const jobInput = formElementEditProfile.querySelector('#userProf-input');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const iconAvatarEdit = document.querySelector('.profile__avatar-edit-button');
const userName = document.querySelector('.profile__section-title');
const userInfo = document.querySelector('.profile__section-subtitle');
const userAvatar = document.querySelector('.profile__avatar');

export {
  profileEditButtonElement,
  nameInput,
  jobInput,
  cardPopupOpenButton,
  iconAvatarEdit,
  userName,
  userInfo,
  userAvatar
};