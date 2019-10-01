import { AbstractComponent } from './abstract-component';

export class SearchResult extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="result">
        <p class="result__text">Result <span class="result__count">1</span></p>
      </div>

      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">

          </div>
        </section>
      </section>
    `;
  }
}
