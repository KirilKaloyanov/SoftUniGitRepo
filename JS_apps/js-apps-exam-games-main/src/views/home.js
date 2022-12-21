import { html } from "../lib.js";
import { getAllNew } from "../service/catalogService.js";

function homeTemplate(data) {
  return html`
    <section id="welcome-world">
      <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="/images/four_slider_img01.png" alt="hero" />

      <div id="home-page">
        <h1>Latest Games</h1>

        <!-- Display div: with information about every game (if any) -->
        ${data.length > 0
          ? data.map(createCard)
          : html` <p class="no-articles">No games yet</p> `}

        <!-- Display paragraph: If there is no games  -->
      </div>
    </section>
  `;
}

export async function homeView(ctx) {
  const recentGames = await getAllNew();
  ctx.render(homeTemplate(recentGames));
}

function createCard({ title, imageUrl, _id }) {
  return html`
    <div class="game">
      <div class="image-wrap">
        <img src="${imageUrl}" />
      </div>
      <h3>${title}</h3>
      <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </div>
      <div class="data-buttons">
        <a href="${`/details/${_id}`}" class="btn details-btn">Details</a>
      </div>
    </div>
  `;
}
