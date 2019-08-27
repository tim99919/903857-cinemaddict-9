

export const renderShowMoreButton = (buttonContainer, filmsContainer, renderData, cardsCount, createTemplate) => {

  let content = renderData.slice(cardsCount);

  const createShowMoreButtonTemplate = () => {
    return `<button class="films-list__show-more visually-hidden">Show more</button>`;
  };

  const renderMoreFilms = () => {
    filmsContainer.insertAdjacentHTML(
        `beforeend`,
        content.splice(0, cardsCount).map((it) => createTemplate(it)).join(``)
    );
  };

  const showShowMoreButton = () => {
    if (content.length > 5) {
      button.classList.remove(`visually-hidden`);
      button.addEventListener(`click`, onShowMoreClick);
    }
  };

  const hideShowMoreButton = () => {
    if (content.length === 0) {
      button.classList.add(`visually-hidden`);
      button.removeEventListener(`click`, onShowMoreClick);
    }
  };

  const onShowMoreClick = () => {
    renderMoreFilms();
    hideShowMoreButton();
  };

  buttonContainer.insertAdjacentHTML(`beforeend`, createShowMoreButtonTemplate());

  const button = buttonContainer.querySelector(`.films-list__show-more`);

  showShowMoreButton(button);
};
