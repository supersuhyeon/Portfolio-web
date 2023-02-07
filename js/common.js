const myName = document.querySelector('.local-nav-links .my-name')
myName.addEventListener('mouseover', ()=>{
    myName.innerText = '← Back to main'
})

myName.addEventListener('mouseout', ()=>{
    myName.innerText = 'Suhyeon Kim'
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


const toTopEl = document.querySelector('#to-top')
window.addEventListener('scroll', _.throttle(function(){
    if(window.scrollY > 500){
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

const projectRelocation = document.querySelector('.nav-games')

projectRelocation.addEventListener('click', ()=>{

    if(window.innerWidth >= 1024 && window.innerWidth <= 1919){
        window.location.href = '/mini-web-project/index.html'
    }else{
        window.location.href = '/mini-projects/index.html'
    }
})

const arrowFixedSns = document.querySelector('.fixed-sns .material-icons')
const fixedContents = document.querySelectorAll('.fixed-sns div')
let isClosed = false;

arrowFixedSns.addEventListener('click',()=>{
    isClosed = !isClosed
    fixedContents.forEach((fixedContent)=>{
        if(isClosed){
            fixedContent.style.transform = 'translateX(120px)'
            arrowFixedSns.innerText = 'keyboard_double_arrow_left'
            setTimeout(function() {
                document.querySelector('.fixed-text').style.display = 'block'
              }, 100);
            
        }else{
            fixedContent.style.transform = 'translateX(0px)'
            arrowFixedSns.innerText = 'keyboard_double_arrow_right'
            document.querySelector('.fixed-text').style.display = 'none'
        }
    })
})


