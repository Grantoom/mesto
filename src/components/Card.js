export default class Card {
  constructor(name, link, selectorTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._selectorTemplate = selectorTemplate;

    this._cardElement = this._createCard();
  }

  _createCard() {
    const cardElement = this._getTemplateElement().content.querySelector(".element").cloneNode(true);
    const textElement = cardElement.querySelector(".element__text");
    this._imgElement = cardElement.querySelector(".element__img");
    this._buttonDelElement = cardElement.querySelector(".element__trash");
    this._cardLike = cardElement.querySelector(".element__vector");

    textElement.textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;

    this._addCardEvents();

    return cardElement;
  }

  _getTemplateElement() {
    return document.querySelector(this._selectorTemplate);
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _likeCard() {
    this._cardLike.classList.toggle("element__vector_active");
  }

  _addCardEvents() {
    this._buttonDelElement.addEventListener("click", () => this._removeCard());
    this._imgElement.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    this._cardLike.addEventListener("click", () => this._likeCard());
  }

  getCard() {
    return this._cardElement;
  }
}
