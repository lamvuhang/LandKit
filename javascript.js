// javascript for menu toggle-----------------------------------------------------------
var menu =document.getElementById("menu-toggle");
var a = document.getElementById("a");
var choses = menu.getElementsByClassName("chose");
var subMenus = menu.getElementsByClassName("sub-menu");
var icon= menu.getElementsByClassName("fa-chevron-down");

function toggle(){
    menu.style.display='block';
    a.style.overflowY = "hidden" ;
    menu.style.overflow='scroll';
    menu.style.height = "100vh";
}

function closeMenu(){
    a.style.overflowY= "auto";
    menu.style.display='none';
}

for(i=0; i < choses.length; i++){
    choses[i].addEventListener('click',function()
    {  
        var child = this.getElementsByClassName('sub-menu');
        var iconRotate = this.getElementsByClassName("fa-chevron-down");
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
function validateEmail(email){
    var a = email.indexOf("@");
    var dot = email.indexOf(".");
    if(a<1 || dot < a + 2 || dot == email.length -1){
        return true;
    }
    else return false;

}

function validate(){
    var name = document.myform.name.value;
    var email = document.myform.email.value;
    var password = document.myform.password.value;

    var tetxName = document.getElementById("text-name");

    if(name == ""){
        document.getElementById("text-name").innerHTML="Name must be filled out";
        document.myform.name.focus();
        return false;
    }
    else if(email == "" || validateEmail(email) ){
        document.getElementById("text-name").innerHTML="";
        document.getElementById("text-email").innerHTML="Invalid email";
        document.myform.email.focus();
        return false;
    }
    else if(password == "" || password.length<8){
        document.getElementById("text-name").innerHTML="";
        document.getElementById("text-email").innerHTML="";
        document.getElementById("text-pass").innerHTML="Invalid password";
        document.myform.password.focus();
        return false;
    }
    else{
        console.log("Entered data: ");
        console.log("Name: "+ name);
        console.log("Email: "+ email);
        console.log("Password: "+ password);
        return false;
    }
}


// javascript for slideshow---------------------------------------------------------

var slideTrack = document.getElementsByClassName("slide-track");
var slideList = document.getElementsByClassName("slide-list");
var slideItem =document.getElementsByClassName("slide-item");
var dotItem = document.getElementsByClassName("dot-item");

isTranslated = true;
var index = 0;

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


function next(){
    if(isTranslated){
        run_clearInterval();
        isTranslated=false;
        index++;
        slideTrack[0].style.transform= "translateX(" + (- slideList[0].clientWidth * index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
        run_setInterval();
    }
}

function pre(){
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
    
}


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

    for(var i=0; i<dotItem.length ; i++){
        dotItem[i].classList.remove("active");
    }

    if(index === slideItem.length - 2){
        dotItem[0].classList.add('active');
    }
    else{
        dotItem[index].classList.add('active');
    }

})