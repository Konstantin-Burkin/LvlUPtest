$(document).ready(function () {
  // Таймер обратного отсчета
  let timerDuration = 30 * 60; // 30 минут в секундах
  const timerElement = $("#timer");
  const interval = setInterval(() => {
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    timerElement.text(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    timerDuration--;
    if (timerDuration < 0) {
      clearInterval(interval);
      timerElement.text("Время вышло");
    }
  }, 1000);

  // Подсказки при фокусе на инпуты
  $(".form-input")
    .focus(function () {
      $(this).next(".tooltip").fadeIn();
    })
    .blur(function () {
      $(this).next(".tooltip").fadeOut();
    });

  // Разрешить ввод только цифр в поле телефона
  $("#phone").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  // Плавный скролл к форме заказа
  $(".btn-order").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      1000
    );
  });

  // Слайдер отзывов
  let currentIndex = 0;
  const reviews = $(".review");
  const dots = $(".dot");
  const carousel = $(".carousel");
  let autoSlideInterval;
  const intervalTime = 5000;

  function updateCarousel(index) {
    reviews.css("transform", `translateX(-${index * 100}%)`);
    dots.removeClass("active").eq(index).addClass("active");
  }

  function nextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    updateCarousel(currentIndex);
  }

  function prevReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    updateCarousel(currentIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextReview, intervalTime);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();

  carousel.mouseenter(stopAutoSlide).mouseleave(startAutoSlide);

  $(".next").click(nextReview);

  $(".prev").click(prevReview);

  dots.click(function () {
    currentIndex = $(this).index();
    updateCarousel(currentIndex);
  });
});
