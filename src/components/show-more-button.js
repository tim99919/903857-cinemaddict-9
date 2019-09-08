import {createElement, render, Position} from "../utils.js";

export class ShowMoreButton {
  constructor({targetContainer, renderElements, cardsCount}) {
    // this._buttonContainer = buttonContainer;
    this._targetContainer = targetContainer;
    this._renderElements = renderElements;
    this._cardsCount = cardsCount;
    // this._createTemplate = createTemplate;
    // this._content = this._renderData.slice(cardsCount);
    this._element = null;
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  showMoreFilms() {
    this._renderElements.splice(0, this._cardsCount).forEach((it) => render(this._targetContainer, it, Position.BEFOREEND));
  }

  // showShowMoreButton() {
  //   if (this._renderElements.length) {
  //     this._element.classList.remove(`visually-hidden`);
  //     this._element.addEventListener(`click`, this.onShowMoreClick);
  //   }
  // }

  hideShowMoreButton() {
    // if (!this._renderElements.length) {
      this._element.classList.add(`visually-hidden`);
      // this._element.removeEventListener(`click`, this.onShowMoreClick);
    // }
  }

  onShowMoreButtonClick() {
    return () => {
      this.showMoreFilms();
      this.hideShowMoreButton();
    };
  }
}
