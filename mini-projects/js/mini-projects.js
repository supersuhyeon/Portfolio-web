
screen.orientation.addEventListener('change', function() {
	// alert(screen.orientation.type);
    if(screen.orientation.type === 'landscape-primary'){
        window.location.href = '/mini-web-project/index.html'
    }
});

window.addEventListener('resize', ()=>{
    if(window.innerWidth >= 1024 && window.innerWidth <= 1900){
        window.location.href = '/mini-web-project/index.html'
    }
})