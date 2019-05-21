/*
 * @Author: fangzhioo 
 * @Date: 2019-05-20 14:51:04 
 * @Last Modified by: fzoo
 * @Last Modified time: 2019-05-21 09:22:29
 */
var helpers = {

    /**
     * debouncing, executes the function if there was no new event in $wait milliseconds
     * @param func
     * @param wait
     * @param scope
     * @returns {Function}
     */
    debounce: function (func, wait, scope) {
        var timeout;
        return function () {
            var context = scope || this,
                args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * in case of a "storm of events", this executes once every $threshold
     * @param fn
     * @param threshhold
     * @param scope
     * @returns {Function}
     */
    throttle: function (fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
}
function NIM_demo() {
    this.canvas = document.getElementById("paintonme");
    this.context = this.canvas.getContext("2d");

    this.movearea = document.getElementById("moveonme");
    this.showbox = document.getElementById("showbox");

    this.canvasTimeScale = 5 * 1000;

    this.paintColors = ["#bbd", "#464", "#d88"];
    this.totalLanes = this.paintColors.length;

    this.leftMargin = 100;

    var self = this;

    this.init = function () {
        this.canvas.width = this.showbox.clientWidth;
        this.flush();
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            // PHONE OR IPAD
            this.movearea.addEventListener("touchmove", this.regularHandler);
            this.movearea.addEventListener("touchmove", helpers.debounce(self.debounceHandler, 100, this));
            this.movearea.addEventListener("touchmove", helpers.throttle(self.throttleHander, 100, this));
        } else {
            // PC
            this.movearea.addEventListener("mousemove", this.regularHandler);
            this.movearea.addEventListener("mousemove", helpers.debounce(self.debounceHandler, 100, this));
            this.movearea.addEventListener("mousemove", helpers.throttle(self.throttleHander, 100, this));
        }
    }

    /**
     * painting the rectangle / line
     * @param lane
     * @param time
     */
    this.paintRect = function (lane, time) {
        if (time > this.canvasTimeScale) {
            this.startTime += time;
            time = 0;
            this.flush()
        }
        //            console.log(lane,time);
        this.context.fillStyle = this.paintColors[lane];

        var x = (this.canvas.width - this.leftMargin) / this.canvasTimeScale * time + this.leftMargin;
        var y = this.canvas.height / this.totalLanes * lane;
        var height = this.canvas.height / this.totalLanes;
        var width = 1;

        this.context.fillRect(x, y, width, height);
    }

    this.flush = function () {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.font = "200 18px Roboto,Helvetica,Arial";
        this.context.fillStyle = this.paintColors[0];
        this.context.fillText("Regular", 0, 60);

        this.context.fillStyle = this.paintColors[1];
        this.context.fillText("Debounce", 0, 180);

        this.context.fillStyle = this.paintColors[2];
        this.context.fillText("Throttle", 0, 300);
    }
    /**
     * get the time difference
     * @returns {number}
     */
    this.getTimeDiff = function () {
        var time = new Date().getTime();
        if (!this.startTime) {
            this.startTime = time;
        }
        time -= this.startTime;
        return time;
    }

    this.regularHandler = function () {
        self.paintRect(0, self.getTimeDiff());
    }
    this.debounceHandler = function () {
        self.paintRect(1, self.getTimeDiff());
    }
    this.throttleHander = function () {
        self.paintRect(2, self.getTimeDiff());
    }
}

// 实例化
var demo = new NIM_demo();
demo.init();

