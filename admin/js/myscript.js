
/**
 * jQuery-csv (jQuery Plugin)
 *
 * These list of functions is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Acknowledgements:
 * The original design and influence to implement this library as a jquery
 * plugin is influenced by jquery-json (http://code.google.com/p/jquery-json/).
 * If you're looking to use native JSON.Stringify but want additional backwards
 * compatibility for browsers that don't support it, I highly recommend you
 * check it out.
 *
 * A special thanks goes out to rwk@acm.org for providing a lot of valuable
 * feedback to the project including the core for the new FSM
 * (Finite State Machine) parsers. If you're looking for a stable TSV parser
 * be sure to take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).

 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsibility if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */
$(document).ready(function() {
  if(isAPIAvailable()) {
    $('#file').bind('change', handleFileSelect);
  }
});


/**
 * [[Description]]
 * @returns {boolean} [[Description]]
 */
function isAPIAvailable() {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    return true;
  } else {
    // source: File API availability - http://caniuse.com/#feat=fileapi
    // source: <output> availability - http://html5doctor.com/the-output-element/
    document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
    // 6.0 File API & 13.0 <output>
    document.writeln(' - Google Chrome: 13.0 or later<br />');
    // 3.6 File API & 6.0 <output>
    document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
    // 10.0 File API & 10.0 <output>
    document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
    // ? File API & 5.1 <output>
    document.writeln(' - Safari: Not supported<br />');
    // ? File API & 9.2 <output>
    document.writeln(' - Opera: Not supported');
    return false;
  }
}

/**
 * [[Description]]
 * @param {object} evt [[Description]]
 */
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];
  // read the file metadata
  var output = ''
  output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
  output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
  output += ' - FileSize: ' + file.size + ' bytes<br />\n';
  output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

  // read the file contents
  printTable(file);

}


/**
 * [[Description]]
 * @param {object} file [[Description]]
 */
function printTable(file) {
  var reader = new FileReader();
  reader.readAsText(file);
  console.log(reader);
  reader.onload = function(event){
    var csv = event.target.result;
    var data = $.csv.toArrays(csv);
    if ($(".fileDiv").attr("class")=="fileDiv csvRoom"){
      groupRoomInsert(data);
    }
    if ($(".fileDiv").attr("class")=="fileDiv csvLec"){
      groupLecInsert(data);
    }
    if ($(".fileDiv").attr("class")=="fileDiv csvCourse"){
      groupCourseInsert(data);
    }
  };
  reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
}

/**
 * [[Description]]
 * @param {[[Type]]} data [[Description]]
 */
function groupRoomInsert(data)
{

  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=14&username='+sessionStorage.user,
    data: {data:data},
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt">Failed/Check Format</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateRoom();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateRoom();
      }
    },
  });
}

/**
 * [[Description]]
 * @param {[[Type]]} data [[Description]]
 */
function groupCourseInsert(data)
{

  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=15&username='+sessionStorage.user,
    data: {data:data},
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt">Failed/Check Format</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateCourse();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateCourse();
      }
    },
  });
}

/**
 * [[Description]]
 * @param {[[Type]]} data [[Description]]
 */
function groupLecInsert(data)
{

  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=12&username='+sessionStorage.user,
    data: {data:data},
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt">Failed/Check Format</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateLec();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        updateLec();
      }
    },
  });
}

jQuery(document).ready(function ($) {
  $('#lecturer').click(function (event) {
    event.preventDefault();
    $('.panel').html('');
    $('#courses').removeClass('activeLi');
    $('#entries').removeClass('activeLi');
    $('#rooms').removeClass('activeLi');
    $('#lecturer').addClass('activeLi');
    $('.add').removeClass('noShow');
    $('.fileDiv').removeClass('noShow');
    $('.fileDiv').addClass('csvLec');
    $('.fileDiv').removeClass('csvCourse');
    $('.fileDiv').removeClass('csvRoom');
    $('.addInput').attr('placeholder','Lecturer Name');
    $('.addInput2').attr('placeholder','Department');
    $('.addInput3').attr('placeholder','Days Available');
    $('.addInput3').html('<option value="MW">Mon-Wed</option><option value="TH">Tue-Thu</option><option value="F">Fri</option>'+
                         '<option value="" disabled selected>Times Inavailable</option>');
    $('.addInput').removeClass('noShow');
    $('.addInput2').removeClass('noShow');
    $('.addInput3').removeClass('noShow');
    $('.addInput4').addClass('noShow');
    $('.addInput5').addClass('noShow');
    $('.addInput6').addClass('noShow');
    $('.addInput7').addClass('noShow');
    $('.addInput8').addClass('noShow');
    $('.addInput9').addClass('noShow');
    $('.add').removeClass('addRoom');
    $('.add').removeClass('addCourse');
    $('.add').addClass('addLec');
    $('.addInput').val("");
    $('.addInput2').val("");
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
          $(".panel").html("<p id='prompt'> No Lecturers Added Yet</p>"); 
        }
        else
        {
          $('.panel').html('');
          for(var i=0; i<response.length;i++)
          {
            $('.panel').append(' <div class="lecturercard">'+
                               ' <i class="lec ti-id-badge"></i>'+
                               '<p class="lecName"> [' +response[i]['Department']+'] '+response[i]['lecturer']+'</p>'+
                               '<p class="delete lecDel" id="'+response[i]['id']+'"> DEL</p>'+
                               '</div>');
          }
        }
      },
    });
  });
});

jQuery(document).ready(function ($) {
  $('#courses').click(function (event) {
    event.preventDefault();
    $('.panel').html('');
    getLec();
    getRoom();
    $('#courses').addClass('activeLi');
    $('#rooms').removeClass('activeLi');
    $('#entries').removeClass('activeLi');
    $('#lecturer').removeClass('activeLi');
    $('.addInput').attr('placeholder','CourseNo');
    $('.addInput2').attr('placeholder','Course Name');
    $('.addInput3').attr('placeholder','Department');
    $('.addInput4').attr('placeholder','Lecturer');
    $('.addInput5').attr('placeholder','Class Size');
    $('.addInput6').attr('placeholder','YearGroup');
    $('.addInput7').attr('placeholder','Room Requirement');
    $('.add').removeClass('noShow');
    $('.fileDiv').removeClass('noShow');
    $('.fileDiv').addClass('csvCourse');
    $('.fileDiv').removeClass('csvLec');
    $('.fileDiv').removeClass('csvRoom');
    $('.addInput3').html(" <option value='' disabled selected>Department</option>"+
                         "<option value='Computer Science'>Computer Science</option>"+
                         "<option value=' Business Administration'> Business Administration</option>"+
                         " <option value='Engineering'> Engineering</option>"+
                         "<option value='Arts and Sciences'> Arts and Sciences</option>");
    $('.addInput').removeClass('noShow');
    $('.addInput2').removeClass('noShow');
    $('.addInput3').removeClass('noShow');
    $('.addInput4').removeClass('noShow');
    $('.addInput5').removeClass('noShow');
    $('.addInput6').removeClass('noShow');
    $('.addInput7').removeClass('noShow');

    $('.add').removeClass('addRoom');
    $('.add').addClass('addCourse');
    $('.add').removeClass('addLec');
    $('.addInput').val("");
    $('.addInput2').val("");

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
          $(".panel").html("<p id='prompt'> No Courses Added Yet</p>"); 
        }
        else
        {
          $('.panel').html('');
          for(var i=0; i<response.length;i++)
          {
            $('.panel').append(' <div class="lecturercard">'+
                               ' <i class="lec ti-book"></i>'+
                               '<p class="lecName"> [' +response[i]['courseNo']+'] '+response[i]['courseName']+'</p>'+
                               '<p class="delete courseDel" id="'+response[i]['id']+'"> DEL</p>'+
                               '</div>');
          }
        }
      },
    });
  });
});


jQuery(document).ready(function ($) {
  $('#rooms').click(function (event) {
    event.preventDefault();
    $('.panel').html('');
    $('#courses').removeClass('activeLi');
    $('#rooms').addClass('activeLi');
    $('#entries').removeClass('activeLi');
    $('#lecturer').removeClass('activeLi');
    $('.add').removeClass('noShow');
    $('.fileDiv').removeClass('noShow');
    $('.fileDiv').addClass('csvRoom');
    $('.fileDiv').removeClass('csvCourse');
    $('.fileDiv').removeClass('csvLec');
    $('.addInput').attr('placeholder','RoomNo');
    $('.addInput2').attr('placeholder','Building');
    $('.addInput').removeClass('noShow');
    $('.addInput2').removeClass('noShow');
    $('.addInput3').addClass('noShow');
    $('.addInput4').addClass('noShow');
    $('.addInput5').addClass('noShow');
    $('.addInput6').addClass('noShow');
    $('.addInput7').addClass('noShow');
 
    $('.add').addClass('addRoom');
    $('.add').removeClass('addCourse');
    $('.add').removeClass('addLec');
    $('.addInput').val("");
    $('.addInput2').val("");
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
          $(".panel").html("<p id='prompt'> No Rooms Added Yet</p>"); 
        }
        else
        {
          for(var i=0; i<response.length;i++)
          {

            $('.panel').append(' <div class="lecturercard">'+
                               ' <i class="lec ti-home"></i>'+
                               '<p class="lecName"> [' +response[i]['department']+'] '+response[i]['room']+'</p>'+
                               '<p class="delete roomDel" id="'+response[i]['id']+'"> DEL</p>'+
                               '</div>');
          }
        }
      },
    });
  });
});

jQuery(document).ready(function ($) {
  $('#entries').click(function (event) {
    event.preventDefault();
    $('.panel').html('');
    $('#courses').removeClass('activeLi');
    $('#rooms').removeClass('activeLi');
    $('#entries').addClass('activeLi');
    $('#lecturer').removeClass('activeLi');
    $('.addInput').addClass('noShow');
    $('.addInput2').addClass('noShow');
    $('.addInput3').addClass('noShow');
    $('.addInput4').addClass('noShow');
    $('.addInput5').addClass('noShow');
    $('.addInput6').addClass('noShow');
    $('.addInput7').addClass('noShow');
    $('.add').addClass('noShow');
    $('.fileDiv').addClass('noShow');

    $.ajax({
      type: 'POST',
      url: 'ajaxAdmin/projectAjax.php?cmd=13&username='+sessionStorage.user,
      error: function () {
        // alert('error, failed to get id');
      },
      dataType: 'json',
      success: function (response) {
        if(response.message=="false")
        {
          $(".panel").html("<p id='prompt'> No Entries Added Yet</p>"); 
        }
        else
        {
          for(var i=0; i<response.length;i++)
          {

            $('.panel').append(' <div class="lecturercard">'+
                               ' <i class="lec ti-agenda"></i>'+
                               '<p class="lecName">'+response[i]['course']+' [' +response[i]['day_start'].substring(11,16)+'-'+
                               response[i]['day_end'].substring(11,16)+'] - '+response[i]['room']+
                               ' - '+response[i]['lecturer']+'- '+response[i]['Type'] +' ('+response[i]['Term'].substring(0,4)+
                               ')('+response[i]['days']+')</p>'+
                               '<p class="delete entryDel" id="'+response[i]['id']+'"> DEL</p>'+
                               '</div>');
          }
        }
      },
    });
  });
});


$(document).on('click', ".addRoom", function() {
  var room=$('.addInput').val();
  var department = $('.addInput2').val();

  if(room==""||department=="")
  {
    $('<p class="prompt" style="color:#9A9A9A!important;">FILL ALL FIELDS</p>').insertAfter(".addInput2");
    $(".prompt").delay(2000).fadeOut();
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=6&room='+room+'&department='+department+'&username='+ sessionStorage.user,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt" >EXISTS</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter(".addInput2");
        $(".prompt").delay(2000).fadeOut();
        $('.addInput').val("");
        $('.addInput2').val("");
        updateRoom();
      }
    },
  });      
});


$(document).on('click', ".addCourse", function() {
  var courseNo=$('.addInput').val();
  var courseName= $('.addInput2').val();
  var dep =$('.addInput3').val();
  var lec =$('.addInput4').val();
  var size=$('.addInput5').val();
  var yeargroup=$('.addInput6').val();
  var room=$('.addInput7').val();
  if(courseNo==""||courseName=="")
  {
    $('<p class="prompt" style="color:#9A9A9A!important;">FILL ALL FIELDS</p>').insertAfter("#fileLabel");
    $(".prompt").delay(2000).fadeOut();
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=4&cName='+courseName+'&cNo='+courseNo+'&username='+ sessionStorage.user+'&dep='+dep+'&lec='+lec+'&size='+size+'&yeargroup='+yeargroup+'&room='+room,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt" >EXISTS</p>').insertAfter("#fileLabel");
        $(".prompt").delay(2000).fadeOut();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter("#fileLabel");
        $(".prompt").delay(2000).fadeOut();
        $('.addInput').val("");
        $('.addInput2').val("");
        updateCourse();
      }
    },
  });          
});


$(document).on('click', ".addLec", function() {
  var lec=$('.addInput').val();
  var department = $('.addInput2').val();
  var inavailable =$('.addInput3').val();
  if(lec==""||department=="")
  {
    $('<p class="prompt" style="color:#9A9A9A!important;">FILL ALL FIELDS</p>').insertAfter("#fileLabel");
    $(".prompt").delay(2000).fadeOut();
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=5&lec='+lec+'&department='+department+'&username='+ sessionStorage.user+'&inavailable='+inavailable,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        $('<p class="prompt" >FAILED</p>').insertAfter("#fileLabel");
        $(".prompt").delay(2000).fadeOut();
      }
      else
      {
        $('<p class="prompt">Added</p>').insertAfter("#fileLabel");
        $(".prompt").delay(2000).fadeOut();
        $('.addInput').val("");
        $('.addInput2').val("");
        updateLec();
      }
    },
  });         
});

$(document).on('click', ".roomDel", function() {
  var name = confirm("Are you sure you want to delete this?");
  if (!name){
    return;
  }
  var id= $(this).attr('id');
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=11&id='+id+'&username='+ sessionStorage.user,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        alert("Unable to Delete");
      }
      else
      {
        updateRoom();
      }
    },
  });         
});

$(document).on('click', ".lecDel", function() {
  var name = confirm("Are you sure you want to delete this?");
  if (!name){
    return;
  }
  var id= $(this).attr('id');
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=9&id='+id+'&username='+ sessionStorage.user,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        alert("Could not delete");
      }
      else
      {
        updateLec();
      }
    },
  });         
});

$(document).on('click', ".courseDel", function() {
  var name = confirm("Are you sure you want to delete this?");
  if (!name){
    return;
  }
  var id= $(this).attr('id');
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=10&id='+id+'&username='+ sessionStorage.user,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        alert("Could not delete");
      }
      else
      {
        updateCourse();
      }
    },
  });         
});

$(document).on('click', ".entryDel", function() {
  var name = confirm("Are you sure you want to delete this?");
  if (!name){
    return;
  }
  var id= $(this).attr('id');
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=16&id='+id+'&username='+ sessionStorage.user,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        alert("Could not delete");
      }
      else
      {
        updateCourse();
      }
    },
  });         
});

/**
 * [[Description]]
 */
function updateLec()
{
  $('.panel').html('');
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
        $(".panel").html("<p id='prompt'> No Lecturers Added Yet</p>"); 
      }
      else
      {
        $('.panel').html('');
        for(var i=0; i<response.length;i++)
        {
          $('.panel').append(' <div class="lecturercard">'+
                             ' <i class="lec ti-id-badge"></i>'+
                             '<p class="lecName"> [' +response[i]['Department']+'] '+response[i]['lecturer']+'</p>'+
                             '<p class="delete lecDel" id="'+response[i]['id']+'"> DEL</p>'+
                             '</div>');

        }
      }
    },
  });
}

/**
 * [[Description]]
 */
function updateCourse()
{
  $('.panel').html('');
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
        $(".panel").html("<p id='prompt'> No Courses Added Yet</p>"); 
      }
      else
      {
        $('.panel').html('');
        for(var i=0; i<response.length;i++)
        {
          $('.panel').append(' <div class="lecturercard">'+
                             ' <i class="lec ti-book"></i>'+
                             '<p class="lecName"> [' +response[i]['courseNo']+'] '+response[i]['courseName']+'-'+
                             response[i]['lecturer']+'</p> <p class="delete courseDel" id="'+response[i]['id']+'"> DEL</p></div>');
        }
        sessionStorage.courseCount = response.length;
      }
    },
  });
}

/**
 * [[Description]]
 */
function updateRoom()
{
  $('.panel').html('');
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
        $(".panel").html("<p id='prompt'> No Rooms Added Yet</p>"); 
      }
      else
      {
        for(var i=0; i<response.length;i++)
        {

          $('.panel').append(' <div class="lecturercard">'+
                             ' <i class="lec ti-home"></i>'+
                             '<p class="lecName"> [' +response[i]['department']+'] '+response[i]['room']+'</p>'+
                             '<p class="delete roomDel" id="'+response[i]['id']+'"> DEL</p>'+
                             '</div>');
        }
        sessionStorage.roomCount = response.length;
      }
    },
  });
}

function getLec()
{  
  $('.addInput4').html('<option value="" disabled selected>Lecturer</option>');
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

          $('.addInput4').append($('<option></option>')
                                 .attr('value',response[i]['lecturer'])
                                 .text(response[i]['lecturer'])); 
        }
      }
    },
  });
}

function getRoom()
{
  $('.addInput7').html('<option value="" disabled selected>Room Requirement</option>'+
                       '<option value="" disabled selected>None</option>');
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
          $('.addInput7').append($('<option></option>')
                                 .attr('value',response[i]['room'])
                                 .text(response[i]['room'])); 
        }
      }
    },
  });
}

$(document).on('click', ".schAdd", function() {

  $(".schInfo").attr("style","display:none;");
  $(".schloader").fadeIn();
  $(".autoPanel").attr("style","display:none;");
  $.ajax({
    type: 'POST',
    url: 'ajaxAdmin/projectAjax.php?cmd=19&username='+ sessionStorage.user+'&int='+sessionStorage.interval+'&day='+sessionStorage.dayBegin+'&brk='+sessionStorage.break,
    error: function () {
      // alert('error, failed to get id');
    },
    dataType: 'json',
    success: function (response) {
      if(response.message=="false")
      {
        alert("Could not delete");
      }
      else
      {
        $(".schloader").fadeOut();
        localStorage.setItem("schedule", JSON.stringify(response));
        window.location.href="schedule.html";
      }
    },
  });         
});