let last_scroll = 0;
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.getElementById('hero');
    
    if(hero){
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`
    }
    
    const navbar = document.getElementById('navbar');
    const navbar_mobile = document.getElementById('navbar-mobile');

    if(!navbar){
        throw new Error("Missing navbar element");
    }
    
    let mediaq = this.matchMedia('(max-width: 700px)');

    if(mediaq.matches){

        navbar.classList.remove('hidden');

        if(scrolled > 0){
            if(scrolled < last_scroll){
                navbar_mobile.classList.remove('hidden');
                navbar_mobile.removeAttribute('inert');
            }else{
                navbar_mobile.setAttribute('inert', '');
                navbar_mobile.classList.add('hidden');
            }
            last_scroll = scrolled;
        } else {
            navbar_mobile.classList.remove('hidden');
            navbar_mobile.removeAttribute('inert');
        }
    }else{

        navbar_mobile.classList.remove('hidden');

        if(scrolled > 0){
            if(scrolled < last_scroll){
                navbar.classList.remove('hidden');
                navbar.removeAttribute('inert');
            }else{
                navbar.setAttribute('inert', '');
                navbar.classList.add('hidden');
            }
            last_scroll = scrolled;
        } else {
            navbar.classList.remove('hidden');
            navbar.removeAttribute('inert');
        }
    }
});

function scrollToElement(anchor){
    const element = document.getElementById(anchor);
    element.scrollIntoView({ behavior:'smooth'});
    openSidebar(false);
}

const navbar = document.getElementById('navbar');
const media = window.matchMedia("(width < 700px)");

function openSidebar(hasToBeOpen){
    const open_sidebar_btn = document.getElementById('open-sidebar-btn');
    if(hasToBeOpen && !navbar.classList.contains('show')){
        navbar.classList.add('show');
        navbar.removeAttribute('inert');
        open_sidebar_btn.setAttribute('aria-expanded', 'true');
    }else if(!hasToBeOpen && navbar.classList.contains('show')){
        navbar.classList.remove('show');
        navbar.setAttribute('inert', '');
        open_sidebar_btn.setAttribute('aria-expanded', 'false');
    }
}

function updateNavbar(e){
    const isMobile = e.matches;
    if(isMobile){
        navbar.setAttribute('inert', '');
    }else{
        navbar.removeAttribute('inert');
    }
}

media.addEventListener('change', (e) => updateNavbar(e))

document.querySelector("#cookies-acpt-btn").addEventListener('click', (e) =>{
    document.querySelector("#cookies").style.display = 'none';
    setCookie("site-cookie", true, 30);
});

document.querySelector("#cookies-dec-btn").addEventListener('click', (e) =>{
    document.querySelector("#cookies").style.display = 'none';
    setCookie("site-cookie", false, 30);
});


function getCookie(cName){
    const name = cName + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(';');
    let value;
    ca.forEach(val => {
        if(val.indexOf(name) === 0) value = val.substring(name.length);
    });
    return value;
}

function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function cookieMessage(){
    let cookieValue = getCookie("site-cookie");
    if(!cookieValue){
        document.querySelector("#cookies").style.display = 'block';
    }else{
        if(cookieValue.toLowerCase() === 'true'){
            // insert cookie logic here
        }
    }
}

window.addEventListener("load", cookieMessage);