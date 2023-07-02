const popupEditCard = document.querySelector('.popup_edit-profile');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupPhoto = document.querySelector('.popup-image');
const closeBtn = document.querySelectorAll('.popup__exit');
const formProfile = document.querySelector(".popup__form_edit-profile");
const formCardAdd = document.querySelector(".popup__form_add-photo");
const nameInput = document.querySelector('.popup__input_role_name');
const jobInput = document.querySelector('.popup__input_role_about');
const openPopupEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector(".profile__section-title");
const profileJob = document.querySelector(".profile__section-subtitle");
const openAddPopupButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".cardsPlace");
const popupImg = popupPhoto.querySelector('.popup-image__pic');
const popupTitle = popupPhoto.querySelector('.popup-image__title');
const templateElement = document.querySelector("#card-template").content.querySelector(".element");
const cardsName = document.querySelector('.popup__input_NameCard');
const cardsDescription = document.querySelector('.popup__input_UrlCard');

import {initialCards} from './cards.js'

function openPopup(item) {
  item.classList.add("popup_opened");
  }
  
  function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditCard);
  }
  
  function openPopupAdd() {
  openPopup(popupAddPhoto);
  }
  
  function openPopupCard(img, title) {
  popupImg.src = img;
  popupImg.alt = title;
  popupTitle.textContent = title;
  openPopup(popupPhoto);
  }
  
  function closePopup(popup) {
  popup.classList.remove("popup_opened");
  }
  
  function setProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  }
  
  function handleFormSubmitProfile(e) {
  e.preventDefault();
  setProfile();
  closePopup(e.target.closest(".popup"));
  }
  
  function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = cardsName.value;
  const valueUrl = cardsDescription.value;
  const cardElement = createCard(valueName, valueUrl);
  closePopup(e.target.closest(".popup"));
  renderCard(cardElement);
  }
  
  closeBtn.forEach ((item) => {
  item.addEventListener("click", function () {
  closePopup(item.closest(".popup"));
  });
  });
  
  function handlelikeACard(e) {
  const like = e.target;
  like.classList.toggle("element__vector_active");
  }
  
  function createCard(name, link) {
  const cardElement = templateElement.cloneNode(true);
  const textElement = cardElement.querySelector(".element__text");
  const imgElement = cardElement.querySelector(".element__img");
  textElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;
  addEvent(imgElement, cardElement, name, link);
  return cardElement;
  }
  
  function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
  }
  
  function addEvent(imgElement, cardElement, name, link) {
  const buttonDelElement = cardElement.querySelector(".element__trash");
  buttonDelElement.addEventListener("click", function () {
  cardElement.remove();
  });
  imgElement.addEventListener("click", () => openPopupCard(link, name));
  const cardLike = cardElement.querySelector(".element__vector");
  cardLike.addEventListener("click", handlelikeACard);
  }
  
  initialCards.reverse().forEach(function (item) {
  const card = createCard(item.name, item.link);
  renderCard(card);
  });
  
  openPopupEditButton.addEventListener("click", openEditPopup);
  formProfile.addEventListener("submit", handleFormSubmitProfile);
  formCardAdd.addEventListener("submit", handleFormSubmitCard);
  openAddPopupButton.addEventListener("click", openPopupAdd);