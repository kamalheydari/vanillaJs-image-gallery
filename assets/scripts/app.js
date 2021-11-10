// getElement function
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(
      `please check "${selection}" selector, no such element exist`
    );
  }
}

class Gallery {
  constructor(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];

    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.imageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");

    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    });
  }

  openModal = (selectedImage, list) => {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map((img) => {
        return `<img
          src="${img.src}"
          title="${img.title}"
          data-id="${img.dataset.id}"
          alt="city"
          class="${
            selectedImage.dataset.id === img.dataset.id
              ? "modal-img selected"
              : "modal-img"
          }"
        />`;
      })
      .join("");
    this.modal.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeModal);
    this.nextBtn.addEventListener("click", this.nextImg);
    this.prevBtn.addEventListener("click", this.prevImg);
    this.modalImages.addEventListener("click", this.chooseImg);
  };

  setMainImage = (selectedImage) => {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  };
  closeModal = () => {
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImg);
    this.prevBtn.removeEventListener("click", this.prevImg);
    this.modalImages.removeEventListener("click", this.chooseImg);
  };
  nextImg = () => {
    const selcted = this.modalImages.querySelector(".selected");
    const next =
      selcted.nextElementSibling || this.modalImages.firstElementChild;
    selcted.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
  };
  prevImg = () => {
    const selcted = this.modalImages.querySelector(".selected");
    const prev =
      selcted.previousElementSibling || this.modalImages.lastElementChild;
    selcted.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
  };
  chooseImg = (e) => {
    if (e.target.classList.contains("modal-img")) {
      const selected = this.modalImages.querySelector(".selected");
      selected.classList.remove("selected");
      this.setMainImage(e.target);
      e.target.classList.add("selected");
    }
  };
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
