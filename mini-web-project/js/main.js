(()=>{
    const leaflet = document.querySelector('.leaflet')
    const hand = document.querySelector('.hand')
    const pageElems = document.querySelectorAll('.page')
    let pageCount = 0;
    //현재 클릭해서 활성화된 아이템 저장
    let currentMenu;
    //거리
    let distX;
    let distY;

    // 손의 현재위치가져오기 (마우스위치랑 비교할 대상)
    const handPos = {x:0,y:0};
    // 마우스 위치를 담을 객체
    const targetPos = {x:0, y:0}

    function getTarget(elem, className){
        while(!elem.classList.contains(className)){
            elem = elem.parentNode;
            if(elem.nodeName == 'BODY'){
                elem = null
                return
            }
        }

        return elem
    }

    function closeLeaflet(){
        pageCount = 0
        document.body.classList.remove('leafelt-opened')
        pageElems[2].classList.remove('page-flipped')
        setTimeout(() => {
            pageElems[0].classList.remove('page-flipped')
        }, 500);
    }

    function zoomIn(elem){

        // elem에는 menuitem이 들어온다
        const rect = elem.getBoundingClientRect()
        console.log(rect.left, rect.top)

        // 목표위치
        // const dx = window.innerWidth/2 - (rect.x + rect.width/2)
        const dx = window.innerWidth/2 - (rect.x + rect.width/2 + 40)
        const dy = window.innerHeight/2 - (rect.y + rect.height/2 + 150)
        // const dy = window.innerHeight/2 - (rect.y + rect.height/2 + 150)
        let angle;

        switch(parseInt(elem.parentNode.parentNode.parentNode.dataset.page)){
            case 1:  
            
                angle = -28
                leaflet.style.transform = `translate3d(${dx * 0.04}vw, ${dy * 0.01}vh, 30vw) rotateY(${angle}deg) scale(1)`
                break;

            case 2:
                
                angle = 0
                leaflet.style.transform = `translate3d(${dx * 0.01 + 0.6}vw, ${dy * 0.01}vh, 30vw) rotateY(${angle}deg) scale(1)`
                break;

            case 3:
                
                angle = 30
                leaflet.style.transform = `translate3d(${dx * 0.04}vw, ${dy * 0.01}vh, 30vw) rotateY(${angle}deg) scale(1)`
                break;
        }

        document.body.classList.add('zoom-in')
        // leaflet.style.transform = `translate3d(${dx * 0.04}vw, ${dy * 0.01}vh, 30vw) rotateY(${angle}deg) scale(1)`
        // leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 30vw) rotateY(${angle}deg)`
        currentMenu = elem;
        currentMenu.classList.add('current-menu')
        document.querySelector('.local-nav').classList.add('hidden')
    }

    function zoomOut(){
        leaflet.style.transform = 'translate3d(0, 0, 0)'
        if(currentMenu){
            document.body.classList.remove('zoom-in');
            document.querySelector('.local-nav').classList.remove('hidden')
			currentMenu.classList.remove('current-menu');
			currentMenu = null;
        }
    }

    function render(){
        distX = targetPos.x - handPos.x
        distY = targetPos.y - handPos.y
        handPos.x = handPos.x + distX * 0.1
        handPos.y = handPos.y + distY * 0.1
        hand.style.transform = `translate(${handPos.x-60}px,${handPos.y+30}px)`
        requestAnimationFrame(render)
    }
    render()

    leaflet.addEventListener('click',(e)=>{
        let pageElem = getTarget(e.target, 'page')

       if(pageElem){
         pageElem.classList.add('page-flipped')
         pageCount++

            if(pageCount == 2){
                document.body.classList.add('leafelt-opened')
            }
       }

       let closeBtnElem = getTarget(e.target, 'close-btn')

       if(closeBtnElem){
            closeLeaflet();
            zoomOut()
       }

       let menuItemElem = getTarget(e.target, 'menu-item')
       if(menuItemElem){

        //줌인된 상태에서는 동작하면 안됨
        if (!document.body.classList.contains('zoom-in')) {
            zoomIn(menuItemElem);
        }
       }

       let backBtn = getTarget(e.target, 'back-btn');
       if (backBtn) {
           zoomOut();
       }
    })

    leaflet.addEventListener('animationend', ()=>{
        leaflet.style.animation = 'none'
    })

    window.addEventListener('mousemove', (e)=>{
        targetPos.x = e.clientX - window.innerWidth * 0.7
        targetPos.y = e.clientY - window.innerHeight * 0.7
    })

    window.addEventListener('resize', ()=>{
        const ww = window.innerWidth

        if(ww >= 1921){
            window.location.href = '/mini-projects/index.html'
        }
    })
})()