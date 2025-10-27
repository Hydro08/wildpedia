let key;

function animateElements(
  selector,
  animationName = "fade-in-up",
  duration = "1500ms"
) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = `${animationName} ${duration} ease forwards`;
  });
}

const habitats = {
  air: document.getElementById("air-habitat"),
  forest: document.getElementById("forest-habitat"),
  jungle: document.getElementById("jungle-habitat"),
  desert: document.getElementById("desert-habitat"),
  sea: document.getElementById("sea-habitat"),
};

const hideAllHabitats = () => {
  Object.values(habitats).forEach((h) => {
    Object.assign(h.style, {
      width: "0%",
      opacity: "0",
      visibility: "hidden",
    });
  });
};

const container = document.getElementById("home-container");

container?.addEventListener("click", (e) => {
  const card = e.target.closest(".cards");
  if (!card) return;

  hideAllHabitats();

  key = card.id.replace("-card", "");

  if (h) {
    Object.assign(h.style, {
      width: "100%",
      opacity: "1",
      visibility: "visible",
    });

    animateElements(`#${h.id} .left-content p`);
    animateElements(`#${h.id} .left-content button`);
    animateElements(`#${h.id} .right-content .cards`);
  }
});

const habitat_block_content = document.getElementById("habitat-block-content");
const animal_block_content = document.getElementById("animal-block-content");

const animalContentByHabitat = {
  air: document.getElementById("air-habitat-content"),
  forest: document.getElementById("forest-habitat-content"),
  jungle: document.getElementById("jungle-habitat-content"),
  desert: document.getElementById("desert-habitat-content"),
  sea: document.getElementById("sea-habitat-content"),
};

const backgrounds = {
  air: "bg-air.webp",
  forest: "bg-forest.webp",
  jungle: "bg-jungle.webp",
  desert: "bg-desert.webp",
  sea: "bg-sea.webp",
};

Object.entries(backgrounds).forEach(([key, file]) => {
  const el = document.getElementById(`topic-${key}-bg`);
  el?.addEventListener("mouseover", () => {
    habitat_block_content.style.backgroundImage = `url('assets/images/background/${file}')`;
    habitat_block_content.classList.add("background-change");
  });

  el?.addEventListener("click", () => {
    habitat_text = key;
    habitat_to_animal();
  });
});

const back_habitat = document.querySelectorAll(".back-habitat");
back_habitat.forEach((b) => b.addEventListener("click", animal_to_habitat));

let habitat_text = null;

function habitat_to_animal() {
  if (!habitat_text) return;

  Object.assign(habitat_block_content.style, {
    width: "0%",
    opacity: "0",
    visibility: "hidden",
  });

  Object.assign(animal_block_content.style, {
    width: "100%",
    opacity: "1",
    visibility: "visible",
  });

  const content = animalContentByHabitat[habitat_text];
  Object.assign(content.style, {
    width: "100%",
    opacity: "1",
    visibility: "visible",
  });
}

function animal_to_habitat() {
  if (!habitat_text) return;

  Object.assign(habitat_block_content.style, {
    width: "100%",
    opacity: "1",
    visibility: "visible",
  });

  Object.assign(animal_block_content.style, {
    width: "0%",
    opacity: "0",
    visibility: "hidden",
  });

  const content = animalContentByHabitat[habitat_text];
  Object.assign(content.style, {
    width: "0%",
    opacity: "0",
    visibility: "hidden",
  });

  habitat_text = null;
}
