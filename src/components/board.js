export const createBoardTemplate = (allMovies, topRatedMovies, mostCommentedMovies) => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${allMovies ? allMovies : `There are no movies in our database`}
      </div>
    </section>
    <section class="films-list--extra ${topRatedMovies ? null : `visually-hidden`}">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${topRatedMovies}
      </div>
    </section>
    <section class="films-list--extra ${mostCommentedMovies ? null : `visually-hidden`}">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${mostCommentedMovies}
      </div>
    </section>
  </section>`;
};
