//用来解决本地文件也可以拖拽进度条的问题
var audioplayer = document.getElementById("audioplayer");
var playbt = document.getElementById("play");
var stopbt = document.getElementById("stop");
var pause = document.getElementById("pause");
var resetbt = document.getElementById("reset");
var volbt = document.getElementById("volbt");
var vol = document.getElementById("vol");
var stopVolbt = document.getElementById("stopvol");
var musicTime = document.getElementById("musicTime")
//获取进度条
var timer = null;
var barContent = document.getElementById("a-bar_content");
var flag = true;//记录是否静音
var volValue = 0.5;//记录静音前 你的音量

//播放
playbt.onclick = function () {
    audioplayer.play();
}
//暂停
pause.onclick = function () {
    audioplayer.pause();
}
//停止播放
stopbt.onclick = function () {
    audioplayer.pause();
    //当前播放的时间
    audioplayer.currentTime = 0;
}
//重置
resetbt.onclick = function () {
    stopbt.click();
    audioplayer.play();
    barContent.style.width = 0;
    musicTime.innerHTML = "0";
}
//音量控制
volbt.oninput = function () {
    //音乐最大值是1，最小值是0
    vol.innerHTML = this.value;
    audioplayer.volume = this.value / 100;
    volValue = audioplayer.volume;
}
// 静音
stopVolbt.onclick = function () {
    if (flag) {
        audioplayer.volume = 0;
        stopVolbt.innerText = "开启";
        volbt.value = 0;
        vol.innerHTML = volValue * 100;
    } else {
        audioplayer.volume = volValue;
        stopVolbt.innerText = "静音";
        volbt.value = volValue * 100;
        vol.innerHTML = volValue * 100;
    }
    flag = !flag;
}

//进度条
function change() {
    musicTime.innerHTML = (function () {
        var t = Math.round(audioplayer.currentTime);
        var dt = Math.round(audioplayer.duration);
        return (Math.floor(t / 60) + ":" + t % 60 + " / " + Math.floor(dt / 60) + ":" + (dt % 60));
    })()

    //audioplayer.duration 音乐的完整时间  240为设计的进度条总长度
    barContent.style.width = audioplayer.currentTime / audioplayer.duration * 240 + "px";
    if (audioplayer.currentTime == audioplayer.duration) {
        clearInterval(timer);
    } else {
        timer = setTimeout(change, 100)
    }
}
change();
//进度条方向控制
var bar = document.getElementById("a-bar");
bar.onclick = function (e) {
    oEvent = e || window.event;
    barContent.style.width = oEvent.offsetX + "px";
    barContent.style.transition = "width 0.1s ease";
    audioplayer.currentTime = oEvent.offsetX / 240 * audioplayer.duration;
    audioplayer.play();
}

// 换资源
var musicName = document.getElementById("musicName");
var inputfile = document.getElementById("input_file");
var btn = document.getElementById("btn");
btn.onclick = function () {
    inputfile.click();
}
inputfile.onchange = function () {
    musicName.innerText = this.value
    var fileurl = URL.createObjectURL(this.files[0]);
    audioplayer.src = fileurl;
    audioplayer.play();
    change();
}

var inputLink = document.getElementById("input_link");
var btn2 = document.getElementById("btn2");
btn2.onclick = function () {
    musicName.innerText = null;
    if (inputLink.value) {
        audioplayer.src = inputLink.value;
        audioplayer.play();
        change();
        musicName.innerText = inputLink.value;
    } else {
        musicName.innerText = "请输入资源外链";
    }
}


// Video 部分 

var videoplayer = document.getElementById("videoplayer");
var vPlaybt = document.getElementById("v-play");
var vStopbt = document.getElementById("v-stop");
var vPause = document.getElementById("v-pause");
var vResetbt = document.getElementById("v-reset");
var vVolbt = document.getElementById("v-volbt");
var vVol = document.getElementById("v-vol");
var vStopVolbt = document.getElementById("v-stopvol");
//获取进度条
var vTimer = null;
var vBarContent = document.getElementById("v-bar_content");
var videoTime = document.getElementById("videoTime");
var vFlag = true;//记录是否静音
var vVolValue = 0.5;//记录静音前 你的音量

//播放
vPlaybt.onclick = function () {
    videoplayer.play();
}
//暂停
vPause.onclick = function () {
    videoplayer.pause();
}
//停止播放
vStopbt.onclick = function () {
    videoplayer.pause();
    //当前播放的时间
    videoplayer.currentTime = 0;
    vBarContent.style.width = 0;
}
//重置
vResetbt.onclick = function () {
    vStopbt.click();
    videoplayer.play();
}
//音量控制
vVolbt.oninput = function () {
    //音乐最大值是1，最小值是0
    vVol.innerHTML = this.value;
    videoplayer.volume = this.value / 100;
    vVolValue = videoplayer.volume;
}
// 静音
vStopVolbt.onclick = function () {
    if (vFlag) {
        videoplayer.volume = 0;
        vStopVolbt.innerText = "开启";
        vVolbt.value = 0;
        vVol.innerHTML = 0;
    } else {
        videoplayer.volume = vVolValue;
        vStopVolbt.innerText = "静音";
        vVolbt.value = vVolValue * 100;
        vVol.innerHTML = vVolValue * 100;
    }
    vFlag = !vFlag;
}
//进度条
function vChange() {
    videoTime.innerHTML = (function () {
        var t = Math.round(videoplayer.currentTime);
        var dt = Math.round(videoplayer.duration);
        return (Math.floor(t / 60) + ":" + t % 60 + " / " + Math.floor(dt / 60) + ":" + (dt % 60));
    })()
    //videoplayer.duration 音乐的完整时间
    vBarContent.style.width = videoplayer.currentTime / videoplayer.duration * 240 + "px";
    if (videoplayer.currentTime == videoplayer.duration) {
        clearInterval(vTimer);
    } else {
        vTimer = setTimeout(vChange, 100)
    }
}
vChange();
//进度条方向控制
var vBar = document.getElementById("v-bar");
vBar.onclick = function (e) {
    oEvent = e || window.event;
    vBarContent.style.width = oEvent.offsetX + "px";
    vBarContent.style.transition = "width 0.1s ease";
    videoplayer.currentTime = oEvent.offsetX / 240 * videoplayer.duration;
    videoplayer.play();
}
//全屏
var elem = document.getElementById("v-full");
elem.onclick = function () {
    if (elem.webkitRequestFullScreen) {
        videoplayer.webkitRequestFullScreen();
    } else {
        alert("您的浏览器不支持全屏。。快换电脑！！")
    }
}

// 换资源
var videoName = document.getElementById("videoName");
var vInputfile = document.getElementById("v-input_file");
var vBtn = document.getElementById("v-btn");
vBtn.onclick = function () {
    vInputfile.click();
}
vInputfile.onchange = function () {
    videoName.innerText = this.value
    var fileurl = URL.createObjectURL(this.files[0]);
    videoplayer.src = fileurl;
    videoplayer.play();
    vChange();
}

var vInputLink = document.getElementById("v-input_link");
var vBtn2 = document.getElementById("v-btn2");
vBtn2.onclick = function () {
    videoName.innerText = null;
    if (vInputLink.value) {
        videoplayer.src = vInputLink.value;
        videoplayer.play();
        vChange();
        videoName.innerText = vInputLink.value;
    } else {
        videoName.innerText = "请输入资源外链";
    }
}
