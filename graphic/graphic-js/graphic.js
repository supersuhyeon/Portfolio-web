new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  const goTopEl = document.querySelector('#to-top')
  const imgboxes = document.querySelectorAll('.imgbox')
  imgboxes.forEach((imgbox)=>{
    imgbox.addEventListener('click',(event)=>{
        imgbox.children[1].classList.remove('hidden')
        document.body.classList.add("stop-scroll")
        gsap.to(goTopEl, .6, {
            opacity : 0
        })
        if(event.target.classList.contains('closebtnelem')){
            imgbox.children[1].classList.add('hidden')
            document.body.classList.remove("stop-scroll")
            gsap.to(goTopEl, .6, {
                opacity: 1,
            })
        }
    })
  })

  const loadImg = ()=>{
    const preLoadImgSrc = ['./images/monsquadmodel.png', './images/daldaguri2.png', './images/cow2.png', './images/kloudslide.png', './images/thumnail.jpg']
    preLoadImgSrc.forEach(arr=>{
        const img = new Image();
        img.src = arr;
    })
}


loadImg()