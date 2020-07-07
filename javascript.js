// javascript for menu toggle-----------------------------------------------------------
function toggle(){
    var menu =document.getElementById("menu-toggle");
    menu.style.display='block';
    var a = document.getElementById("a");
    a.style.overflowY = "hidden" ;
    menu.style.overflow='scroll';
    menu.style.height = "100vh";


}

function closeMenu(){
document.getElementById("menu-toggle").style.display='none';
}

var choses = document.getElementsByClassName("chose");

for(i=0; i < choses.length; i++){
 
    choses[i].addEventListener('click',function()
    {
        var menuToggle = document.getElementById("menu-toggle");  
        var subMenus = menuToggle.getElementsByClassName("sub-menu");
        var child = this.getElementsByClassName('sub-menu');
       
         
           for(j=0; j< subMenus.length; j++){
            
          subMenus[j].style.display = 'none';
        }
        
        if(child[0].style.display ==='none'){
            child[0].style.display = 'block';
        }
        else {
            child[0].style.display = 'none';
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

isTranslated = true;
var index = 0;


function next(){
    if(isTranslated){
        isTranslated=false;
        index++;
        slideTrack[0].style.transform= "translateX(" + (- slideList[0].clientWidth * index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
    }
}

function pre(){
    if(isTranslated){
        isTranslated=false;
        index--;
        slideTrack[0].style.transform= "translateX(" +(-slideList[0].clientWidth *index) + "px)";
        slideTrack[0].style.transition = "transform .5s ";
    }
    
}


slideTrack[0].addEventListener('transitionend', ()=>{
    
    isTranslated = true; // cho biết thằng carousel nó đã thực hiện xong việc translateX 
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

})