// javascript for menu toggle-----------------------------------------------------------
$("#toggle-btn").click(function showMenu(){
    $("#menu-toggle").show();
    $("#a").css("overflowY", "hidden");
    $("#menu-toggle").css({"overflow":"scroll", "height": "100vh"});
})

$("#close-btn").click(function hideMenu(){
    $("#menu-toggle").hide();
    $("#a").css("overflowY", "auto");
})

$("#menu-toggle li.chose").click(function(){
    $("#menu-toggle .sub-menu").not($(this).find(".sub-menu")).hide();
    $("#menu-toggle .fa-chevron-down").not($(this).find(".fa-chevron-down")).css("transform","rotate(0deg)");
    $(this).find(".sub-menu").toggle();
    if($(this).find(".sub-menu").css("display") === "block"){
        $(this).find(".fa-chevron-down").css("transform","rotate(180deg)");
    }
    else{
        $(this).find(".fa-chevron-down").css("transform","rotate(0deg)");
    }
})

// javascript for validate form---------------------------------------------------------
function validateEmail(email){
    let a = email.indexOf("@");
    let dot = email.indexOf(".");
    if(a<1 || dot < a + 2 || dot == email.length -1){
        return true;
    }
    return false;
}

$("#myform").submit(function(event){
    let name = $("#name").val();
    let email = $("#email").val();
    let pass = $("#pass").val();

    let textName = $("#text-name");
    let textEmail = $("#text-email");
    let textPass = $("#text-pass");

    event.preventDefault();
    if(name === ""){
        textName.text("Name must be filled out");
        document.myform.name.focus();
        //return false;
    }
    else if(email === "" || validateEmail(email) ){
        textName.text("");
        textEmail.text("Invalid email");
        document.myform.email.focus();
       // return false;
    }
    else if(pass === "" || pass.length<8){
        textName.text("");
        textEmail.text("");
        textPass.text("Invalid password");
        document.myform.password.focus();
      //  return false;
    }
    else{
        textName.text("");
        textEmail.text("");
        textPass.text("");
        console.log("Entered data: ");
        console.log("Name: "+ name);
        console.log("Email: "+ email);
        console.log("Password: "+ pass);
      //  return true;
    }
})

// javascript for slideshow---------------------------------------------------------
const slideTrack = $(".slide-track");
const slideList = $(".slide-list");
const slideItem =$(".slide-item");
const dotItem = $(".dot-item");
const preBtn = $(".previous");
const nextBtn = $(".next");

isTranslated = true;
var index = 0;

slideList.mouseover(function hovering(){
    run_clearInterval();
})

slideList.mouseout(function hovering(){
    run_setInterval();
})

function run_setInterval(){
    v_interval = setInterval(()=>{
        index++;
        slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
        slideTrack.css("transition" , "transform .5s ");
    }, 2000);
}
 
function run_clearInterval(){
    clearInterval(v_interval);
}

run_setInterval();

nextBtn.click(function next(){
    if(isTranslated){
        run_clearInterval();
        isTranslated=false;
        index++;
        slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
        slideTrack.css("transition" , "transform .5s ");
        run_setInterval();
    }
})

preBtn.click(function pre(){
    if(isTranslated){
        run_clearInterval();
        isTranslated=false;
        // if de khi index =0 lui lai khong bi am
        if(index==0){
            index = slideItem.length -2;
            slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
            slideTrack.css("transition" , "transform .5s ");
        }
        index--;
        slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
        slideTrack.css("transition" , "transform .5s ");
        run_setInterval();
    }
} )

slideTrack.on('transitionend' , (function(){
    isTranslated = true; 
    let currentSlide = slideItem.eq(index).attr("id");

    if(currentSlide === "firstSlide") {
        index = 1;
        slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
        slideTrack.css("transition" , "none");
    }

    if(currentSlide === "lastSlide") {
        index = slideItem.length -2;
        slideTrack.css("transform" , "translateX(" + (- slideList[0].clientWidth * index) + "px)");
        slideTrack.css("transition" , "none");
    }

    for(let i=0; i<dotItem.length ; i++){
        dotItem.eq(i).removeClass("active");
    }

    if(index === slideItem.length - 2){
        dotItem.eq(0).addClass('active');
    }
    else{
        dotItem.eq(index).addClass('active');
    }
}))
    
// javascript for text in dowload part-----------------------------------------------------
let importText = $("#import-text");
let cursorEle = $("#cursor");

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
                importText.text(text) ;
                await delay (50);
            }
            
            let blink = setInterval(() => {
            if(cursor) {
                cursorEle.css("opacity" , "0");
                cursorEle.css("transition" ,"opacity 0.3s");
                cursor = false;
            }else {
                cursorEle.css("opacity" , "1");
                cursorEle.css("transition" ,"opacity 0.3s");
                cursor = true;
            }
            },250);

            await delay(1000);
            clearInterval(blink);

            for( let x =strings[i].length; x >= 0; x--){
                text = strings[i].substr(0, x);
                importText.text(text) ;
                await delay (50);
            }
            await delay(100);
        }
    }
}

fillText();
// javascript for switch in price part---------------------------------------------------------
const price = $("#price");
const swap = $("#toggle");

swap.click( async function(){
    if(swap.is(":checked")){
        for( let i = 29 ; i <= 49 ; i++){
            price.text(i) ;
             await delay(50);
        }
    }
    else {
        for( let j = 49 ; j >= 29 ; j--){
            price.text(j);
             await delay(50);
        }
    }
} )