


const myName = document.querySelector('.local-nav-links .my-name')
	myName.addEventListener('mouseover', ()=>{
		console.log('hello')
		myName.innerText = '← Back to main'
	})

    myName.addEventListener('mouseout', ()=>{
		console.log('hello')
		myName.innerText = 'Suhyeon Kim'
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

    const staticImg = "/static.png"
    const gifImg = "/monsquad22.gif"

    const animated = document.querySelector('.animated')
    animated.src = staticImg;

    animated.addEventListener('mouseenter', ()=>{
        animated.src = gifImg
    })
    animated.addEventListener('mouseleave', ()=>{
        animated.src = staticImg
    })
