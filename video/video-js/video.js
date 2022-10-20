new Swiper(".intro .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

new Swiper(".gallery-box .swiper-container",{
  slidesPerView: 3,
  spaceBetween : 15,
  loop:true,
  autoplay: {
    delay:5000
  },
  navigation: {
    prevEl:'.gallery-box .swiper-prev',
    nextEl:'.gallery-box .swiper-next'
  }
  
})