(() => {

	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
	let enterNewScene = false; // 새로운 scene이 시작된 순간 true
	const sceneInfo = [
		{
			// 0
			type: 'sticky',
			heightNum: 3, 
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				pencilLogo: document.querySelector('#scroll-section-0 .pencil-logo'),
				pencil: document.querySelector('#scroll-section-0 .pencil'),
				ruler: document.querySelector('#scroll-section-0 .ruler'),
				eraser: document.querySelector('#scroll-section-0 .eraser'),
				ribbonPath: document.querySelector('.ribbon-path path')
			},
			values: {
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
				messageB_opacity_out: [1, 0, { start: 0.6, end: 0.7 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.4 }],
				pencilLogo_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
				pencilLogo_width_out: [200, 50, { start: 0.4, end: 0.8 }],
				pencilLogo_translateX_in: [-10, -20, { start: 0.2, end: 0.4 }],
				pencilLogo_translateX_out: [-20, -50, { start: 0.4, end: 0.8 }],
				pencilLogo_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],

				pencil_right: [-10, 70, { start: 0.3, end: 0.8 }],
				pencil_bottom: [-80, 100, { start: 0.3, end: 0.8 }],
				pencil_rotate: [-120, -200, { start: 0.3, end: 0.8 }],

				ruler_right: [-10, 100, { start: 0.3, end: 0.8 }],
				ruler_bottom: [-80, 130, { start: 0.3, end: 0.8 }],
				ruler_rotate: [-100, -180, { start: 0.3, end: 0.8 }],

				eraser_right: [-20, 100, { start: 0.3, end: 0.8 }],
				eraser_bottom: [-160, 120, { start: 0.3, end: 0.8 }],
				eraser_rotate: [-100, -10, { start: 0.3, end: 0.8 }],

				path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
				path_dashoffset_out: [0, -1401, { start: 0.6, end: 0.8 }]
			}
		}
	];

	function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if (sceneInfo[i].type === 'normal')  {
                // objs.content가 없는 경우, sceneInfo에 objs.content를 추가해야 합니다.
				// 예를들어 아래의 구조라면, content는 섹션의 내용을 통째로 감싸는 .description으로 지정해주시면 됩니다.
				// 강의에서 진행하는 메인 소스(main.js)에 구현되어 있는 부분을 참고하시면 쉽습니다.
				// <section class="scroll-section">
				//     <div class="description">
				//         lorem ipsum
				//     </div>
				// </section>
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
			}
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.pageYOffset;

		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`);
	}

	function calcValues(values, currentYOffset) {
		let rv;
		// 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		switch (currentScene) {
			case 0:
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.55) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
				}

				// 크기가 커져도 깨지지 않는 SVG의 장점을 살리기 위해 transform scale 대신 width를 조정
				if (scrollRatio <= 0.4) {
					objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_in, currentYOffset)}vw`;
					objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_in, currentYOffset)}%, -50%)`;
				} else {
					objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_out, currentYOffset)}vw`;
					objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_out, currentYOffset)}%, -50%)`;
				}

				// Ribbon path
				if (scrollRatio <= 0.5) {
					objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
				} else {
					objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
				}

				objs.pencilLogo.style.opacity = calcValues(values.pencilLogo_opacity_out, currentYOffset);
				objs.pencil.style.right = `${calcValues(values.pencil_right, currentYOffset)}%`;
				objs.pencil.style.bottom = `${calcValues(values.pencil_bottom, currentYOffset)}%`;
				objs.pencil.style.transform = `rotate(${calcValues(values.pencil_rotate, currentYOffset)}deg)`;

				objs.ruler.style.right = `${calcValues(values.ruler_right, currentYOffset)}%`;
				objs.ruler.style.bottom = `${calcValues(values.ruler_bottom, currentYOffset)}%`;
				objs.ruler.style.transform = `rotate(${calcValues(values.ruler_rotate, currentYOffset)}deg)`;

				objs.eraser.style.right = `${calcValues(values.eraser_right, currentYOffset)}%`;
				objs.eraser.style.bottom = `${calcValues(values.eraser_bottom, currentYOffset)}%`;
				objs.eraser.style.transform = `rotate(${calcValues(values.eraser_rotate, currentYOffset)}deg)`;

				break;	
		}
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;

		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if (yOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			document.body.classList.remove('scroll-effect-end');
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			if (currentScene === sceneInfo.length - 1) {
				document.body.classList.add('scroll-effect-end');
			}
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			}
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (enterNewScene) return;

		playAnimation();
	}

	window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
		setLayout();

        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            scrollLoop();
  		});

		  const toTopEl = document.querySelector('#to-top')

        window.addEventListener('scroll', _.throttle(function(){
            if(window.scrollY > 5000){
                toTopEl.style.visibility = "visible"
                gsap.to('#to-top', .2,{
                    x:0
                })
            }else{
                gsap.to('#to-top', .2,{
                    x:100
                })
            }
        },300))
        
        toTopEl.addEventListener('click', ()=>{
           gsap.to(window, .7, {
            scrollTo: 0
           })
        })

		const menuAbouts = document.querySelectorAll('.menu-about')
		menuAbouts.forEach((menuAbout)=>{
			menuAbout.addEventListener('click', ()=>{
				const moveToIntro = document.querySelector('#movetointro').offsetTop
				window.scrollTo({top: moveToIntro, behavior:'smooth'})
			})
		})
		
		const menuWorks = document.querySelectorAll('.menu-work')
		menuWorks.forEach((menuWork)=>{
			menuWork.addEventListener('click', ()=>{
				const moveToWork = document.querySelector('#movetowork').offsetTop
				window.scrollTo({top: moveToWork, behavior:'smooth'})
			})
		})

		const menuContacts = document.querySelectorAll('.menu-contact')
		menuContacts.forEach((menuContact)=>{
			menuContact.addEventListener('click', ()=>{
				const moveToContact = document.querySelector('#movetocontact').offsetTop
				window.scrollTo({top: moveToContact, behavior:'smooth'})
			})
		})

		const burgerCheck = document.querySelector('.burger-check')
		
		
		burgerCheck.addEventListener('click',()=>{
			if(burgerCheck.checked){
				document.body.classList.add('stop-scroll')
				document.querySelector('.wrapper').classList.add('active')
			}else{
				document.body.classList.remove('stop-scroll')
				document.querySelector('.wrapper').classList.remove('active')
			}
			
		})

		const mobileMenuItems = document.querySelectorAll('.menu-mobile div a')
		mobileMenuItems.forEach((item)=>{
			item.addEventListener('click',()=>{
				//클릭이되면 전체 영역 삭제
				document.querySelector('.wrapper').classList.remove('active')
				document.body.classList.remove('stop-scroll')
			})
		})

		const btnToggle = document.querySelector('.viewmore')
		const extraBox = document.querySelector('.blog-extra-wrapper')
		let isHideDescription = false;

		btnToggle.addEventListener('click', ()=>{
			isHideDescription = !isHideDescription
			if(isHideDescription){
				extraBox.classList.add('active')
				btnToggle.innerHTML = 'View less'
			}else{
				extraBox.classList.remove('active')
				btnToggle.innerHTML = 'View more'
			}
		})

		const projectRelocation = document.querySelector('.project.javascript')
		console.log(projectRelocation)

		projectRelocation.addEventListener('click', ()=>{

			if(window.innerWidth >= 1025 && window.innerWidth <= 1900){
				window.location.href = '/mini-web-project/index.html'
			}else{
				window.location.href = '/mini-projects/index.html'
			}
			// if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){

			// 	const screenWidth = screen.availWidth
			// 	if(screenWidth >= 1919 || window.innerWidth < 769){
			// 		window.location.href = './mini-projects/index.html'
			// 	}else{
			// 		window.location.href = './mini-web-project/index.html'
			// 	}
			//   }else{
			// 	window.location.href = './mini-projects/index.html'
			//   }
		})

  		window.addEventListener('resize', () => {
  			if (window.innerWidth > 900) {
  				setLayout();
			}
  		});


  		window.addEventListener('orientationchange', () => {
  			setTimeout(setLayout, 500);
		});
		  
		document.querySelector('.loading').addEventListener('transitionend', (e) => {
			document.body.removeChild(e.currentTarget);
		});

	});

	AOS.init();

})();


