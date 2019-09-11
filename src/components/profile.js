import {AbstractComponent} from './abstract-component.js';
import {getUserRank} from '../services/user-rank.js';

export class Profile extends AbstractComponent {
  constructor(watchedFilms) {
    super();
    this._watchedFilms = watchedFilms;
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">
          ${getUserRank(this._watchedFilms)}
        </p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `;
  }
}
