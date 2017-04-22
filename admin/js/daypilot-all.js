/*
DayPilot Lite
Copyright (c) 2005 - 2016 Annpoint s.r.o.
http://www.daypilot.org/
Licensed under Apache Software License 2.0
Version: 217-lite
*/
if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
(function() {
    if (typeof DayPilot.$ !== 'undefined') {
        return;
    };
    if (typeof DayPilot.Global === "undefined") {
        DayPilot.Global = {};
    };
    DayPilot.$ = function(id) {
        return document.getElementById(id);
    };
    DayPilot.isKhtml = (navigator && navigator.userAgent && navigator.userAgent.indexOf("KHTML") !== -1);
    DayPilot.isIE = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.mo2 = function($a, ev) {
        ev = ev || window.event;
        if (typeof(ev.offsetX) !== 'undefined') {
            var $b = {
                x: ev.offsetX + 1,
                y: ev.offsetY + 1
            };
            if (!$a) {
                return $b;
            };
            var $c = ev.srcElement;
            while ($c && $c !== $a) {
                if ($c.tagName !== 'SPAN') {
                    $b.x += $c.offsetLeft;
                    if ($c.offsetTop > 0) {
                        $b.y += $c.offsetTop - $c.scrollTop;
                    }
                };
                $c = $c.offsetParent;
            };
            if ($c) {
                return $b;
            };
            return null;
        };
        if (typeof(ev.layerX) !== 'undefined') {
            var $b = {
                x: ev.layerX,
                y: ev.layerY,
                $d: ev.target
            };
            if (!$a) {
                return $b;
            };
            var $c = ev.target;
            while ($c && $c.style.position !== 'absolute' && $c.style.position !== 'relative') {
                $c = $c.parentNode;
                if (DayPilot.isKhtml) {
                    $b.y += $c.scrollTop;
                }
            }
            while ($c && $c !== $a) {
                $b.x += $c.offsetLeft;
                $b.y += $c.offsetTop - $c.scrollTop;
                $c = $c.offsetParent;
            };
            if ($c) {
                return $b;
            };
            return null;
        };
        return null;
    };
    DayPilot.mo3 = function($a, ev, $e) {
        ev = ev || window.event;
        if (typeof(ev.pageX) !== 'undefined') {
            var $f = DayPilot.abs($a, $e);
            var $b = {
                x: ev.pageX - $f.x,
                y: ev.pageY - $f.y
            };
            return $b;
        };
        return DayPilot.mo2($a, ev);
    };
    DayPilot.browser = {};
    DayPilot.browser.ie9 = (function() {
        var $g = document.createElement("div");
        $g.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
        var $h = ($g.getElementsByTagName("i").length === 1);
        return $h;
    })();
    DayPilot.browser.ielt9 = (function() {
        var $g = document.createElement("div");
        $g.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
        var $h = ($g.getElementsByTagName("i").length === 1);
        return $h;
    })();
    DayPilot.abs = function(element, $i) {
        if (!element) {
            return null;
        };
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        if (element.getBoundingClientRect) {
            var b = element.getBoundingClientRect();
            r.x = b.left;
            r.y = b.top;
            var d = DayPilot.doc();
            r.x -= d.clientLeft || 0;
            r.y -= d.clientTop || 0;
            var $j = DayPilot.pageOffset();
            r.x += $j.x;
            r.y += $j.y;
            if ($i) {
                var $k = DayPilot.absOffsetBased(element, false);
                var $i = DayPilot.absOffsetBased(element, true);
                r.x += $i.x - $k.x;
                r.y += $i.y - $k.y;
                r.w = $i.w;
                r.h = $i.h;
            };
            return r;
        } else {
            return DayPilot.absOffsetBased(element, $i);
        }
    };
    DayPilot.absOffsetBased = function(element, $i) {
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        while (element.offsetParent) {
            element = element.offsetParent;
            r.x -= element.scrollLeft;
            r.y -= element.scrollTop;
            if ($i) {
                if (r.x < 0) {
                    r.w += r.x;
                    r.x = 0;
                };
                if (r.y < 0) {
                    r.h += r.y;
                    r.y = 0;
                };
                if (element.scrollLeft > 0 && r.x + r.w > element.clientWidth) {
                    r.w -= r.x + r.w - element.clientWidth;
                };
                if (element.scrollTop && r.y + r.h > element.clientHeight) {
                    r.h -= r.y + r.h - element.clientHeight;
                }
            };
            r.x += element.offsetLeft;
            r.y += element.offsetTop;
        };
        var $j = DayPilot.pageOffset();
        r.x += $j.x;
        r.y += $j.y;
        return r;
    };
    DayPilot.sheet = function() {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        if (!style.styleSheet) {
            style.appendChild(document.createTextNode(""));
        };
        var h = document.head || document.getElementsByTagName('head')[0];
        h.appendChild(style);
        var $l = !!style.styleSheet;
        var $m = {};
        $m.rules = [];
        $m.commit = function() {
            if ($l) {
                style.styleSheet.cssText = this.rules.join("\n");
            }
        };
        $m.add = function($n, $o, $p) {
            if ($l) {
                this.rules.push($n + "{" + $o + "\u007d");
                return;
            };
            if (style.sheet.insertRule) {
                if (typeof $p === "undefined") {
                    $p = style.sheet.cssRules.length;
                };
                style.sheet.insertRule($n + "{" + $o + "\u007d", $p);
            } else if (style.sheet.addRule) {
                style.sheet.addRule($n, $o, $p);
            }
        };
        return $m;
    };
    (function() {
        if (DayPilot.Global.defaultCss) {
            return;
        };
        var $m = DayPilot.sheet();
        $m.add(".calendar_default_main", "border: 1px solid #c0c0c0;font-family: Tahoma, Arial, sans-serif; font-size: 12px;");
        $m.add(".calendar_default_main *, .calendar_default_main *:before, .calendar_default_main *:after", "box-sizing: content-box;");
        $m.add(".calendar_default_rowheader_inner,.calendar_default_cornerright_inner,.calendar_default_corner_inner,.calendar_default_colheader_inner,.calendar_default_alldayheader_inner", "color: #333;background: #f3f3f3;");
        $m.add(".calendar_default_cornerright_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;	border-bottom: 1px solid #c0c0c0;");
        $m.add(".calendar_default_rowheader_inner", "font-size: 16pt;text-align: right; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;");
        $m.add(".calendar_default_corner_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;");
        $m.add(".calendar_default_rowheader_minutes", "font-size:10px;vertical-align: super;padding-left: 2px;padding-right: 2px;");
        $m.add(".calendar_default_colheader_inner", "text-align: center; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;");
        $m.add(".calendar_default_cell_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd; background: #f9f9f9;");
        $m.add(".calendar_default_cell_business .calendar_default_cell_inner", "background: #fff");
        $m.add(".calendar_default_alldayheader_inner", "text-align: center;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;");
        $m.add(".calendar_default_message", "opacity: 0.9;filter: alpha(opacity=90);	padding: 10px; color: #ffffff;background: #ffa216;");
        $m.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'color: #666; border: 1px solid #999;');
        $m.add(".calendar_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 4px;background-color: #9dc8e8;");
        $m.add(".calendar_default_event_bar_inner", "position: absolute;width: 4px;background-color: #1066a8;");
        $m.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");');
        $m.add(".calendar_default_selected .calendar_default_event_inner", "background: #ddd;");
        $m.add(".calendar_default_alldayevent_inner", "position: absolute;top: 2px;bottom: 2px;left: 2px;right: 2px;padding: 2px;margin-right: 1px;font-size: 12px;");
        $m.add(".calendar_default_event_withheader .calendar_default_event_inner", "padding-top: 15px;");
        $m.add(".calendar_default_event", "cursor: default;");
        $m.add(".calendar_default_event_inner", "position: absolute;overflow: hidden;top: 0px;bottom: 0px;left: 0px;right: 0px;padding: 2px 2px 2px 6px;font-size: 12px;");
        $m.add(".calendar_default_shadow_inner", "background-color: #666666;	opacity: 0.5;filter: alpha(opacity=50);height: 100%;");
        $m.add(".scheduler_default_selected .scheduler_default_event_inner", "background: #ddd;");
        $m.add(".scheduler_default_main", "border: 1px solid #c0c0c0;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;");
        $m.add(".scheduler_default_timeheader", "cursor: default;color: #333;");
        $m.add(".scheduler_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;");
        $m.add(".scheduler_default_timeheadergroup,.scheduler_default_timeheadercol", "color: #333;background: #f3f3f3;");
        $m.add(".scheduler_default_rowheader,.scheduler_default_corner", "color: #333;background: #f3f3f3;");
        $m.add(".scheduler_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #eee;padding: 2px;");
        $m.add(".scheduler_default_timeheadergroup, .scheduler_default_timeheadercol", "text-align: center;");
        $m.add(".scheduler_default_timeheadergroup_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;");
        $m.add(".scheduler_default_timeheadercol_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;");
        $m.add(".scheduler_default_divider", "background-color: #c0c0c0;");
        $m.add(".scheduler_default_divider_horizontal", "background-color: #c0c0c0;");
        $m.add(".scheduler_default_matrix_vertical_line", "background-color: #eee;");
        $m.add(".scheduler_default_matrix_vertical_break", "background-color: #000;");
        $m.add(".scheduler_default_matrix_horizontal_line", "background-color: #eee;");
        $m.add(".scheduler_default_resourcedivider", "background-color: #c0c0c0;");
        $m.add(".scheduler_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;xborder-radius: 5px;");
        $m.add(".scheduler_default_event", "font-size:12px;color:#666;");
        $m.add(".scheduler_default_event_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;");
        $m.add(".scheduler_default_event_bar", "top:0px;left:0px;right:0px;height:4px;background-color:#9dc8e8;");
        $m.add(".scheduler_default_event_bar_inner", "position:absolute;height:4px;background-color:#1066a8;");
        $m.add(".scheduler_default_event_inner", 'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");');
        $m.add(".scheduler_default_event_float_inner", "padding:6px 2px 2px 8px;");
        $m.add(".scheduler_default_event_float_inner:after", 'content:"";border-color: transparent #666 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:8px;left:-4px;');
        $m.add(".scheduler_default_columnheader_inner", "font-weight: bold;");
        $m.add(".scheduler_default_columnheader_splitter", "background-color: #666;opacity: 0.5;filter: alpha(opacity=50);");
        $m.add(".scheduler_default_columnheader_cell_inner", "padding: 2px;");
        $m.add(".scheduler_default_cell", "background-color: #f9f9f9;");
        $m.add(".scheduler_default_cell.scheduler_default_cell_business", "background-color: #fff;");
        $m.add(".navigator_default_main", "border-left: 1px solid #c0c0c0;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;background-color: white;color: #000000; box-sizing: content-box;");
        $m.add(".navigator_default_main *, .navigator_default_main *:before, .navigator_default_main *:after", "box-sizing: content-box;");
        $m.add(".navigator_default_month", "font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 11px;");
        $m.add(".navigator_default_day", "color: black;");
        $m.add(".navigator_default_weekend", "background-color: #f0f0f0;");
        $m.add(".navigator_default_dayheader", "color: black;");
        $m.add(".navigator_default_line", "border-bottom: 1px solid #c0c0c0;");
        $m.add(".navigator_default_dayother", "color: gray;");
        $m.add(".navigator_default_todaybox", "border: 1px solid red;");
        $m.add(".navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright", 'border-top: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;color: #333;background: #f3f3f3;');
        $m.add(".navigator_default_busy", "font-weight: bold;");
        $m.add(".navigator_default_cell", "text-align: center;");
        $m.add(".navigator_default_select .navigator_default_cell_box", "background-color: #FFE794; opacity: 0.5;");
        $m.add(".navigator_default_title", "text-align: center;");
        $m.add(".navigator_default_titleleft, .navigator_default_titleright", "text-align: center;");
        $m.add(".navigator_default_dayheader", "text-align: center;");
        $m.add(".navigator_default_weeknumber", "text-align: center;");
        $m.add(".month_default_main", "border: 1px solid #c0c0c0;font-family: Tahoma, Arial, sans-serif; font-size: 12px;color: #333;");
        $m.add(".month_default_main *, .month_default_main *:before, .month_default_main *:after", "box-sizing: content-box;");
        $m.add(".month_default_cell_inner", "border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;background-color: #f9f9f9;");
        $m.add(".month_default_cell_business .month_default_cell_inner", "background-color: #fff;");
        $m.add(".month_default_cell_header", "text-align: right;padding-right: 2px;");
        $m.add(".month_default_header_inner", 'text-align: center; vertical-align: middle;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;cursor: default;color: #333;background: #f3f3f3;');
        $m.add(".month_default_message", 'padding: 10px;opacity: 0.9;filter: alpha(opacity=90);color: #ffffff;background: #ffa216;background: -webkit-gradient(linear, left top, left bottom, from(#ffa216), to(#ff8400));background: -webkit-linear-gradient(top, #ffa216 0%, #ff8400);background: -moz-linear-gradient(top, #ffa216 0%, #ff8400);background: -ms-linear-gradient(top, #ffa216 0%, #ff8400);background: -o-linear-gradient(top, #ffa216 0%, #ff8400);background: linear-gradient(top, #ffa216 0%, #ff8400);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffa216", endColorStr="#ff8400");');
        $m.add(".month_default_event_inner", 'position: absolute;top: 0px;bottom: 0px;left: 1px;right: 1px;overflow:hidden;padding: 2px;padding-left: 5px;font-size: 12px;color: #666;background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #999;border-radius: 0px;');
        $m.add(".month_default_event_continueright .month_default_event_inner", "border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right-style: dotted;");
        $m.add(".month_default_event_continueleft .month_default_event_inner", "border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left-style: dotted;");
        $m.add(".month_default_event_hover .month_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#e8e8e8));background: -webkit-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -moz-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -ms-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -o-linear-gradient(top, #ffffff 0%, #e8e8e8);background: linear-gradient(top, #ffffff 0%, #e8e8e8);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#e8e8e8");');
        $m.add(".month_default_selected .month_default_event_inner, .month_default_event_hover.month_default_selected .month_default_event_inner", "background: #ddd;");
        $m.add(".month_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;");
        $m.commit();
        DayPilot.Global.defaultCss = true;
    })();
    DayPilot.doc = function() {
        var de = document.documentElement;
        return (de && de.clientHeight) ? de : document.body;
    };
    DayPilot.guid = function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return ("" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    DayPilot.pageOffset = function() {
        if (typeof pageXOffset !== 'undefined') {
            return {
                x: pageXOffset,
                y: pageYOffset
            };
        };
        var d = DayPilot.doc();
        return {
            x: d.scrollLeft,
            y: d.scrollTop
        };
    };
    DayPilot.indexOf = function($q, $r) {
        if (!$q || !$q.length) {
            return -1;
        };
        for (var i = 0; i < $q.length; i++) {
            if ($q[i] === $r) {
                return i;
            }
        };
        return -1;
    };
    DayPilot.mc = function(ev) {
        if (ev.pageX || ev.pageY) {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        };
        return {
            x: ev.clientX + document.documentElement.scrollLeft,
            y: ev.clientY + document.documentElement.scrollTop
        };
    };
    DayPilot.Stats = {};
    DayPilot.Stats.eventObjects = 0;
    DayPilot.Stats.dateObjects = 0;
    DayPilot.Stats.cacheHitsCtor = 0;
    DayPilot.Stats.cacheHitsParsing = 0;
    DayPilot.Stats.cacheHitsTicks = 0;
    DayPilot.Stats.print = function() {
        console.log("DayPilot.Stats.eventObjects: " + DayPilot.Stats.eventObjects);
        console.log("DayPilot.Stats.dateObjects: " + DayPilot.Stats.dateObjects);
        console.log("DayPilot.Stats.cacheHitsCtor: " + DayPilot.Stats.cacheHitsCtor);
        console.log("DayPilot.Stats.cacheHitsParsing: " + DayPilot.Stats.cacheHitsParsing);
        console.log("DayPilot.Stats.cacheHitsTicks: " + DayPilot.Stats.cacheHitsTicks);
        console.log("DayPilot.Date.Cache.Ctor keys: " + Object.keys(DayPilot.Date.Cache.Ctor).length);
        console.log("DayPilot.Date.Cache.Parsing keys: " + Object.keys(DayPilot.Date.Cache.Parsing).length);
    };
    DayPilot.re = function(el, ev, $s) {
        if (el.addEventListener) {
            el.addEventListener(ev, $s, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + ev, $s);
        }
    };
    DayPilot.pu = function(d) {
        var a = d.attributes,
            i, l, n;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                if (!a[i]) {
                    continue;
                };
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        };
        a = d.childNodes;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                var $t = DayPilot.pu(d.childNodes[i]);
            }
        }
    };
    DayPilot.de = function(e) {
        if (!e) {
            return;
        };
        e.parentNode && e.parentNode.removeChild(e);
    };
    DayPilot.sw = function(element) {
        if (!element) {
            return 0;
        };
        return element.offsetWidth - element.clientWidth;
    };
    DayPilot.am = function() {
        if (typeof angular === "undefined") {
            return null;
        };
        if (!DayPilot.am.cached) {
            DayPilot.am.cached = angular.module("daypilot", []);
        };
        return DayPilot.am.cached;
    };
    DayPilot.Selection = function($u, end, $v, $w) {
        this.type = 'selection';
        this.start = $u.isDayPilotDate ? $u : new DayPilot.Date($u);
        this.end = end.isDayPilotDate ? end : new DayPilot.Date(end);
        this.resource = $v;
        this.root = $w;
        this.toJSON = function($x) {
            var $y = {};
            $y.start = this.start;
            $y.end = this.end;
            $y.resource = this.resource;
            return $y;
        };
    };
    DayPilot.request = function($z, $A, $B, $C) {
        var $D = DayPilot.createXmlHttp();
        if (!$D) {
            return;
        };
        $D.open("POST", $z, true);
        $D.setRequestHeader('Content-type', 'text/plain');
        $D.onreadystatechange = function() {
            if ($D.readyState !== 4) return;
            if ($D.status !== 200 && $D.status !== 304) {
                if ($C) {
                    $C($D);
                } else {
                    if (console) {
                        console.log('HTTP error ' + $D.status);
                    }
                };
                return;
            };
            $A($D);
        };
        if ($D.readyState === 4) {
            return;
        };
        if (typeof $B === 'object') {
            $B = DayPilot.JSON.stringify($B);
        };
        $D.send($B);
    };
    DayPilot.createXmlHttp = function() {
        var $E;
        try {
            $E = new XMLHttpRequest();
        } catch (e) {
            try {
                $E = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        };
        return $E;
    };
    DayPilot.Util = {};
    DayPilot.Util.addClass = function($r, name) {
        if (!$r) {
            return;
        };
        if (!$r.className) {
            $r.className = name;
            return;
        };
        var $F = new RegExp("(^|\\s)" + name + "($|\\s)");
        if (!$F.test($r.className)) {
            $r.className = $r.className + ' ' + name;
        }
    };
    DayPilot.Util.removeClass = function($r, name) {
        if (!$r) {
            return;
        };
        var $F = new RegExp("(^|\\s)" + name + "($|\\s)");
        $r.className = $r.className.replace($F, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    DayPilot.Util.isNullOrUndefined = function($G) {
        return $G === null || typeof $G === "undefined";
    };
    DayPilot.Locale = function(id, $H) {
        this.id = id;
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.datePattern = "M/d/yyyy";
        this.timePattern = "H:mm";
        this.dateTimePattern = "M/d/yyyy H:mm";
        this.timeFormat = "Clock12Hours";
        this.weekStarts = 0;
        if ($H) {
            for (var name in $H) {
                this[name] = $H[name];
            }
        }
    };
    DayPilot.Locale.all = {};
    DayPilot.Locale.find = function(id) {
        if (!id) {
            return null;
        };
        var $I = id.toLowerCase();
        if ($I.length > 2) {
            $I[2] = '-';
        };
        return DayPilot.Locale.all[$I];
    };
    DayPilot.Locale.register = function($J) {
        DayPilot.Locale.all[$J.id] = $J;
    };
    DayPilot.Locale.register(new DayPilot.Locale('ca-es', {
        'dayNames': ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
        'dayNamesShort': ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
        'monthNames': ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre', ''],
        'monthNamesShort': ['gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('cs-cz', {
        'dayNames': ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
        'dayNamesShort': ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
        'monthNames': ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec', ''],
        'monthNamesShort': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd. M. yyyy',
        'dateTimePattern': 'd. M. yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('da-dk', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december', ''],
        'monthNamesShort': ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd-MM-yyyy',
        'dateTimePattern': 'dd-MM-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('de-at', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'monthNamesShort': ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('de-ch', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('de-de', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('de-lu', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-au', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'd/MM/yyyy',
        'dateTimePattern': 'd/MM/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-ca', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-gb', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-us', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'monthNamesShort': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'M/d/yyyy',
        'dateTimePattern': 'M/d/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-es', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'monthNamesShort': ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-mx', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['do.', 'lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'monthNamesShort': ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.', ''],
        'timePattern': 'hh:mm tt',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy hh:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('eu-es', {
        'dayNames': ['igandea', 'astelehena', 'asteartea', 'asteazkena', 'osteguna', 'ostirala', 'larunbata'],
        'dayNamesShort': ['ig', 'al', 'as', 'az', 'og', 'or', 'lr'],
        'monthNames': ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua', ''],
        'monthNamesShort': ['urt.', 'ots.', 'mar.', 'api.', 'mai.', 'eka.', 'uzt.', 'abu.', 'ira.', 'urr.', 'aza.', 'abe.', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/MM/dd',
        'dateTimePattern': 'yyyy/MM/dd H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fi-fi', {
        'dayNames': ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
        'dayNamesShort': ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
        'monthNames': ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu', ''],
        'monthNamesShort': ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd.M.yyyy',
        'dateTimePattern': 'd.M.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-be', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'monthNamesShort': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd-MM-yy',
        'dateTimePattern': 'dd-MM-yy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-ch', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'monthNamesShort': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-fr', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'monthNamesShort': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-lu', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'monthNamesShort': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('gl-es', {
        'dayNames': ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'],
        'dayNamesShort': ['do', 'lu', 'ma', 'mé', 'xo', 've', 'sá'],
        'monthNames': ['xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'decembro', ''],
        'monthNamesShort': ['xan', 'feb', 'mar', 'abr', 'maio', 'xuño', 'xul', 'ago', 'set', 'out', 'nov', 'dec', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('it-it', {
        'dayNames': ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
        'dayNamesShort': ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
        'monthNames': ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', ''],
        'monthNamesShort': ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('it-ch', {
        'dayNames': ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
        'dayNamesShort': ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
        'monthNames': ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', ''],
        'monthNamesShort': ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ja-jp', {
        'dayNames': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        'dayNamesShort': ['日', '月', '火', '水', '木', '金', '土'],
        'monthNames': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
        'monthNamesShort': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/MM/dd',
        'dateTimePattern': 'yyyy/MM/dd H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nb-no', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'monthNamesShort': ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nl-nl', {
        'dayNames': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        'dayNamesShort': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        'monthNames': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', ''],
        'monthNamesShort': ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'd-M-yyyy',
        'dateTimePattern': 'd-M-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nl-be', {
        'dayNames': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        'dayNamesShort': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        'monthNames': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', ''],
        'monthNamesShort': ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd/MM/yyyy',
        'dateTimePattern': 'd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nn-no', {
        'dayNames': ['søndag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
        'dayNamesShort': ['sø', 'må', 'ty', 'on', 'to', 'fr', 'la'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'monthNamesShort': ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('pt-br', {
        'dayNames': ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        'dayNamesShort': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        'monthNames': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', ''],
        'monthNamesShort': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('pl-pl', {
        'dayNames': ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
        'dayNamesShort': ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
        'monthNames': ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień', ''],
        'monthNamesShort': ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('pt-pt', {
        'dayNames': ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        'dayNamesShort': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        'monthNames': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', ''],
        'monthNamesShort': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ro-ro', {
        'dayNames': ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
        'dayNamesShort': ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'],
        'monthNames': ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie', ''],
        'monthNamesShort': ['ian.', 'feb.', 'mar.', 'apr.', 'mai.', 'iun.', 'iul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ru-ru', {
        'dayNames': ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        'dayNamesShort': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        'monthNames': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', ''],
        'monthNamesShort': ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('sk-sk', {
        'dayNames': ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'],
        'dayNamesShort': ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
        'monthNames': ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december', ''],
        'monthNamesShort': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd.M.yyyy',
        'dateTimePattern': 'd.M.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('sv-se', {
        'dayNames': ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
        'dayNamesShort': ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
        'monthNames': ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december', ''],
        'monthNamesShort': ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('tr-tr', {
        'dayNames': ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        'dayNamesShort': ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
        'monthNames': ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık', ''],
        'monthNamesShort': ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'd.M.yyyy',
        'dateTimePattern': 'd.M.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('zh-cn', {
        'dayNames': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        'dayNamesShort': ['日', '一', '二', '三', '四', '五', '六'],
        'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ''],
        'monthNamesShort': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/M/d',
        'dateTimePattern': 'yyyy/M/d H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.US = DayPilot.Locale.find("en-us");
    DayPilot.Date = function($K, $L) {
        if ($K instanceof DayPilot.Date) {
            return $K;
        };
        var $M;
        if (DayPilot.Util.isNullOrUndefined($K)) {
            $M = DayPilot.DateUtil.fromLocal().getTime();
            $K = $M;
        };
        var $N = DayPilot.Date.Cache.Ctor;
        if ($N[$K]) {
            DayPilot.Stats.cacheHitsCtor += 1;
            return $N[$K];
        };
        var $O = false;
        if (typeof $K === "string") {
            $M = DayPilot.DateUtil.fromStringSortable($K, $L).getTime();
            $O = true;
        } else if (typeof $K === "number") {
            if (isNaN($K)) {
                throw "Cannot create DayPilot.Date from NaN";
            };
            $M = $K;
        } else if ($K instanceof Date) {
            if ($L) {
                $M = DayPilot.DateUtil.fromLocal($K).getTime();
            } else {
                $M = $K.getTime();
            }
        } else {
            throw "Unrecognized parameter: use Date, number or string in ISO 8601 format";
        };
        var $P = ticksToSortable($M);
        if ($N[$P]) {
            return $N[$P];
        };
        $N[$P] = this;
        $N[$M] = this;
        if ($O && $P !== $K && DayPilot.DateUtil.hasTzSpec($K)) {
            $N[$K] = this;
        };
        if (Object.defineProperty && !DayPilot.browser.ielt9) {
            Object.defineProperty(this, "ticks", {
                get: function() {
                    return $M;
                }
            });
            Object.defineProperty(this, "value", {
                "value": $P,
                "writable": false,
                "enumerable": true
            });
        } else {
            this.ticks = $M;
            this.value = $P;
        };
        if (DayPilot.Date.Config.legacyShowD) {
            this.d = new Date($M);
        };
        DayPilot.Stats.dateObjects += 1;
    };
    DayPilot.Date.Config = {};
    DayPilot.Date.Config.legacyShowD = false;
    DayPilot.Date.Cache = {};
    DayPilot.Date.Cache.Parsing = {};
    DayPilot.Date.Cache.Ctor = {};
    DayPilot.Date.Cache.Ticks = {};
    DayPilot.Date.prototype.addDays = function($Q) {
        return new DayPilot.Date(this.ticks + $Q * 24 * 60 * 60 * 1000);
    };
    DayPilot.Date.prototype.addHours = function($R) {
        return this.addTime($R * 60 * 60 * 1000);
    };
    DayPilot.Date.prototype.addMilliseconds = function($S) {
        return this.addTime($S);
    };
    DayPilot.Date.prototype.addMinutes = function($T) {
        return this.addTime($T * 60 * 1000);
    };
    DayPilot.Date.prototype.addMonths = function($U) {
        var $K = new Date(this.ticks);
        if ($U === 0) return this;
        var y = $K.getUTCFullYear();
        var m = $K.getUTCMonth() + 1;
        if ($U > 0) {
            while ($U >= 12) {
                $U -= 12;
                y++;
            };
            if ($U > 12 - m) {
                y++;
                m = $U - (12 - m);
            } else {
                m += $U;
            }
        } else {
            while ($U <= -12) {
                $U += 12;
                y--;
            };
            if (m + $U <= 0) {
                y--;
                m = 12 + m + $U;
            } else {
                m = m + $U;
            }
        };
        var d = new Date($K.getTime());
        d.setUTCDate(1);
        d.setUTCFullYear(y);
        d.setUTCMonth(m - 1);
        var $V = new DayPilot.Date(d).daysInMonth();
        d.setUTCDate(Math.min($V, $K.getUTCDate()));
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.addSeconds = function($W) {
        return this.addTime($W * 1000);
    };
    DayPilot.Date.prototype.addTime = function($M) {
        return new DayPilot.Date(this.ticks + $M);
    };
    DayPilot.Date.prototype.addYears = function($X) {
        var $Y = new Date(this.ticks);
        var d = new Date(this.ticks);
        var y = this.getYear() + $X;
        var m = this.getMonth();
        d.setUTCDate(1);
        d.setUTCFullYear(y);
        d.setUTCMonth(m);
        var $V = new DayPilot.Date(d).daysInMonth();
        d.setUTCDate(Math.min($V, $Y.getUTCDate()));
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.dayOfWeek = function() {
        return new Date(this.ticks).getUTCDay();
    };
    DayPilot.Date.prototype.getDayOfWeek = function() {
        return new Date(this.ticks).getUTCDay();
    };
    DayPilot.Date.prototype.daysInMonth = function() {
        var $K = new Date(this.ticks);
        var $Z = $K.getUTCMonth() + 1;
        var $00 = $K.getUTCFullYear();
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ($Z !== 2) return m[$Z - 1];
        if ($00 % 4 !== 0) return m[1];
        if ($00 % 100 === 0 && $00 % 400 !== 0) return m[1];
        return m[1] + 1;
    };
    DayPilot.Date.prototype.daysInYear = function() {
        var $00 = this.getYear();
        if ($00 % 4 !== 0) {
            return 365;
        };
        if ($00 % 100 === 0 && $00 % 400 !== 0) {
            return 365;
        };
        return 366;
    };
    DayPilot.Date.prototype.dayOfYear = function() {
        return Math.ceil((this.getDatePart().getTime() - this.firstDayOfYear().getTime()) / 86400000) + 1;
    };
    DayPilot.Date.prototype.equals = function($01) {
        if ($01 === null) {
            return false;
        };
        if ($01 instanceof DayPilot.Date) {
            return this === $01;
        } else {
            throw "The parameter must be a DayPilot.Date object (DayPilot.Date.equals())";
        }
    };
    DayPilot.Date.prototype.firstDayOfMonth = function() {
        var d = new Date();
        d.setUTCFullYear(this.getYear(), this.getMonth(), 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.firstDayOfYear = function() {
        var $00 = this.getYear();
        var d = new Date();
        d.setUTCFullYear($00, 0, 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.firstDayOfWeek = function($02) {
        var d = this;
        var $02 = $02 || 0;
        var $03 = d.dayOfWeek();
        while ($03 !== $02) {
            d = d.addDays(-1);
            $03 = d.dayOfWeek();
        };
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.getDay = function() {
        return new Date(this.ticks).getUTCDate();
    };
    DayPilot.Date.prototype.getDatePart = function() {
        var d = new Date(this.ticks);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.getYear = function() {
        return new Date(this.ticks).getUTCFullYear();
    };
    DayPilot.Date.prototype.getHours = function() {
        return new Date(this.ticks).getUTCHours();
    };
    DayPilot.Date.prototype.getMilliseconds = function() {
        return new Date(this.ticks).getUTCMilliseconds();
    };
    DayPilot.Date.prototype.getMinutes = function() {
        return new Date(this.ticks).getUTCMinutes();
    };
    DayPilot.Date.prototype.getMonth = function() {
        return new Date(this.ticks).getUTCMonth();
    };
    DayPilot.Date.prototype.getSeconds = function() {
        return new Date(this.ticks).getUTCSeconds();
    };
    DayPilot.Date.prototype.getTotalTicks = function() {
        return this.getTime();
    };
    DayPilot.Date.prototype.getTime = function() {
        return this.ticks;
    };
    DayPilot.Date.prototype.getTimePart = function() {
        var $04 = this.getDatePart();
        return DayPilot.DateUtil.diff(this, $04);
    };
    DayPilot.Date.prototype.lastDayOfMonth = function() {
        var d = new Date(this.firstDayOfMonth().getTime());
        var length = this.daysInMonth();
        d.setUTCDate(length);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.weekNumber = function() {
        var $05 = this.firstDayOfYear();
        var $Q = (this.getTime() - $05.getTime()) / 86400000;
        return Math.ceil(($Q + $05.dayOfWeek() + 1) / 7);
    };
    DayPilot.Date.prototype.weekNumberISO = function() {
        var $06 = false;
        var $07 = this.dayOfYear();
        var $08 = this.firstDayOfYear().dayOfWeek();
        var $09 = this.firstDayOfYear().addYears(1).addDays(-1).dayOfWeek();
        if ($08 === 0) {
            $08 = 7;
        };
        if ($09 === 0) {
            $09 = 7;
        };
        var $0a = 8 - ($08);
        if ($08 === 4 || $09 === 4) {
            $06 = true;
        };
        var $0b = Math.ceil(($07 - ($0a)) / 7.0);
        var $0c = $0b;
        if ($0a >= 4) {
            $0c = $0c + 1;
        };
        if ($0c > 52 && !$06) {
            $0c = 1;
        };
        if ($0c === 0) {
            $0c = this.firstDayOfYear().addDays(-1).weekNumberISO();
        };
        return $0c;
    };
    DayPilot.Date.prototype.toDateLocal = function() {
        var $K = new Date(this.ticks);
        var d = new Date();
        d.setFullYear($K.getUTCFullYear(), $K.getUTCMonth(), $K.getUTCDate());
        d.setHours($K.getUTCHours());
        d.setMinutes($K.getUTCMinutes());
        d.setSeconds($K.getUTCSeconds());
        d.setMilliseconds($K.getUTCMilliseconds());
        return d;
    };
    DayPilot.Date.prototype.toDate = function() {
        return new Date(this.ticks);
    };
    DayPilot.Date.prototype.toJSON = function() {
        return this.value;
    };
    DayPilot.Date.prototype.toString = function($0d, $J) {
        if (typeof $0d === 'undefined') {
            return this.toStringSortable();
        };
        return new $0e($0d, $J).print(this);
    };
    DayPilot.Date.prototype.toStringSortable = function() {
        return ticksToSortable(this.ticks);
    };

    function ticksToSortable($M) {
        var $N = DayPilot.Date.Cache.Ticks;
        if ($N[$M]) {
            DayPilot.Stats.cacheHitsTicks += 1;
            return $N[$M];
        };
        var d = new Date($M);
        var $0f;
        var ms = d.getUTCMilliseconds();
        if (ms === 0) {
            $0f = "";
        } else if (ms < 10) {
            $0f = ".00" + ms;
        } else if (ms < 100) {
            $0f = ".0" + ms;
        } else {
            $0f = "." + ms
        };
        var $0g = d.getUTCSeconds();
        if ($0g < 10) $0g = "0" + $0g;
        var $0h = d.getUTCMinutes();
        if ($0h < 10) $0h = "0" + $0h;
        var $0i = d.getUTCHours();
        if ($0i < 10) $0i = "0" + $0i;
        var $03 = d.getUTCDate();
        if ($03 < 10) $03 = "0" + $03;
        var $Z = d.getUTCMonth() + 1;
        if ($Z < 10) $Z = "0" + $Z;
        var $00 = d.getUTCFullYear();
        if ($00 <= 0) {
            throw "The minimum year supported is 1.";
        };
        if ($00 < 10) {
            $00 = "000" + $00;
        } else if ($00 < 100) {
            $00 = "00" + $00;
        } else if ($00 < 1000) {
            $00 = "0" + $00;
        };
        var $h = $00 + "-" + $Z + "-" + $03 + 'T' + $0i + ":" + $0h + ":" + $0g + $0f;
        $N[$M] = $h;
        return $h;
    };
    DayPilot.Date.parse = function(str, $0d, $J) {
        var p = new $0e($0d, $J);
        return p.parse(str);
    };
    DayPilot.Date.today = function() {
        return new DayPilot.Date().getDatePart();
    };
    DayPilot.Date.fromYearMonthDay = function($00, $Z, $03) {
        $Z = $Z || 1;
        $03 = $03 || 1;
        var d = new Date(0);
        d.setUTCFullYear($00);
        d.setUTCMonth($Z - 1);
        d.setUTCDate($03);
        return new DayPilot.Date(d);
    };
    DayPilot.DateUtil = {};
    DayPilot.DateUtil.fromStringSortable = function($0j, $L) {
        if (!$0j) {
            throw "Can't create DayPilot.Date from an empty string";
        };
        var $0k = $0j.length;
        var $K = $0k === 10;
        var $0l = $0k === 19;
        var long = $0k > 19;
        if (!$K && !$0l && !long) {
            throw "Invalid string format (use '2010-01-01' or '2010-01-01T00:00:00'): " + $0j;
        };
        if (DayPilot.Date.Cache.Parsing[$0j] && !$L) {
            DayPilot.Stats.cacheHitsParsing += 1;
            return DayPilot.Date.Cache.Parsing[$0j];
        };
        var $00 = $0j.substring(0, 4);
        var $Z = $0j.substring(5, 7);
        var $03 = $0j.substring(8, 10);
        var d = new Date(0);
        d.setUTCFullYear($00, $Z - 1, $03);
        if ($K) {
            DayPilot.Date.Cache.Parsing[$0j] = d;
            return d;
        };
        var $R = $0j.substring(11, 13);
        var $T = $0j.substring(14, 16);
        var $W = $0j.substring(17, 19);
        d.setUTCHours($R);
        d.setUTCMinutes($T);
        d.setUTCSeconds($W);
        if ($0l) {
            DayPilot.Date.Cache.Parsing[$0j] = d;
            return d;
        };
        var $0m = $0j[19];
        var $0n = 0;
        if ($0m === ".") {
            var ms = parseInt($0j.substring(20, 23));
            d.setUTCMilliseconds(ms);
            $0n = DayPilot.DateUtil.getTzOffsetMinutes($0j.substring(23));
        } else {
            $0n = DayPilot.DateUtil.getTzOffsetMinutes($0j.substring(19));
        };
        var dd = new DayPilot.Date(d);
        if (!$L) {
            dd = dd.addMinutes(-$0n);
        };
        d = dd.toDate();
        DayPilot.Date.Cache.Parsing[$0j] = d;
        return d;
    };
    DayPilot.DateUtil.getTzOffsetMinutes = function($0j) {
        if (DayPilot.Util.isNullOrUndefined($0j) || $0j === "") {
            return 0;
        };
        if ($0j === "Z") {
            return 0;
        };
        var $0m = $0j[0];
        var $0o = parseInt($0j.substring(1, 3));
        var $0p = parseInt($0j.substring(4));
        var $0n = $0o * 60 + $0p;
        if ($0m === "-") {
            return -$0n;
        } else if ($0m === "+") {
            return $0n;
        } else {
            throw "Invalid timezone spec: " + $0j;
        }
    };
    DayPilot.DateUtil.hasTzSpec = function($0j) {
        if ($0j.indexOf("+")) {
            return true;
        };
        if ($0j.indexOf("-")) {
            return true;
        };
        return false;
    };
    DayPilot.DateUtil.daysDiff = function($05, $0g) {
        ($05 && $0g) || (function() {
            throw "two parameters required";
        })();
        $05 = new DayPilot.Date($05);
        $0g = new DayPilot.Date($0g);
        if ($05.getTime() > $0g.getTime()) {
            return null;
        };
        var i = 0;
        var $0q = $05.getDatePart();
        var $0r = $0g.getDatePart();
        while ($0q < $0r) {
            $0q = $0q.addDays(1);
            i++;
        };
        return i;
    };
    DayPilot.DateUtil.daysSpan = function($05, $0g) {
        ($05 && $0g) || (function() {
            throw "two parameters required";
        })();
        $05 = new DayPilot.Date($05);
        $0g = new DayPilot.Date($0g);
        if ($05 === $0g) {
            return 0;
        };
        var $0s = DayPilot.DateUtil.daysDiff($05, $0g);
        if ($0g == $0g.getDatePart()) {
            $0s--;
        };
        return $0s;
    };
    DayPilot.DateUtil.diff = function($05, $0g) {
        if (!($05 && $0g && $05.getTime && $0g.getTime)) {
            throw "Both compared objects must be Date objects (DayPilot.Date.diff).";
        };
        return $05.getTime() - $0g.getTime();
    };
    DayPilot.DateUtil.fromLocal = function($0t) {
        if (!$0t) {
            $0t = new Date();
        };
        var d = new Date();
        d.setUTCFullYear($0t.getFullYear(), $0t.getMonth(), $0t.getDate());
        d.setUTCHours($0t.getHours());
        d.setUTCMinutes($0t.getMinutes());
        d.setUTCSeconds($0t.getSeconds());
        d.setUTCMilliseconds($0t.getMilliseconds());
        return d;
    };
    DayPilot.DateUtil.hours = function($K, $0u) {
        var $0h = $K.getUTCMinutes();
        if ($0h < 10) $0h = "0" + $0h;
        var $0i = $K.getUTCHours();
        if ($0u) {
            var am = $0i < 12;
            var $0i = $0i % 12;
            if ($0i === 0) {
                $0i = 12;
            };
            var $0v = am ? "AM" : "PM";
            return $0i + ':' + $0h + ' ' + $0v;
        } else {
            return $0i + ':' + $0h;
        }
    };
    DayPilot.DateUtil.max = function($05, $0g) {
        if ($05.getTime() > $0g.getTime()) {
            return $05;
        } else {
            return $0g;
        }
    };
    DayPilot.DateUtil.min = function($05, $0g) {
        if ($05.getTime() < $0g.getTime()) {
            return $05;
        } else {
            return $0g;
        }
    };
    var $0e = function($0d, $J) {
        if (typeof $J === "string") {
            $J = DayPilot.Locale.find($J);
        };
        var $J = $J || DayPilot.Locale.US;
        var $0w = [{
            "seq": "yyyy",
            "expr": "[0-9]{4,4\u007d",
            "str": function(d) {
                return d.getYear();
            }
        }, {
            "seq": "yy",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                return d.getYear() % 100;
            }
        }, {
            "seq": "mm",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "m",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r;
            }
        }, {
            "seq": "HH",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "H",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r;
            }
        }, {
            "seq": "hh",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var $0i = d.getHours();
                var $0i = $0i % 12;
                if ($0i === 0) {
                    $0i = 12;
                };
                var r = $0i;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "h",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var $0i = d.getHours();
                var $0i = $0i % 12;
                if ($0i === 0) {
                    $0i = 12;
                };
                return $0i;
            }
        }, {
            "seq": "tt",
            "expr": "(AM|PM)",
            "str": function(d) {
                var $0i = d.getHours();
                var am = $0i < 12;
                return am ? "AM" : "PM";
            }
        }, {
            "seq": "ss",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "s",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r;
            }
        }, {
            "seq": "MMMM",
            "expr": "[^\\s0-9]*",
            "str": function(d) {
                var r = $J.monthNames[d.getMonth()];
                return r;
            },
            "transform": function($0x) {
                var $p = DayPilot.indexOf($J.monthNames, $0x, $0y);
                if ($p < 0) {
                    return null;
                };
                return $p + 1;
            }
        }, {
            "seq": "MMM",
            "expr": "[^\\s0-9]*",
            "str": function(d) {
                var r = $J.monthNamesShort[d.getMonth()];
                return r;
            },
            "transform": function($0x) {
                var $p = DayPilot.indexOf($J.monthNamesShort, $0x, $0y);
                if ($p < 0) {
                    return null;
                };
                return $p + 1;
            }
        }, {
            "seq": "MM",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "M",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r;
            }
        }, {
            "seq": "dddd",
            "expr": "[^\\s0-9]*",
            "str": function(d) {
                var r = $J.dayNames[d.getDayOfWeek()];
                return r;
            }
        }, {
            "seq": "ddd",
            "expr": "[^\\s0-9]*",
            "str": function(d) {
                var r = $J.dayNamesShort[d.getDayOfWeek()];
                return r;
            }
        }, {
            "seq": "dd",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "%d",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r;
            }
        }, {
            "seq": "d",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r;
            }
        }, ];
        var $0z = function($0A) {
            return $0A.replace(/[-[\]{};()*+?.,\\^$|#\s]/g, "\\$&");
        };
        this.init = function() {
            this.year = this.findSequence("yyyy");
            this.month = this.findSequence("MMMM") || this.findSequence("MMM") || this.findSequence("MM") || this.findSequence("M");
            this.day = this.findSequence("dd") || this.findSequence("d");
            this.hours = this.findSequence("HH") || this.findSequence("H");
            this.minutes = this.findSequence("mm") || this.findSequence("m");
            this.seconds = this.findSequence("ss") || this.findSequence("s");
        };
        this.findSequence = function($0B) {
            function defaultTransform($P) {
                return parseInt($P);
            };
            var $p = $0d.indexOf($0B);
            if ($p === -1) {
                return null;
            };
            return {
                "findValue": function($0x) {
                    var $0C = $0z($0d);
                    var $0D = null;
                    for (var i = 0; i < $0w.length; i++) {
                        var $0k = $0w[i].length;
                        var $0E = ($0B === $0w[i].seq);
                        var $0F = $0w[i].expr;
                        if ($0E) {
                            $0F = "(" + $0F + ")";
                            $0D = $0w[i].transform;
                        };
                        $0C = $0C.replace($0w[i].seq, $0F);
                    };
                    $0C = "^" + $0C + "$";
                    try {
                        var r = new RegExp($0C);
                        var $q = r.exec($0x);
                        if (!$q) {
                            return null;
                        };
                        $0D = $0D || defaultTransform;
                        return $0D($q[1]);
                    } catch (e) {
                        throw "unable to create regex from: " + $0C;
                    }
                }
            };
        };
        this.print = function($K) {
            var find = function(t) {
                for (var i = 0; i < $0w.length; i++) {
                    if ($0w[i] && $0w[i].seq === t) {
                        return $0w[i];
                    }
                };
                return null;
            };
            var $0G = $0d.length <= 0;
            var $0H = 0;
            var $0I = [];
            while (!$0G) {
                var $0J = $0d.substring($0H);
                var $0K = /%?(.)\1*/.exec($0J);
                if ($0K && $0K.length > 0) {
                    var $0L = $0K[0];
                    var q = find($0L);
                    if (q) {
                        $0I.push(q);
                    } else {
                        $0I.push($0L);
                    };
                    $0H += $0L.length;
                    $0G = $0d.length <= $0H;
                } else {
                    $0G = true;
                }
            };
            for (var i = 0; i < $0I.length; i++) {
                var c = $0I[i];
                if (typeof c !== 'string') {
                    $0I[i] = c.str($K);
                }
            };
            return $0I.join("");
        };
        this.parse = function($0x) {
            var $00 = this.year.findValue($0x);
            if (!$00) {
                return null;
            };
            var $Z = this.month.findValue($0x);
            if (DayPilot.Util.isNullOrUndefined($Z)) {
                return null;
            };
            if ($Z > 12 || $Z < 1) {
                return null;
            };
            var $03 = this.day.findValue($0x);
            var $0M = DayPilot.Date.fromYearMonthDay($00, $Z).daysInMonth();
            if ($03 < 1 || $03 > $0M) {
                return null;
            };
            var $R = this.hours ? this.hours.findValue($0x) : 0;
            var $T = this.minutes ? this.minutes.findValue($0x) : 0;
            var $W = this.seconds ? this.seconds.findValue($0x) : 0;
            var d = new Date();
            d.setUTCFullYear($00, $Z - 1, $03);
            d.setUTCHours($R);
            d.setUTCMinutes($T);
            d.setUTCSeconds($W);
            d.setUTCMilliseconds(0);
            return new DayPilot.Date(d);
        };
        this.init();
    };
    DayPilot.Event = function($0N, $0O, $0P) {
        var e = this;
        this.calendar = $0O;
        this.data = $0N ? $0N : {};
        this.part = $0P ? $0P : {};
        if (typeof this.data.id === 'undefined') {
            this.data.id = this.data.value;
        };
        var $0Q = {};
        var $0R = ["id", "text", "start", "end"];
        this.isEvent = true;
        this.temp = function() {
            if ($0Q.dirty) {
                return $0Q;
            };
            for (var i = 0; i < $0R.length; i++) {
                $0Q[$0R[i]] = e.data[$0R[i]];
            };
            $0Q.dirty = true;
            return $0Q;
        };
        this.copy = function() {
            var $h = {};
            for (var i = 0; i < $0R.length; i++) {
                $h[$0R[i]] = e.data[$0R[i]];
            };
            return $h;
        };
        this.commit = function() {
            if (!$0Q.dirty) {
                return;
            };
            for (var i = 0; i < $0R.length; i++) {
                e.data[$0R[i]] = $0Q[$0R[i]];
            };
            $0Q.dirty = false;
        };
        this.dirty = function() {
            return $0Q.dirty;
        };
        this.id = function($G) {
            if (typeof $G === 'undefined') {
                return e.data.id;
            } else {
                this.temp().id = $G;
            }
        };
        this.value = function($G) {
            if (typeof $G === 'undefined') {
                return e.id();
            } else {
                e.id($G);
            }
        };
        this.text = function($G) {
            if (typeof $G === 'undefined') {
                return e.data.text;
            } else {
                this.temp().text = $G;
                this.client.innerHTML($G);
            }
        };
        this.start = function($G) {
            if (typeof $G === 'undefined') {
                return new DayPilot.Date(e.data.start);
            } else {
                this.temp().start = new DayPilot.Date($G);
            }
        };
        this.end = function($G) {
            if (typeof $G === 'undefined') {
                return new DayPilot.Date(e.data.end);
            } else {
                this.temp().end = new DayPilot.Date($G);
            }
        };
        this.partStart = function() {
            return new DayPilot.Date(this.part.start);
        };
        this.partEnd = function() {
            return new DayPilot.Date(this.part.end);
        };
        this.tag = function($0S) {
            var $0T = e.data.tag;
            if (!$0T) {
                return null;
            };
            if (typeof $0S === 'undefined') {
                return e.data.tag;
            };
            var $0U = e.calendar.tagFields;
            var $p = -1;
            for (var i = 0; i < $0U.length; i++) {
                if ($0S === $0U[i]) $p = i;
            };
            if ($p === -1) {
                throw "Field name not found.";
            };
            return $0T[$p];
        };
        this.client = {};
        this.client.innerHTML = function($G) {
            if (typeof $G === 'undefined') {
                if (e.cache && typeof e.cache.html !== "undefined") {
                    return e.cache.html;
                };
                if (typeof e.data.html !== "undefined") {
                    return e.data.html;
                };
                return e.data.text;
            } else {
                e.data.html = $G;
            }
        };
        
        this.client.html = this.client.innerHTML;
        
        this.client.header = function($G) {
            if (typeof $G === 'undefined') {
                return e.data.header;
            } else {
                e.data.header = $G;
            }
        };
        this.client.cssClass = function($G) {
            if (typeof $G === 'undefined') {
                return e.data.cssClass;
            } else {
                e.data.cssClass = $G;
            }
        };
        this.client.toolTip = function($G) {
            if (typeof $G === 'undefined') {
                if (e.cache && typeof e.cache.toolTip !== "undefined") {
                    return e.cache.toolTip;
                };
                return typeof e.data.toolTip !== 'undefined' ? e.data.toolTip : e.data.text;
            } else {
                e.data.toolTip = $G;
            }
        };
        this.client.barVisible = function($G) {
            if (typeof $G === 'undefined') {
                if (e.cache && typeof e.cache.barHidden !== "undefined") {
                    return !e.cache.barHidden;
                };
                return e.calendar.durationBarVisible && !e.data.barHidden;
            } else {
                e.data.barHidden = !$G;
            }
        };
        this.client.backColor = function($G) {
            if (typeof $G === 'undefined') {
                if (e.cache && typeof e.cache.backColor !== "undefined") {
                    return e.cache.backColor;
                };
                return typeof e.data.backColor !== "undefined" ? e.data.backColor : e.calendar.eventBackColor;
            } else {
                e.data.backColor = $G;
            }
        };
        this.client.borderColor = function($G) {
            if (typeof $G === 'undefined') {
                if (e.cache && typeof e.cache.borderColor !== "undefined") {
                    return e.cache.borderColor;
                };
                return typeof e.data.borderColor !== "undefined" ? e.data.borderColor : e.calendar.eventBorderColor;
            } else {
                e.data.borderColor = $G;
            }
        };
        this.client.moveEnabled = function($G) {
            if (typeof $G === 'undefined') {
                return e.calendar.eventMoveHandling !== 'Disabled' && !e.data.moveDisabled;
            } else {
                e.data.moveDisabled = !$G;
            }
        };
        this.client.resizeEnabled = function($G) {
            if (typeof $G === 'undefined') {
                return e.calendar.eventResizeHandling !== 'Disabled' && !e.data.resizeDisabled;
            } else {
                e.data.resizeDisabled = !$G;
            }
        };
        this.client.clickEnabled = function($G) {
            if (typeof $G === 'undefined') {
                return e.calendar.eventClickHandling !== 'Disabled' && !e.data.clickDisabled;
            } else {
                e.data.clickDisabled = !$G;
            }
        };
        this.toJSON = function($x) {
            var $y = {};
            $y.value = this.id();
            $y.id = this.id();
            $y.text = this.text();
            $y.start = this.start();
            $y.end = this.end();
            $y.tag = {};
            if (e.calendar && e.calendar.tagFields) {
                var $0U = e.calendar.tagFields;
                for (var i = 0; i < $0U.length; i++) {
                    $y.tag[$0U[i]] = this.tag($0U[i]);
                }
            };
            return $y;
        };
    };
})();
DayPilot.JSON = {};
(function() {
    function f(n) {
        return n < 10 ? '0' + n : n;
    };
    if (typeof Date.prototype.toJSON2 !== 'function') {
        Date.prototype.toJSON2 = function($x) {
            return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + '';
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function($x) {
            return this.valueOf();
        };
    };
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $0V = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $0W, $0X, $0Y = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        $0Z;

    function quote($0j) {
        $0V.lastIndex = 0;
        return $0V.test($0j) ? '"' + $0j.replace($0V, function(a) {
            var c = $0Y[a];
            if (typeof c === 'string') {
                return c;
            };
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + $0j + '"';
    };

    function str($x, $10) {
        var i, k, v, length, $11 = $0W,
            $12, $P = $10[$x];
        if ($P && typeof $P === 'object' && typeof $P.toJSON2 === 'function') {
            $P = $P.toJSON2($x);
        } else if ($P && typeof $P === 'object' && typeof $P.toJSON === 'function' && !$P.ignoreToJSON) {
            $P = $P.toJSON($x);
        };
        if (typeof $0Z === 'function') {
            $P = $0Z.call($10, $x, $P);
        };
        switch (typeof $P) {
            case 'string':
                return quote($P);
            case 'number':
                return isFinite($P) ? String($P) : 'null';
            case 'boolean':
            case 'null':
                return String($P);
            case 'object':
                if (!$P) {
                    return 'null';
                };
                $0W += $0X;
                $12 = [];
                if (typeof $P.length === 'number' && !$P.propertyIsEnumerable('length')) {
                    length = $P.length;
                    for (i = 0; i < length; i += 1) {
                        $12[i] = str(i, $P) || 'null';
                    };
                    v = $12.length === 0 ? '[]' : $0W ? '[\n' + $0W + $12.join(',\n' + $0W) + '\n' + $11 + ']' : '[' + $12.join(',') + ']';
                    $0W = $11;
                    return v;
                };
                if ($0Z && typeof $0Z === 'object') {
                    length = $0Z.length;
                    for (i = 0; i < length; i += 1) {
                        k = $0Z[i];
                        if (typeof k === 'string') {
                            v = str(k, $P);
                            if (v) {
                                $12.push(quote(k) + ($0W ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in $P) {
                        if (Object.hasOwnProperty.call($P, k)) {
                            v = str(k, $P);
                            if (v) {
                                $12.push(quote(k) + ($0W ? ': ' : ':') + v);
                            }
                        }
                    }
                };
                v = ($12.length === 0) ? '{\u007D' : $0W ? '{\n' + $0W + $12.join(',\n' + $0W) + '\n' + $11 + '\u007D' : '{' + $12.join(',') + '\u007D';
                $0W = $11;
                return v;
        }
    };
    if (typeof DayPilot.JSON.stringify !== 'function') {
        DayPilot.JSON.stringify = function($P, $13, $14) {
            var i;
            $0W = '';
            $0X = '';
            if (typeof $14 === 'number') {
                for (i = 0; i < $14; i += 1) {
                    $0X += ' ';
                }
            } else if (typeof $14 === 'string') {
                $0X = $14;
            };
            $0Z = $13;
            if ($13 && typeof $13 !== 'function' && (typeof $13 !== 'object' || typeof $13.length !== 'number')) {
                throw new Error('JSON.stringify');
            };
            return str('', {
                '': $P
            });
        };
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    var $a = function() {};
    if (typeof DayPilot.Calendar !== 'undefined') {
        return;
    };
    var DayPilotCalendar = {};
    DayPilotCalendar.selectedCells = [];
    DayPilotCalendar.topSelectedCell = null;
    DayPilotCalendar.bottomSelectedCell = null;
    DayPilotCalendar.selecting = false;
    DayPilotCalendar.column = null;
    DayPilotCalendar.firstSelected = null;
    DayPilotCalendar.firstMousePos = null;
    DayPilotCalendar.originalMouse = null;
    DayPilotCalendar.originalHeight = null;
    DayPilotCalendar.originalTop = null;
    DayPilotCalendar.resizing = null;
    DayPilotCalendar.globalHandlers = false;
    DayPilotCalendar.moving = null;
    DayPilotCalendar.register = function($b) {
        if (!DayPilotCalendar.registered) {
            DayPilotCalendar.registered = [];
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            if (r[i] === $b) {
                return;
            }
        };
        r.push($b);
    };
    DayPilotCalendar.unregister = function($b) {
        var a = DayPilotCalendar.registered;
        if (!a) {
            return;
        };
        var i = DayPilot.indexOf(a, $b);
        if (i === -1) {
            return;
        };
        a.splice(i, 1);
    };
    DayPilotCalendar.getCellsAbove = function($c) {
        var $d = [];
        var c = DayPilotCalendar.getColumn($c);
        var tr = $c.parentNode;
        var $e = null;
        while (tr && $e !== DayPilotCalendar.firstSelected) {
            $e = tr.getElementsByTagName("td")[c];
            $d.push($e);
            tr = tr.previousSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.previousSibling;
            }
        };
        return $d;
    };
    DayPilotCalendar.getCellsBelow = function($c) {
        var $d = [];
        var c = DayPilotCalendar.getColumn($c);
        var tr = $c.parentNode;
        var $e = null;
        while (tr && $e !== DayPilotCalendar.firstSelected) {
            $e = tr.getElementsByTagName("td")[c];
            $d.push($e);
            tr = tr.nextSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.nextSibling;
            }
        };
        return $d;
    };
    DayPilotCalendar.getColumn = function($c) {
        var i = 0;
        while ($c.previousSibling) {
            $c = $c.previousSibling;
            if ($c.tagName === "TD") {
                i++;
            }
        };
        return i;
    };
    DayPilotCalendar.gUnload = function(ev) {
        if (!DayPilotCalendar.registered) {
            return;
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            var c = r[i];
            c.dispose();
            DayPilotCalendar.unregister(c);
        }
    };
    DayPilotCalendar.gMouseUp = function(e) {
        if (DayPilotCalendar.resizing) {
            if (!DayPilotCalendar.resizingShadow) {
                DayPilotCalendar.resizing.style.cursor = 'default';
                document.body.style.cursor = 'default';
                DayPilotCalendar.resizing = null;
                return;
            };
            var $f = DayPilotCalendar.resizing.event;
            var $g = DayPilotCalendar.resizingShadow.clientHeight + 4;
            var top = DayPilotCalendar.resizingShadow.offsetTop;
            var $h = DayPilotCalendar.resizing.dpBorder;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.resizingShadow);
            DayPilotCalendar.resizingShadow = null;
            DayPilotCalendar.resizing.style.cursor = 'default';
            $f.calendar.nav.top.style.cursor = 'auto';
            DayPilotCalendar.resizing.onclick = null;
            DayPilotCalendar.resizing = null;
            $f.calendar.eventResizeDispatch($f, $g, top, $h);
        } else if (DayPilotCalendar.moving) {
            if (!DayPilotCalendar.movingShadow) {
                DayPilotCalendar.moving = null;
                document.body.style.cursor = 'default';
                return;
            };
            var top = DayPilotCalendar.movingShadow.offsetTop;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
            var $f = DayPilotCalendar.moving.event;
            var $i = DayPilotCalendar.movingShadow.column;
            DayPilotCalendar.moving = null;
            DayPilotCalendar.movingShadow = null;
            $f.calendar.nav.top.style.cursor = 'auto';
            var ev = e || window.event;
            $f.calendar.eventMoveDispatch($f, $i, top, ev);
        } else if (DayPilotCalendar.selecting && DayPilotCalendar.topSelectedCell !== null) {
            var $b = DayPilotCalendar.selecting.calendar;
            DayPilotCalendar.selecting = false;
            var $j = $b.getSelection();
            $b.timeRangeSelectedDispatch($j.start, $j.end);
            if ($b.timeRangeSelectedHandling !== "Hold" && $b.timeRangeSelectedHandling !== "HoldForever") {
                $a();
            }
        } else {
            DayPilotCalendar.selecting = false;
        }
    };
    DayPilotCalendar.deleteShadow = function($k) {
        if (!$k) {
            return;
        };
        if (!$k.parentNode) {
            return;
        };
        $k.parentNode.removeChild($k);
    };
    DayPilotCalendar.moveShadow = function($l) {
        var $k = DayPilotCalendar.movingShadow;
        var parent = $k.parentNode;
        parent.style.display = 'none';
        $k.parentNode.removeChild($k);
        $l.firstChild.appendChild($k);
        $k.style.left = '0px';
        parent.style.display = '';
        $k.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
    };
    DayPilotCalendar.Calendar = function(id) {
        var $m = false;
        if (this instanceof DayPilotCalendar.Calendar && !this.$1K) {
            $m = true;
            this.$1K = true;
        };
        if (!$m) {
            throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
        };
        var $b = this;
        this.uniqueID = null;
        this.v = '217-lite';
        this.id = id;
        this.clientName = id;
        this.cache = {};
        this.cache.pixels = {};
        this.elements = {};
        this.elements.events = [];
        this.nav = {};
        this.afterRender = function() {};
        this.fasterDispose = true;
        this.angularAutoApply = false;
        this.api = 2;
        this.borderColor = "#CED2CE";
        this.businessBeginsHour = 9;
        this.businessEndsHour = 18;
        this.cellBackColor = "#ffffff";
        this.cellBorderColor = "#DEDFDE";
        this.cellHeight = 20;
        this.columnMarginRight = 5;
        this.cornerBackColor = "#F3F3F9";
        this.cssOnly = true;
        this.days = 1;
        this.durationBarVisible = true;
        this.eventBackColor = '#638EDE';
        this.eventBorderColor = "#2951A5";
        this.eventFontFamily = 'Tahoma, Arial, Helvetica, sans-serif';
        this.eventFontSize = '8pt';
        this.eventFontColor = "#ffffff";
        this.eventHeaderFontSize = '8pt';
        this.eventHeaderFontColor = "#ffffff";
        this.eventHeaderHeight = 14;
        this.eventHeaderVisible = true;
        this.headerFontSize = '10pt';
        this.headerFontFamily = 'Tahoma, Arial, Helvetica, sans-serif';
        this.headerFontColor = "#42658C";
        this.headerHeight = 20;
        this.height = 300;
        this.heightSpec = 'BusinessHours';
        this.hideUntilInit = true;
        this.hourHalfBorderColor = "#EBEDEB";
        this.hourBorderColor = "#DEDFDE";
        this.hourFontColor = "#42658C";
        this.hourFontFamily = "Tahoma, Arial, Helvetica, sans-serif";
        this.hourFontSize = "16pt";
        this.hourNameBackColor = "#F3F3F9";
        this.hourNameBorderColor = "#DEDFDE";
        this.hourWidth = 45;
        this.initScrollPos = 'Auto';
        this.loadingLabelText = "Loading...";
        this.loadingLabelVisible = true;
        this.loadingLabelBackColor = "ff0000";
        this.loadingLabelFontColor = "#ffffff";
        this.loadingLabelFontFamily = "Tahoma, Arial, Helvetica, sans-serif";
        this.loadingLabelFontSize = "10pt";
        this.locale = "en-us";
        this.selectedColor = "#316AC5";
        this.showToolTip = true;
        this.startDate = new DayPilot.Date().getDatePart();
        this.cssClassPrefix = "calendar_default";
        this.theme = null;
        this.timeFormat = 'Auto';
        this.visible = true;
        this.timeRangeSelectedHandling = 'Enabled';
        this.eventClickHandling = 'Enabled';
        this.eventResizeHandling = 'Update';
        this.eventMoveHandling = 'Update';
        this.onBeforeEventRender = null;
        this.onEventClick = null;
        this.onEventClicked = null;
        this.onEventMove = null;
        this.onEventMoved = null;
        this.onEventResize = null;
        this.onEventResized = null;
        this.onTimeRangeSelect = null;
        this.onTimeRangeSelected = null;
        this.clearSelection = function() {
            for (var j = 0; j < DayPilotCalendar.selectedCells.length; j++) {
                var $c = DayPilotCalendar.selectedCells[j];
                if ($c) {
                    if ($c.selected) {
                        DayPilot.de($c.selected);
                        $c.firstChild && ($c.firstChild.style.display = '');
                        $c.selected = null;
                    }
                }
            };
            DayPilotCalendar.selectedCells = [];
        };
        this.ie = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
        this.ff = (navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1);
        this.opera105 = (function() {
            if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 10.5;
            };
            return false;
        })();
        this.webkit522 = (function() {
            if (/AppleWebKit[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 522;
            };
            return false;
        })();
        this.cleanSelection = this.clearSelection;
        this.$1L = function($n, $o, $p) {
            var $q = {};
            $q.action = $n;
            $q.parameters = $p;
            $q.data = $o;
            $q.header = this.$1M();
            var $r = "JSON" + DayPilot.JSON.stringify($q);
            __doPostBack($b.uniqueID, $r);
        };
        this.$1N = function($n, $o, $p) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            this.callbackTimeout = window.setTimeout(function() {
                $b.loadingStart();
            }, 100);
            var $q = {};
            $q.action = $n;
            $q.parameters = $p;
            $q.data = $o;
            $q.header = this.$1M();
            var $r = "JSON" + DayPilot.JSON.stringify($q);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.callBackResponse, $r, this.ajaxError);
            } else if (typeof WebForm_DoCallback === 'function') {
                WebForm_DoCallback(this.uniqueID, $r, this.updateView, this.clientName, this.onCallbackError, true);
            }
        };
        this.onCallbackError = function($s, $t) {
            alert("Error!\r\nResult: " + $s + "\r\nContext:" + $t);
        };
        this.dispose = function() {
            var c = $b;
            c.deleteEvents();
            c.nav.zoom.onmousemove = null;
            c.nav.scroll.root = null;
            DayPilot.pu(c.nav.loading);
            c.disposeMain();
            c.disposeHeader();
            c.nav.select = null;
            c.nav.cornerRight = null;
            c.nav.scrollable = null;
            c.nav.zoom = null;
            c.nav.loading = null;
            c.nav.header = null;
            c.nav.hourTable = null;
            c.nav.scrolltop = null;
            c.nav.scroll = null;
            c.nav.main = null;
            c.nav.message = null;
            c.nav.messageClose = null;
            c.nav.top = null;
            DayPilotCalendar.unregister(c);
        };
        this.registerDispose = function() {
            this.nav.top.dispose = this.dispose;
        };
        this.callBackResponse = function($u) {
            $b.updateView($u.responseText);
        };
        this.$1M = function() {
            var h = {};
            h.control = "dpc";
            h.id = this.id;
            h.v = this.v;
            h.days = $b.days;
            h.startDate = $b.startDate;
            h.heightSpec = $b.heightSpec;
            h.businessBeginsHour = $b.businessBeginsHour;
            h.businessEndsHour = $b.businessEndsHour;
            h.hashes = $b.hashes;
            h.backColor = $b.cellBackColor;
            h.timeFormat = $b.timeFormat;
            h.viewType = $b.viewType;
            h.locale = $b.locale;
            return h;
        };
        this.createShadow = function($v, $w) {
            var $x = $v.parentNode;
            while ($x && $x.tagName !== "TD") {
                $x = $x.parentNode;
            };
            var $k = document.createElement('div');
            $k.setAttribute('unselectable', 'on');
            $k.style.position = 'absolute';
            $k.style.width = ($v.offsetWidth - 4) + 'px';
            $k.style.height = ($v.offsetHeight - 4) + 'px';
            $k.style.left = ($v.offsetLeft) + 'px';
            $k.style.top = ($v.offsetTop) + 'px';
            $k.style.border = '2px dotted #666666';
            $k.style.zIndex = 101;
            $k.style.backgroundColor = "#aaaaaa";
            $k.style.opacity = 0.5;
            $k.style.filter = "alpha(opacity=50)";
            $k.style.border = '2px solid #aaaaaa';
            if ($w && false) {
                $k.style.overflow = 'hidden';
                $k.style.fontSize = $v.style.fontSize;
                $k.style.fontFamily = $v.style.fontFamily;
                $k.style.color = $v.style.color;
                $k.innerHTML = $v.data.client.html();
            };
            $x.firstChild.appendChild($k);
            return $k;
        };
        this.$1O = {};
        this.$1O.locale = function() {
            var $y = DayPilot.Locale.find($b.locale);
            if (!$y) {
                return DayPilot.Locale.US;
            };
            return $y;
        };
        this.$1O.timeFormat = function() {
            if ($b.timeFormat !== 'Auto') {
                return $b.timeFormat;
            };
            return this.locale().timeFormat;
        };
        var $z = this.$1O;
        this.updateView = function($s, $t) {
            if ($s && $s.indexOf("$$$") === 0) {
                if (window.console) {
                    console.log("Error received from the server side: " + $s);
                } else {
                    throw "Error received from the server side: " + $s;
                };
                return;
            };
            var $s = eval("(" + $s + ")");
            if ($s.CallBackRedirect) {
                document.location.href = $s.CallBackRedirect;
                return;
            };
            if ($s.UpdateType === "None") {
                $b.loadingStop();
                $b.$1P();
                return;
            };
            $b.deleteEvents();
            if ($s.UpdateType === "Full") {
                $b.columns = $s.Columns;
                $b.days = $s.Days;
                $b.startDate = new DayPilot.Date($s.StartDate);
                $b.heightSpec = $s.HeightSpec ? $s.HeightSpec : $b.heightSpec;
                $b.businessBeginsHour = $s.BusinessBeginsHour ? $s.BusinessBeginsHour : $b.businessBeginsHour;
                $b.businessEndsHour = $s.BusinessEndsHour ? $s.BusinessEndsHour : $b.businessEndsHour;
                $b.headerDateFormat = $s.HeaderDateFormat ? $s.HeaderDateFormat : $b.headerDateFormat;
                $b.viewType = $s.ViewType;
                $b.backColor = $s.BackColor ? $s.BackColor : $b.backColor;
                $b.eventHeaderVisible = $s.EventHeaderVisible ? $s.EventHeaderVisible : $b.eventHeaderVisible;
                $b.timeFormat = $s.TimeFormat ? $s.TimeFormat : $b.timeFormat;
                $b.locale = $s.Locale ? $s.Locale : $b.locale;
                $b.prepareColumns();
            };
            if ($s.Hashes) {
                for (var $A in $s.Hashes) {
                    $b.hashes[$A] = $s.Hashes[$A];
                }
            };
            $b.events.list = $s.Events;
            $b.loadEvents();
            $b.updateHeaderHeight();
            if ($s.UpdateType === "Full") {
                $b.drawHeader();
                $b.drawMain();
                $b.drawHourTable();
                $b.updateHeight();
            };
            $b.$1P();
            $b.drawEvents();
            $b.clearSelection();
            $b.afterRender($s.CallBackData, true);
            $b.loadingStop();
        };
        this.durationHours = function() {
            return 24;
        };
        this.businessHoursSpan = function() {
            if (this.businessBeginsHour > this.businessEndsHour) {
                return 24 - this.businessBeginsHour + this.businessEndsHour;
            } else {
                return this.businessEndsHour - this.businessBeginsHour;
            }
        };
        this.rowCount = function() {
            return 48;
        };
        this.$1Q = function() {
            return $b.api === 2;
        };
        this.eventClickCallBack = function(e, $o) {
            this.$1N('EventClick', $o, e);
        };
        this.eventClickPostBack = function(e, $o) {
            this.$1L('EventClick', $o, e);
        };
        this.eventClickDispatch = function(e) {
            var $B = this;
            var e = $B.event;
            if ($b.$1Q()) {
                var $C = {};
                $C.e = e;
                $C.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $b.onEventClick === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventClick($C);
                    });
                    if ($C.preventDefault.value) {
                        return;
                    }
                };
                switch ($b.eventClickHandling) {
                    case 'CallBack':
                        $b.eventClickCallBack(e);
                        break;
                    case 'PostBack':
                        $b.eventClickPostBack(e);
                        break;
                };
                if (typeof $b.onEventClicked === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventClicked($C);
                    });
                }
            } else {
                switch ($b.eventClickHandling) {
                    case 'PostBack':
                        $b.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $b.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $b.onEventClick(e);
                        break;
                }
            }
        };
        this.eventResizeCallBack = function(e, $D, $E, $o) {
            if (!$D) throw 'newStart is null';
            if (!$E) throw 'newEnd is null';
            var $F = {};
            $F.e = e;
            $F.newStart = $D;
            $F.newEnd = $E;
            this.$1N('EventResize', $o, $F);
        };
        this.eventResizePostBack = function(e, $D, $E, $o) {
            if (!$D) throw 'newStart is null';
            if (!$E) throw 'newEnd is null';
            var $F = {};
            $F.e = e;
            $F.newStart = $D;
            $F.newEnd = $E;
            this.$1L('EventResize', $o, $F);
        };
        this.eventResizeDispatch = function(e, $G, $H, $h) {
            var $I = 1;
            var $D = new Date();
            var $E = new Date();
            var $J = e.start();
            var end = e.end();
            if ($h === 'top') {
                var $K = $J.getDatePart();
                var $L = Math.floor(($H - $I) / $b.cellHeight);
                var $M = $L * 30;
                var ts = $M * 60 * 1000;
                $D = $K.addTime(ts);
                $E = e.end();
            } else if ($h === 'bottom') {
                var $K = end.getDatePart();
                var $L = Math.floor(($H + $G - $I) / $b.cellHeight);
                var $M = $L * 30;
                var ts = $M * 60 * 1000;
                $D = $J;
                $E = $K.addTime(ts);
            };
            if ($b.$1Q()) {
                var $C = {};
                $C.e = e;
                $C.newStart = $D;
                $C.newEnd = $E;
                $C.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $b.onEventResize === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventResize($C);
                    });
                    if ($C.preventDefault.value) {
                        return;
                    }
                };
                switch ($b.eventResizeHandling) {
                    case 'PostBack':
                        $b.eventResizePostBack(e, $D, $E);
                        break;
                    case 'CallBack':
                        $b.eventResizeCallBack(e, $D, $E);
                        break;
                    case 'Update':
                        e.start($D);
                        e.end($E);
                        $b.events.update(e);
                        break;
                };
                if (typeof $b.onEventResized === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventResized($C);
                    });
                }
            } else {
                switch ($b.eventResizeHandling) {
                    case 'PostBack':
                        $b.eventResizePostBack(e, $D, $E);
                        break;
                    case 'CallBack':
                        $b.eventResizeCallBack(e, $D, $E);
                        break;
                    case 'JavaScript':
                        $b.onEventResize(e, $D, $E);
                        break;
                }
            }
        };
        this.eventMovePostBack = function(e, $D, $E, $N, $o) {
            if (!$D) throw 'newStart is null';
            if (!$E) throw 'newEnd is null';
            var $F = {};
            $F.e = e;
            $F.newStart = $D;
            $F.newEnd = $E;
            this.$1L('EventMove', $o, $F);
        };
        this.eventMoveCallBack = function(e, $D, $E, $N, $o) {
            if (!$D) throw 'newStart is null';
            if (!$E) throw 'newEnd is null';
            var $F = {};
            $F.e = e;
            $F.newStart = $D;
            $F.newEnd = $E;
            this.$1N('EventMove', $o, $F);
        };
        this.eventMoveDispatch = function(e, $i, $H, ev) {
            var $I = 1;
            var $L = Math.floor(($H - $I) / $b.cellHeight);
            var $O = $L * 30 * 60 * 1000;
            var $J = e.start();
            var end = e.end();
            var $K = new Date();
            if ($J instanceof DayPilot.Date) {
                $J = $J.toDate();
            };
            $K.setTime(Date.UTC($J.getUTCFullYear(), $J.getUTCMonth(), $J.getUTCDate()));
            var $P = $J.getTime() - ($K.getTime() + $J.getUTCHours() * 3600 * 1000 + Math.floor($J.getUTCMinutes() / 30) * 30 * 60 * 1000);
            var length = end.getTime() - $J.getTime();
            var $Q = this.columns[$i];
            var $R = $Q.Start.getTime();
            var $S = new Date();
            $S.setTime($R + $O + $P);
            var $D = new DayPilot.Date($S);
            var $E = $D.addTime(length);
            if ($b.$1Q()) {
                var $C = {};
                $C.e = e;
                $C.newStart = $D;
                $C.newEnd = $E;
                $C.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $b.onEventMove === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventMove($C);
                    });
                    if ($C.preventDefault.value) {
                        return;
                    }
                };
                switch ($b.eventMoveHandling) {
                    case 'PostBack':
                        $b.eventMovePostBack(e, $D, $E, $Q.Value);
                        break;
                    case 'CallBack':
                        $b.eventMoveCallBack(e, $D, $E, $Q.Value);
                        break;
                    case 'Update':
                        e.start($D);
                        e.end($E);
                        $b.events.update(e);
                        break;
                };
                if (typeof $b.onEventMoved === 'function') {
                    $b.$1R.apply(function() {
                        $b.onEventMoved($C);
                    });
                }
            } else {
                switch ($b.eventMoveHandling) {
                    case 'PostBack':
                        $b.eventMovePostBack(e, $D, $E, $Q.Value);
                        break;
                    case 'CallBack':
                        $b.eventMoveCallBack(e, $D, $E, $Q.Value);
                        break;
                    case 'JavaScript':
                        $b.onEventMove(e, $D, $E, $Q.Value, false);
                        break;
                }
            }
        };
        this.timeRangeSelectedPostBack = function($J, end, $T, $o) {
            var $U = {};
            $U.start = $J;
            $U.end = end;
            this.$1L('TimeRangeSelected', $o, $U);
        };
        this.timeRangeSelectedCallBack = function($J, end, $T, $o) {
            var $U = {};
            $U.start = $J;
            $U.end = end;
            this.$1N('TimeRangeSelected', $o, $U);
        };
        this.timeRangeSelectedDispatch = function($J, end) {
            $J = new DayPilot.Date($J);
            end = new DayPilot.Date(end);
            if (this.$1Q()) {
                var $C = {};
                $C.start = $J;
                $C.end = end;
                $C.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $b.onTimeRangeSelect === 'function') {
                    $b.$1R.apply(function() {
                        $b.onTimeRangeSelect($C);
                    });
                    if ($C.preventDefault.value) {
                        return;
                    }
                };
                switch ($b.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $b.timeRangeSelectedPostBack($J, end);
                        break;
                    case 'CallBack':
                        $b.timeRangeSelectedCallBack($J, end);
                        break;
                };
                if (typeof $b.onTimeRangeSelected === 'function') {
                    $b.$1R.apply(function() {
                        $b.onTimeRangeSelected($C);
                    });
                }
            } else {
                switch ($b.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $b.timeRangeSelectedPostBack($J, end);
                        break;
                    case 'CallBack':
                        $b.timeRangeSelectedCallBack($J, end);
                        break;
                    case 'JavaScript':
                        $b.onTimeRangeSelected($J, end);
                        break;
                }
            }
        };
        this.onCellMousedown = function(ev) {
            if (DayPilotCalendar.selecting) {
                return;
            };
            if ($b.timeRangeSelectedHandling === "Disabled") {
                return;
            };
            var $V = (window.event) ? window.event.button : ev.which;
            if ($V !== 1 && $V !== 0) {
                return;
            };
            DayPilotCalendar.firstMousePos = DayPilot.mc(ev || window.event);
            DayPilotCalendar.selecting = {};
            DayPilotCalendar.selecting.calendar = $b;
            if (DayPilotCalendar.selectedCells) {
                $b.clearSelection();
                DayPilotCalendar.selectedCells = [];
            };
            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
            DayPilotCalendar.selectedCells.push(this);
            DayPilotCalendar.firstSelected = this;
            DayPilotCalendar.topSelectedCell = this;
            DayPilotCalendar.bottomSelectedCell = this;
            $b.activateSelection();
            return false;
        };
        this.activateSelection = function() {
            var $W = this.getSelection();
            for (var j = 0; j < DayPilotCalendar.selectedCells.length; j++) {
                var $c = DayPilotCalendar.selectedCells[j];
                if ($c && !$c.selected) {
                    var $X = document.createElement("div");
                    $X.style.height = ($b.cellHeight - 1) + "px";
                    $X.style.backgroundColor = $b.selectedColor;
                    $c.firstChild.style.display = "none";
                    $c.insertBefore($X, $c.firstChild);
                    $c.selected = $X;
                }
            }
        };
        this.mousemove = function(ev) {
            if (typeof(DayPilotCalendar) === 'undefined') {
                return;
            };
            if (!DayPilotCalendar.selecting) {
                return;
            };
            var $Y = DayPilot.mc(ev || window.event);
            var $Z = DayPilotCalendar.getColumn(this);
            if ($Z !== DayPilotCalendar.column) {
                return;
            };
            $b.clearSelection();
            if ($Y.y < DayPilotCalendar.firstMousePos.y) {
                DayPilotCalendar.selectedCells = DayPilotCalendar.getCellsBelow(this);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.selectedCells[0];
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
            } else {
                DayPilotCalendar.selectedCells = DayPilotCalendar.getCellsAbove(this);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.selectedCells[0];
            };
            $b.activateSelection();
        };
        this.getSelection = function() {
            var $J = DayPilotCalendar.topSelectedCell.start;
            var end = DayPilotCalendar.bottomSelectedCell.end;
            return new DayPilot.Selection($J, end, null, $b);
        };
        this.mouseup = function(ev) {};
        this.prepareColumns = function() {
            this.columns = this.$1S();
            for (var i = 0; i < this.columns.length; i++) {
                this.activateColumn(this.columns[i]);
            }
        };
        this.activateColumn = function($l) {
            $l.Start = new DayPilot.Date($l.Start);
            $l.putIntoBlock = function(ep) {
                for (var i = 0; i < this.blocks.length; i++) {
                    var $00 = this.blocks[i];
                    if ($00.overlapsWith(ep.part.top, ep.part.height)) {
                        $00.events.push(ep);
                        $00.min = Math.min($00.min, ep.part.top);
                        $00.max = Math.max($00.max, ep.part.top + ep.part.height);
                        return i;
                    }
                };
                var $00 = [];
                $00.lines = [];
                $00.events = [];
                $00.overlapsWith = function($J, $01) {
                    var end = $J + $01 - 1;
                    if (!(end < this.min || $J > this.max - 1)) {
                        return true;
                    };
                    return false;
                };
                $00.putIntoLine = function(ep) {
                    var $02 = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $03 = this.lines[i];
                        if ($03.isFree(ep.part.top, ep.part.height)) {
                            $03.push(ep);
                            return i;
                        }
                    };
                    var $03 = [];
                    $03.isFree = function($J, $01) {
                        var end = $J + $01 - 1;
                        var $04 = this.length;
                        for (var i = 0; i < $04; i++) {
                            var e = this[i];
                            if (!(end < e.part.top || $J > e.part.top + e.part.height - 1)) {
                                return false;
                            }
                        };
                        return true;
                    };
                    $03.push(ep);
                    this.lines.push($03);
                    return this.lines.length - 1;
                };
                $00.events.push(ep);
                $00.min = ep.part.top;
                $00.max = ep.part.top + ep.part.height;
                this.blocks.push($00);
                return this.blocks.length - 1;
            };
            $l.putIntoLine = function(ep) {
                var $02 = this;
                for (var i = 0; i < this.lines.length; i++) {
                    var $03 = this.lines[i];
                    if ($03.isFree(ep.part.top, ep.part.height)) {
                        $03.push(ep);
                        return i;
                    }
                };
                var $03 = [];
                $03.isFree = function($J, $01) {
                    var end = $J + $01 - 1;
                    var $04 = this.length;
                    for (var i = 0; i < $04; i++) {
                        var e = this[i];
                        if (!(end < e.part.top || $J > e.part.top + e.part.height - 1)) {
                            return false;
                        }
                    };
                    return true;
                };
                $03.push(ep);
                this.lines.push($03);
                return this.lines.length - 1;
            };
        };
        this.$1S = function() {
            var $05 = [];
            var $J = this.startDate.getDatePart();
            var $06 = this.days;
            switch (this.viewType) {
                case "Day":
                    $06 = 1;
                    break;
                case "Week":
                    $06 = 7;
                    $J = $J.firstDayOfWeek($z.locale().weekStarts);
                    break;
                case "WorkWeek":
                    $06 = 5;
                    $J = $J.firstDayOfWeek(1);
                    break;
            };
            for (var i = 0; i < $06; i++) {
                var $07 = $b.headerDateFormat ? $b.headerDateFormat : $z.locale().datePattern;
                var $l = {};
                $l.Start = $J.addDays(i);
                $l.Name = $l.Start.toString($07, $z.locale());
                $l.InnerHTML = $l.Name;
                $05.push($l);
            };
            return $05;
        };
        this.visibleStart = function() {
            return this.columns[0].Start;
        };
        this.visibleEnd = function() {
            var $04 = this.columns.length - 1;
            return this.columns[$04].Start.addDays(1);
        };
        this.$1T = function($08) {
            var $09 = this.theme || this.cssClassPrefix;
            if ($09) {
                return $09 + $08;
            } else {
                return "";
            }
        };
        this.deleteEvents = function() {
            if (this.elements.events) {
                for (var i = 0; i < this.elements.events.length; i++) {
                    var $X = this.elements.events[i];
                    var $v = $X.event;
                    if ($v) {
                        $v.calendar = null;
                    };
                    $X.onclick = null;
                    $X.onclickSave = null;
                    $X.onmouseover = null;
                    $X.onmouseout = null;
                    $X.onmousemove = null;
                    $X.onmousedown = null;
                    if ($X.firstChild && $X.firstChild.firstChild && $X.firstChild.firstChild.tagName && $X.firstChild.firstChild.tagName.toUpperCase() === 'IMG') {
                        var $0a = $X.firstChild.firstChild;
                        $0a.onmousedown = null;
                        $0a.onmousemove = null;
                        $0a.onclick = null;
                    };
                    $X.helper = null;
                    $X.data = null;
                    $X.event = null;
                    DayPilot.de($X);
                }
            };
            this.elements.events = [];
        };
        this.$1U = function(e) {
            var $o = e.cache || e.data;
            var $0b = this.nav.events;
            var $0c = true;
            var $0d = true;
            var $0e = false;
            var $0f = this.eventBorderColor;
            var $X = document.createElement("div");
            $X.style.position = 'absolute';
            $X.style.left = e.part.left + '%';
            $X.style.top = (e.part.top) + 'px';
            $X.style.width = e.part.width + '%';
            $X.style.height = Math.max(e.part.height, 2) + 'px';
            $X.style.overflow = 'hidden';
            $X.data = e;
            $X.event = e;
            $X.unselectable = 'on';
            $X.style.MozUserSelect = 'none';
            $X.style.KhtmlUserSelect = 'none';
            $X.className = this.$1T("_event");
            if ($o.cssClass) {
                DayPilot.Util.addClass($X, $o.cssClass);
            };
            $X.isFirst = e.part.start.getTime() === e.start().getTime();
            $X.isLast = e.part.end.getTime() === e.end().getTime();
            $X.onclick = this.eventClickDispatch;
            $X.onmousemove = function(ev) {
                var $0g = 5;
                var $0h = $b.eventHeaderVisible ? ($b.eventHeaderHeight) : 10;
                if (typeof(DayPilotCalendar) === 'undefined') {
                    return;
                };
                var $0i = DayPilot.mo3($X, ev);
                if (!$0i) {
                    return;
                };
                if (DayPilotCalendar.resizing || DayPilotCalendar.moving) {
                    return;
                };
                var $0j = this.isLast;
                if ($0i.y <= $0h && $b.eventResizeHandling !== 'Disabled') {
                    this.style.cursor = "n-resize";
                    this.dpBorder = 'top';
                } else if (this.offsetHeight - $0i.y <= $0g && $b.eventResizeHandling !== 'Disabled') {
                    if ($0j) {
                        this.style.cursor = "s-resize";
                        this.dpBorder = 'bottom';
                    } else {
                        this.style.cursor = 'not-allowed';
                    }
                } else if (!DayPilotCalendar.resizing && !DayPilotCalendar.moving) {
                    if ($b.eventClickHandling !== 'Disabled') {
                        this.style.cursor = 'pointer';
                    } else {
                        this.style.cursor = 'default';
                    }
                }
            };
            $X.onmousedown = function(ev) {
                ev = ev || window.event;
                var $V = ev.which || ev.button;
                if ((this.style.cursor === 'n-resize' || this.style.cursor === 's-resize') && $V === 1) {
                    DayPilotCalendar.resizing = this;
                    DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                    DayPilotCalendar.originalHeight = this.offsetHeight;
                    DayPilotCalendar.originalTop = this.offsetTop;
                    $b.nav.top.style.cursor = this.style.cursor;
                } else if ($V === 1 && $b.eventMoveHandling !== 'Disabled') {
                    DayPilotCalendar.moving = this;
                    DayPilotCalendar.moving.event = this.event;
                    var $0k = DayPilotCalendar.moving.helper = {};
                    $0k.oldColumn = $b.columns[this.data.part.dayIndex].Value;
                    DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                    DayPilotCalendar.originalTop = this.offsetTop;
                    var $0i = DayPilot.mo3(this, ev);
                    if ($0i) {
                        DayPilotCalendar.moveOffsetY = $0i.y;
                    } else {
                        DayPilotCalendar.moveOffsetY = 0;
                    };
                    $b.nav.top.style.cursor = 'move';
                };
                return false;
            };
            var $0l = document.createElement("div");
            $0l.setAttribute("unselectable", "on");
            $0l.className = $b.$1T("_event_inner");
            $0l.innerHTML = e.client.html();
            if ($o.borderColor) {
                $0l.style.borderColor = $o.borderColor;
            };
            if ($o.backColor) {
                $0l.style.background = $o.backColor;
                if (DayPilot.browser.ie9 || DayPilot.browser.ielt9) {
                    $0l.style.filter = '';
                }
            };
            if ($o.fontColor) {
                $0l.style.color = $o.fontColor;
            };
            $X.appendChild($0l);
            if (e.client.barVisible()) {
                var $g = e.part.height - 2;
                var $0m = 100 * e.part.barTop / $g;
                var $0n = Math.ceil(100 * e.part.barHeight / $g);
                var $0o = document.createElement("div");
                $0o.setAttribute("unselectable", "on");
                $0o.className = this.$1T("_event_bar");
                $0o.style.position = "absolute";
                if ($o.barBackColor) {
                    $0o.style.backgroundColor = $o.barBackColor;
                };
                var $0p = document.createElement("div");
                $0p.setAttribute("unselectable", "on");
                $0p.className = this.$1T("_event_bar_inner");
                $0p.style.top = $0m + "%";
                if (0 < $0n && $0n <= 1) {
                    $0p.style.height = "1px";
                } else {
                    $0p.style.height = $0n + "%";
                };
                if ($o.barColor) {
                    $0p.style.backgroundColor = $o.barColor;
                };
                $0o.appendChild($0p);
                $X.appendChild($0o);
            };
            if ($0b.rows[0].cells[e.part.dayIndex]) {
                var $0q = $0b.rows[0].cells[e.part.dayIndex].firstChild;
                $0q.appendChild($X);
                $b.makeChildrenUnselectable($X);
            };
            $b.elements.events.push($X);
        };
        this.makeChildrenUnselectable = function(el) {
            var c = (el && el.childNodes) ? el.childNodes.length : 0;
            for (var i = 0; i < c; i++) {
                try {
                    var $0r = el.childNodes[i];
                    if ($0r.nodeType === 1) {
                        $0r.unselectable = 'on';
                        this.makeChildrenUnselectable($0r);
                    }
                } catch (e) {}
            }
        };
        this.drawEvents = function() {
            for (var i = 0; i < this.columns.length; i++) {
                var $0s = this.columns[i];
                if (!$0s.blocks) {
                    continue;
                };
                for (var m = 0; m < $0s.blocks.length; m++) {
                    var $00 = $0s.blocks[m];
                    for (var j = 0; j < $00.lines.length; j++) {
                        var $03 = $00.lines[j];
                        for (var k = 0; k < $03.length; k++) {
                            var e = $03[k];
                            e.part.width = 100 / $00.lines.length;
                            e.part.left = e.part.width * j;
                            var $0t = (j === $00.lines.length - 1);
                            if (!$0t) {
                                e.part.width = e.part.width * 1.5;
                            };
                            this.$1U(e);
                        }
                    }
                }
            }
        };
        this.drawTop = function() {
            this.nav.top.innerHTML = '';
            if (this.cssOnly) {
                DayPilot.Util.addClass(this.nav.top, this.$1T("_main"));
            } else {
                this.nav.top.style.lineHeight = "1.2";
                this.nav.top.style.textAlign = "left";
            };
            this.nav.top.style.MozUserSelect = 'none';
            this.nav.top.style.KhtmlUserSelect = 'none';
            this.nav.top.style.position = 'relative';
            this.nav.top.style.width = this.width ? this.width : '100%';
            if (this.hideUntilInit) {
                this.nav.top.style.visibility = 'hidden';
            };
            if (!this.visible) {
                this.nav.top.style.display = "none";
            };
            this.nav.scroll = document.createElement("div");
            this.nav.scroll.style.height = this.getScrollableHeight() + "px";
            if (this.heightSpec === 'BusinessHours') {
                this.nav.scroll.style.overflow = "auto";
            } else {
                this.nav.scroll.style.overflow = "hidden";
            };
            this.nav.scroll.style.position = "relative";
            if (!this.cssOnly) {
                this.nav.scroll.style.border = "1px solid " + this.borderColor;
                this.nav.scroll.style.backgroundColor = this.hourNameBackColor;
            };
            var $0u = this.drawTopHeaderDiv();
            this.nav.top.appendChild($0u);
            this.nav.scroll.style.zoom = 1;
            var $0v = this.drawScrollable();
            this.nav.scrollable = $0v.firstChild;
            this.nav.scroll.appendChild($0v);
            this.nav.top.appendChild(this.nav.scroll);
            this.nav.scrollLayer = document.createElement("div");
            this.nav.scrollLayer.style.position = 'absolute';
            this.nav.scrollLayer.style.top = '0px';
            this.nav.scrollLayer.style.left = '0px';
            this.nav.top.appendChild(this.nav.scrollLayer);
            this.nav.loading = document.createElement("div");
            this.nav.loading.style.position = 'absolute';
            this.nav.loading.style.top = '0px';
            this.nav.loading.style.left = (this.hourWidth + 5) + "px";
            this.nav.loading.style.backgroundColor = this.loadingLabelBackColor;
            this.nav.loading.style.fontSize = this.loadingLabelFontSize;
            this.nav.loading.style.fontFamily = this.loadingLabelFontFamily;
            this.nav.loading.style.color = this.loadingLabelFontColor;
            this.nav.loading.style.padding = '2px';
            this.nav.loading.innerHTML = this.loadingLabelText;
            this.nav.loading.style.display = 'none';
            this.nav.top.appendChild(this.nav.loading);
        };
        this.drawHourTable = function() {
            if (!this.fasterDispose) DayPilot.pu(this.nav.hourTable);
            this.nav.scrollable.rows[0].cells[0].innerHTML = '';
            this.nav.hourTable = this.createHourTable();
            this.nav.scrollable.rows[0].cells[0].appendChild(this.nav.hourTable);
        };
        this.drawScrollable = function() {
            var $0w = document.createElement("div");
            $0w.style.zoom = 1;
            $0w.style.position = 'relative';
            var $0x = document.createElement("table");
            $0x.cellSpacing = "0";
            $0x.cellPadding = "0";
            $0x.border = "0";
            $0x.style.border = "0px none";
            $0x.style.width = "100%";
            $0x.style.position = 'absolute';
            var r = $0x.insertRow(-1);
            var c;
            c = r.insertCell(-1);
            c.valign = "top";
            c.style.padding = '0px';
            c.style.border = '0px none';
            this.nav.hourTable = this.createHourTable();
            c.appendChild(this.nav.hourTable);
            c = r.insertCell(-1);
            c.valign = "top";
            c.width = "100%";
            c.style.padding = '0px';
            c.style.border = '0px none';
            if (!this.cssOnly) {
                c.appendChild(this.createEventsAndCells());
            } else {
                var $0v = document.createElement("div");
                $0v.style.position = "relative";
                c.appendChild($0v);
                $0v.appendChild(this.createEventsAndCells());
                $0v.appendChild(this.$1V());
            };
            $0w.appendChild($0x);
            this.nav.zoom = $0w;
            return $0w;
        };
        this.createEventsAndCells = function() {
            var $0x = document.createElement("table");
            $0x.cellPadding = "0";
            $0x.cellSpacing = "0";
            $0x.border = "0";
            $0x.style.width = "100%";
            $0x.style.border = "0px none";
            $0x.style.tableLayout = 'fixed';
            if (!this.cssOnly) {
                $0x.style.borderLeft = "1px solid " + this.borderColor;
            };
            this.nav.main = $0x;
            this.nav.events = $0x;
            return $0x;
        };
        this.$1V = function() {
            var $0x = document.createElement("table");
            $0x.style.top = "0px";
            $0x.cellPadding = "0";
            $0x.cellSpacing = "0";
            $0x.border = "0";
            $0x.style.position = "absolute";
            $0x.style.width = "100%";
            $0x.style.border = "0px none";
            $0x.style.tableLayout = 'fixed';
            this.nav.events = $0x;
            var $0y = true;
            var $05 = this.columns;
            var cl = $05.length;
            var r = ($0y) ? $0x.insertRow(-1) : $0x.rows[0];
            for (var j = 0; j < cl; j++) {
                var c = ($0y) ? r.insertCell(-1) : r.cells[j];
                if ($0y) {
                    c.style.padding = '0px';
                    c.style.border = '0px none';
                    c.style.height = '0px';
                    c.style.overflow = 'visible';
                    if (!$b.rtl) {
                        c.style.textAlign = 'left';
                    };
                    var $X = document.createElement("div");
                    $X.style.marginRight = $b.columnMarginRight + "px";
                    $X.style.position = 'relative';
                    $X.style.height = '1px';
                    if (!this.cssOnly) {
                        $X.style.fontSize = '1px';
                        $X.style.lineHeight = '1.2';
                    };
                    $X.style.marginTop = '-1px';
                    c.appendChild($X);
                }
            };
            return $0x;
        };
        this.createHourTable = function() {
            var $0x = document.createElement("table");
            $0x.cellSpacing = "0";
            $0x.cellPadding = "0";
            $0x.border = "0";
            $0x.style.border = '0px none';
            $0x.style.width = this.hourWidth + "px";
            $0x.oncontextmenu = function() {
                return false;
            };
            var $0z = this.cssOnly ? 0 : 1;
            if ($0z) {
                var r = $0x.insertRow(-1);
                r.style.height = "1px";
                r.style.backgroundColor = "white";
                var c = r.insertCell(-1);
                c.style.padding = '0px';
                c.style.border = '0px none';
            };
            var $0A = 24;
            for (var i = 0; i < $0A; i++) {
                this.createHourRow($0x, i);
            };
            return $0x;
        };
        this.createHourRow = function($0x, i) {
            var $g = (this.cellHeight * 2);
            var r = $0x.insertRow(-1);
            r.style.height = $g + "px";
            var c = r.insertCell(-1);
            c.valign = "bottom";
            c.unselectable = "on";
            if (!this.cssOnly) {
                c.style.backgroundColor = this.hourNameBackColor;
            };
            c.style.cursor = "default";
            c.style.padding = '0px';
            c.style.border = '0px none';
            var $0B = document.createElement("div");
            $0B.style.position = "relative";
            if (this.cssOnly) {
                $0B.className = this.$1T("_rowheader");
            };
            $0B.style.width = this.hourWidth + "px";
            $0B.style.height = ($g) + "px";
            $0B.style.overflow = 'hidden';
            $0B.unselectable = 'on';
            var $00 = document.createElement("div");
            if (this.cssOnly) {
                $00.className = this.$1T("_rowheader_inner");
            } else {
                $00.style.borderBottom = "1px solid " + this.hourNameBorderColor;
                $00.style.textAlign = "right";
            };
            $00.style.height = ($g - 1) + "px";
            $00.unselectable = "on";
            var $0C = document.createElement("div");
            if (!this.cssOnly) {
                $0C.style.padding = "2px";
                $0C.style.fontFamily = this.hourFontFamily;
                $0C.style.fontSize = this.hourFontSize;
                $0C.style.color = this.hourFontColor;
            };
            $0C.unselectable = "on";
            var $J = this.startDate.addHours(i);
            var $0D = $J.getHours();
            var am = $0D < 12;
            var $0E = $z.timeFormat();
            if ($0E === "Clock12Hours") {
                $0D = $0D % 12;
                if ($0D === 0) {
                    $0D = 12;
                }
            };
            $0C.innerHTML = $0D;
            var $0F = document.createElement("span");
            $0F.unselectable = "on";
            if (!this.cssOnly) {
                $0F.style.fontSize = "10px";
                $0F.style.verticalAlign = "super";
            } else {
                $0F.className = this.$1T("_rowheader_minutes");
            };
            var $0G;
            if ($0E === "Clock12Hours") {
                if (am) {
                    $0G = "AM";
                } else {
                    $0G = "PM";
                }
            } else {
                $0G = "00";
            };
            if (!this.cssOnly) {
                $0F.innerHTML = "&nbsp;" + $0G;
            } else {
                $0F.innerHTML = $0G;
            };
            $0C.appendChild($0F);
            $00.appendChild($0C);
            $0B.appendChild($00);
            c.appendChild($0B);
        };
        this.getScrollableHeight = function() {
            switch (this.heightSpec) {
                case "Full":
                    return (24 * 2 * this.cellHeight);
                case "BusinessHours":
                    var $0H = this.businessHoursSpan();
                    return $0H * this.cellHeight * 2;
                case "BusinessHoursNoScroll":
                    var $0H = this.businessHoursSpan();
                    return $0H * this.cellHeight * 2;
                default:
                    throw "DayPilot.Calendar: Unexpected 'heightSpec' value.";
            }
        };
        this.$1W = function() {
            var parent = $b.nav.corner ? $b.nav.corner.parentNode : null;
            if (!parent) {
                return;
            };
            parent.innerHTML = '';
            var $0I = this.drawCorner();
            parent.appendChild($0I);
            $b.nav.corner = $0I;
        };
        this.drawTopHeaderDiv = function() {
            var $0u = document.createElement("div");
            if (!this.cssOnly) {
                $0u.style.borderLeft = "1px solid " + this.borderColor;
                $0u.style.borderRight = "1px solid " + this.borderColor;
            };
            $0u.style.overflow = "auto";
            var $0x = document.createElement("table");
            $0x.cellPadding = "0";
            $0x.cellSpacing = "0";
            $0x.border = "0";
            $0x.style.width = "100%";
            $0x.style.borderCollapse = 'separate';
            $0x.style.border = "0px none";
            var r = $0x.insertRow(-1);
            var c = r.insertCell(-1);
            c.style.padding = '0px';
            c.style.border = '0px none';
            var $0I = this.drawCorner();
            c.appendChild($0I);
            this.nav.corner = $0I;
            c = r.insertCell(-1);
            c.style.width = "100%";
            if (!this.cssOnly) {
                c.style.backgroundColor = this.hourNameBackColor;
            };
            c.valign = "top";
            c.style.position = 'relative';
            c.style.padding = '0px';
            c.style.border = '0px none';
            this.nav.header = document.createElement("table");
            this.nav.header.cellPadding = "0";
            this.nav.header.cellSpacing = "0";
            this.nav.header.border = "0";
            this.nav.header.width = "100%";
            this.nav.header.style.tableLayout = "fixed";
            if (!this.cssOnly) {
                this.nav.header.style.borderBottom = "0px none #000000";
                this.nav.header.style.borderRight = "0px none #000000";
                this.nav.header.style.borderLeft = "1px solid " + this.borderColor;
                this.nav.header.style.borderTop = "1px solid " + this.borderColor;
            };
            this.nav.header.oncontextmenu = function() {
                return false;
            };
            var $0J = this.nav.scroll.style.overflow !== 'hidden';
            if (!this.cssOnly) {
                if ($0J) {
                    this.nav.header.style.borderRight = "1px solid " + this.borderColor;
                }
            };
            c.appendChild(this.nav.header);
            if ($0J) {
                c = r.insertCell(-1);
                c.unselectable = "on";
                if (!this.cssOnly) {
                    c.style.backgroundColor = this.hourNameBackColor;
                    c.style.borderTop = "1px solid " + this.borderColor;
                    c.style.borderBottom = "0px none";
                    c.style.borderLeft = "0px none";
                    c.style.borderRight = "0px none";
                    c.style.padding = '0px';
                    c.style.verticalAlign = 'top';
                    c.innerHTML = "&nbsp;";
                };
                var $0K = document.createElement("div");
                $0K.unselectable = "on";
                $0K.style.position = "relative";
                $0K.style.width = "16px";
                if (!this.cssOnly) {
                    $0K.style.lineHeight = "1px";
                    $0K.style.fontSize = "1px";
                    $0K.style.height = "1px";
                } else {
                    $0K.style.height = this.headerHeight + "px";
                    $0K.className = this.$1T("_cornerright");
                    var $0l = document.createElement("div");
                    $0l.className = this.$1T('_cornerright_inner');
                    $0K.appendChild($0l);
                };
                c.appendChild($0K);
                this.nav.cornerRight = $0K;
            };
            $0u.appendChild($0x);
            return $0u;
        };
        this.drawCorner = function() {
            var $0v = document.createElement("div");
            $0v.style.position = 'relative';
            if (this.cssOnly) {
                $0v.className = this.$1T("_corner");
            } else {
                $0v.style.backgroundColor = this.hourNameBackColor;
                $0v.style.fontFamily = this.headerFontFamily;
                $0v.style.fontSize = this.headerFontSize;
                $0v.style.color = this.headerFontColor;
                $0v.style.borderTop = "1px solid " + this.borderColor;
            };
            $0v.style.width = this.hourWidth + "px";
            $0v.style.height = this.headerHeight + "px";
            $0v.oncontextmenu = function() {
                return false;
            };
            var $0I = document.createElement("div");
            $0I.unselectable = "on";
            if (this.cssOnly) {
                $0I.className = this.$1T("_corner_inner");
            };
            $0v.appendChild($0I);
            return $0v;
        };
        this.disposeMain = function() {
            var $0x = this.nav.main;
            $0x.root = null;
            $0x.onmouseup = null;
            for (var y = 0; y < $0x.rows.length; y++) {
                var r = $0x.rows[y];
                for (var x = 0; x < r.cells.length; x++) {
                    var c = r.cells[x];
                    c.root = null;
                    c.onmousedown = null;
                    c.onmousemove = null;
                    c.onmouseout = null;
                    c.onmouseup = null;
                }
            };
            if (!this.fasterDispose) DayPilot.pu($0x);
        };
        this.drawMain = function() {
            var $0L = [];
            var $0M = [];
            var $0x = this.nav.main;
            var $L = 30 * 60 * 1000;
            var $0N = this.rowCount();
            var $05 = $b.columns;
            var $0y = true;
            if ($0x) {
                this.disposeMain();
            }
            while ($0x && $0x.rows && $0x.rows.length > 0 && $0y) {
                if (!this.fasterDispose) {
                    DayPilot.pu($0x.rows[0]);
                };
                $0x.deleteRow(0);
            };
            this.tableCreated = true;
            var cl = $05.length;
            if (this.cssOnly) {
                var $0O = this.nav.events;
                while ($0O && $0O.rows && $0O.rows.length > 0 && $0y) {
                    if (!this.fasterDispose) {
                        DayPilot.pu($0O.rows[0]);
                    };
                    $0O.deleteRow(0);
                };
                var cl = $05.length;
                var r = ($0y) ? $0O.insertRow(-1) : $0O.rows[0];
                for (var j = 0; j < cl; j++) {
                    var c = ($0y) ? r.insertCell(-1) : r.cells[j];
                    if ($0y) {
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '0px';
                        c.style.overflow = 'visible';
                        if (!$b.rtl) {
                            c.style.textAlign = 'left';
                        };
                        var $X = document.createElement("div");
                        $X.style.marginRight = $b.columnMarginRight + "px";
                        $X.style.position = 'relative';
                        $X.style.height = '1px';
                        if (!this.cssOnly) {
                            $X.style.fontSize = '1px';
                            $X.style.lineHeight = '1.2';
                        };
                        $X.style.marginTop = '-1px';
                        c.appendChild($X);
                    }
                }
            };
            if (!this.cssOnly) {
                var r = ($0y) ? $0x.insertRow(-1) : $0x.rows[0];
                if ($0y) {
                    r.style.backgroundColor = 'white';
                };
                for (var j = 0; j < cl; j++) {
                    var c = ($0y) ? r.insertCell(-1) : r.cells[j];
                    if ($0y) {
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '1px';
                        c.style.overflow = 'visible';
                        c.style.width = (100.0 / $05.length) + "%";
                        var $X = document.createElement("div");
                        $X.style.display = 'block';
                        $X.style.marginRight = $b.columnMarginRight + "px";
                        $X.style.position = 'relative';
                        $X.style.height = '1px';
                        $X.style.fontSize = '1px';
                        $X.style.lineHeight = '1.2';
                        $X.style.marginTop = '-1px';
                        c.appendChild($X);
                    }
                }
            };
            for (var i = 0; i < $0N; i++) {
                var $0z = this.cssOnly ? 0 : 1;
                var r = ($0y) ? $0x.insertRow(-1) : $0x.rows[i + $0z];
                if ($0y) {
                    r.style.MozUserSelect = 'none';
                    r.style.KhtmlUserSelect = 'none';
                };
                for (var j = 0; j < cl; j++) {
                    var $0s = this.columns[j];
                    var c = ($0y) ? r.insertCell(-1) : r.cells[j];
                    c.start = $0s.Start.addTime(i * $L);
                    c.end = c.start.addTime($L);
                    c.onmousedown = this.onCellMousedown;
                    c.onmousemove = this.mousemove;
                    c.onmouseup = function() {
                        return false;
                    };
                    c.onclick = function() {
                        return false;
                    };
                    if ($0y) {
                        c.root = this;
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.verticalAlign = 'top';
                        if (!this.cssOnly) {
                            if (j !== cl - 1) {
                                c.style.borderRight = '1px solid ' + $b.cellBorderColor;
                            }
                        };
                        c.style.height = $b.cellHeight + 'px';
                        c.style.overflow = 'hidden';
                        c.unselectable = 'on';
                        if (!this.cssOnly) {
                            var $X = document.createElement("div");
                            $X.unselectable = 'on';
                            $X.style.fontSize = '1px';
                            $X.style.height = '0px';
                            var $0P = (c.end.getMinutes() + c.end.getSeconds() + c.end.getMilliseconds()) > 0;
                            if ($0P) {
                                if ($b.hourHalfBorderColor !== '') {
                                    $X.style.borderBottom = '1px solid ' + $b.hourHalfBorderColor;
                                }
                            } else {
                                if ($b.hourBorderColor !== '') {
                                    $X.style.borderBottom = '1px solid ' + $b.hourBorderColor;
                                }
                            };
                            var $0Q = document.createElement("div");
                            $0Q.style.height = ($b.cellHeight - 1) + "px";
                            $0Q.style.overflow = 'hidden';
                            $0Q.unselectable = 'on';
                            c.appendChild($0Q);
                        } else {
                            var $X = document.createElement("div");
                            $X.unselectable = 'on';
                            $X.style.height = $b.cellHeight + "px";
                            $X.style.position = "relative";
                            $X.className = this.$1T("_cell");
                            var $0R = this.$1X(c.start, c.end);
                            if ($0R && this.cssOnly) {
                                DayPilot.Util.addClass($X, $b.$1T("_cell_business"));
                            };
                            var $0l = document.createElement("div");
                            $0l.setAttribute("unselectable", "on");
                            $0l.className = this.$1T("_cell_inner");
                            $X.appendChild($0l);
                            c.appendChild($X);
                        };
                        c.appendChild($X);
                    };
                    c.style.backgroundColor = $b.cellBackColor;
                    $0Q = c.firstChild;
                }
            };
            $0x.onmouseup = this.mouseup;
            $0x.root = this;
            $b.nav.scrollable.onmousemove = function(ev) {
                ev = ev || window.event;
                var $0S = $b.nav.scrollable;
                $b.coords = DayPilot.mo3($0S, ev);
                var $Y = DayPilot.mc(ev);
                if (DayPilotCalendar.resizing) {
                    if (!DayPilotCalendar.resizingShadow) {
                        DayPilotCalendar.resizingShadow = $b.createShadow(DayPilotCalendar.resizing, false, $b.shadow);
                    };
                    var $0T = $b.cellHeight;
                    var $I = 1;
                    var $0U = ($Y.y - DayPilotCalendar.originalMouse.y);
                    if (DayPilotCalendar.resizing.dpBorder === 'bottom') {
                        var $0V = Math.floor(((DayPilotCalendar.originalHeight + DayPilotCalendar.originalTop + $0U) + $0T / 2) / $0T) * $0T - DayPilotCalendar.originalTop + $I;
                        if ($0V < $0T) $0V = $0T;
                        var $04 = $b.nav.main.clientHeight;
                        if (DayPilotCalendar.originalTop + $0V > $04) $0V = $04 - DayPilotCalendar.originalTop;
                        DayPilotCalendar.resizingShadow.style.height = ($0V - 4) + 'px';
                    } else if (DayPilotCalendar.resizing.dpBorder === 'top') {
                        var $0W = Math.floor(((DayPilotCalendar.originalTop + $0U - $I) + $0T / 2) / $0T) * $0T + $I;
                        if ($0W < $I) {
                            $0W = $I;
                        };
                        if ($0W > DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $0T) {
                            $0W = DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $0T;
                        };
                        var $0V = DayPilotCalendar.originalHeight - ($0W - DayPilotCalendar.originalTop) - 4;
                        if ($0V < $0T) {
                            $0V = $0T;
                        } else {
                            DayPilotCalendar.resizingShadow.style.top = $0W + 'px';
                        };
                        DayPilotCalendar.resizingShadow.style.height = ($0V) + 'px';
                    }
                } else if (DayPilotCalendar.moving) {
                    if (!DayPilotCalendar.movingShadow) {
                        DayPilotCalendar.movingShadow = $b.createShadow(DayPilotCalendar.moving, !$b.ie, $b.shadow);
                        DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
                    };
                    if (!$b.coords) {
                        return;
                    };
                    var $0T = $b.cellHeight;
                    var $I = 1;
                    var $0i = DayPilotCalendar.moveOffsetY;
                    if (!$0i) {
                        $0i = $0T / 2;
                    };
                    var $0W = Math.floor((($b.coords.y - $0i - $I) + $0T / 2) / $0T) * $0T + $I;
                    if ($0W < $I) {
                        $0W = $I;
                    };
                    var $0b = $b.nav.events;
                    var $04 = $b.nav.main.clientHeight;
                    var $g = parseInt(DayPilotCalendar.movingShadow.style.height);
                    if ($0W + $g > $04) {
                        $0W = $04 - $g;
                    };
                    DayPilotCalendar.movingShadow.parentNode.style.display = 'none';
                    DayPilotCalendar.movingShadow.style.top = $0W + 'px';
                    DayPilotCalendar.movingShadow.parentNode.style.display = '';
                    var $0X = $0b.clientWidth / $0b.rows[0].cells.length;
                    var $l = Math.floor(($b.coords.x - 45) / $0X);
                    if ($l < 0) {
                        $l = 0;
                    };
                    if ($l < $0b.rows[0].cells.length && $l >= 0 && DayPilotCalendar.movingShadow.column !== $l) {
                        DayPilotCalendar.movingShadow.column = $l;
                        DayPilotCalendar.moveShadow($0b.rows[0].cells[$l]);
                    }
                }
            };
            $b.nav.scrollable.style.display = '';
        };
        this.$1X = function($J, end) {
            if (this.businessBeginsHour < this.businessEndsHour) {
                return !($J.getHours() < this.businessBeginsHour || $J.getHours() >= this.businessEndsHour || $J.getDayOfWeek() === 6 || $J.getDayOfWeek() === 0);
            };
            if ($J.getHours() >= this.businessBeginsHour) {
                return true;
            };
            if ($J.getHours() < this.businessEndsHour) {
                return true;
            };
            return false;
        };
        this.disposeHeader = function() {
            var $0x = this.nav.header;
            if ($0x && $0x.rows) {
                for (var y = 0; y < $0x.rows.length; y++) {
                    var r = $0x.rows[y];
                    for (var x = 0; x < r.cells.length; x++) {
                        var c = r.cells[x];
                        c.onclick = null;
                        c.onmousemove = null;
                        c.onmouseout = null;
                    }
                }
            };
            if (!this.fasterDispose) DayPilot.pu($0x);
        };
        this.drawHeaderRow = function($0y) {
            var r = ($0y) ? this.nav.header.insertRow(-1) : this.nav.header.rows[0];
            var $05 = this.columns;
            var $0Y = $05.length;
            for (var i = 0; i < $0Y; i++) {
                var $o = $05[i];
                var $c = ($0y) ? r.insertCell(-1) : r.cells[i];
                $c.data = $o;
                $c.style.overflow = 'hidden';
                $c.style.padding = '0px';
                $c.style.border = '0px none';
                $c.style.height = (this.headerHeight) + "px";
                var $X = ($0y) ? document.createElement("div") : $c.firstChild;
                if ($0y) {
                    $X.unselectable = 'on';
                    $X.style.MozUserSelect = 'none';
                    $X.style.backgroundColor = $o.BackColor;
                    $X.style.cursor = 'default';
                    $X.style.position = 'relative';
                    if (!this.cssOnly) {
                        $X.style.fontFamily = this.headerFontFamily;
                        $X.style.fontSize = this.headerFontSize;
                        $X.style.color = this.headerFontColor;
                        if (i !== $0Y - 1) {
                            $X.style.borderRight = "1px solid " + this.borderColor;
                        }
                    } else {
                        $X.className = $b.$1T('_colheader');
                    };
                    $X.style.height = this.headerHeight + "px";
                    var $0C = document.createElement("div");
                    if (!this.cssOnly) {
                        $0C.style.position = 'absolute';
                        $0C.style.left = '0px';
                        $0C.style.width = '100%';
                        $0C.style.padding = "2px";
                        $X.style.textAlign = 'center';
                    } else {
                        $0C.className = $b.$1T('_colheader_inner');
                    };
                    $0C.unselectable = 'on';
                    $X.appendChild($0C);
                    $c.appendChild($X);
                };
                var $0C = $X.firstChild;
                $0C.innerHTML = $o.InnerHTML;
            }
        };
        this.widthUnit = function() {
            if (this.width && this.width.indexOf("px") !== -1) {
                return "Pixel";
            };
            return "Percentage";
        };
        this.drawHeader = function() {
            var $0u = this.nav.header;
            var $0y = true;
            var $05 = this.columns;
            var $0Y = $05.length;
            while (this.headerCreated && $0u && $0u.rows && $0u.rows.length > 0 && $0y) {
                if (!this.fasterDispose) DayPilot.pu($0u.rows[0]);
                $0u.deleteRow(0);
            };
            this.headerCreated = true;
            if (!$0y) {
                var $0I = $b.nav.corner;
                if (!this.cssOnly) {
                    $0I.style.backgroundColor = $b.cornerBackColor;
                };
                if (!this.fasterDispose) DayPilot.pu($0I.firstChild);
            };
            this.drawHeaderRow($0y);
        };
        this.loadingStart = function() {
            if (this.loadingLabelVisible) {
                this.nav.loading.innerHTML = this.loadingLabelText;
                this.nav.loading.style.top = (this.headerHeight + 5) + "px";
                this.nav.loading.style.display = '';
            }
        };
        this.commandCallBack = function($0Z, $o) {
            var $F = {};
            $F.command = $0Z;
            this.$1N('Command', $o, $F);
        };
        this.loadingStop = function($10) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            this.nav.loading.style.display = 'none';
        };
        this.$1Y = function() {
            var $11 = this.nav.scroll;
            if (!$11.onscroll) {
                $11.onscroll = function() {
                    $b.$1Z();
                };
            };
            var $12 = (typeof this.$20.scrollpos !== 'undefined') ? this.$20.scrollpos : this.initScrollPos;
            if (!$12) {
                return;
            };
            if ($12 === 'Auto') {
                if (this.heightSpec === "BusinessHours") {
                    $12 = 2 * this.cellHeight * this.businessBeginsHour;
                } else {
                    $12 = 0;
                }
            };
            $11.root = this;
            if ($11.scrollTop === 0) {
                $11.scrollTop = $12;
            }
        };
        this.callbackError = function($s, $t) {
            alert("Error!\r\nResult: " + $s + "\r\nContext:" + $t);
        };
        this.$21 = function() {
            var w = DayPilot.sw(this.nav.scroll);
            var d = this.nav.cornerRight;
            if (d && w > 0) {
                if (this.cssOnly) {
                    d.style.width = w + 'px';
                } else {
                    d.style.width = (w - 3) + 'px';
                }
            }
        };
        this.registerGlobalHandlers = function() {
            if (!DayPilotCalendar.globalHandlers) {
                DayPilotCalendar.globalHandlers = true;
                DayPilot.re(document, 'mouseup', DayPilotCalendar.gMouseUp);
                DayPilot.re(window, 'unload', DayPilotCalendar.gUnload);
            }
        };
        this.events = {};
        this.events.add = function(e) {
            e.calendar = $b;
            if (!$b.events.list) {
                $b.events.list = [];
            };
            $b.events.list.push(e.data);
            $b.update();
            $b.$1R.notify();
        };
        this.events.update = function(e) {
            e.commit();
            $b.update();
            $b.$1R.notify();
        };
        this.events.remove = function(e) {
            var $13 = DayPilot.indexOf($b.events.list, e.data);
            $b.events.list.splice($13, 1);
            $b.update();
            $b.$1R.notify();
        };
        this.update = function() {
            $b.$22();
            $b.prepareVariables();
            $b.deleteEvents();
            var $14 = true;
            if ($14) {
                $b.prepareColumns();
                $b.drawHeader();
                $b.drawMain();
                $b.drawHourTable();
                $b.updateHeight();
                $b.$1W();
                $b.$23();
            };
            $b.loadEvents();
            $b.updateHeaderHeight();
            $b.$1P();
            $b.drawEvents();
            $b.clearSelection();
            if (this.visible) {
                this.show();
            } else {
                this.hide();
            }
        };
        this.$24 = function() {
            if (this.id && this.id.tagName) {
                this.nav.top = this.id;
            } else if (typeof this.id === "string") {
                this.nav.top = document.getElementById(this.id);
                if (!this.nav.top) {
                    throw "DayPilot.Calendar: The placeholder element not found: '" + id + "'.";
                }
            } else {
                throw "DayPilot.Calendar() constructor requires the target element or its ID as a parameter";
            }
        };
        this.$25 = {};
        this.$25.events = [];
        this.$26 = function(i) {
            var $15 = this.$25.events;
            var $o = this.events.list[i];
            var $16 = {};
            for (var name in $o) {
                $16[name] = $o[name];
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var $C = {};
                $C.data = $16;
                this.onBeforeEventRender($C);
            };
            $15[i] = $16;
        };
        this.loadEvents = function() {
            var $0O = this.events.list;
            $b.$25.events = [];
            if (!$0O) {
                return;
            };
            var length = $0O.length;
            var $17 = 24 * 60 * 60 * 1000;
            this.cache.pixels = {};
            var $18 = [];
            this.scrollLabels = [];
            this.minStart = 10000;
            this.maxEnd = 0;
            for (var i = 0; i < length; i++) {
                var e = $0O[i];
                e.start = new DayPilot.Date(e.start);
                e.end = new DayPilot.Date(e.end);
            };
            if (typeof this.onBeforeEventRender === 'function') {
                for (var i = 0; i < length; i++) {
                    this.$26(i);
                }
            };
            for (var i = 0; i < this.columns.length; i++) {
                var scroll = {};
                scroll.minEnd = 1000000;
                scroll.maxStart = -1;
                this.scrollLabels.push(scroll);
                var $0s = this.columns[i];
                $0s.events = [];
                $0s.lines = [];
                $0s.blocks = [];
                var $19 = new DayPilot.Date($0s.Start);
                var $1a = $19.getTime();
                var $1b = $19.addTime($17);
                var $1c = $1b.getTime();
                for (var j = 0; j < length; j++) {
                    if ($18[j]) {
                        continue;
                    };
                    var e = $0O[j];
                    var $J = e.start;
                    var end = e.end;
                    var $1d = $J.getTime();
                    var $1e = end.getTime();
                    if ($1e < $1d) {
                        continue;
                    };
                    var $1f = !($1e <= $1a || $1d >= $1c);
                    if ($1f) {
                        var ep = new DayPilot.Event(e, $b);
                        ep.part.dayIndex = i;
                        ep.part.start = $1a < $1d ? e.start : $19;
                        ep.part.end = $1c > $1e ? e.end : $1b;
                        var $1g = this.getPixels(ep.part.start, $0s.Start);
                        var $1h = this.getPixels(ep.part.end, $0s.Start);
                        var top = $1g.top;
                        var $1i = $1h.top;
                        if (top === $1i && ($1g.cut || $1h.cut)) {
                            continue;
                        };
                        var $1j = $1h.boxBottom;
                        ep.part.top = Math.floor(top / this.cellHeight) * this.cellHeight + 1;
                        ep.part.height = Math.max(Math.ceil($1j / this.cellHeight) * this.cellHeight - ep.part.top, this.cellHeight - 1) + 1;
                        ep.part.barTop = Math.max(top - ep.part.top - 1, 0);
                        ep.part.barHeight = Math.max($1i - top - 2, 1);
                        var $J = ep.part.top;
                        var end = ep.part.top + ep.part.height;
                        if ($J > scroll.maxStart) {
                            scroll.maxStart = $J;
                        };
                        if (end < scroll.minEnd) {
                            scroll.minEnd = end;
                        };
                        if ($J < this.minStart) {
                            this.minStart = $J;
                        };
                        if (end > this.maxEnd) {
                            this.maxEnd = end;
                        };
                        $0s.events.push(ep);
                        if (typeof this.onBeforeEventRender === 'function') {
                            ep.cache = this.$25.events[j];
                        };
                        if (ep.part.start.getTime() === $1d && ep.part.end.getTime() === $1e) {
                            $18[j] = true;
                        }
                    }
                }
            };
            for (var i = 0; i < this.columns.length; i++) {
                var $0s = this.columns[i];
                $0s.events.sort(this.eventComparer);
                for (var j = 0; j < $0s.events.length; j++) {
                    var e = $0s.events[j];
                    $0s.putIntoBlock(e);
                };
                for (var j = 0; j < $0s.blocks.length; j++) {
                    var $00 = $0s.blocks[j];
                    $00.events.sort(this.eventComparer);
                    for (var k = 0; k < $00.events.length; k++) {
                        var e = $00.events[k];
                        $00.putIntoLine(e);
                    }
                }
            }
        };
        this.eventComparer = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $1k = a.start().getTime() - b.start().getTime();
            if ($1k !== 0) {
                return $1k;
            };
            var $1l = b.end().getTime() - a.end().getTime();
            return $1l;
        };
        this.debug = function($10, $1m) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$b.debugMessages) {
                $b.debugMessages = [];
            };
            $b.debugMessages.push($10);
            if (typeof console !== 'undefined') {
                console.log($10);
            }
        };
        this.getPixels = function($R, $J) {
            if (!$J) $J = this.startDate;
            var $1d = $J.getTime();
            var $1n = $R.getTime();
            var $15 = this.cache.pixels[$1n + "_" + $1d];
            if ($15) {
                return $15;
            };
            $1d = $J.getTime();
            var $1o = 30 * 60 * 1000;
            var $1p = $1n - $1d;
            var $1q = $1p % $1o;
            var $1r = $1p - $1q;
            var $1s = $1r + $1o;
            if ($1q === 0) {
                $1s = $1r;
            };
            var $s = {};
            $s.cut = false;
            $s.top = this.ticksToPixels($1p);
            $s.boxTop = this.ticksToPixels($1r);
            $s.boxBottom = this.ticksToPixels($1s);
            this.cache.pixels[$1n + "_" + $1d] = $s;
            return $s;
        };
        this.ticksToPixels = function($1n) {
            return Math.floor((this.cellHeight * $1n) / (1000 * 60 * 30));
        };
        this.prepareVariables = function() {
            this.startDate = new DayPilot.Date(this.startDate).getDatePart();
        };
        this.updateHeaderHeight = function() {
            if (this.nav.corner) {
                this.nav.corner.style.height = this.headerHeight + "px";
            }
        };
        this.updateHeight = function() {
            var sh = this.getScrollableHeight();
            if (this.nav.scroll && sh > 0) {
                this.nav.scroll.style.height = sh + "px";
            }
        };
        this.$1R = {};
        this.$1R.scope = null;
        this.$1R.notify = function() {
            if ($b.$1R.scope) {
                $b.$1R.scope["$apply"]();
            }
        };
        this.$1R.apply = function(f) {
            f();
        };
        this.$1Z = function() {
            var top = $b.nav.scroll.scrollTop;
            var $1t = top / (2 * $b.cellHeight);
            $b.$20.scrollHour = $1t;
        };
        this.$23 = function() {
            var $12 = 0;
            if ($b.$20.scrollHour) {
                $12 = 2 * $b.cellHeight * $b.$20.scrollHour;
            } else {
                if ($b.initScrollPos === 'Auto') {
                    if (this.heightSpec === "BusinessHours") {
                        $12 = 2 * this.cellHeight * this.businessBeginsHour;
                    } else {
                        $12 = 0;
                    }
                }
            };
            $b.nav.scroll.scrollTop = $12;
        };
        this.$27 = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $b.events.list === 'undefined') || (!$b.events.list);
            } else {
                return false;
            }
        };
        this.$1P = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.show = function() {
            $b.visible = true;
            $b.nav.top.style.display = '';
        };
        this.hide = function() {
            $b.visible = false;
            $b.nav.top.style.display = 'none';
        };
        this.$28 = function() {
            this.prepareVariables();
            this.prepareColumns();
            this.drawTop();
            this.drawHeader();
            this.drawMain();
            this.$21();
            this.$1Y();
            this.registerGlobalHandlers();
            DayPilotCalendar.register(this);
            this.$29();
            this.$1N('Init');
        };
        this.$20 = {};
        this.$2a = function() {
            this.$20.themes = [];
            this.$20.themes.push(this.theme || this.cssClassPrefix);
        };
        this.$2b = function() {
            var $1u = this.$20.themes;
            for (var i = 0; i < $1u.length; i++) {
                var $1v = $1u[i];
                DayPilot.Util.removeClass(this.nav.top, $1v + "_main");
            };
            this.$20.themes = [];
        };
        this.$2c = function() {
            this.afterRender(null, false);
            if (typeof this.onAfterRender === "function") {
                var $C = {};
                $C.isCallBack = false;
                this.onAfterRender($C);
            }
        };
        this.$2d = function() {
            if (typeof this.onInit === "function" && !this.$2e) {
                this.$2e = true;
                var $C = {};
                this.onInit($C);
            }
        };
        this.$22 = function() {
            if (!$b.cssOnly) {
                $b.cssOnly = true;
                window.console && window.console.log && window.console.log("DayPilot: cssOnly = false mode is not supported anymore.");
            }
        };
        this.$2f = function() {
            var el = $b.nav.top;
            return el.offsetWidth > 0 && el.offsetHeight > 0;
        };
        this.$29 = function() {
            var $1w = $b.$2f;
            if (!$1w()) {
                $b.$2g = setInterval(function() {
                    if ($1w()) {
                        $b.$1Y();
                        $b.$21();
                        clearInterval($b.$2g);
                    }
                }, 100);
            }
        };
        this.init = function() {
            this.$24();
            var $1x = this.$27();
            this.$22();
            this.$2a();
            if ($1x) {
                this.$28();
                return;
            };
            this.prepareVariables();
            this.prepareColumns();
            this.loadEvents();
            this.drawTop();
            this.drawHeader();
            this.drawMain();
            this.$1P();
            this.$21();
            this.$1Y();
            this.registerGlobalHandlers();
            DayPilotCalendar.register(this);
            if (this.events) {
                this.updateHeaderHeight();
                this.drawEvents();
            };
            this.$2c();
            this.$2d();
            this.$29();
            this.initialized = true;
        };
        this.Init = this.init;
    };
    DayPilotCalendar.Cell = function($J, end, $l) {
        this.start = $J;
        this.end = end;
        this.column = function() {};
    };
    DayPilotCalendar.Column = function($1y, name, $R) {
        this.value = $1y;
        this.name = name;
        this.date = new DayPilot.Date($R);
    };
    DayPilot.Calendar = DayPilotCalendar.Calendar;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotCalendar = function($1z) {
                var $1A = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $1B = new DayPilot.Calendar(this.id);
                    this.daypilot = $1B;
                    for (name in $1z) {
                        $1B[name] = $1z[name];
                    };
                    $1B.init();
                    if (!$1A) {
                        $1A = $1B;
                    }
                });
                if (this.length === 1) {
                    return $1A;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    (function registerAngularModule() {
        var $1C = DayPilot.am();
        if (!$1C) {
            return;
        };
        $1C.directive("daypilotCalendar", ['$parse', function($1D) {
            return {
                "restrict": "E",
                "template": "<div></div>",
                "replace": true,
                "link": function($1E, element, $1F) {
                    var $b = new DayPilot.Calendar(element[0]);
                    $b.$1R.scope = $1E;
                    $b.init();
                    var $1G = $1F["id"];
                    if ($1G) {
                        $1E[$1G] = $b;
                    };
                    var $1H = $1F["publishAs"];
                    if ($1H) {
                        var getter = $1D($1H);
                        var setter = getter.assign;
                        setter($1E, $b);
                    };
                    for (var name in $1F) {
                        if (name.indexOf("on") === 0) {
                            (function(name) {
                                $b[name] = function($C) {
                                    var f = $1D($1F[name]);
                                    $1E["$apply"](function() {
                                        f($1E, {
                                            "args": $C
                                        });
                                    });
                                };
                            })(name);
                        }
                    };
                    var $1I = $1E["$watch"];
                    var $1J = $1F["config"] || $1F["daypilotConfig"];
                    var $0O = $1F["events"] || $1F["daypilotEvents"];
                    $1I.call($1E, $1J, function($1y) {
                        for (var name in $1y) {
                            $b[name] = $1y[name];
                        };
                        $b.update();
                        $b.$2d();
                    }, true);
                    $1I.call($1E, $0O, function($1y) {
                        $b.events.list = $1y;
                        $b.update();
                    }, true);
                }
            };
        }]);
    })();
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
(function() {
    if (typeof DayPilot.DatePicker !== 'undefined') {
        return;
    };
    DayPilot.DatePicker = function($a) {
        this.v = '217-lite';
        var $b = "navigator_" + new Date().getTime();
        var $c = this;
        this.prepare = function() {
            this.locale = "en-us";
            this.target = null;
            this.resetTarget = true;
            this.pattern = this.$m.locale().datePattern;
            this.cssClassPrefix = "navigator_white";
            this.theme = null;
            this.patterns = [];
            if ($a) {
                for (var name in $a) {
                    this[name] = $a[name];
                }
            };
            this.init();
        };
        this.init = function() {
            this.date = new DayPilot.Date(this.date);
            var $d = this.$n();
            if (this.resetTarget && !$d) {
                this.$o(this.date);
            };
            DayPilot.re(document, "mousedown", function() {
                $c.close();
            });
        };
        this.close = function() {
            if (!this.$p) {
                return;
            };
            if (this.navigator) {
                this.navigator.dispose();
            };
            this.div.innerHTML = '';
            if (this.div && this.div.parentNode === document.body) {
                document.body.removeChild(this.div);
            }
        };
        this.$n = function() {
            var element = this.$q();
            if (!element) {
                return this.date;
            };
            var $d = null;
            if (element.tagName === "INPUT") {
                $d = element.value;
            } else {
                $d = element.innerText;
            };
            if (!$d) {
                return null;
            };
            var $e = DayPilot.Date.parse($d, $c.pattern);
            for (var i = 0; i < $c.patterns.length; i++) {
                if ($e) {
                    return $e;
                };
                $e = DayPilot.Date.parse($d, $c.patterns[i]);
            };
            return $e;
        };
        this.$o = function($e) {
            var element = this.$q();
            if (!element) {
                return;
            };
            var $d = $e.toString($c.pattern, $c.locale);
            if (element.tagName === "INPUT") {
                element.value = $d;
            } else {
                element.innerHTML = $d;
            }
        };
        this.$m = {};
        this.$m.locale = function() {
            return DayPilot.Locale.find($c.locale);
        };
        this.$q = function() {
            var id = this.target;
            var element = (id && id.nodeType && id.nodeType === 1) ? id : document.getElementById(id);
            return element;
        };
        this.show = function() {
            var element = this.$q();
            var navigator = this.navigator;
            var navigator = new DayPilot.Navigator($b);
            navigator.api = 2;
            navigator.cssOnly = true;
            navigator.theme = $c.theme || $c.cssClassPrefix;
            navigator.weekStarts = "Auto";
            navigator.locale = $c.locale;
            navigator.timeRangeSelectedHandling = "JavaScript";
            navigator.onTimeRangeSelected = function($f) {
                $c.date = $f.start;
                var $g = $f.start;
                var $d = $g.toString($c.pattern, $c.locale);
                var $f = {};
                $f.start = $g;
                $f.date = $g;
                $f.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($f);
                    if ($f.preventDefault.value) {
                        return;
                    }
                };
                $c.$o($d);
                $c.close();
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($f);
                }
            };
            this.navigator = navigator;
            var $h = DayPilot.abs(element);
            var $i = element.offsetHeight;
            var $j = document.createElement("div");
            $j.style.position = "absolute";
            $j.style.left = $h.x + "px";
            $j.style.top = ($h.y + $i) + "px";
            var $k = document.createElement("div");
            $k.id = $b;
            $j.appendChild($k);
            DayPilot.re($j, "mousedown", function(ev) {
                var ev = ev || window.event;
                ev.cancelBubble = true;
                ev.stopPropagation && ev.stopPropagation();
            });
            document.body.appendChild($j);
            this.div = $j;
            var $l = $c.$n() || new DayPilot.Date().getDatePart();
            navigator.startDate = $l;
            navigator.selectionDay = $l;
            navigator.init();
            this.$p = true;
        };
        this.prepare();
    };
})();

if (typeof(DayPilot) === 'undefined') {
    DayPilot = {};
};
(function() {
    'use strict';
    DayPilot.ModalStatic = {};
    DayPilot.ModalStatic.list = [];
    DayPilot.ModalStatic.hide = function() {
        if (this.list.length > 0) {
            var $a = this.list.pop();
            if ($a) {
                $a.hide();
            }
        }
    };
    DayPilot.ModalStatic.remove = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                $c.splice(i, 1);
                return;
            }
        }
    };
    DayPilot.ModalStatic.close = function($d) {
        DayPilot.ModalStatic.result($d);
        DayPilot.ModalStatic.hide();
    };
    DayPilot.ModalStatic.result = function(r) {
        var $c = DayPilot.ModalStatic.list;
        if ($c.length > 0) {
            $c[$c.length - 1].result = r;
        }
    };
    DayPilot.ModalStatic.displayed = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                return true;
            }
        };
        return false;
    };
    DayPilot.ModalStatic.stretch = function() {
        if (this.list.length > 0) {
            var $a = this.list[this.list.length - 1];
            if ($a) {
                $a.stretch();
            }
        }
    };
    var $e = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.Modal = function($f) {
        this.autoStretch = true;
        this.autoStretchFirstLoadOnly = false;
        this.border = "10px solid #ccc";
        this.corners = 'Rounded';
        this.className = null;
        this.dragDrop = true;
        this.height = 200;
        this.loadingHtml = null;
        this.maxHeight = null;
        this.opacity = 30;
        this.scrollWithPage = true;
        this.top = 20;
        this.useIframe = true;
        this.width = 500;
        this.zIndex = null;
        this.closed = null;
        this.onClosed = null;
        var $g = this;
        this.id = '_' + new Date().getTime() + 'n' + (Math.random() * 10);
        this.registered = false;
        this.start = null;
        this.coords = null;
        this.showHtml = function($h) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            if (!this.div) {
                this.create();
            };
            this.update();
            if (this.useIframe) {
                var $i = function(p, $j) {
                    return function() {
                        p.setInnerHTML(p.id + "iframe", $j);
                    };
                };
                window.setTimeout($i(this, $h), 0);
            } else {
                if ($h.nodeType) {
                    this.div.appendChild($h);
                } else {
                    this.div.innerHTML = $h;
                }
            };
            this.update();
            this.register();
        };
        this.rounded = function() {
            return this.corners && this.corners.toLowerCase() === 'rounded';
        };
        this.showUrl = function($k) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            this.useIframe = true;
            if (!this.div) {
                this.create();
            };
            var $l = this.loadingHtml;
            if ($l) {
                this.iframe.src = "about:blank";
                this.setInnerHTML(this.id + "iframe", $l);
            };
            this.re(this.iframe, "load", this.onIframeLoad);
            this.iframe.src = $k;
            this.update();
            this.register();
        };
        this.update = function() {
            var $m = window;
            var $n = document;
            var scrollY = $m.pageYOffset ? $m.pageYOffset : (($n.documentElement && $n.documentElement.scrollTop) ? $n.documentElement.scrollTop : $n.body.scrollTop);
            var $o = function() {
                return $g.windowRect().y;
            };
            this.hideDiv.style.filter = "alpha(opacity=" + this.opacity + ")";
            this.hideDiv.style.opacity = "0." + this.opacity;
            this.hideDiv.style.backgroundColor = "black";
            if (this.zIndex) {
                this.hideDiv.style.zIndex = this.zIndex;
            };
            this.hideDiv.style.display = '';
            window.setTimeout(function() {
                $g.hideDiv.onclick = function() {
                    $g.hide();
                };
            }, 500);
            this.div.className = this.className;
            this.div.style.border = this.border;
            if (this.rounded()) {
                this.div.style.MozBorderRadius = "5px";
                this.div.style.webkitBorderRadius = "5px";
                this.div.style.borderRadius = "5px";
            };
            this.div.style.marginLeft = '-' + Math.floor(this.width / 2) + "px";
            this.div.style.position = 'absolute';
            this.div.style.top = (scrollY + this.top) + 'px';
            this.div.style.width = this.width + 'px';
            if (this.zIndex) {
                this.div.style.zIndex = this.zIndex;
            };
            if (this.height) {
                this.div.style.height = this.height + 'px';
            };
            if (this.useIframe && this.height) {
                this.iframe.style.height = (this.height) + 'px';
            };
            this.div.style.display = '';
            DayPilot.ModalStatic.list.push(this);
        };
        this.onIframeLoad = function() {
            $g.iframe.contentWindow.modal = $g;
            if ($g.autoStretch) {
                $g.stretch();
            }
        };
        this.stretch = function() {
            var $o = function() {
                return $g.windowRect().y;
            };
            var $p = function() {
                return $g.windowRect().x;
            };
            var $q = $p() - 40;
            for (var w = this.width; w < $q && this.hasHorizontalScrollbar(); w += 10) {
                this.div.style.width = w + 'px';
                this.div.style.marginLeft = '-' + Math.floor(w / 2) + "px";
            };
            var $r = this.maxHeight || $o() - 2 * this.top;
            for (var h = this.height; h < $r && this.hasVerticalScrollbar(); h += 10) {
                this.iframe.style.height = (h) + 'px';
                this.div.style.height = h + 'px';
            };
            if (this.autoStretchFirstLoadOnly) {
                this.ue(this.iframe, "load", this.onIframeLoad);
            }
        };
        this.hasHorizontalScrollbar = function() {
            var document = this.iframe.contentWindow.document;
            var $s = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
            var $t = $s.scrollWidth;
            var $u = document.body.children;
            for (var i = 0; i < $u.length; i++) {
                var $v = $u[i].offsetLeft + $u[i].offsetWidth;
                $t = Math.max($t, $v);
            };
            var $w = $t > $s.clientWidth;
            return $w;
        };
        this.hasVerticalScrollbar = function() {
            var document = this.iframe.contentWindow.document;
            var $s = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
            var $x = $s.scrollHeight;
            var $u = document.body.children;
            for (var i = 0; i < $u.length; i++) {
                var $v = $u[i].offsetTop + $u[i].offsetHeight;
                $x = Math.max($x, $v);
            };
            var $y = $x > $s.clientHeight;
            return $y;
        };
        this.windowRect = function() {
            var $n = document;
            if ($n.compatMode === "CSS1Compat" && $n.documentElement && $n.documentElement.clientWidth) {
                var x = $n.documentElement.clientWidth;
                var y = $n.documentElement.clientHeight;
                return {
                    x: x,
                    y: y
                };
            } else {
                var x = $n.body.clientWidth;
                var y = $n.body.clientHeight;
                return {
                    x: x,
                    y: y
                };
            }
        };
        this.register = function() {
            if (this.registered) {
                return;
            };
            this.re(window, 'resize', this.resize);
            this.re(window, 'scroll', this.resize);
            if (this.dragDrop) {
                this.re(document, 'mousemove', this.drag);
                this.re(document, 'mouseup', this.drop);
            };
            this.registered = true;
        };
        this.drag = function(e) {
            if (!$g.coords) {
                return;
            };
            var e = e || window.event;
            var $z = $g.mc(e);
            var x = $z.x - $g.coords.x;
            var y = $z.y - $g.coords.y;
            $g.div.style.marginLeft = '0px';
            $g.div.style.top = ($g.start.y + y) + "px";
            $g.div.style.left = ($g.start.x + x) + "px";
        };
        this.drop = function(e) {
            if (!$g.coords) {
                return;
            };
            $g.unmaskIframe();
            $g.coords = null;
        };
        this.maskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            var $A = 80;
            var $B = document.createElement("div");
            $B.style.backgroundColor = "#ffffff";
            $B.style.filter = "alpha(opacity=" + $A + ")";
            $B.style.opacity = "0." + $A;
            $B.style.width = "100%";
            $B.style.height = this.height + "px";
            $B.style.position = "absolute";
            $B.style.left = '0px';
            $B.style.top = '0px';
            this.div.appendChild($B);
            this.mask = $B;
        };
        this.unmaskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            this.div.removeChild(this.mask);
            this.mask = null;
        };
        this.resize = function() {
            if (!$g.hideDiv) {
                return;
            };
            if (!$g.div) {
                return;
            };
            if ($g.hideDiv.style.display === 'none') {
                return;
            };
            if ($g.div.style.display === 'none') {
                return;
            };
            var scrollY = window.pageYOffset ? window.pageYOffset : ((document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop);
            if (!$g.scrollWithPage) {
                $g.div.style.top = (scrollY + $g.top) + 'px';
            }
        };
        this.re = function(el, ev, $C) {
            if (el.addEventListener) {
                el.addEventListener(ev, $C, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + ev, $C);
            }
        };
        this.ue = function(el, ev, $C) {
            if (el.removeEventListener) {
                el.removeEventListener(ev, $C, false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + ev, $C);
            }
        };
        this.mc = function(ev) {
            if (ev.pageX || ev.pageY) {
                return {
                    x: ev.pageX,
                    y: ev.pageY
                };
            };
            return {
                x: ev.clientX + document.documentElement.scrollLeft,
                y: ev.clientY + document.documentElement.scrollTop
            };
        };
        this.abs = function(element) {
            var r = {
                x: element.offsetLeft,
                y: element.offsetTop
            };
            while (element.offsetParent) {
                element = element.offsetParent;
                r.x += element.offsetLeft;
                r.y += element.offsetTop;
            };
            return r;
        };
        this.create = function() {
            var $D = document.createElement("div");
            $D.id = this.id + "hide";
            $D.style.position = 'fixed';
            $D.style.left = "0px";
            $D.style.top = "0px";
            $D.style.right = "0px";
            $D.style.bottom = "0px";
            $D.style.backgroundColor = "black";
            $D.style.opacity = 0.50;
            $D.oncontextmenu = function() {
                return false;
            };
            document.body.appendChild($D);
            var $E = document.createElement("div");
            $E.id = this.id + 'popup';
            $E.style.position = 'fixed';
            $E.style.left = '50%';
            $E.style.top = '0px';
            $E.style.backgroundColor = 'white';
            $E.style.width = "50px";
            $E.style.height = "50px";
            if (this.dragDrop) {
                $E.onmousedown = this.dragStart;
            };
            var $F = 50;
            var $G = null;
            if (this.useIframe) {
                $G = document.createElement("iframe");
                $G.id = this.id + "iframe";
                $G.name = this.id + "iframe";
                $G.frameBorder = '0';
                $G.style.width = '100%';
                $G.style.height = $F + 'px';
                $E.appendChild($G);
            };
            document.body.appendChild($E);
            this.div = $E;
            this.iframe = $G;
            this.hideDiv = $D;
        };
        this.dragStart = function(e) {
            $g.maskIframe();
            $g.coords = $g.mc(e || window.event);
            $g.start = {
                x: $g.div.offsetLeft,
                y: $g.div.offsetTop
            };
        };
        this.setInnerHTML = function(id, $j) {
            var $H = window.frames[id];
            var $n = $H.contentWindow || $H.document || $H.contentDocument;
            if ($n.document) {
                $n = $n.document;
            };
            if ($n.body == null) {
                $n.write("<body></body>");
            };
            if ($j.nodeType) {
                $n.body.appendChild($j);
            } else {
                $n.body.innerHTML = $j;
            }
        };
        this.close = function($d) {
            this.result = $d;
            this.hide();
        };
        this.hide = function() {
            if (this.div) {
                this.div.style.display = 'none';
                this.hideDiv.style.display = 'none';
                if (!this.useIframe) {
                    this.div.innerHTML = null;
                }
            };
            DayPilot.ModalStatic.remove(this);
            if (this.onClosed) {
                var $I = {};
                $I.result = this.result;
                this.onClosed($I);
            } else if (this.closed) {
                this.closed();
            }
        };
        this.$J = function() {
            if (!$f) {
                return;
            };
            for (var name in $f) {
                this[name] = $f[name];
            }
        };
        this.$J();
    };
    DayPilot.Modal.close = function($d) {
        if (parent && parent.DayPilot && parent.DayPilot.ModalStatic) {
            parent.DayPilot.ModalStatic.close($d);
        } else {
            throw "Unable to close DayPilot.Modal dialog.";
        }
    };
    DayPilot.Modal.opener = function() {
        return parent && parent.DayPilot && parent.DayPilot.ModalStatic && parent.DayPilot.ModalStatic.list[parent.DayPilot.ModalStatic.list.length - 1];
    };
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    var $a = function() {};
    if (typeof DayPilot.Month !== 'undefined') {
        return;
    };
    var DayPilotMonth = {};
    DayPilotMonth.Month = function($b) {
        this.v = '217-lite';
        this.nav = {};
        var $c = this;
        this.id = $b;
        this.isMonth = true;
        this.hideUntilInit = true;
        this.angularAutoApply = false;
        this.api = 2;
        this.cssOnly = true;
        this.cssClassPrefix = "month_default";
        this.theme = null;
        this.startDate = new DayPilot.Date();
        this.width = '100%';
        this.cellHeight = 100;
        this.eventFontColor = "#000000";
        this.eventFontFamily = "Tahoma";
        this.eventFontSize = "11px";
        this.headerBackColor = '#F3F3F9';
        this.headerFontColor = '#42658C';
        this.headerFontFamily = "Tahoma";
        this.headerFontSize = "10pt";
        this.headerHeight = 20;
        this.weekStarts = 1;
        this.innerBorderColor = '#cccccc';
        this.borderColor = '#CED2CE';
        this.eventHeight = 25;
        this.cellHeaderHeight = 16;
        this.afterRender = function() {};
        this.backColor = '#ffffff';
        this.nonBusinessBackColor = '#ffffff';
        this.cellHeaderBackColor = '#ffffff';
        this.cellHeaderFontColor = '#42658C';
        this.cellHeaderFontFamily = 'Tahoma';
        this.cellHeaderFontSize = '10pt';
        this.eventBackColor = '#2951A5';
        this.eventBorderColor = '#2951A5';
        this.eventFontColor = '#ffffff';
        this.eventFontFamily = 'Tahoma';
        this.eventFontSize = '11px';
        this.cellWidth = 14.285;
        this.lineSpace = 1;
        this.eventClickHandling = 'Enabled';
        this.eventMoveHandling = 'Update';
        this.eventResizeHandling = 'Update';
        this.timeRangeSelectedHandling = 'Enabled';
        this.onEventClick = null;
        this.onEventClicked = null;
        this.onEventMove = null;
        this.onEventMoved = null;
        this.onEventResize = null;
        this.onEventResized = null;
        this.onTimeRangeSelect = null;
        this.onTimeRangeSelected = null;
        this.backendUrl = null;
        this.cellEvents = [];
        this.elements = {};
        this.elements.events = [];
        this.cache = {};
        this.updateView = function($d, $e) {
            var $d = eval("(" + $d + ")");
            if ($d.CallBackRedirect) {
                document.location.href = $d.CallBackRedirect;
                return;
            };
            if ($d.UpdateType === "None") {
                $c.fireAfterRenderDetached($d.CallBackData, true);
                return;
            };
            $c.events.list = $d.Events;
            if ($d.UpdateType === "Full") {
                $c.startDate = $d.StartDate;
                $c.headerBackColor = $d.HeaderBackColor ? $d.HeaderBackColor : $c.headerBackColor;
                $c.backColor = $d.BackColor ? $d.BackColor : $c.backColor;
                $c.nonBusinessBackColor = $d.NonBusinessBackColor ? $d.NonBusinessBackColor : $c.nonBusinessBackColor;
                $c.timeFormat = $d.TimeFormat ? $d.TimeFormat : $c.timeFormat;
                if (typeof $d.WeekStarts !== 'undefined') {
                    $c.weekStarts = $d.WeekStarts;
                };
                $c.hashes = $d.Hashes;
            };
            $c.$0Z();
            $c.$10();
            $c.$11();
            if ($d.UpdateType === "Full") {
                $c.$12();
                $c.$13();
            };
            $c.updateHeight();
            $c.show();
            $c.$14();
            $c.fireAfterRenderDetached($d.CallBackData, true);
        };
        this.fireAfterRenderDetached = function($f, $g) {
            var $h = function($f, $i) {
                return function() {
                    if ($c.afterRender) {
                        $c.afterRender($f, $i);
                    }
                };
            };
            window.setTimeout($h($f, $g), 0);
        };
        this.lineHeight = function() {
            return this.eventHeight + this.lineSpace;
        };
        this.events = {};
        this.events.add = function(e) {
            e.calendar = $c;
            if (!$c.events.list) {
                $c.events.list = [];
            };
            $c.events.list.push(e.data);
            $c.update();
            $c.$15.notify();
        };
        this.events.update = function(e) {
            e.commit();
            $c.update();
            $c.$15.notify();
        };
        this.events.remove = function(e) {
            var $j = DayPilot.indexOf($c.events.list, e.data);
            $c.events.list.splice($j, 1);
            $c.update();
            $c.$15.notify();
        };
        this.update = function() {
            if (!this.cells) {
                return;
            };
            var $k = true;
            this.$16();
            $c.$0Z();
            $c.$10();
            $c.$11();
            if ($k) {
                $c.$12();
                $c.$13();
            };
            $c.updateHeight();
            $c.show();
            $c.$14();
        };
        this.$17 = {};
        this.$17.events = [];
        this.$18 = function(i) {
            var $l = this.$17.events;
            var $f = this.events.list[i];
            var $m = {};
            for (var name in $f) {
                $m[name] = $f[name];
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var $n = {};
                $n.data = $m;
                this.onBeforeEventRender($n);
            };
            $l[i] = $m;
        };
        this.$11 = function() {
            var $o = this.events.list;
            if (!$o) {
                return;
            };
            if (typeof this.onBeforeEventRender === 'function') {
                for (var i = 0; i < $o.length; i++) {
                    this.$18(i);
                }
            };
            for (var x = 0; x < $o.length; x++) {
                var $f = $o[x];
                $f.start = new DayPilot.Date($f.start);
                $f.end = new DayPilot.Date($f.end);
                if ($f.start.getTime() > $f.end.getTime()) {
                    continue;
                };
                for (var i = 0; i < this.rows.length; i++) {
                    var $p = this.rows[i];
                    var ep = new DayPilot.Event($f, this);
                    if ($p.belongsHere(ep)) {
                        $p.events.push(ep);
                        if (typeof this.onBeforeEventRender === 'function') {
                            ep.cache = this.$17.events[x];
                        }
                    }
                }
            };
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $p = this.rows[ri];
                $p.events.sort(this.eventComparer);
                for (var ei = 0; ei < this.rows[ri].events.length; ei++) {
                    var ev = $p.events[ei];
                    var $q = $p.getStartColumn(ev);
                    var $r = $p.getWidth(ev);
                    var $s = $p.putIntoLine(ev, $q, $r, ri);
                }
            }
        };
        this.$0Z = function() {
            for (var i = 0; i < this.elements.events.length; i++) {
                var e = this.elements.events[i];
                e.event = null;
                e.click = null;
                e.parentNode.removeChild(e);
            };
            this.elements.events = [];
        };
        this.$14 = function() {
            this.$19();
        };
        this.$19 = function() {
            this.elements.events = [];
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $p = this.rows[ri];
                for (var li = 0; li < $p.lines.length; li++) {
                    var $s = $p.lines[li];
                    for (var pi = 0; pi < $s.length; pi++) {
                        this.$1a($s[pi]);
                    }
                }
            }
        };
        this.eventComparer = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $t = a.start().getTime() - b.start().getTime();
            if ($t !== 0) {
                return $t;
            };
            var $u = b.end().getTime() - a.end().getTime();
            return $u;
        };
        this.drawShadow = function(x, y, $s, $v, $w, e) {
            if (!$w) {
                $w = 0;
            };
            var $x = $v;
            this.shadow = {};
            this.shadow.list = [];
            this.shadow.start = {
                x: x,
                y: y
            };
            this.shadow.width = $v;
            var $y = y * 7 + x - $w;
            if ($y < 0) {
                $x += $y;
                x = 0;
                y = 0;
            };
            var $z = $w;
            while ($z >= 7) {
                y--;
                $z -= 7;
            };
            if ($z > x) {
                var $A = 7 - this.getColCount();
                if ($z > (x + $A)) {
                    y--;
                    x = x + 7 - $z;
                } else {
                    $x = $x - $z + x;
                    x = 0;
                }
            } else {
                x -= $z;
            };
            if (y < 0) {
                y = 0;
                x = 0;
            };
            var $B = null;
            if (DayPilotMonth.resizingEvent) {
                $B = 'w-resize';
            } else if (DayPilotMonth.movingEvent) {
                $B = "move";
            };
            this.nav.top.style.cursor = $B;
            while ($x > 0 && y < this.rows.length) {
                var $C = Math.min(this.getColCount() - x, $x);
                var $p = this.rows[y];
                var top = this.getRowTop(y);
                var $D = $p.getHeight();
                var $E = document.createElement("div");
                $E.setAttribute("unselectable", "on");
                $E.style.position = 'absolute';
                $E.style.left = (this.getCellWidth() * x) + '%';
                $E.style.width = (this.getCellWidth() * $C) + '%';
                $E.style.top = (top) + 'px';
                $E.style.height = ($D) + 'px';
                $E.style.cursor = $B;
                var $F = document.createElement("div");
                $F.setAttribute("unselectable", "on");
                $E.appendChild($F);
                $F.style.position = "absolute";
                $F.style.top = "0px";
                $F.style.right = "0px";
                $F.style.left = "0px";
                $F.style.bottom = "0px";
                $F.style.backgroundColor = "#aaaaaa";
                $F.style.opacity = 0.5;
                $F.style.filter = "alpha(opacity=50)";
                this.nav.top.appendChild($E);
                this.shadow.list.push($E);
                $x -= ($C + 7 - this.getColCount());
                x = 0;
                y++;
            }
        };
        this.clearShadow = function() {
            if (this.shadow) {
                for (var i = 0; i < this.shadow.list.length; i++) {
                    this.nav.top.removeChild(this.shadow.list[i]);
                };
                this.shadow = null;
                this.nav.top.style.cursor = '';
            }
        };
        this.getEventTop = function($p, $s) {
            var top = this.headerHeight;
            for (var i = 0; i < $p; i++) {
                top += this.rows[i].getHeight();
            };
            top += this.cellHeaderHeight;
            top += $s * this.lineHeight();
            return top;
        };
        this.getDateFromCell = function(x, y) {
            return this.firstDate.addDays(y * 7 + x);
        };
        this.$1a = function(e) {
            var $f = e.cache || e.data;
            var $p = e.part.row;
            var $s = e.part.line;
            var $q = e.part.colStart;
            var $r = e.part.colWidth;
            var $G = this.getCellWidth() * ($q);
            var $v = this.getCellWidth() * ($r);
            var top = this.getEventTop($p, $s);
            var $H = document.createElement("div");
            $H.setAttribute("unselectable", "on");
            $H.style.height = this.eventHeight + 'px';
            $H.className = this.$1b("_event");
            if ($f.cssClass) {
                DayPilot.Util.addClass($H, $f.cssClass);
            };
            $H.event = e;
            $H.style.width = $v + '%';
            $H.style.position = 'absolute';
            $H.style.left = $G + '%';
            $H.style.top = top + 'px';
            if (this.showToolTip && e.client.toolTip()) {
                $H.title = e.client.toolTip();
            };
            $H.onclick = $c.eventClickDispatch;
            $H.onmousedown = function(ev) {
                ev = ev || window.event;
                var $I = ev.which || ev.button;
                ev.cancelBubble = true;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                };
                if ($I === 1) {
                    DayPilotMonth.movingEvent = null;
                    if (this.style.cursor === 'w-resize' || this.style.cursor === 'e-resize') {
                        var $J = {};
                        $J.start = {};
                        $J.start.x = $q;
                        $J.start.y = $p;
                        $J.event = $H.event;
                        $J.width = DayPilot.DateUtil.daysSpan($J.event.start(), $J.event.end()) + 1;
                        $J.direction = this.style.cursor;
                        DayPilotMonth.resizingEvent = $J;
                    } else if (this.style.cursor === 'move' || $c.eventMoveHandling !== 'Disabled') {
                        $c.clearShadow();
                        var $K = DayPilot.mo2($c.nav.top, ev);
                        if (!$K) {
                            return;
                        };
                        var $L = $c.getCellBelowPoint($K.x, $K.y);
                        var $y = DayPilot.DateUtil.daysDiff(e.start(), $c.rows[$p].start);
                        var $w = ($L.y * 7 + $L.x) - ($p * 7 + $q);
                        if ($y) {
                            $w += $y;
                        };
                        var $M = {};
                        $M.start = {};
                        $M.start.x = $q;
                        $M.start.y = $p;
                        $M.start.line = $s;
                        $M.offset = $c.eventMoveToPosition ? 0 : $w;
                        $M.colWidth = $r;
                        $M.event = $H.event;
                        $M.coords = $K;
                        DayPilotMonth.movingEvent = $M;
                    }
                }
            };
            $H.onmousemove = function(ev) {
                if (typeof(DayPilotMonth) === 'undefined') {
                    return;
                };
                if (DayPilotMonth.movingEvent || DayPilotMonth.resizingEvent) {
                    return;
                };
                var $w = DayPilot.mo3($H, ev);
                if (!$w) {
                    return;
                };
                var $N = 6;
                if ($w.x <= $N && $c.eventResizeHandling !== 'Disabled') {
                    if (e.part.startsHere) {
                        $H.style.cursor = "w-resize";
                        $H.dpBorder = 'left';
                    } else {
                        $H.style.cursor = 'not-allowed';
                    }
                } else if ($H.clientWidth - $w.x <= $N && $c.eventResizeHandling !== 'Disabled') {
                    if (e.part.endsHere) {
                        $H.style.cursor = "e-resize";
                        $H.dpBorder = 'right';
                    } else {
                        $H.style.cursor = 'not-allowed';
                    }
                } else {
                    $H.style.cursor = 'default';
                }
            };
            $H.onmouseout = function(ev) {
                $H.style.cursor = '';
            };
            var $O = document.createElement("div");
            $O.setAttribute("unselectable", "on");
            $O.className = this.$1b("_event_inner");
            if ($f.borderColor) {
                $O.style.borderColor = $f.borderColor;
            };
            if ($f.backColor) {
                $O.style.background = $f.backColor;
                if (DayPilot.browser.ie9 || DayPilot.browser.ielt9) {
                    $O.style.filter = '';
                }
            };
            if ($f.fontColor) {
                $O.style.color = $f.fontColor;
            };
            $O.innerHTML = e.client.html();
            $H.appendChild($O);
            this.elements.events.push($H);
            this.nav.events.appendChild($H);
        };
        this.lastVisibleDayOfMonth = function() {
            return this.startDate.lastDayOfMonth();
        };
        this.$10 = function() {
            if (typeof this.startDate === 'string') {
                this.startDate = new DayPilot.Date(this.startDate);
            };
            this.startDate = this.startDate.firstDayOfMonth();
            this.firstDate = this.startDate.firstDayOfWeek(this.getWeekStart());
            var $P = this.startDate;
            var $Q;
            var $R = this.lastVisibleDayOfMonth();
            var $S = DayPilot.DateUtil.daysDiff(this.firstDate, $R) + 1;
            $Q = Math.ceil($S / 7);
            this.days = $Q * 7;
            this.rows = [];
            for (var x = 0; x < $Q; x++) {
                var r = {};
                r.start = this.firstDate.addDays(x * 7);
                r.end = r.start.addDays(this.getColCount());
                r.events = [];
                r.lines = [];
                r.index = x;
                r.minHeight = this.cellHeight;
                r.calendar = this;
                r.belongsHere = function(ev) {
                    if (ev.end().getTime() === ev.start().getTime() && ev.start().getTime() === this.start.getTime()) {
                        return true;
                    };
                    return !(ev.end().getTime() <= this.start.getTime() || ev.start().getTime() >= this.end.getTime());
                };
                r.getPartStart = function(ev) {
                    return DayPilot.DateUtil.max(this.start, ev.start());
                };
                r.getPartEnd = function(ev) {
                    return DayPilot.DateUtil.min(this.end, ev.end());
                };
                r.getStartColumn = function(ev) {
                    var $T = this.getPartStart(ev);
                    return DayPilot.DateUtil.daysDiff(this.start, $T);
                };
                r.getWidth = function(ev) {
                    return DayPilot.DateUtil.daysSpan(this.getPartStart(ev), this.getPartEnd(ev)) + 1;
                };
                r.putIntoLine = function(ev, $q, $r, $p) {
                    var $U = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $s = this.lines[i];
                        if ($s.isFree($q, $r)) {
                            $s.addEvent(ev, $q, $r, $p, i);
                            return i;
                        }
                    };
                    var $s = [];
                    $s.isFree = function($q, $r) {
                        var $V = true;
                        for (var i = 0; i < this.length; i++) {
                            if (!($q + $r - 1 < this[i].part.colStart || $q > this[i].part.colStart + this[i].part.colWidth - 1)) {
                                $V = false;
                            }
                        };
                        return $V;
                    };
                    $s.addEvent = function(ep, $q, $r, $p, $j) {
                        ep.part.colStart = $q;
                        ep.part.colWidth = $r;
                        ep.part.row = $p;
                        ep.part.line = $j;
                        ep.part.startsHere = $U.start.getTime() <= ep.start().getTime();
                        ep.part.endsHere = $U.end.getTime() >= ep.end().getTime();
                        this.push(ep);
                    };
                    $s.addEvent(ev, $q, $r, $p, this.lines.length);
                    this.lines.push($s);
                    return this.lines.length - 1;
                };
                r.getStart = function() {
                    var $W = 0;
                    for (var i = 0; i < $c.rows.length && i < this.index; i++) {
                        $W += $c.rows[i].getHeight();
                    }
                };
                r.getHeight = function() {
                    return Math.max(this.lines.length * $c.lineHeight() + $c.cellHeaderHeight, this.calendar.cellHeight);
                };
                this.rows.push(r);
            };
            this.endDate = this.firstDate.addDays($Q * 7);
        };
        this.getHeight = function() {
            var $D = this.headerHeight;
            for (var i = 0; i < this.rows.length; i++) {
                $D += this.rows[i].getHeight();
            };
            return $D;
        };
        this.getWidth = function($W, end) {
            var $X = (end.y * 7 + end.x) - ($W.y * 7 + $W.x);
            return $X + 1;
        };
        this.getMinCoords = function($Y, $Z) {
            if (($Y.y * 7 + $Y.x) < ($Z.y * 7 + $Z.x)) {
                return $Y;
            } else {
                return $Z;
            }
        };
        this.$1b = function($00) {
            var $01 = this.theme || this.cssClassPrefix;
            if ($01) {
                return $01 + $00;
            } else {
                return "";
            }
        };
        this.drawTop = function() {
            var $02 = this.nav.top;
            $02.setAttribute("unselectable", "on");
            $02.style.MozUserSelect = 'none';
            $02.style.KhtmlUserSelect = 'none';
            $02.style.WebkitUserSelect = 'none';
            $02.style.position = 'relative';
            if (this.width) {
                $02.style.width = this.width;
            };
            $02.style.height = this.getHeight() + 'px';
            $02.onselectstart = function(e) {
                return false;
            };
            if (this.hideUntilInit) {
                $02.style.visibility = 'hidden';
            };
            if (this.cssOnly) {
                $02.className = this.$1b("_main");
            } else {
                $02.style.border = "1px solid " + this.borderColor;
            };
            var $03 = document.createElement("div");
            this.nav.cells = $03;
            $03.style.position = "absolute";
            $03.style.left = "0px";
            $03.style.right = "0px";
            $03.setAttribute("unselectable", "on");
            $02.appendChild($03);
            var $o = document.createElement("div");
            this.nav.events = $o;
            $o.style.position = "absolute";
            $o.style.left = "0px";
            $o.style.right = "0px";
            $o.setAttribute("unselectable", "on");
            $02.appendChild($o);
            $02.onmousemove = function(ev) {
                if (DayPilotMonth.resizingEvent) {
                    var $K = DayPilot.mo2($c.nav.top, ev);
                    if (!$K) {
                        return;
                    };
                    var $L = $c.getCellBelowPoint($K.x, $K.y);
                    $c.clearShadow();
                    var $J = DayPilotMonth.resizingEvent;
                    var $04 = $J.start;
                    var $v, $W;
                    if ($J.direction === 'w-resize') {
                        $W = $L;
                        var $05 = $J.event.end();
                        if ($05.getDatePart() === $05) {
                            $05 = $05.addDays(-1);
                        };
                        var end = $c.getCellFromDate($05);
                        $v = $c.getWidth($L, end);
                    } else {
                        $W = $c.getCellFromDate($J.event.start());
                        $v = $c.getWidth($W, $L);
                    };
                    if ($v < 1) {
                        $v = 1;
                    };
                    $c.drawShadow($W.x, $W.y, 0, $v);
                } else if (DayPilotMonth.movingEvent) {
                    var $K = DayPilot.mo2($c.nav.top, ev);
                    if (!$K) {
                        return;
                    };
                    if ($K.x === DayPilotMonth.movingEvent.coords.x && $K.y === DayPilotMonth.movingEvent.coords.y) {
                        return;
                    };
                    var $L = $c.getCellBelowPoint($K.x, $K.y);
                    $c.clearShadow();
                    var event = DayPilotMonth.movingEvent.event;
                    var $w = DayPilotMonth.movingEvent.offset;
                    var $v = $c.cellMode ? 1 : DayPilot.DateUtil.daysSpan(event.start(), event.end()) + 1;
                    if ($v < 1) {
                        $v = 1;
                    };
                    $c.drawShadow($L.x, $L.y, 0, $v, $w, event);
                } else if (DayPilotMonth.timeRangeSelecting) {
                    var $K = DayPilot.mo2($c.nav.top, ev);
                    if (!$K) {
                        return;
                    };
                    var $L = $c.getCellBelowPoint($K.x, $K.y);
                    $c.clearShadow();
                    var $W = DayPilotMonth.timeRangeSelecting;
                    var $06 = $W.y * 7 + $W.x;
                    var $07 = $L.y * 7 + $L.x;
                    var $v = Math.abs($07 - $06) + 1;
                    if ($v < 1) {
                        $v = 1;
                    };
                    var $08 = $06 < $07 ? $W : $L;
                    DayPilotMonth.timeRangeSelecting.from = {
                        x: $08.x,
                        y: $08.y
                    };
                    DayPilotMonth.timeRangeSelecting.width = $v;
                    DayPilotMonth.timeRangeSelecting.moved = true;
                    $c.drawShadow($08.x, $08.y, 0, $v, 0, null);
                }
            };
        };
        this.updateHeight = function() {
            this.nav.top.style.height = this.getHeight() + 'px';
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].style.top = this.getRowTop(y) + 'px';
                    this.cells[x][y].style.height = this.rows[y].getHeight() + 'px';
                }
            }
        };
        this.getCellBelowPoint = function(x, y) {
            var $09 = Math.floor(this.nav.top.clientWidth / this.getColCount());
            var $0a = Math.min(Math.floor(x / $09), this.getColCount() - 1);
            var $p = null;
            var $D = this.headerHeight;
            var $0b = 0;
            for (var i = 0; i < this.rows.length; i++) {
                var $0c = $D;
                $D += this.rows[i].getHeight();
                if (y < $D) {
                    $0b = y - $0c;
                    $p = i;
                    break;
                }
            };
            if ($p === null) {
                $p = this.rows.length - 1;
            };
            var $L = {};
            $L.x = $0a;
            $L.y = $p;
            $L.relativeY = $0b;
            return $L;
        };
        this.getCellFromDate = function($0d) {
            var $v = DayPilot.DateUtil.daysDiff(this.firstDate, $0d);
            var $L = {
                x: 0,
                y: 0
            };
            while ($v >= 7) {
                $L.y++;
                $v -= 7;
            };
            $L.x = $v;
            return $L;
        };
        this.$13 = function() {
            var $0e = document.createElement("div");
            $0e.oncontextmenu = function() {
                return false;
            };
            this.nav.cells.appendChild($0e);
            this.cells = [];
            for (var x = 0; x < this.getColCount(); x++) {
                this.cells[x] = [];
                var $0f = null;
                var $0g = document.createElement("div");
                $0g.setAttribute("unselectable", "on");
                $0g.style.position = 'absolute';
                $0g.style.left = (this.getCellWidth() * x) + '%';
                $0g.style.width = (this.getCellWidth()) + '%';
                $0g.style.top = '0px';
                $0g.style.height = (this.headerHeight) + 'px';
                var $0h = x + this.getWeekStart();
                if ($0h > 6) {
                    $0h -= 7;
                };
                if (this.cssOnly) {
                    $0g.className = this.$1b("_header");
                };
                var $O = document.createElement("div");
                $O.setAttribute("unselectable", "on");
                $O.innerHTML = $0i.locale().dayNames[$0h];
                $0g.appendChild($O);
                $O.style.position = "absolute";
                $O.style.top = "0px";
                $O.style.bottom = "0px";
                $O.style.left = "0px";
                $O.style.right = "0px";
                if (this.cssOnly) {
                    $O.className = this.$1b("_header_inner");
                } else {
                    $O.style.backgroundColor = this.headerBackColor;
                    $O.style.fontFamily = this.headerFontFamily;
                    $O.style.fontSize = this.headerFontSize;
                    $O.style.color = this.headerFontColor;
                    $O.style.textAlign = 'center';
                    $O.style.cursor = 'default';
                    if (x !== this.getColCount() - 1) {
                        $O.style.borderRight = '1px solid ' + this.borderColor;
                    }
                };
                $O.innerHTML = $0i.locale().dayNames[$0h];
                $0e.appendChild($0g);
                for (var y = 0; y < this.rows.length; y++) {
                    this.drawCell(x, y, $0e);
                }
            }
        };
        this.$12 = function() {
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].onclick = null;
                }
            };
            this.nav.cells.innerHTML = '';
        };
        this.$1c = function() {
            return $c.api === 2;
        };
        this.drawCell = function(x, y, $0e) {
            var $p = this.rows[y];
            var d = this.firstDate.addDays(y * 7 + x);
            var $0j = this.cellProperties ? this.cellProperties[y * this.getColCount() + x] : null;
            var $L = document.createElement("div");
            $L.setAttribute("unselectable", "on");
            $L.style.position = 'absolute';
            $L.style.cursor = 'default';
            $L.style.left = (this.getCellWidth() * x) + '%';
            $L.style.width = (this.getCellWidth()) + '%';
            $L.style.top = (this.getRowTop(y)) + 'px';
            $L.style.height = ($p.getHeight()) + 'px';
            if (this.cssOnly) {
                $L.className = this.$1b("_cell");
                if (!this.isWeekend(d)) {
                    var $0k = this.$1b("_cell_business");
                    DayPilot.Util.addClass($L, $0k);
                }
            };
            var $0l = this.startDate.addMonths(-1).getMonth();
            var $0m = this.startDate.addMonths(1).getMonth();
            var $0n = this.startDate.getMonth();
            var $O = document.createElement("div");
            $O.setAttribute("unselectable", "on");
            $L.appendChild($O);
            $O.style.position = "absolute";
            $O.style.left = "0px";
            $O.style.right = "0px";
            $O.style.top = "0px";
            $O.style.bottom = "0px";
            if (this.cssOnly) {
                $O.className = this.$1b("_cell_inner");
            } else {
                $O.style.backgroundColor = this.getCellBackColor(d);
                if (x !== this.getColCount() - 1) {
                    $O.style.borderRight = '1px solid ' + this.innerBorderColor;
                };
                if (y === 0) {
                    $O.style.borderTop = '1px solid ' + this.borderColor;
                };
                $O.style.borderBottom = '1px solid ' + this.innerBorderColor;
            };
            $L.onmousedown = function(e) {
                if ($c.timeRangeSelectedHandling !== 'Disabled') {
                    $c.clearShadow();
                    DayPilotMonth.timeRangeSelecting = {
                        "root": $c,
                        "x": x,
                        "y": y,
                        "from": {
                            x: x,
                            y: y
                        },
                        "width": 1
                    };
                }
            };
            $L.onclick = function() {
                var $0o = function(d) {
                    var $W = new DayPilot.Date(d);
                    var end = $W.addDays(1);
                    $c.timeRangeSelectedDispatch($W, end);
                };
                if ($c.timeRangeSelectedHandling !== 'Disabled') {
                    $0o(d);
                    return;
                }
            };
            var $0p = document.createElement("div");
            $0p.setAttribute("unselectable", "on");
            $0p.style.height = this.cellHeaderHeight + "px";
            if (this.cssOnly) {
                $0p.className = this.$1b("_cell_header");
            } else {
                if (this.cellHeaderBackColor) {
                    $0p.style.backgroundColor = this.cellHeaderBackColor;
                };
                $0p.style.paddingRight = '2px';
                $0p.style.textAlign = "right";
                $0p.style.fontFamily = this.cellHeaderFontFamily;
                $0p.style.fontSize = this.cellHeaderFontSize;
                $0p.style.color = this.cellHeaderFontColor;
            };
            var $0d = d.getDay();
            if ($0d === 1) {
                $0p.innerHTML = $0i.locale().monthNames[d.getMonth()] + ' ' + $0d;
            } else {
                $0p.innerHTML = $0d;
            };
            $O.appendChild($0p);
            this.cells[x][y] = $L;
            $0e.appendChild($L);
        };
        this.getWeekStart = function() {
            return $0i.locale().weekStarts;
        };
        this.getColCount = function() {
            return 7;
        };
        this.getCellWidth = function() {
            return 14.285;
        };
        this.getCellBackColor = function(d) {
            if (d.getDayOfWeek() === 6 || d.getDayOfWeek() === 0) {
                return this.nonBusinessBackColor;
            };
            return this.backColor;
        };
        this.getRowTop = function($j) {
            var top = this.headerHeight;
            for (var i = 0; i < $j; i++) {
                top += this.rows[i].getHeight();
            };
            return top;
        };
        this.$1d = function($0q, $f, $0r) {
            var $0s = {};
            $0s.action = $0q;
            $0s.parameters = $0r;
            $0s.data = $f;
            $0s.header = this.$1e();
            var $0t = "JSON" + DayPilot.JSON.stringify($0s);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.callBackResponse, $0t, this.ajaxError);
            }
        };
        this.callBackResponse = function($0u) {
            $c.updateView($0u.responseText);
        };
        this.$1e = function() {
            var h = {};
            h.control = "dpm";
            h.id = this.id;
            h.v = this.v;
            h.visibleStart = new DayPilot.Date(this.firstDate);
            h.visibleEnd = h.visibleStart.addDays(this.days);
            h.startDate = $c.startDate;
            h.headerBackColor = this.headerBackColor;
            h.backColor = this.backColor;
            h.nonBusinessBackColor = this.nonBusinessBackColor;
            h.timeFormat = this.timeFormat;
            h.weekStarts = this.weekStarts;
            return h;
        };
        this.eventClickCallBack = function(e, $f) {
            this.$1d('EventClick', $f, e);
        };
        this.eventClickDispatch = function(e) {
            DayPilotMonth.movingEvent = null;
            DayPilotMonth.resizingEvent = null;
            var $H = this;
            var e = e || window.event;
            var $0v = e.ctrlKey;
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            };
            $c.eventClickSingle($H, $0v);
        };
        this.eventClickSingle = function($H) {
            var e = $H.event;
            if (!e.client.clickEnabled()) {
                return;
            };
            if ($c.$1c()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventClick === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventClick($n);
                    });
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventClickHandling) {
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                };
                if (typeof $c.onEventClicked === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventClicked($n);
                    });
                }
            } else {
                switch ($c.eventClickHandling) {
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventClick(e);
                        break;
                }
            }
        };
        this.eventMoveCallBack = function(e, $0w, $0x, $f, $0y) {
            if (!$0w) throw 'newStart is null';
            if (!$0x) throw 'newEnd is null';
            var $0z = {};
            $0z.e = e;
            $0z.newStart = $0w;
            $0z.newEnd = $0x;
            $0z.position = $0y;
            this.$1d('EventMove', $f, $0z);
        };
        this.eventMoveDispatch = function(e, x, y, $w, ev, $0y) {
            var $0A = e.start().getTimePart();
            var $05 = e.end().getDatePart();
            if ($05 !== e.end()) {
                $05 = $05.addDays(1);
            };
            var $0B = DayPilot.DateUtil.diff(e.end(), $05);
            var $0C = this.getDateFromCell(x, y);
            $0C = $0C.addDays(-$w);
            var $v = DayPilot.DateUtil.daysSpan(e.start(), e.end()) + 1;
            var $0D = $0C.addDays($v);
            var $0w = $0C.addTime($0A);
            var $0x = $0D.addTime($0B);
            if ($c.$1c()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $0w;
                $n.newEnd = $0x;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventMove === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventMove($n);
                    });
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventMoveHandling) {
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $0w, $0x);
                        break;
                    case 'Update':
                        e.start($0w);
                        e.end($0x);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventMoved === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventMoved($n);
                    });
                }
            } else {
                switch ($c.eventMoveHandling) {
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $0w, $0x);
                        break;
                    case 'JavaScript':
                        $c.onEventMove(e, $0w, $0x);
                        break;
                }
            }
        };
        this.eventResizeCallBack = function(e, $0w, $0x, $f) {
            if (!$0w) throw 'newStart is null';
            if (!$0x) throw 'newEnd is null';
            var $0z = {};
            $0z.e = e;
            $0z.newStart = $0w;
            $0z.newEnd = $0x;
            this.$1d('EventResize', $f, $0z);
        };
        this.eventResizeDispatch = function(e, $W, $v) {
            var $0A = e.start().getTimePart();
            var $05 = e.end().getDatePart();
            if ($05 !== e.end()) {
                $05 = $05.addDays(1);
            };
            var $0B = DayPilot.DateUtil.diff(e.end(), $05);
            var $0C = this.getDateFromCell($W.x, $W.y);
            var $0D = $0C.addDays($v);
            var $0w = $0C.addTime($0A);
            var $0x = $0D.addTime($0B);
            if ($c.$1c()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $0w;
                $n.newEnd = $0x;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventResize === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventResize($n);
                    });
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventResizeHandling) {
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $0w, $0x);
                        break;
                    case 'Update':
                        e.start($0w);
                        e.end($0x);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventResized === 'function') {
                    $c.$15.apply(function() {
                        $c.onEventResized($n);
                    });
                }
            } else {
                switch ($c.eventResizeHandling) {
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $0w, $0x);
                        break;
                    case 'JavaScript':
                        $c.onEventResize(e, $0w, $0x);
                        break;
                }
            }
        };
        this.timeRangeSelectedCallBack = function($W, end, $f) {
            var $0E = {};
            $0E.start = $W;
            $0E.end = end;
            this.$1d('TimeRangeSelected', $f, $0E);
        };
        this.timeRangeSelectedDispatch = function($W, end) {
            if (this.$1c()) {
                var $n = {};
                $n.start = $W;
                $n.end = end;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.$15.apply(function() {
                        $c.onTimeRangeSelect($n);
                    });
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($W, end);
                        break;
                };
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.$15.apply(function() {
                        $c.onTimeRangeSelected($n);
                    });
                }
            } else {
                switch ($c.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($W, end);
                        break;
                    case 'JavaScript':
                        $c.onTimeRangeSelected($W, end);
                        break;
                }
            }
        };
        this.$15 = {};
        this.$15.scope = null;
        this.$15.notify = function() {
            if ($c.$15.scope) {
                $c.$15.scope["$apply"]();
            }
        };
        this.$15.apply = function(f) {
            f();
        };
        this.clearSelection = function() {
            $c.clearShadow();
        };
        this.commandCallBack = function($0F, $f) {
            var $0z = {};
            $0z.command = $0F;
            this.$1d('Command', $f, $0z);
        };
        this.isWeekend = function($0d) {
            $0d = new DayPilot.Date($0d);
            var $0G = 0;
            var $0H = 6;
            if ($0d.dayOfWeek() === $0G) {
                return true;
            };
            if ($0d.dayOfWeek() === $0H) {
                return true;
            };
            return false;
        };
        this.$1f = {};
        this.$1f.locale = function() {
            var $0I = DayPilot.Locale.find($c.locale);
            if (!$0I) {
                return DayPilot.Locale.US;
            };
            return $0I;
        };
        var $0i = this.$1f;
        this.debug = function($0J, $0K) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$c.debugMessages) {
                $c.debugMessages = [];
            };
            $c.debugMessages.push($0J);
            if (typeof console !== 'undefined') {
                console.log($0J);
            }
        };
        this.registerGlobalHandlers = function() {
            if (!DayPilotMonth.globalHandlers) {
                DayPilotMonth.globalHandlers = true;
                DayPilot.re(document, 'mouseup', DayPilotMonth.gMouseUp);
            }
        };
        this.loadFromServer = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $c.events.list === 'undefined') || (!$c.events.list);
            } else {
                return false;
            }
        };
        this.show = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.$1g = function() {
            if (this.id && this.id.tagName) {
                this.nav.top = this.id;
            } else if (typeof this.id === "string") {
                this.nav.top = document.getElementById(this.id);
                if (!this.nav.top) {
                    throw "DayPilot.Month: The placeholder element not found: '" + id + "'.";
                }
            } else {
                throw "DayPilot.Month() constructor requires the target element or its ID as a parameter";
            }
        };
        this.$16 = function() {
            if (!$c.cssOnly) {
                $c.cssOnly = true;
                window.console && window.console.log && window.console.log("DayPilot: cssOnly = false mode is not supported anymore.");
            }
        };
        this.$1h = function() {
            this.$10();
            this.drawTop();
            this.$13();
            this.registerGlobalHandlers();
            this.$1d('Init');
        };
        this.init = function() {
            this.$1g();
            var $0L = this.loadFromServer();
            this.$16();
            if ($0L) {
                this.$1h();
                return;
            };
            this.$10();
            this.$11();
            this.drawTop();
            this.$13();
            this.show();
            this.$14();
            this.registerGlobalHandlers();
            if (this.messageHTML) {
                this.message(this.messageHTML);
            };
            this.fireAfterRenderDetached(null, false);
        };
        this.Init = this.init;
    };
    DayPilotMonth.gMouseUp = function(ev) {
        if (DayPilotMonth.movingEvent) {
            var $0M = DayPilotMonth.movingEvent;
            if (!$0M.event) {
                return;
            };
            if (!$0M.event.calendar) {
                return;
            };
            if (!$0M.event.calendar.shadow) {
                return;
            };
            if (!$0M.event.calendar.shadow.start) {
                return;
            };
            var $c = DayPilotMonth.movingEvent.event.calendar;
            var e = DayPilotMonth.movingEvent.event;
            var $W = $c.shadow.start;
            var $0y = $c.shadow.position;
            var $w = DayPilotMonth.movingEvent.offset;
            $c.clearShadow();
            DayPilotMonth.movingEvent = null;
            var ev = ev || window.event;
            $c.eventMoveDispatch(e, $W.x, $W.y, $w, ev, $0y);
            ev.cancelBubble = true;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            };
            DayPilotMonth.movingEvent = null;
            return false;
        } else if (DayPilotMonth.resizingEvent) {
            var $0M = DayPilotMonth.resizingEvent;
            if (!$0M.event) {
                return;
            };
            if (!$0M.event.calendar) {
                return;
            };
            if (!$0M.event.calendar.shadow) {
                return;
            };
            if (!$0M.event.calendar.shadow.start) {
                return;
            };
            var $c = DayPilotMonth.resizingEvent.event.calendar;
            var e = DayPilotMonth.resizingEvent.event;
            var $W = $c.shadow.start;
            var $v = $c.shadow.width;
            $c.clearShadow();
            DayPilotMonth.resizingEvent = null;
            $c.eventResizeDispatch(e, $W, $v);
            ev.cancelBubble = true;
            DayPilotMonth.resizingEvent = null;
            return false;
        } else if (DayPilotMonth.timeRangeSelecting) {
            if (DayPilotMonth.timeRangeSelecting.moved) {
                var $0N = DayPilotMonth.timeRangeSelecting;
                var $c = $0N.root;
                var $W = new DayPilot.Date($c.getDateFromCell($0N.from.x, $0N.from.y));
                var end = $W.addDays($0N.width);
                $c.timeRangeSelectedDispatch($W, end);
                $c.clearShadow();
            };
            DayPilotMonth.timeRangeSelecting = null;
        }
    };
    DayPilot.Month = DayPilotMonth.Month;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotMonth = function($0O) {
                var $Y = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $0P = new DayPilot.Month(this.id);
                    this.daypilot = $0P;
                    for (name in $0O) {
                        $0P[name] = $0O[name];
                    };
                    $0P.Init();
                    if (!$Y) {
                        $Y = $0P;
                    }
                });
                if (this.length === 1) {
                    return $Y;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    (function registerAngularModule() {
        var $0Q = DayPilot.am();
        if (!$0Q) {
            return;
        };
        $0Q.directive("daypilotMonth", ['$parse', function($0R) {
            return {
                "restrict": "E",
                "template": "<div></div>",
                "replace": true,
                "link": function($0S, element, $0T) {
                    var $c = new DayPilot.Month(element[0]);
                    $c.$15.scope = $0S;
                    $c.init();
                    var $0U = $0T["id"];
                    if ($0U) {
                        $0S[$0U] = $c;
                    };
                    var $0V = $0T["publishAs"];
                    if ($0V) {
                        var getter = $0R($0V);
                        var setter = getter.assign;
                        setter($0S, $c);
                    };
                    for (var name in $0T) {
                        if (name.indexOf("on") === 0) {
                            (function(name) {
                                $c[name] = function($n) {
                                    var f = $0R($0T[name]);
                                    $0S["$apply"](function() {
                                        f($0S, {
                                            "args": $n
                                        });
                                    });
                                };
                            })(name);
                        }
                    };
                    var $0W = $0S["$watch"];
                    var $0X = $0T["config"] || $0T["daypilotConfig"];
                    var $o = $0T["events"] || $0T["daypilotEvents"];
                    $0W.call($0S, $0X, function($0Y) {
                        for (var name in $0Y) {
                            $c[name] = $0Y[name];
                        };
                        $c.update();
                    }, true);
                    $0W.call($0S, $o, function($0Y) {
                        $c.events.list = $0Y;
                        $c.update();
                    }, true);
                }
            };
        }]);
    })();
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    if (typeof DayPilot.Navigator !== 'undefined') {
        return;
    };
    DayPilotNavigator = {};
    DayPilot.Navigator = function(id) {
        this.v = '217-lite';
        var $a = this;
        this.id = id;
        this.api = 2;
        this.isNavigator = true;
        this.angularAutoApply = true;
        this.weekStarts = 'Auto';
        this.selectMode = 'day';
        this.titleHeight = 20;
        this.dayHeaderHeight = 20;
        this.cellWidth = 20;
        this.cellHeight = 20;
        this.cssOnly = true;
        this.selectionStart = null;
        this.selectionEnd = null;
        this.selectionDay = new DayPilot.Date().getDatePart();
        this.showMonths = 1;
        this.skipMonths = 1;
        this.command = "navigate";
        this.year = new DayPilot.Date().getYear();
        this.month = new DayPilot.Date().getMonth() + 1;
        this.locale = "en-us";
        this.theme = "navigator_default";
        this.timeRangeSelectedHandling = "Bind";
        this.onTimeRangeSelect = null;
        this.onTimeRangeSelected = null;
        this.nav = {};
        this.$02 = function() {
            this.root.dp = this;
            if (this.cssOnly) {
                this.root.className = this.$03('_main');
            } else {
                this.root.className = this.$03('main');
            };
            this.root.style.width = (this.cellWidth * 7) + 'px';
            this.root.style.position = "relative";
            var $b = document.createElement("input");
            $b.type = 'hidden';
            $b.name = $a.id + "_state";
            $b.id = $b.name;
            this.root.appendChild($b);
            this.state = $b;
            if (!this.startDate) {
                this.startDate = new DayPilot.Date(DayPilot.Date.fromYearMonthDay(this.year, this.month));
            } else {
                this.startDate = new DayPilot.Date(this.startDate).firstDayOfMonth();
            };
            this.calendars = [];
            this.selected = [];
            this.months = [];
        };
        this.$04 = function() {
            return $a.api === 2;
        };
        this.$05 = function() {
            this.root.innerHTML = '';
        };
        this.$03 = function($c) {
            var $d = this.theme || this.cssClassPrefix;
            if ($d) {
                return $d + $c;
            } else {
                return "";
            }
        };
        this.$06 = function($e, name) {
            var $f = this.cssOnly ? this.$03("_" + name) : this.$03(name);
            DayPilot.Util.addClass($e, $f);
        };
        this.$07 = function($e, name) {
            var $f = this.cssOnly ? this.$03("_" + name) : this.$03(name);
            DayPilot.Util.removeClass($e, $f);
        };
        this.$08 = function(j, $g) {
            var $h = {};
            $h.cells = [];
            $h.days = [];
            $h.weeks = [];
            var $i = this.startDate.addMonths(j);
            var $j = $g.before;
            var $k = $g.after;
            var $l = $i.firstDayOfMonth();
            var $m = $l.firstDayOfWeek($n.weekStarts());
            var $o = $l.addMonths(1);
            var $p = DayPilot.DateUtil.daysDiff($m, $o);
            var $q = 6;
            $h.rowCount = $q;
            var $r = (new DayPilot.Date()).getDatePart();
            var $s = this.cellWidth * 7;
            var $t = this.cellHeight * $q + this.titleHeight + this.dayHeaderHeight;
            $h.height = $t;
            var $u = document.createElement("div");
            $u.style.width = ($s) + 'px';
            $u.style.height = ($t) + 'px';
            $u.style.position = 'relative';
            if (this.cssOnly) {
                $u.className = this.$03('_month');
            } else {
                $u.className = this.$03('month');
            };
            $u.style.cursor = 'default';
            $u.style.MozUserSelect = 'none';
            $u.style.KhtmlUserSelect = 'none';
            $u.style.WebkitUserSelect = 'none';
            $u.month = $h;
            this.root.appendChild($u);
            var $v = this.titleHeight + this.dayHeaderHeight;
            var tl = document.createElement("div");
            tl.style.position = 'absolute';
            tl.style.left = '0px';
            tl.style.top = '0px';
            tl.style.width = this.cellWidth + 'px';
            tl.style.height = this.titleHeight + 'px';
            tl.style.lineHeight = this.titleHeight + 'px';
            tl.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tl.className = this.$03('_titleleft');
            } else {
                tl.className = this.$03('titleleft');
            };
            if ($g.left) {
                tl.style.cursor = 'pointer';
                tl.innerHTML = "<span>&lt;</span>";
                tl.onclick = this.$09;
            };
            $u.appendChild(tl);
            this.tl = tl;
            var ti = document.createElement("div");
            ti.style.position = 'absolute';
            ti.style.left = this.cellWidth + 'px';
            ti.style.top = '0px';
            ti.style.width = (this.cellWidth * 5) + 'px';
            ti.style.height = this.titleHeight + 'px';
            ti.style.lineHeight = this.titleHeight + 'px';
            ti.style.textAlign = 'center';
            ti.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                ti.className = this.$03('_title');
            } else {
                ti.className = this.$03('title');
            };
            ti.innerHTML = $n.locale().monthNames[$i.getMonth()] + ' ' + $i.getYear();
            $u.appendChild(ti);
            this.ti = ti;
            var tr = document.createElement("div");
            tr.style.position = 'absolute';
            tr.style.left = (this.cellWidth * 6) + 'px';
            tr.style.top = '0px';
            tr.style.width = this.cellWidth + 'px';
            tr.style.height = this.titleHeight + 'px';
            tr.style.lineHeight = this.titleHeight + 'px';
            tr.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tr.className = this.$03('_titleright');
            } else {
                tr.className = this.$03('titleright');
            };
            if ($g.right) {
                tr.style.cursor = 'pointer';
                tr.innerHTML = "<span>&gt;</span>";
                tr.onclick = this.$0a;
            };
            $u.appendChild(tr);
            this.tr = tr;
            for (var x = 0; x < 7; x++) {
                $h.cells[x] = [];
                var dh = document.createElement("div");
                dh.style.position = 'absolute';
                dh.style.left = (x * this.cellWidth) + 'px';
                dh.style.top = this.titleHeight + 'px';
                dh.style.width = this.cellWidth + 'px';
                dh.style.height = this.dayHeaderHeight + 'px';
                dh.style.lineHeight = this.dayHeaderHeight + 'px';
                dh.setAttribute("unselectable", "on");
                if (this.cssOnly) {
                    dh.className = this.$03('_dayheader');
                } else {
                    dh.className = this.$03('dayheader');
                };
                dh.innerHTML = "<span>" + this.$0b(x) + "</span>";
                $u.appendChild(dh);
                $h.days.push(dh);
                for (var y = 0; y < $q; y++) {
                    var $w = $m.addDays(y * 7 + x);
                    var $x = this.$0c($w) && this.$0d() !== 'none';
                    var $y = $w.getMonth() === $i.getMonth();
                    var $z = $w.getTime() < $i.getTime();
                    var $A = $w.getTime() > $i.getTime();
                    var $B;
                    var dc = document.createElement("div");
                    $h.cells[x][y] = dc;
                    dc.day = $w;
                    dc.x = x;
                    dc.y = y;
                    dc.isCurrentMonth = $y;
                    if (this.cssOnly) {
                        dc.className = this.$03(($y ? '_day' : '_dayother'));
                    } else {
                        dc.className = this.$03(($y ? 'day' : 'dayother'));
                    };
                    $a.$06(dc, "cell");
                    if ($w.getTime() === $r.getTime() && $y) {
                        this.$06(dc, 'today');
                    };
                    if ($w.dayOfWeek() === 0 || $w.dayOfWeek() === 6) {
                        this.$06(dc, 'weekend');
                    };
                    dc.style.position = 'absolute';
                    dc.style.left = (x * this.cellWidth) + 'px';
                    dc.style.top = (y * this.cellHeight + $v) + 'px';
                    dc.style.width = this.cellWidth + 'px';
                    dc.style.height = this.cellHeight + 'px';
                    dc.style.lineHeight = this.cellHeight + 'px';
                    var $C = document.createElement("div");
                    $C.style.position = 'absolute';
                    if (this.cssOnly) {
                        $C.className = ($w.getTime() === $r.getTime() && $y) ? this.$03('_todaybox') : this.$03('_daybox');
                    } else {
                        $C.className = ($w.getTime() === $r.getTime() && $y) ? this.$03('todaybox') : this.$03('daybox');
                    };
                    $a.$06($C, "cell_box");
                    $C.style.left = '0px';
                    $C.style.top = '0px';
                    $C.style.right = '0px';
                    $C.style.bottom = '0px';
                    dc.appendChild($C);
                    var $D = null;
                    if (this.cells && this.cells[$w.toStringSortable()]) {
                        $D = this.cells[$w.toStringSortable()];
                        if ($D.css) {
                            this.$06(dc, $D.css);
                        }
                    };
                    if ($y || ($j && $z) || ($k && $A)) {
                        var $E = document.createElement("div");
                        $E.innerHTML = $w.getDay();
                        $E.style.position = "absolute";
                        $E.style.left = '0px';
                        $E.style.top = '0px';
                        $E.style.right = '0px';
                        $E.style.bottom = '0px';
                        $a.$06($E, "cell_text");
                        dc.style.cursor = 'pointer';
                        dc.isClickable = true;
                        if ($D && $D.html) {
                            $E.innerHTML = $D.html;
                        };
                        dc.appendChild($E);
                    };
                    dc.setAttribute("unselectable", "on");
                    dc.onclick = this.$0e;
                    dc.onmousedown = this.$0f;
                    dc.onmousemove = this.$0g;
                    if ($x) {
                        $a.$0h($u, x, y);
                        this.selected.push(dc);
                    };
                    $u.appendChild(dc);
                }
            };
            var $F = document.createElement("div");
            $F.style.position = 'absolute';
            $F.style.left = '0px';
            $F.style.top = ($v - 2) + 'px';
            $F.style.width = (this.cellWidth * 7) + 'px';
            $F.style.height = '1px';
            $F.style.fontSize = '1px';
            $F.style.lineHeight = '1px';
            if (this.cssOnly) {
                $F.className = this.$03("_line");
            } else {
                $F.className = this.$03("line");
            };
            $u.appendChild($F);
            this.months.push($h);
        };
        this.$0h = function($u, x, y) {
            var $G = $u.month.cells[x][y];
            $a.$06($G, 'select');
        };
        this.$0d = function() {
            var $H = this.selectMode || "";
            return $H.toLowerCase();
        };
        this.$0i = function() {
            var $H = $a.$0d();
            switch ($H) {
                case 'day':
                    this.selectionStart = this.selectionDay;
                    this.selectionEnd = this.selectionStart;
                    break;
                case 'week':
                    this.selectionStart = this.selectionDay.firstDayOfWeek($n.weekStarts());
                    this.selectionEnd = this.selectionStart.addDays(6);
                    break;
                case 'month':
                    this.selectionStart = this.selectionDay.firstDayOfMonth();
                    this.selectionEnd = this.selectionDay.lastDayOfMonth();
                    break;
                case 'none':
                    this.selectionStart = this.selectionDay;
                    this.selectionEnd = this.selectionStart;
                    break;
                default:
                    throw "Unknown selectMode value.";
            }
        };
        this.select = function($I) {
            var $J = true;
            var $K = this.selectionStart;
            var $L = this.selectionEnd;
            this.selectionStart = new DayPilot.Date($I).getDatePart();
            this.selectionDay = this.selectionStart;
            var $M = false;
            if ($J) {
                var $N = this.startDate;
                if (this.selectionStart.getTime() < this.visibleStart().getTime() || this.selectionStart.getTime() > this.visibleEnd().getTime()) {
                    $N = this.selectionStart.firstDayOfMonth();
                };
                if ($N.toStringSortable() !== this.startDate.toStringSortable()) {
                    $M = true;
                };
                this.startDate = $N;
            };
            this.$0i();
            this.$05();
            this.$02();
            this.$0j();
            if (!$K.equals(this.selectionStart) || !$L.equals(this.selectionEnd)) {
                this.$0k();
            }
        };
        this.update = function() {
            this.$0l();
            this.$0i();
            this.$05();
            this.$02();
            this.$0j();
        };
        this.$0b = function(i) {
            var x = i + $n.weekStarts();
            if (x > 6) {
                x -= 7;
            };
            return $n.locale().dayNamesShort[x];
        };
        this.$0c = function($I) {
            if (this.selectionStart === null || this.selectionEnd === null) {
                return false;
            };
            if (this.selectionStart.getTime() <= $I.getTime() && $I.getTime() <= this.selectionEnd.getTime()) {
                return true;
            };
            return false;
        };
        this.$0f = function(ev) {};
        this.$0g = function(ev) {};
        this.$0e = function(ev) {
            var $h = this.parentNode.month;
            var x = this.x;
            var y = this.y;
            var $w = $h.cells[x][y].day;
            if (!$h.cells[x][y].isClickable) {
                return;
            };
            $a.clearSelection();
            $a.selectionDay = $w;
            var $w = $a.selectionDay;
            switch ($a.$0d()) {
                case 'none':
                    $a.selectionStart = $w;
                    $a.selectionEnd = $w;
                    break;
                case 'day':
                    var s = $h.cells[x][y];
                    $a.$06(s, 'select');
                    $a.selected.push(s);
                    $a.selectionStart = s.day;
                    $a.selectionEnd = s.day;
                    break;
                case 'week':
                    for (var j = 0; j < 7; j++) {
                        $a.$06($h.cells[j][y], 'select');
                        $a.selected.push($h.cells[j][y]);
                    };
                    $a.selectionStart = $h.cells[0][y].day;
                    $a.selectionEnd = $h.cells[6][y].day;
                    break;
                case 'month':
                    var $O = null;
                    var end = null;
                    for (var y = 0; y < 6; y++) {
                        for (var x = 0; x < 7; x++) {
                            var s = $h.cells[x][y];
                            if (!s) {
                                continue;
                            };
                            if (s.day.getYear() === $w.getYear() && s.day.getMonth() === $w.getMonth()) {
                                $a.$06(s, 'select');
                                $a.selected.push(s);
                                if ($O === null) {
                                    $O = s.day;
                                };
                                end = s.day;
                            }
                        }
                    };
                    $a.selectionStart = $O;
                    $a.selectionEnd = end;
                    break;
                default:
                    throw 'unknown selectMode';
            };
            $a.$0k();
        };
        this.$0k = function() {
            var $O = $a.selectionStart;
            var end = $a.selectionEnd.addDays(1);
            var $p = DayPilot.DateUtil.daysDiff($O, end);
            var $w = $a.selectionDay;
            if ($a.$04()) {
                var $P = {};
                $P.start = $O;
                $P.end = end;
                $P.day = $w;
                $P.days = $p;
                $P.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $a.onTimeRangeSelect === 'function') {
                    $a.$0m.apply(function() {
                        $a.onTimeRangeSelect($P);
                    });
                    if ($P.preventDefault.value) {
                        return;
                    }
                };
                switch ($a.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $Q = eval($a.bound);
                        if ($Q) {
                            var $R = {};
                            $R.start = $O;
                            $R.end = end;
                            $R.days = $p;
                            $R.day = $w;
                            $Q.commandCallBack($a.command, $R);
                        };
                        break;
                    case 'None':
                        break;
                };
                if (typeof $a.onTimeRangeSelected === 'function') {
                    $a.$0m.apply(function() {
                        $a.onTimeRangeSelected($P);
                    });
                }
            } else {
                switch ($a.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $Q = eval($a.bound);
                        if ($Q) {
                            var $R = {};
                            $R.start = $O;
                            $R.end = end;
                            $R.days = $p;
                            $R.day = $w;
                            $Q.commandCallBack($a.command, $R);
                        };
                        break;
                    case 'JavaScript':
                        $a.onTimeRangeSelected($O, end, $w);
                        break;
                    case 'None':
                        break;
                }
            }
        };
        this.$0a = function(ev) {
            $a.$0n($a.skipMonths);
        };
        this.$09 = function(ev) {
            $a.$0n(-$a.skipMonths);
        };
        this.$0n = function(i) {
            this.startDate = this.startDate.addMonths(i);
            this.$05();
            this.$02();
            this.$0j();
        };
        this.visibleStart = function() {
            return $a.startDate.firstDayOfMonth().firstDayOfWeek($n.weekStarts());
        };
        this.visibleEnd = function() {
            return $a.startDate.firstDayOfMonth().addMonths(this.showMonths - 1).firstDayOfWeek($n.weekStarts()).addDays(42);
        };
        this.$0j = function() {
            for (var j = 0; j < this.showMonths; j++) {
                var $g = this.$0o(j);
                this.$08(j, $g);
            };
            this.root.style.height = this.$0p() + "px";
        };
        this.$0p = function() {
            var $S = 0;
            for (var i = 0; i < this.months.length; i++) {
                var $h = this.months[i];
                $S += $h.height;
            };
            return $S;
        };
        this.$0o = function(j) {
            if (this.internal.showLinks) {
                return this.internal.showLinks;
            };
            var $g = {};
            $g.left = (j === 0);
            $g.right = (j === 0);
            $g.before = j === 0;
            $g.after = j === this.showMonths - 1;
            return $g;
        };
        this.internal = {};
        this.$0q = {};
        var $n = this.$0q;
        $n.locale = function() {
            return DayPilot.Locale.find($a.locale);
        };
        $n.weekStarts = function() {
            if ($a.weekStarts === 'Auto') {
                var $T = $n.locale();
                if ($T) {
                    return $T.weekStarts;
                } else {
                    return 0;
                }
            } else {
                return $a.weekStarts;
            }
        };
        this.clearSelection = function() {
            for (var j = 0; j < this.selected.length; j++) {
                this.$07(this.selected[j], 'select');
            };
            this.selected = [];
        };
        this.$0m = {};
        this.$0m.scope = null;
        this.$0m.notify = function() {
            if ($a.$0m.scope) {
                $a.$0m.scope["$apply"]();
            }
        };
        this.$0m.apply = function(f) {
            if ($a.angularAutoApply && $a.$0m.scope) {
                $a.$0m.scope["$apply"](f);
            } else {
                f();
            }
        };
        this.$0r = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $a.items === 'undefined') || (!$a.items);
            } else {
                return false;
            }
        };
        this.$0l = function() {
            if (!$a.cssOnly) {
                $a.cssOnly = true;
                window.console && window.console.log && window.console.log("DayPilot: cssOnly = false mode is not supported anymore.");
            }
        };
        this.$0s = function() {
            if (this.id && this.id.tagName) {
                this.nav.top = this.id;
            } else if (typeof this.id === "string") {
                this.nav.top = document.getElementById(this.id);
                if (!this.nav.top) {
                    throw "DayPilot.Navigator: The placeholder element not found: '" + id + "'.";
                }
            } else {
                throw "DayPilot.Navigator() constructor requires the target element or its ID as a parameter";
            };
            this.root = this.nav.top;
        };
        this.init = function() {
            this.$0s();
            this.$0l();
            if (this.root.dp) {
                return;
            };
            this.$0i();
            this.$02();
            this.$0j();
            this.$0t();
            this.initialized = true;
        };
        this.dispose = function() {
            var c = $a;
            if (!c.root) {
                return;
            };
            c.root.removeAttribute("style");
            c.root.removeAttribute("class");
            c.root.dp = null;
            c.root.innerHTML = null;
            c.root = null;
        };
        this.$0t = function() {
            this.root.dispose = this.dispose;
        };
        this.Init = this.init;
    };
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotNavigator = function($U) {
                var $m = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $V = new DayPilot.Navigator(this.id);
                    this.daypilot = $V;
                    for (var name in $U) {
                        $V[name] = $U[name];
                    };
                    $V.Init();
                    if (!$m) {
                        $m = $V;
                    }
                });
                if (this.length === 1) {
                    return $m;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    (function registerAngularModule() {
        var $W = DayPilot.am();
        if (!$W) {
            return;
        };
        $W.directive("daypilotNavigator", function() {
            return {
                "restrict": "E",
                "template": "<div id='{{id}};'></div>",
                "compile": function compile(element, $X) {
                    element.replaceWith(this["template"].replace("{{id}};", $X["id"]));
                    return function link($Y, element, $X) {
                        var $a = new DayPilot.Navigator(element[0]);
                        $a.$0m.scope = $Y;
                        $a.init();
                        var $Z = $X["id"];
                        if ($Z) {
                            $Y[$Z] = $a;
                        };
                        var $00 = $Y["$watch"];
                        $00.call($Y, $X["daypilotConfig"], function($01) {
                            for (var name in $01) {
                                $a[name] = $01[name];
                            };
                            $a.update();
                        }, true);
                    };
                }
            };
        });
    })();
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();