import {createElement} from "../utils.js";

export class Sorting {
  constructor() { }

  getTemplate() {
    return `
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>
    `;
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    this._element = this._element;
  }
}
