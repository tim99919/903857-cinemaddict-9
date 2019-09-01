import {getFilmData} from '../services/film-data.js';

const FILMS_COUNT = 15;

export const films = new Array(FILMS_COUNT).fill(``).map(() => getFilmData());
