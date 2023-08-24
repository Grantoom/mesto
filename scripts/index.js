import initialCards from "./initialCards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const popupEditCard = document.querySelector(".popup_edit-profile");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const popupPhoto = document.querySelector(".popup-image");
const closeBtnList = document.querySelectorAll(".popup__exit");
const formProfile = document.querySelector(".popup__form_edit-profile");
const formCardAdd = document.querySelector(".popup__form_add-photo");
const nameInput = document.querySelector("#username");
const aboutInput = document.querySelector("#job");
const openPopupEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__section-title");
const profileAbout = document.querySelector(".profile__section-subtitle");
const openAddPopupButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".cardsPlace");
const popupImg = popupPhoto.querySelector(".popup-image__pic");
const popupTitle = popupPhoto.querySelector(".popup-image__title");
const cardsName = document.querySelector("#name");
const cardsDescription = document.querySelector("#link");

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

formProfile.addEventListener("submit", handleFormSubmitProfile);

function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = cardsName.value;
  const valueUrl = cardsDescription.value;

  if (valueName && valueUrl) {
    const cardElement = createCard(valueName, valueUrl, "#card-template");
    closePopup(popupAddPhoto);
    renderCard(cardElement.returnCard());
  }
}

formCardAdd.addEventListener("submit", handleFormSubmitCard);

function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
}

function openAndValidate(popup, validatorInstance) {
  if (popup === popupEditCard) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }
  validatorInstance.clearErrors();
  openPopup(popup);
  formCardAdd.reset();
}

openPopupEditButton.addEventListener("click", () =>
  openAndValidate(popupEditCard, validProfile)
);

openAddPopupButton.addEventListener("click", () =>
  openAndValidate(popupAddPhoto, validCard)
);

function openPopupCard(img, title) {
  popupImg.src = img;
  popupImg.alt = title;
  popupTitle.textContent = title;
  openPopup(popupPhoto);
}

function createCard(name, value, dir) {
  const cardElement = new Card(name, value, dir, openPopupCard);
  renderCard(cardElement.returnCard());
  return cardElement;
}

initialCards.reverse().forEach(function (item) {
  createCard(item.name, item.link, "#card-template");
});

closeBtnList.forEach((item) => {
  item.addEventListener("click", function () {
    closePopup(item.closest(".popup"));
  });
});

document.querySelectorAll(".popup").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup(e.target);
    }
  });
});
