
/*
DayPilot Lite
Copyright (c) 2005 - 2016 Annpoint s.r.o.
http://www.daypilot.org/
Licensed under Apache Software License 2.0
Version: 217-lite
*/
var dp = new DayPilot.Calendar("dp");
var startDate=null;
// view
dp.startDate = "2017-02-20";  // or just dp.startDate = "2013-03-25";
dp.viewType = "Week";

// event creating
dp.onTimeRangeSelected = function (args) {
    if( sessionStorage.break=="null"|| sessionStorage.dayBegin=="null"||!sessionStorage.interval=="null"){
        $('<p class="prompt" style="color:#9A9A9A!important;">FILL FIRST</p>').insertAfter("#break");
        $(".prompt").delay(2000).fadeOut(); 
        return;
    }
    $('.cover').fadeIn();
    $('#modal').fadeIn();
    startDate= args.start.toString().substring(8,10);
};

dp.onEventClick = function(args) {
    $(".infodiv").html('<div class="infobox">'+args.e.text() +'</div>');
    $(".infobox").delay(2000).fadeOut();
};
dp.onEventMoved = function(args) {
    alert("clicked: " + args.e.start());
};

dp.headerDateFormat = "dddd";
dp.init();





$(document).on('click', ".modalBtn", function() {
    $('.cover').fadeOut();
    $('#modal').fadeOut();
    var room=$('#room').val();
    var course=$('#course').val();
    var lec=$('#lec').val();
    var yeargroup=$('#yearGroup').val();
    var slot = $('#slot').val();
    var days =$('#days').val();
    var type=$('#type').val();
    var term;
    if ( document.getElementById("fall").checked){
        term =document.getElementById("fall").value;
    }
    if ( document.getElementById("spring").checked){
        term =document.getElementById("spring").value;
    }
    var period=document.getElementById("onep").value;

    if ( document.getElementById("twop").checked){
        period =document.getElementById("twop").value;
    }
    var interval =sessionStorage.interval;
    if (document.getElementById("twop").checked)
    {
        interval = (interval* 2)+10;
    }
    var sDate =new DayPilot.Date("2017-02-"+startDate+"T"+slot+":00");
    var eDate =new DayPilot.Date("2017-02-"+startDate+"T"+slot+":00").addMinutes(interval);
    if(room=="None"||course=="None"||room=="None"){return;}
    addEvent(room,course,lec,yeargroup,days,sDate,eDate,sDate.toString().substring(11, 13),sDate.toString().substring(14, 16),type,term,period);
    var name=course+"<br>"+room+"<br>"+sDate.toString().substring(11, 16)+"-"+eDate.toString().substring(11, 16);
    var e = new DayPilot.Event({
        start: sDate,
        end: eDate,
        id: DayPilot.guid(),
        text: name
    });
    dp.events.add(e);
    dp.clearSelection();

});

$(document).on('click', ".cover", function() {
    $('.cover').fadeOut();
    $('#modal').fadeOut();
});

/**
 * [[Description]]
 * @param {[[Type]]} r  [[Description]]
 * @param {[[Type]]} c  [[Description]]
 * @param {[[Type]]} l  [[Description]]
 * @param {[[Type]]} yg [[Description]]
 * @param {[[Type]]} d  [[Description]]
 * @param {[[Type]]} ds [[Description]]
 * @param {[[Type]]} de [[Description]]
 * @param {[[Type]]} h  [[Description]]
 * @param {[[Type]]} m  [[Description]]
 * @param {[[Type]]} ty [[Description]]
 * @param {[[Type]]} te [[Description]]
 * @param {[[Type]]} p  [[Description]]
 */
function addEvent(r,c,l,yg,d,ds,de,h,m,ty,te,p)
{
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?'+
        'cmd=7&room='+r+'&course='+c+'&lec='+l+'&yeargroup='+yg+'&days='+d+'&day_start='+ds+'&day_end='+de+
        '&hour='+h+'&minute='+m+'&username='+sessionStorage.user+'&term='+te+'&type='+ty+'&period='+p,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {
                alert("This slot has already been taken");
                return;
            }
            else
            {
                for(var i=0; i<response.length;i++)
                {

                }
            }
        },
    });
}

$(document).on('click','.add',function(){
    if( !$('#break').val()||!$('#dayBegin').val()||!$('#slotLength').val()){return;}
    var brk= $('#break').val();
    var ds= $('#dayBegin').val();
    var sl= $('#slotLength').val();
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=17&day_start='+ds+'&brk='+brk+'&slot_length='+sl+'&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {

            }
            else
            {
                $('<p class="prompt" style="color:#9A9A9A!important;">UPDATED</p>').insertAfter("#break");
                $(".prompt").delay(2000).fadeOut(); 
                $(".add").html('update');
                $(".add").addClass('update');
                sessionStorage.break= brk;
                sessionStorage.dayBegin=ds;
                sessionStorage.interval=sl;
                populate("#slot");
            }
        },
    });
});

$(document).on('click','.update',function(){
    if( !$('#break').val()||!$('#dayBegin').val()||!$('#slotLength').val()){return;}
    var brk= $('#break').val();
    var ds= $('#dayBegin').val();
    var sl= $('#slotLength').val();
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=18&day_start='+ds+'&brk='+brk+'&slot_length='+sl+'&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {

            }
            else
            {
                $('<p class="prompt" style="color:#9A9A9A!important;">UPDATED</p>').insertAfter("#break");
                $(".prompt").delay(2000).fadeOut(); 
                sessionStorage.break= brk;
                sessionStorage.dayBegin=ds;
                sessionStorage.interval=sl;
                populate("#slot");
            }
        },
    });
});


/**
 * [[Description]]
 * @param {[[Type]]} selector [[Description]]
 */
function populate(selector) {
    // if ($(".add").html()=="add"){ return;}
    var select = $(selector);
    select.html("<option value=''>None</option>");
    var hours, minutes, ampm;
    var interval = parseInt( sessionStorage.interval);
    var brk =parseInt( sessionStorage.break);
    var i =  parseInt(sessionStorage.dayBegin.substring(0,2));
    var count =1;
    i *= 60;
    for(; i <= 1200; i += interval){
        hours = Math.floor(i / 60);

        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes; 
        }

        hours = hours % 24;
        if (hours === 0){
            hours = 12;
        }
        if (hours < 10){
            hours = '0' + hours; 
        }
        select.append($('<option></option>')
                      .attr('value', hours+':'+minutes)
                      .text('Slot'+count+'('+hours + ':' + minutes + " o'clock )")); 
        i+=brk;
        count +=1;
    }
}

/**
 * [[Description]]
 */
function getRoom()
{
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=3&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {
                $("#room").html("<option>None<option>"); 
            }
            else
            {
                for(var i=0; i<response.length;i++)
                {
                    $('#room').append($('<option></option>')
                                      .attr('value',response[i]['room'])
                                      .text(response[i]['room'])); 
                }
            }
        },
    });
}

/**
 * [[Description]]
 */
function getCourse()
{
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=2&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {
                $("#course").html("<option>None<option>"); 
            }
            else
            {
                for(var i=0; i<response.length;i++)
                {
                    $('#course').append($('<option></option>')
                                        .attr('value',response[i]['courseName'])
                                        .text(response[i]['courseName'])); 
                }
            }
        },
    });
}

/**
 * [[Description]]
 */
function getLec()
{  
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=1&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {
                $("#lec").html("<option>None<option>"); 
            }
            else
            {
                for(var i=0; i<response.length;i++)
                {
                    $('#lec').append($('<option></option>')
                                     .attr('value',response[i]['lecturer'])
                                     .text(response[i]['lecturer'])); 
                }
            }
        },
    });
}

/**
 * [[Description]]
 */
function updateTable()
{  
    $.ajax({
        type: 'POST',
        url: 'ajaxAdmin/projectAjax.php?cmd=8&username='+sessionStorage.user,
        error: function () {
            // alert('error, failed to get id');
        },
        dataType: 'json',
        success: function (response) {
            if(response.message=="false")
            {
                // $("#lec").html("<option>None<option>"); 
            }
            else
            {
                for(var i=0; i<response.length;i++)
                {
                    var name=response[i]["course"]+"<br>"+response[i]["room"]+"<br>"+response[i]["day_start"].toString().substring(11, 16)+"-"+response[i]["day_end"].toString().substring(11, 16);
                    var e = new DayPilot.Event({
                        start: new DayPilot.Date(response[i]["day_start"]),
                        end: new DayPilot.Date(response[i]["day_end"]),
                        id: "1",
                        text: name
                    });

                    dp.events.add(e);
                }
            }
        },
    });
}

window.onload = function() {
    updateTable();
    getRoom();
    getCourse();
    getLec();
    console.log(dp.events);
    if(sessionStorage.break=="null"||!sessionStorage.dayBegin=="null"||!sessionStorage.interval=="null"){
        $(".add").html('add');
        return;
    }
    else{
        $(".add").html('update');
        $(".add").addClass('update');
    }
    $('#break').val( sessionStorage.break);
    $('#dayBegin').val(sessionStorage.dayBegin);
    $('#slotLength').val(sessionStorage.interval);
    populate("#slot");
    if( localStorage.getItem("schedule")!=null)
    { 
        var interval = sessionStorage.interval;
        var response = JSON.parse(localStorage.getItem("schedule"));
        console.log(response[0]);
        for(var i=0; i<response.length;i++)
        { 
            if(response[i]["meetingTime"]["day"]=="MW"){
                var sDate =new DayPilot.Date("2017-02-20T"+response[i]["meetingTime"]["slot"]+":00");
                var eDate =new DayPilot.Date("2017-02-20T"+response[i]["meetingTime"]["slot"]+":00").addMinutes(interval);
                var ssDate =new DayPilot.Date("2017-02-22T"+response[i]["meetingTime"]["slot"]+":00");
                var eeDate =new DayPilot.Date("2017-02-22T"+response[i]["meetingTime"]["slot"]+":00").addMinutes(interval);
                var name=response[i]["course"]["courseName"]+"<br>"+response[i]["room"]["name"]+"<br>"+sDate.toString().substring(11, 16)+"-"+eDate.toString().substring(11, 16);
                //add Monday
                var e = new DayPilot.Event({
                    start: sDate,
                    end: eDate,
                    id: "1",
                    text: name
                });
                dp.events.add(e);
                //add Wednesday
                var name=response[i]["course"]["courseName"]+"<br>"+response[i]["room"]["name"]+"<br>"+ssDate.toString().substring(11, 16)+"-"+eeDate.toString().substring(11, 16);
                var d = new DayPilot.Event({
                    start: ssDate,
                    end: eeDate,
                    id: "1",
                    text: name
                });
                dp.events.add(d);
            }

            else if(response[i]["meetingTime"]["day"]=="TH"){
                var sDate =new DayPilot.Date("2017-02-21T"+response[i]["meetingTime"]["slot"]+":00");
                var eDate =new DayPilot.Date("2017-02-21T"+response[i]["meetingTime"]["slot"]+":00").addMinutes(interval);
                var ssDate =new DayPilot.Date("2017-02-23T"+response[i]["meetingTime"]["slot"]+":00");
                var eeDate =new DayPilot.Date("2017-02-23T"+response[i]["meetingTime"]["slot"]+":00").addMinutes(interval);
                var name=response[i]["course"]["courseName"]+"<br>"+response[i]["room"]["name"]+"<br>"+sDate.toString().substring(11, 16)+"-"+eDate.toString().substring(11, 16);
                //add Tuesday
                var e = new DayPilot.Event({
                    start: sDate,
                    end: eDate,
                    id: "1",
                    text: name
                });
                dp.events.add(e);
                //add Thursday
                var name=response[i]["course"]["courseName"]+"<br>"+response[i]["room"]["name"]+"<br>"+ssDate.toString().substring(11, 16)+"-"+eeDate.toString().substring(11, 16);
                var d = new DayPilot.Event({
                    start: ssDate,
                    end: eeDate,
                    id: "1",
                    text: name
                });
                dp.events.add(d);
            }
            else
            {

                var sDate =new DayPilot.Date("2017-02-24T"+response[i]["meetingTime"]["slot"]+":00");
                var eDate =new DayPilot.Date("2017-02-24T"+response[i]["meetingTime"]["slot"]+":00").addMinutes(interval);
                var name=response[i]["course"]["courseName"]+"<br>"+response[i]["room"]["name"]+"<br>"+sDate.toString().substring(11, 16)+"-"+eDate.toString().substring(11, 16);
                //add Friday
                var e = new DayPilot.Event({
                    start: sDate,
                    end: eDate,
                    id: "1",
                    text: name
                });
                dp.events.add(e);

            }
        }
    }
};   
