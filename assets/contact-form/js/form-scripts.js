$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content

    // This is the Invoke URL for Amazon API Gateway which has a SES-linked Lambda configured to send the email form
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();


    var URL = 'https://yovbu7k9a8.execute-api.us-east-1.amazonaws.com/FormEmailStage/contact'
    var data = {
        name: name,
        email: email,
        message: message
    }

    // var URI = encodeURIComponent("assets/contact-form/php/form-process.php");

    $.ajax({
        type: "POST",
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success : function(response){
            if (response == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,response);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(true, msg){
    if(true){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
