
// CSS3实现
var css_btn = document.getElementById("transition-css-btn");
var css_ele = document.getElementById("transition-css-ele");
var flag1 = false;
css_btn.onclick = function () {
    flag1 = !flag1;
    css_ele.style.height = flag1 ? "150px" : "0px";
    css_ele.style.width = flag1 ? "150px" : "0px";
}

// JS实现 
var js_btn = document.getElementById("transition-js-btn");
var js_ele = document.getElementById("transition-js-ele");
var flag2 = false, height = 0, timer;
function step() {
    height = flag2 ? (height + 1) : (height - 1);
    if (height < 0) {
        height = 0;
        clearInterval(timer);
        return;
    } else if (height > 150) {
        height = 150;
        clearInterval(timer);
        return;
    }
    js_ele.style.height = height + "px";
    js_ele.style.width = height + "px";
    setTimeout(step, 20);
}
js_btn.onclick = function () {
    if (timer) {
        clearInterval(timer);
    }
    flag2 = !flag2;
    step();
}

// // jq实现
// var flag3 = false;
// $("#transition-jq-btn").on("click", function () {
//     flag3 = !flag3;
//     if (flag3) {
//         $("#transition-jq-ele").stop().slideDown();
//     } else {
//         $("#transition-jq-ele").stop().slideUp();
//     }
//     // $("#transition-jq-ele").stop().slideToggle();
// })