import {AbstractComponent} from './abstract-component';
import {msToDays} from '../utils.js';

export class Comment extends AbstractComponent {
  constructor({emotion, text, author, date}) {
    super();
    this._emotion = emotion;
    this._text = text;
    this._author = author;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src=${this._emotion} width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${this._text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._author}</span>
            <span class="film-details__comment-day">${msToDays(Date.now() - this._date)} days ago</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  }
}
