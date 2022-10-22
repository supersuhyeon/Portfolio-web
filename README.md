![ezgif com-gif-maker (19)](https://user-images.githubusercontent.com/94214512/197362775-0ad8da01-ff22-4b4c-9122-b7f64c4cea7a.gif)

This is my personal website. You can check out my portfolio of projects like a responsive website, JavaScript mini-game, 2D graphics, and video contents that I made! All of them are responsive so you can browse with different devices<br>
[suhyeonkim-website](https://moonlit-moxie-a93f38.netlify.app/)

### Languages<br>

HTML, CSS, and JavaScript

### Features

**1. scroll interactiveness**<br>
![ezgif com-gif-maker (17)](https://user-images.githubusercontent.com/94214512/197360932-0653730e-e738-4812-8af1-6425febe2bf2.gif) <br>
![scroll01](https://user-images.githubusercontent.com/94214512/197361204-4f5aca06-dc76-4758-a213-c6ff03619b4b.png)<br>
I learned about scroll interactions in one of my projects called 'Airmug pro' and applied that scroll concept to my portfolio website. <br>

1. Set the height of each scroll section to three times the height of the browser. <br>
2. An animation attribute is determined, and the start and end values of the attribute and the end positions of the start and end positions in one section are determined as proportions.<br> (messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }])<br>
3. Find the scrolled range in the current scroll section as a percentage. (currentYOffset/scrollHeight)
4. In the current scroll section, the start and end points to run the animation are obtained as ratios.
5. Assign the ratio to the animation property.<br>

**2. All different projects**
![ezgif com-gif-maker (18)](https://user-images.githubusercontent.com/94214512/197362423-b678db0d-3fc3-4189-83bf-25b0720d2dda.gif)
you can view all the different projects using a desktop, tablet or mobile device! <br>
When I started learning Javascript a few months ago using Swiperjs while making a website,
I couldn't code to make swiper slide responsively so I used to make two exactly identical swiper slides, one for desktop and one for mobile. After figuring it out, I know now to create a function, customize Swiperjs options and resize the eventlistener.

```js
let ww = window.innerWidth;
let swiper;

responsiveSwiper();

function initSwiper(slideNum) {
  if (swiper) swiper.destroy();

  return (swiper = new Swiper(".gallery-box .swiper-container", {
    slidesPerView: slideNum,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".gallery-box .swiper-pagination",
      clickable: true,
    },
  }));
}

function responsiveSwiper() {
  if (ww >= 1000) {
    initSwiper(3);
  } else if (ww < 1000 && ww >= 500) {
    initSwiper(2);
  } else {
    initSwiper(1);
  }
}

window.addEventListener("resize", () => {
  ww = window.innerWidth;
  responsiveSwiper();
});
```

### Self-reflection

I believe that making my own website from scratch was a great exercise to practice and develop my coding skills. The project had an added layer of difficulty because no one was there to tell me how to solve the errors and problems! Sometimes it took me 2-3 hours to find a solution but I believe that it wasn't time wasted. After learning how to use reacthook, I will immediately start working on a React project.
