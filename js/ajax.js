jQuery(document).ready(function ($) {
  $('.userSign').click(function (event) {
    event.preventDefault();
    var username=$('#sign_username').val();
    var password= $('#sign_password').val();
    var email= $('#sign_email').val();
    $.ajax({
      type: 'POST',
      url: 'ajax/projectAjax.php?cmd=1&password='+password+'&username='+username+'&email='+email,
      error: function () {
        // alert('error, failed to get id');
      },
      dataType: 'json',
      success: function (response) {
        if(response.message=="false")
        {
          $(".prompt").html("Please Make Sure All Fields Are Filled");
        }
        else if(response.message=="fail")
        {
          $(".prompt").html("Please Choose Another Username");
        }
        else
        {
          $(".prompt").html("Account Successfully Created");
        }
      },
    });
  });
});


jQuery(document).ready(function ($) {
  $('.userLog').click(function (event) {
    event.preventDefault();
    var username=$('#log_username').val();
    var password= $('#log_password').val();
    if(username==""||password=="")
    {
      $(".prompt-log").html("Please Fill All Fields");
      return;
    }
    $.ajax({
      type: 'POST',
      url: 'ajax/projectAjax.php?cmd=2&password='+password+'&username='+username,
      error: function () {
        // alert('error, failed to get id');
      },
      dataType: 'json',
      success: function (response) {
        if(response.message=="false")
        {
          $(".prompt-log").html("Wrong Username or Password");
        }
        else
        {
          $(".prompt-log").html("");
          sessionStorage.user=response[0]['username'];
          sessionStorage.id=response[0]['id'];
          sessionStorage.break= response[0]['break'];
          sessionStorage.dayBegin= response[0]['day_start'];
          sessionStorage.interval=response[0]['slot_length'];
          window.location.href="admin/dashboard.html";
        }
      },
    });
  });
});

