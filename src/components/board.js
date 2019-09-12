import {AbstractComponent} from './abstract-component';

export class Board extends AbstractComponent {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title">All movies. Upcoming</h2>
          <div class="films-list__container">

          </div>
        </section>
        <section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container">

          </div>
        </section>
        <section class="films-list--extra">
          <h2 class="films-list__title">Most commented</h2>
          <div class="films-list__container">

          </div>
        </section>
      </section>
    `;
  }
}
