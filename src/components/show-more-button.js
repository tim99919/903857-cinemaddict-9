import {AbstractComponent} from './abstract-component.js';

export class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  hideShowMoreButton() {
    this._element.classList.add(`visually-hidden`);
  }
}
