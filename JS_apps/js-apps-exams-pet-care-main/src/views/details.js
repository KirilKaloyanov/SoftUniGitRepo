import { html, nothing } from "../lib.js";
import { getById } from "../service/catalogService.js";
import { getDonationByUser, getDonationsCount } from "../service/donationService.js";

function detailsTemplate(
  { image, name, breed, age, weight, _ownerId, _id },
  user,
  userDonations,
  donations
) {
  return html`
    <section id="detailsPage">
      <div class="details">
        <div class="animalPic">
          <img src="${image}" />
        </div>
        <div>
          <div class="animalInfo">
            <h1>Name: ${name}</h1>
            <h3>Breed: ${breed}</h3>
            <h4>Age: ${age}</h4>
            <h4>Weight: ${weight}</h4>
            <h4 class="donation">Donation: ${donations * 100}$</h4>
          </div>
          <!-- if there is no registered user, do not display div-->
          ${user
            ? html`
                <div class="actionBtn">
                  <!-- Only for registered user and creator of the pets-->
                  ${user._id === _ownerId
                    ? html`
                        <a href="${`/edit/${_id}`}" class="edit">Edit</a>
                        <a href="${`/delete/${_id}`}" class="remove">Delete</a>
                      `
                    : nothing}
                  <!--(Bonus Part) Only for no creator and user-->
                  ${userDonations == 0 && user._id !== _ownerId
                    ? html` <a href="${`/donate/${_id}`}" class="donate">Donate</a> `
                    : nothing}
                </div>
              `
            : nothing}
        </div>
      </div>
    </section>
  `;
}

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const data = await getById(id);
  const user = ctx.user;
  let userDonations;
  if (user) {
    userDonations = await getDonationByUser(data._id, user._id);
  } 
  const donations = await getDonationsCount(data._id);

  ctx.render(detailsTemplate(data, user, userDonations, donations));
}
