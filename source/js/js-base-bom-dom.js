// 展示open方法
document.getElementById("window-open-btn").onclick = function () {
    window.open('https://fangzhioo.github.io/', 'blank', 'width=400px,height=600px,top=0,left=0,toolbar=yes,location=no;');
}

// onscroll滚动监听
window.onscroll = function (e) {
    var view = document.getElementById("window-onscroll-view");
    view && (view.innerHTML = window.pageYOffset);
}

// 定时器倒计时
var clock = document.getElementById("clock");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var timer = null;
var countdown = 2 * 60 * 60 * 1000; // 120min
function run(temp) {
    if (temp === 0) {
        // 已经过期了
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        countdown = 2 * 60 * 60 * 1000; // 120min
        clock.innerHTML = "时间到！！";
    } else {
        // 继续
        var H = Math.floor(temp / 3600000) ? Math.floor(temp / 3600000) : "00";
        var M = Math.floor(temp % 3600000 / 60000) ? Math.floor(temp % 3600000 / 60000) : "00";
        var S = Math.floor(temp % 60000 / 1000);
        clock.innerHTML = `${H} : ${M} : ${S}`;
        countdown += -1000;
    }
}

play.onclick = function () {
    if (timer === null) {
        timer = setInterval(function () {
            run(countdown);
        }, 1000)
    }
}

pause.onclick = function () {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

reset.onclick = function () {
    pause.click();
    countdown = 2 * 60 * 60 * 1000; // 120min
    play.click();
}

document.getElementById("diy-clock-btn").onclick = function (){
    var T = Math.abs(parseInt(document.getElementById("input_clock").value))* 60 * 1000;
    if(T){
        pause.click();
        countdown = T; // 120min
        play.click();
    }
}