export default class Card {
    constructor(name, link, selectorTemplate, handleCardClick) {
      this.name = name;
      this.link = link;
      this.TemplateElement = document.querySelector(selectorTemplate).content.querySelector('.element');
      this._createCard()
      this.handleCardClick = handleCardClick;
    }

    



  }