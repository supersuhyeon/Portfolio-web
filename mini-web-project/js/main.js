(()=>{
    const leaflet = document.querySelector('.leaflet')
    const hand = document.querySelector('.hand')
    const pageElems = document.querySelectorAll('.page')
    let pageCount = 0;
    let currentMenu;
    let distX;
    let distY;

    const handPos = {x:0,y:0};
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

        const rect = elem.getBoundingClientRect()

        const dx = window.innerWidth/2 - (rect.x + rect.width/2)
        const dy = window.innerHeight/2 - (rect.y + rect.height/2)
        let angle;

        switch(parseInt(elem.parentNode.parentNode.parentNode.dataset.page)){
            case 1:  
                angle = -30
                leaflet.style.transform = `translate3d(${dx*0.5}px, ${dy * 0.01}px, 30vw) rotateY(${angle}deg)`
                break;

            case 2:
                angle = 0
                leaflet.style.transform = `translate3d(${dx * 0.01}px, ${dy * 0.01}px, 30vw) rotateY(${angle}deg)`
                break;

            case 3:
                angle = 30
                leaflet.style.transform = `translate3d(${dx * 0.5}px, ${dy * 0.01}px, 30vw) rotateY(${angle}deg)`
                break;
        }

        document.body.classList.add('zoom-in')
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
        if(window.innerWidth <= 1023 || window.innerWidth >= 1920){
            window.location.href = '/mini-projects/index.html'  
        }
    })

    if(navigator.maxTouchPoints > 0){
        document.querySelector('.hand').style.display = 'none'
    }else{
        document.querySelector('.hand').style.display = 'block'
    }

    const myName = document.querySelector('.local-nav-links .my-name')
    myName.addEventListener('mouseover', ()=>{
        myName.innerText = '← Back to main'
})

    myName.addEventListener('mouseout', ()=>{
        myName.innerText = 'Suhyeon Kim'
    })

    const projectRelocation = document.querySelector('.nav-games')
    projectRelocation.addEventListener('click', ()=>{
    if(window.innerWidth >= 1024 && window.innerWidth <= 1919){
        window.location.href = '/mini-web-project/index.html'
    }else{
        window.location.href = '/mini-projects/index.html'
    }
})

})()
