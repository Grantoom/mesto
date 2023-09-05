export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this._cardElement = this._createCard();
  }

  _createCard() {
    const cardElement = this._getTemplateElement().content.querySelector(".element").cloneNode(true);
    const textElement = cardElement.querySelector(".element__text");
    const imgElement = cardElement.querySelector(".element__img");
    this._imgElement = imgElement;
    this._buttonDelElement = cardElement.querySelector(".element__trash");
    this._cardLike = cardElement.querySelector(".element__vector");
  
    textElement.textContent = this._name;
    imgElement.src = this._link;
    imgElement.alt = this._name;
  
    this._addCardEvents();
  
    return cardElement;
  }
  
  _getTemplateElement() {
    return document.querySelector(this._templateSelector);
  }

  _removeCard() {
    this._buttonDelElement.removeEventListener("click", this._buttonDelClickHandler);
    this._imgElement.removeEventListener("click", this._imgClickHandler);
    this._cardLike.removeEventListener("click", this._cardLikeClickHandler);

    this._cardElement.remove();
    this._cardElement = null;
  }

  _likeCard() {
    this._cardLike.classList.toggle("element__vector_active");
  }

  _addCardEvents() {
    this._buttonDelClickHandler = () => this._removeCard();
    this._imgClickHandler = () => this._handleCardClick(this._link, this._name);
    this._cardLikeClickHandler = () => this._likeCard();

    this._buttonDelElement.addEventListener("click", this._buttonDelClickHandler);
    this._imgElement.addEventListener("click", this._imgClickHandler);
    this._cardLike.addEventListener("click", this._cardLikeClickHandler);
  }

  generateCard() {
    return this._cardElement;
  }
}