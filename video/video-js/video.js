new Swiper(".intro .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


let ww = window.innerWidth;
let swiper;

responsiveSwiper()

function initSwiper(slideNum){
  if(swiper)
  swiper.destroy();

  return swiper = new Swiper(".gallery-box .swiper-container",{
    slidesPerView: slideNum,
    spaceBetween : 15,
    loop:true,
    autoplay: {
      delay:5000
    },
    pagination: {
      el: '.gallery-box .swiper-pagination', //페이지 번호 요소 선택자
      clickable: true
    },
  })

}

function responsiveSwiper(){
  if(ww >= 1000){
    initSwiper(3)
  }else if(ww < 1000 && ww >= 500){
    initSwiper(2)
  }else{
    initSwiper(1)
  }
}


window.addEventListener('resize', ()=>{
  ww = window.innerWidth;
  responsiveSwiper()
})