import {getRandomInt} from "../utils.js";

export const getComments = () => ({
  emotion: [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`,
  ][getRandomInt(0, 3)],
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
    .split(`. `)
    .sort(() => Math.random() - 0.5)
    .slice(0, getRandomInt(1, 3))
    .join(`. `),
  author: [
    `Tim Macoveev`,
    `Alexey Belyavskiy`,
    `Timofey Ponomarev`,
    `Igor Nikolaev`
  ][getRandomInt(0, 3)],
  date: Date.now() - 1 - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
});
