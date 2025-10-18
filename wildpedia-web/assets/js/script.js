const navLinks = document.querySelectorAll(".ul-container p");
const home_link = document.getElementById("home-link");
let currentActive = home_link;

const home_container = document.getElementById("home-container");
const about_container = document.getElementById("about-container");
const topic_container = document.getElementById("topic-container");
const creators_container = document.getElementById("creators-container");

const explore_btn = document.getElementById("explore-btn");

const habitat_block_content = document.getElementById("habitat-block-content");
const animal_block_content = document.getElementById("animal-block-content");

const topic_air_bg = document.getElementById("topic-air-bg");
const topic_forest_bg = document.getElementById("topic-forest-bg");
const topic_jungle_bg = document.getElementById("topic-jungle-bg");
const topic_desert_bg = document.getElementById("topic-desert-bg");
const topic_sea_bg = document.getElementById("topic-sea-bg");

const back_habitat = document.getElementById("back-habitat");

function habitat_to_animal() {
  habitat_block_content.style.width = "0%";
  animal_block_content.style.width = "100%";

  habitat_block_content.style.visibility = "none";
  animal_block_content.style.visibility = "visible";

  habitat_block_content.style.opacity = "0";
  animal_block_content.style.opacity = "1";
}

function animal_to_habitat() {
  habitat_block_content.style.width = "100%";
  animal_block_content.style.width = "0%";

  habitat_block_content.style.visibility = "visible";
  animal_block_content.style.visibility = "hidden";

  habitat_block_content.style.opacity = "1";
  animal_block_content.style.opacity = "0";
}

back_habitat.addEventListener("click", () => {
  animal_to_habitat();
});

topic_air_bg.addEventListener("click", () => {
  habitat_to_animal();
});

topic_air_bg.addEventListener("mouseover", () => {
  habitat_block_content.style.backgroundImage =
    "url('assets/images/background/bg-air.webp')";
  habitat_block_content.classList.add("background-change");
});

topic_forest_bg.addEventListener("mouseover", () => {
  habitat_block_content.style.backgroundImage =
    "url('assets/images/background/bg-forest.webp')";
  habitat_block_content.classList.add("background-change");
});

topic_jungle_bg.addEventListener("mouseover", () => {
  habitat_block_content.style.backgroundImage =
    "url('assets/images/background/bg-jungle.webp')";
  habitat_block_content.classList.add("background-change");
});

topic_desert_bg.addEventListener("mouseover", () => {
  habitat_block_content.style.backgroundImage =
    "url('assets/images/background/bg-desert.webp')";
  habitat_block_content.classList.add("background-change");
});

topic_sea_bg.addEventListener("mouseover", () => {
  habitat_block_content.style.backgroundImage =
    "url('assets/images/background/bg-sea.webp')";
  habitat_block_content.classList.add("background-change");
});

const habitats = {
  air: document.getElementById("air-habitat"),
  forest: document.getElementById("forest-habitat"),
  jungle: document.getElementById("jungle-habitat"),
  desert: document.getElementById("desert-habitat"),
  sea: document.getElementById("sea-habitat"),
};

const container = document.getElementById("home-container");

container.addEventListener("click", (e) => {
  const card = e.target.closest(".cards");
  if (!card) return;

  const id = card.id;

  Object.values(habitats).forEach((h) => {
    h.style.width = "0%";
    h.style.opacity = "0";
    h.style.visibility = "hidden";
  });

  if (id === "air-card") showHabitat("air");
  else if (id === "forest-card") showHabitat("forest");
  else if (id === "jungle-card") showHabitat("jungle");
  else if (id === "desert-card") showHabitat("desert");
  else if (id === "sea-card") showHabitat("sea");
});

function showHabitat(name) {
  const h = habitats[name];
  h.style.width = "100%";
  h.style.opacity = "1";
  h.style.visibility = "visible";
}

function showHabitat(name) {
  const h = habitats[name];

  h.style.width = "100%";
  h.style.opacity = "1";
  h.style.visibility = "visible";

  const paragraphs = h.querySelectorAll(".left-content p");
  const buttons = h.querySelectorAll(".left-content button");
  const cards = h.querySelectorAll(".right-content div");
  paragraphs.forEach((p) => {
    p.style.animation = "none";
    p.offsetHeight;
    p.style.animation = "fade-in-up 1500ms ease";
  });
  buttons.forEach((btn) => {
    btn.style.animation = "none";
    btn.offsetHeight;
    btn.style.animation = "fade-in-up 1500ms ease";
  });
  cards.forEach((c) => {
    c.style.animation = "none";
    c.offsetHeight;
    c.style.animation = "fade-in-up 1500ms ease";
  });
}

explore_btn.addEventListener("click", () => {
  document.getElementById("topic-link").click();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("link-active"));

    currentActive = link;
    link.classList.add("link-active");

    if (link.id === "home-link") {
      home_container.style.width = "100%";
      about_container.style.width = "0%";
      topic_container.style.width = "0%";
      creators_container.style.width = "0%";

      home_container.style.visibility = "visible";
      about_container.style.visibility = "hidden";
      topic_container.style.visibility = "hidden";
      creators_container.style.visibility = "hidden";

      home_container.style.opacity = "1";
      about_container.style.opacity = "0";
      topic_container.style.opacity = "0";
      creators_container.style.opacity = "0";

      const paragraphs = document.querySelectorAll(".left-content p");
      const buttons = document.querySelectorAll(".left-content button");
      const cards = document.querySelectorAll(".right-content div");
      paragraphs.forEach((p) => {
        p.style.animation = "none";
        p.offsetHeight;
        p.style.animation = "fade-in-up 1500ms ease";
      });
      buttons.forEach((btn) => {
        btn.style.animation = "none";
        btn.offsetHeight;
        btn.style.animation = "fade-in-up 1500ms ease";
      });
      cards.forEach((c) => {
        c.style.animation = "none";
        c.offsetHeight;
        c.style.animation = "fade-in-up 1500ms ease";
      });
    } else if (link.id === "about-link") {
      home_container.style.width = "0%";
      about_container.style.width = "100%";
      topic_container.style.width = "0%";
      creators_container.style.width = "0%";

      home_container.style.visibility = "hidden";
      about_container.style.visibility = "visible";
      topic_container.style.visibility = "hidden";
      creators_container.style.visibility = "hidden";

      home_container.style.opacity = "0";
      about_container.style.opacity = "1";
      topic_container.style.opacity = "0";
      creators_container.style.opacity = "0";

      const about_paragraph = document.querySelectorAll(
        ".about-container .block-content .content p, .about-container .block-content .content li"
      );

      about_paragraph.forEach((a) => {
        a.style.animation = "none";
        a.offsetHeight;
        a.style.animation = "scale-animation 1s ease";
      });
    } else if (link.id === "topic-link") {
      home_container.style.width = "0%";
      about_container.style.width = "0%";
      topic_container.style.width = "100%";
      creators_container.style.width = "0%";

      home_container.style.visibility = "hidden";
      about_container.style.visibility = "hidden";
      topic_container.style.visibility = "visible";
      creators_container.style.visibility = "hidden";

      home_container.style.opacity = "0";
      about_container.style.opacity = "0";
      topic_container.style.opacity = "1";
      creators_container.style.opacity = "0";
    } else if (link.id === "creators-link") {
      home_container.style.width = "0%";
      about_container.style.width = "0%";
      topic_container.style.width = "0%";
      creators_container.style.width = "100%";

      home_container.style.visibility = "hidden";
      about_container.style.visibility = "hidden";
      topic_container.style.visibility = "hidden";
      creators_container.style.visibility = "visible";

      home_container.style.opacity = "0";
      about_container.style.opacity = "0";
      topic_container.style.opacity = "0";
      creators_container.style.opacity = "1";
    }
  });
  link.addEventListener("mouseenter", () => {
    navLinks.forEach((item) => item.classList.remove("link-active"));

    link.classList.add("link-active");
  });
  link.addEventListener("mouseleave", () => {
    navLinks.forEach((item) => item.classList.remove("link-active"));

    if (currentActive) {
      currentActive.classList.add("link-active");
    }
  });
});

function visit() {
  const nav_container = document.getElementById("nav-container");
  const title_left = document.getElementById("title-left");
  const visit_btn = document.getElementById("visit-btn");
  const main_container = document.getElementById("main-container");
  nav_container.classList.remove("nav-container");
  nav_container.classList.add("nav-container-active");
  title_left.classList.remove("title-left");
  title_left.classList.add("title-left-new");
  main_container.classList.remove("main-container");
  main_container.classList.add("new-main-container");

  visit_btn.style.display = "none";
}

function title_left() {
  const nav_container = document.getElementById("nav-container");
  const title_left = document.getElementById("title-left");
  const visit_btn = document.getElementById("visit-btn");
  const main_container = document.getElementById("main-container");
  nav_container.classList.add("nav-container");
  nav_container.classList.remove("nav-container-active");
  title_left.classList.add("title-left");
  title_left.classList.remove("title-left-new");
  main_container.classList.add("main-container");
  main_container.classList.remove("new-main-container");

  visit_btn.style.display = "block";
}
