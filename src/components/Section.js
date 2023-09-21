export default class Section {
  constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  
  renderItems(data) {
    for (let index = data.length - 1; index >= 0; index--) {
      this._renderer(data[index]);
    }
  }
}