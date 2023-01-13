const myName = document.querySelector('.local-nav-links .my-name')
myName.addEventListener('mouseover', ()=>{
    console.log('hello')
    myName.innerText = '← Back to main'
})

myName.addEventListener('mouseout', ()=>{
    console.log('hello')
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

		const mobileMenuItems = document.querySelectorAll('.menu-mobile div a')
		mobileMenuItems.forEach((item)=>{
			item.addEventListener('click',()=>{
				//햄버거 메뉴 사라지기.
				document.querySelector('.wrapper').classList.remove('active')
			})
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
console.log(projectRelocation)

projectRelocation.addEventListener('click', ()=>{
    // const UserAgent = navigator.userAgent;
    // if(UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/)!=null){
    // 	window.location.href = './mini-web-project/index.html'
    //  }else{
    // 	window.location.href = './mini-projects/index.html'
    //  }

    if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
        //pc일경우
        window.location.href = '/mini-web-project/index.html'
      
      }else{
        window.location.href = '/mini-projects/index.html'
      }
})