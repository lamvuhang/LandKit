// javascript for menu toggle-----------------------------------------------------------
const menu =document.getElementById("menu-toggle");
const a = document.getElementById("a");
const choses = menu.getElementsByClassName("chose");
const subMenus = menu.getElementsByClassName("sub-menu");
const icon= menu.getElementsByClassName("fa-chevron-down");
const showBtn = document.getElementById("toggle-btn");
const hideBtn = document.getElementById("close-btn"); 

showBtn.addEventListener("click", function toggle(){
    menu.style.display='block';
    a.style.overflowY = "hidden" ;
    menu.style.overflow='scroll';
    menu.style.height = "100vh";
})

hideBtn.addEventListener("click", function closeMenu(){
    a.style.overflowY= "auto";
    menu.style.display='none';
})

for(let i=0; i < choses.length; i++){
    choses[i].addEventListener('click',function()
    {  
        let child = this.getElementsByClassName('sub-menu');
        let iconRotate = this.getElementsByClassName("fa-chevron-down");
        for(j=0; j< subMenus.length; j++){
            icon[j].style.transform="rotate(0deg)";
            if(choses[j] != this){
                subMenus[j].style.display = 'none';
                console.log(j);
            }
        }     

        if(child[0].style.display ==='none' || child[0].style.display ==="" ){
            child[0].style.display = 'block';
            iconRotate[0].style.transform="rotate(180deg)";
        }
        else {
            child[0].style.display = 'none';
            iconRotate[0].style.transform="rotate(0deg)";
        }
    });
}



// javascript for validate form---------------------------------------------------------
const myForm = document.getElementById("myform");

function validateEmail(email){
    let a = email.indexOf("@");
    let dot = email.indexOf(".");
    if(a<1 || dot < a + 2 || dot == email.length -1){
        return true;
    }
    return false;
}

myForm.addEventListener("submit", function validate(event){
    event.preventDefault();
    const name = document.myform.name.value;
    const email = document.myform.email.value;
    const password = document.myform.password.value;

    let textName = document.getElementById("text-name");
    let textEmail = document.getElementById("text-email");
    let textPass = document.getElementById("text-pass");

    if(name === ""){
        textName.innerHTML="Name must be filled out";
        document.myform.name.focus();
        //return false;
    }
    else if(email == "" || validateEmail(email) ){
        textName.innerHTML="";
        textEmail.innerHTML="Invalid email";
        document.myform.email.focus();
       // return false;
    }
    else if(password == "" || password.length<8){
        textName.innerHTML="";
        textEmail.innerHTML="";
        textPass.innerHTML="Invalid password";
        document.myform.password.focus();
      //  return false;
    }
    else{
        textName.innerHTML="";
        textEmail.innerHTML="";
        textPass.innerHTML="";
        console.log("Entered data: ");
        console.log("Name: "+ name);
        console.log("Email: "+ email);
        console.log("Password: "+ password);
      //  return true;
    }
});

// javascript for slideshow---------------------------------------------------------

const slideTrack = document.getElementsByClassName("slide-track");
const slideList = document.getElementsByClassName("slide-list");
const slideItem =document.getElementsByClassName("slide-item");
const dotItem = document.getElementsByClassName("dot-item");
const preBtn = document.getElementsByClassName("previous")[0];
const nextBtn = document.getElementsByClassName("next")[0];

isTranslated = true;
let index = 0;

slideList[0].addEventListener("mouseover", function hovering(){
    run_clearInterval();
} )

slideList[0].addEventListener("mouseout", function hovering(){
    run_setInterval();
} )

function run_setInterval(){
    v_interval = setInterval(()=>{
        index++;
        slideTrack[0].style.transform= "translateX(" + (- slideList[0].clientWidth * index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
    }, 4000);
}
 
function run_clearInterval(){
    clearInterval(v_interval);
}

run_setInterval();


nextBtn.addEventListener("click", function next(){
    if(isTranslated){
        run_clearInterval();
        isTranslated=false;
        index++;
        slideTrack[0].style.transform= "translateX(" + (- slideList[0].clientWidth * index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
        run_setInterval();
    }
})


preBtn.addEventListener("click",function pre(){
    if(isTranslated){
        run_clearInterval();
        isTranslated=false;
        // if de khi index =0 lui lai khong bi am
        if(index==0){
            index = slideItem.length -2;
            slideTrack[0].style.transform = "translateX(" + (-slideList[0].clientWidth*index) + "px)";
            slideTrack[0].style.transition = "none";
        }
        index--;
        slideTrack[0].style.transform= "translateX(" +(-slideList[0].clientWidth *index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
        run_setInterval();
    }
    
} )



slideTrack[0].addEventListener('transitionend', ()=>{
    
    isTranslated = true; 
    let currentSlide = slideItem[index].id;

    if(currentSlide === "firstSlide") {
        index = 1;
        slideTrack[0].style.transform = "translateX(" + (-slideList[0].clientWidth*index) + "px)";
        slideTrack[0].style.transition = "none";
    }

    if(currentSlide === "lastSlide") {
        index = slideItem.length -2;
        slideTrack[0].style.transform = "translateX(" + (-slideList[0].clientWidth*index) + "px)";
        slideTrack[0].style.transition = "none";
    }

    for(let i=0; i<dotItem.length ; i++){
        dotItem[i].classList.remove("active");
    }

    if(index === slideItem.length - 2){
        dotItem[0].classList.add('active');
    }
    else{
        dotItem[index].classList.add('active');
    }

})


// javascript for text in dowload part---------------------------------------------------------
const importText = document.getElementById("import-text");
const cursorEle = document.getElementById("cursor");

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
   }

const strings = ["designers.", "developers.", "founders." ]
let text="";
let cursor = true;
    
async function fillText() {
    while(true){
        for (let i = 0; i < strings.length; i++) {
            for(let j =0; j<strings[i].length; j++){
                text += strings[i].charAt(j);
                importText.innerHTML = text ;
                await delay (50);
            }
            
            let blink = setInterval(() => {
            if(cursor) {
                cursorEle.style.opacity = 0;
                cursorEle.style.transition ="opacity 0.3s";
                cursor = false;
            }else {
                cursorEle.style.opacity = 1;
                cursorEle.style.transition ="opacity 0.3s";
                cursor = true;
            }
            },250);

            await delay(1000);
            clearInterval(blink);

            for( let x =strings[i].length; x >= 0; x--){
                text = strings[i].substr(0, x);
                importText.innerHTML = text ;
                await delay (50);
            }
            await delay(100);
        }
    }
}

fillText();

// javascript for switch in price part---------------------------------------------------------
const price = document.getElementById("price");
const swap = document.getElementById("toggle");

swap.addEventListener('click', async function(){
    console.log(swap.checked);
    if(swap.checked){
        for( let i = 29 ; i <= 49 ; i++){
            price.innerHTML = i;
             await delay(50);
        }
    }
    else {
        for( let j = 49 ; j >= 29 ; j--){
            price.innerHTML = j;
             await delay(50);
        }
    }
} )