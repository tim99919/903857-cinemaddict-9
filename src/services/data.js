import {getRandomInt} from '../utils.js';
import {getComments} from './comments-data.js';

export const getFilmCard = () => ({
  title: [
    `The Shawshank Redemption`,
    `The Green Mile`,
    `Forrest Gump`,
    `Schindler's List`,
    `Intouchables`,
    `Léon`,
    `Inception`,
    `The Lion King`,
    `Fight Club`,
    `Knockin' on Heaven's Door`,
    `The Godfather `,
    `Pulp Fiction`,
    `The Prestige`,
    `A Beautiful Mind`,
    `Gladiator`
  ][getRandomInt(0, 15)],
  posterUrl: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ][getRandomInt(0, 6)],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
    .split(`. `)
    .sort(() => Math.random() - 0.5)
    .slice(0, getRandomInt(1, 3))
    .join(`. `),
  year: getRandomInt(1920, 2019),
  duration: getRandomInt(30, 120),
  raiting: (Math.random() * 10).toFixed(1),
  genres: new Set([
    `Musition`,
    `Drama`,
    `Film-Noir`
  ]),
  // commentsCount: getRandomInt(0, 50),
  userMark: null,
  director: `Kventin Tarantino`,
  writers: new Set([
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`
  ]),
  actors: new Set([
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`
  ]),
  releaseDateUTC: getRandomInt(Date.parse(`01-01-1920`), Date.now()),
  country: `USA`,
  fullDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ageRaiting: getRandomInt(0, 18),
  originalTitle: `ORIGINAL`,
  comments: new Array(getRandomInt(0, 10)).fill(``).map(() => getComments()),
});
