const revealTargets = document.querySelectorAll(".reveal-section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.16,
  },
);

revealTargets.forEach((target) => revealObserver.observe(target));

const flowSteps = document.querySelectorAll(".flow-step");

if (flowSteps.length) {
  const flowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.22,
    },
  );

  flowSteps.forEach((step) => flowObserver.observe(step));
}

const productTrack = document.querySelector(".product-track");
const productSlides = [...document.querySelectorAll(".product-slide")];
const prevProduct = document.querySelector("[data-product-prev]");
const nextProduct = document.querySelector("[data-product-next]");

if (productTrack && productSlides.length) {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  const activeIndex = () => {
    const slideWidth = productTrack.clientWidth || 1;
    return Math.round(productTrack.scrollLeft / slideWidth);
  };

  const scrollToProduct = (index) => {
    const nextIndex = (index + productSlides.length) % productSlides.length;
    productTrack.scrollTo({
      left: productSlides[nextIndex].offsetLeft,
      behavior: "smooth",
    });
  };

  productTrack.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startScrollLeft = productTrack.scrollLeft;
    productTrack.classList.add("is-dragging");
    productTrack.setPointerCapture(event.pointerId);
  });

  productTrack.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    productTrack.scrollLeft = startScrollLeft - (event.clientX - startX);
  });

  const stopDragging = () => {
    isDragging = false;
    productTrack.classList.remove("is-dragging");
  };

  productTrack.addEventListener("pointerup", stopDragging);
  productTrack.addEventListener("pointercancel", stopDragging);
  prevProduct?.addEventListener("click", () => scrollToProduct(activeIndex() - 1));
  nextProduct?.addEventListener("click", () => scrollToProduct(activeIndex() + 1));
}
