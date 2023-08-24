export default class Card {
  constructor(name, link, selectorTemplate, handleCardClick) {
    this.name = name;
    this.link = link;
    this.templateElement = document
      .querySelector(selectorTemplate)
      .content.querySelector(".element");
    this._createCard();
    this.handleCardClick = handleCardClick;
  }

  _createCard() {
    this.cardElement = this.templateElement.cloneNode(true);
    const textElement = this.cardElement.querySelector(".element__text");
    this.imgElement = this.cardElement.querySelector(".element__img");
    this.buttonDelElement = this.cardElement.querySelector(".element__trash");
    this.cardLike = this.cardElement.querySelector(".element__vector");
    textElement.textContent = this.name;
    this.imgElement.src = this.link;
    this.imgElement.alt = this.name;
    this._addCardEvent();
    return this.cardElement;
  }

  _removeCard() {
    this.cardElement.remove();
  }

  _likeCard(evt) {
    const like = evt.target;
    like.classList.toggle("element__vector_active");
  }

  _addCardEvent() {
    this.buttonDelElement.addEventListener("click", this._removeCard.bind(this));
    this.imgElement.addEventListener("click", () =>
      this.handleCardClick(this.link, this.name)
    );
    this.cardLike.addEventListener("click", this._likeCard.bind(this));
  }
  
  returnCard() {
    return this.cardElement;
  }
}