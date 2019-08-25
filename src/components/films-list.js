export const createFilmsListTemplate = ({title, content, isExtra, isHidden}) => {
  return `<section class="films-list${isExtra ? `--extra` : ``}">
    <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
    <div class="films-list__container">
      ${content}
    </div>
  </section>`;
};
