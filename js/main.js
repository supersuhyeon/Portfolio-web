(() => {

	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
	let enterNewScene = false; // 새로운 scene이 시작된 순간 true
	const sceneInfo = [
		{
			// 0
			type: 'sticky',
			heightNum: 5, 
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				messageC: document.querySelector('#scroll-section-0 .main-message.c'),
				// messageD: document.querySelector('#scroll-section-0 .main-message.d'),
				canvas: document.querySelector('#video-canvas-0'),
				context: document.querySelector('#video-canvas-0').getContext('2d'),
				videoImages: [],
				ribbonPath: document.querySelector('.ribbon-path path')
				// container: document.querySelector('#scroll-section-0'),
				// messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				// messageB: document.querySelector('#scroll-section-0 .main-message.b'),

				// messageC: document.querySelector('#scroll-section-0 .main-message.c'),

				// pencilLogo: document.querySelector('#scroll-section-0 .pencil-logo'),
				// pencil: document.querySelector('#scroll-section-0 .pencil'),
				// ruler: document.querySelector('#scroll-section-0 .ruler'),
				// eraser: document.querySelector('#scroll-section-0 .eraser'),
				// ribbonPath: document.querySelector('.ribbon-path path')
			},
			values: {
				// messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				// messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
				// messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				// messageA_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
				// messageB_opacity_out: [1, 0, { start: 0.6, end: 0.7 }],
				// messageA_translateY_out: [0, -20, { start: 0.3, end: 0.4 }],
				// pencilLogo_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
				// pencilLogo_width_out: [200, 50, { start: 0.4, end: 0.8 }],
				// pencilLogo_translateX_in: [-10, -20, { start: 0.2, end: 0.4 }],
				// pencilLogo_translateX_out: [-20, -50, { start: 0.4, end: 0.8 }],
				// pencilLogo_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],

				// pencil_right: [-10, 70, { start: 0.3, end: 0.8 }],
				// pencil_bottom: [-80, 100, { start: 0.3, end: 0.8 }],
				// pencil_rotate: [-120, -200, { start: 0.3, end: 0.8 }],

				// ruler_right: [-10, 100, { start: 0.3, end: 0.8 }],
				// ruler_bottom: [-80, 130, { start: 0.3, end: 0.8 }],
				// ruler_rotate: [-100, -180, { start: 0.3, end: 0.8 }],

				// eraser_right: [-20, 100, { start: 0.3, end: 0.8 }],
				// eraser_bottom: [-160, 120, { start: 0.3, end: 0.8 }],
				// eraser_rotate: [-100, -10, { start: 0.3, end: 0.8 }],

				// path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
				// path_dashoffset_out: [0, -1401, { start: 0.6, end: 0.8 }]
				// videoImageCount: 300,
				// imageSequence: [0, 299],
				// canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
				// messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				// messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				// messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				// // messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				// messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				// messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				// messageC_translateY_in: [5, 0, { start: 0.5, end: 0.6 }],
				// // messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				// messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				// messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				// messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				// // messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				// messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				// messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				// messageC_translateY_out: [0, -5, { start: 0.65, end: 0.7 }],
				// // messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				// path_dashoffset_in: [1401, 0, { start: 0.5, end: 0.6 }],
				// path_dashoffset_out: [0,-1401, { start: 0.65, end: 0.7 }]
				videoImageCount: 300,
				imageSequence: [0, 299],
				canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.3 }],
				messageB_opacity_in: [0, 1, { start: 0.4, end: 0.6 }],
				messageC_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				// messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.3 }],
				messageB_translateY_in: [20, 0, { start: 0.4, end: 0.6 }],
				messageC_translateY_in: [5, 0, { start: 0.7, end: 0.8 }],
				// messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.35, end: 0.4 }],
				messageB_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				// messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.35, end: 0.4 }],
				messageB_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageC_translateY_out: [0, -5, { start: 0.85, end: 0.9 }],
				// messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				path_dashoffset_in: [1401, 0, { start: 0.7, end: 0.8 }],
				path_dashoffset_out: [0,-1401, { start: 0.85, end: 0.9 }]
			}
		}
	];

	function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if (sceneInfo[i].type === 'normal')  {
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
				objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

				if (scrollRatio <= 0.32) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
					
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
				}

				// if (scrollRatio <= 0.22) {
				// 	// in
				// 	objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
				// 	objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				// } else {
				// 	// out
				// 	objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
				// 	objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				// }

				// if (scrollRatio <= 0.42) {
				// 	// in
				// 	objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
				// 	objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				// } else {
				// 	// out
				// 	objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
				// 	objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				// }

				// if (scrollRatio <= 0.62) {
				// 	// in
				// 	objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
				// 	objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				// 	objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
					
				// } else {
				// 	// out
				// 	objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
				// 	objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				// 	objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
				// }

				// if (scrollRatio <= 0.25) {
				// 	// in
				// 	objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
				// 	objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				// } else {
				// 	// out
				// 	objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
				// 	objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				// }

				// if (scrollRatio <= 0.55) {
				// 	// in
				// 	objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
				// } else {
				// 	// out
				// 	objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
				// }

				// // 크기가 커져도 깨지지 않는 SVG의 장점을 살리기 위해 transform scale 대신 width를 조정
				// if (scrollRatio <= 0.4) {
				// 	objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_in, currentYOffset)}vw`;
				// 	objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_in, currentYOffset)}%, -50%)`;
				// } else {
				// 	objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_out, currentYOffset)}vw`;
				// 	objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_out, currentYOffset)}%, -50%)`;
				// }

				// // Ribbon path
				// if (scrollRatio <= 0.5) {
				// 	objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
				// } else {
				// 	objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
				// }

				// objs.pencilLogo.style.opacity = calcValues(values.pencilLogo_opacity_out, currentYOffset);
				// objs.pencil.style.right = `${calcValues(values.pencil_right, currentYOffset)}%`;
				// objs.pencil.style.bottom = `${calcValues(values.pencil_bottom, currentYOffset)}%`;
				// objs.pencil.style.transform = `rotate(${calcValues(values.pencil_rotate, currentYOffset)}deg)`;

				// objs.ruler.style.right = `${calcValues(values.ruler_right, currentYOffset)}%`;
				// objs.ruler.style.bottom = `${calcValues(values.ruler_bottom, currentYOffset)}%`;
				// objs.ruler.style.transform = `rotate(${calcValues(values.ruler_rotate, currentYOffset)}deg)`;

				// objs.eraser.style.right = `${calcValues(values.eraser_right, currentYOffset)}%`;
				// objs.eraser.style.bottom = `${calcValues(values.eraser_bottom, currentYOffset)}%`;
				// objs.eraser.style.transform = `rotate(${calcValues(values.eraser_rotate, currentYOffset)}deg)`;

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

		const mobileMenuIcon = document.querySelector('.material-icons.menuicon')
		mobileMenuIcon.addEventListener('click', ()=>{
			document.querySelector('.menu-mobile').style.width = '75vw'
			document.querySelector('.wrapper').classList.add('active')
			document.body.classList.add('stop-scroll')

			const mobileMenuItems = document.querySelectorAll('.menu-mobile .mobile-main-menu-bar a')
			mobileMenuItems.forEach((item)=>{
			item.addEventListener('click',()=>{
				document.querySelector('.menu-mobile').style.width = '0px'
				document.querySelector('.wrapper').classList.remove('active')
				document.body.classList.remove('stop-scroll')
			})
		})
		})

		const mobileMenuIcon2 = document.querySelector('.material-icons.menuicon-inside')
		mobileMenuIcon2.addEventListener('click', ()=>{
			document.querySelector('.menu-mobile').style.width = '0px'
			document.querySelector('.wrapper').classList.remove('active')
			document.body.classList.remove('stop-scroll')
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
		projectRelocation.addEventListener('click', ()=>{

			if(window.innerWidth >= 1024 && window.innerWidth <= 1919){
				window.location.href = '/mini-web-project/index.html'
			}else{
				window.location.href = '/mini-projects/index.html'
			}
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

const cursor = document.querySelector('.cursor');

let distX;
let distY;
const cursorPos = {x:0,y:0};
const targetPos = {x:0, y:0}
const cursorRect = cursor.getBoundingClientRect()
const cursorRectHalfWidth = cursorRect.width/2
const cursorRectHalfHeight = cursorRect.height/2

function render(){
	distX = targetPos.x - cursorPos.x
	distY = targetPos.y - cursorPos.y
	cursorPos.x = cursorPos.x + distX * 1
	cursorPos.y = cursorPos.y + distY * 1

	if(cursor.classList.contains('active')){
		cursor.style.transform = `translate(${cursorPos.x - 100}px,${cursorPos.y - 100}px)`
	}else{
		cursor.style.transform = `translate(${cursorPos.x - 150 }px,${cursorPos.y - 150 }px)`
		cursor.style.trasition = '1s ease-in-out 0.5s'
	}
	
	requestAnimationFrame(render)
}
render()

document.addEventListener('mousemove', e => {
	targetPos.x = e.clientX - window.innerWidth * 0.7
	targetPos.y = e.clientY - window.innerHeight * 0.7
});

function changeMouseOverColor(){
    cursor.style.background = 'linear-gradient(to right, #ed5adb, #949ae9)';
	cursor.style.width = '200px'
	cursor.style.height = '200px'
    cursor.style.mixBlendMode = 'multiply';
    cursor.classList.add('active');
}

function changeMouseOutColor(){
	cursor.style.background = 'linear-gradient(rgb(255,255,255), rgb(255,255,255))'
	cursor.style.mixBlendMode = 'overlay'
	cursor.style.width = '300px'
	cursor.style.height = '300px'
	cursor.classList.remove('active')
}
