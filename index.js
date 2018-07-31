
// checkCookie();

// function checkCookie() {

//     var user=getCookie("jadrn030SID");
//     console.log(user);
//     if (user == "") {
//         console.log("jhsdbchsdbchdsghcvsgdcvsgdvgdsvgsdvcgsdvgcvdsgcvdgcvsgdvcgdsvcdgvc");
//         window.location.href = "http://jadran.sdsu.edu/perl/jadrn030/sessions_cookies/logout.cgi";
//     } 
//     }
////////////////////////////

$(document).ready(function() {
	$('[name="user"]').val('');
	$('[name="user"]').focus();	
	});

$(document).ready(function() {
    $("#tabs").tabs();  
  });

function isSkuFormat(name){
        var format = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return format.test(name);
    }

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

var handle = $('input[name="product_image"]');
    var size=0;


$(document).ready( function() {
    var errorStatusHandle = $('[name="error_form"]');
    var elementHandle = new Array(10);
    elementHandle[0] = $('[name="sku"]');
    elementHandle[1] = $('[name="category"]');
    elementHandle[2] = $('[name="vendor"]');
    elementHandle[3] = $('[name="mid"]');
    elementHandle[4] = $('[name="description"]');
    elementHandle[5] = $('[name="features"]');
    elementHandle[6] = $('[name="cost"]');
    elementHandle[7] = $('[name="retail"]');
    elementHandle[8] = $('[name="qty"]');
    elementHandle[9] = $('[name="product_image"]');
	elementHandle[0].focus();
      
   function isValidData() {
   
        var retail = 1.25*elementHandle[6].val();
        var value_retail= elementHandle[7].val();

        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product");
            elementHandle[0].focus();
            return false;
            }

        else if(!isSkuFormat(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter SKU with proper format");
            elementHandle[0].focus();
            return false;	
        }

        if(elementHandle[1].val() == 0) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please select a category of the product");
            elementHandle[1].focus();
            return false;
            }

        if(elementHandle[2].val() == 0) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please select a vendor of the product");
            elementHandle[2].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter Manufacturer's ID");
            elementHandle[3].focus();
            return false;
            } 
        
        if(isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter a description of the product");
            elementHandle[4].focus();
            return false;
            }

        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter features of the product");
            elementHandle[5].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter cost of the product");
            elementHandle[6].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Error in cost value, numbers only please");
            elementHandle[6].focus();            
            return false;
            }

        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter retail of the product");
            elementHandle[7].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Error in retail value, numbers only please ");
            elementHandle[7].focus();            
            return false;
            }

        
		if(value_retail < retail) {
        	elementHandle[7].addClass("error");
            errorStatusHandle.html("Retail prce should be 25% more than the cost price");
            elementHandle[7].focus();
            return false; 
        }

        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter quantity of the product");
            elementHandle[8].focus();
            return false;
        }
        
        $('input[name="product_image"]').on('change',function(e) {
        size = this.files[0].size;
        });

        if(elementHandle[9].val() == "") {
               elementHandle[9].addClass("error");
               errorStatusHandle.text("Please select a file");  
               elementHandle[9].focus();
               return false;
            }

        else if(size/1000 > 3000) {
                elementHandle[9].addClass("error");
                errorStatusHandle.text("File cannot exceed 3MB");  
                elementHandle[9].focus();
                return false;

            }

         return true;
        }

       elementHandle[0].on('keyup', function() {
        elementHandle[0].val(elementHandle[0].val().toUpperCase());
        });

//////////////////// submit button //////////////////////////////

$("#addinvent").on('click', function(e) {
  
    	$('*').removeClass("error");	
        errorStatusHandle.html("");
	    if(isValidData()){

	    	e.preventDefault();
	    	send_file();
        	    
        }   
	   	else {
          e.preventDefault();
          return;
          
        }

////////////////////////Image Upload/////////////////////////////////

    function send_file() {

          var form_data = new FormData($('form')[0]);
          var new_imgname = $("#product_image").val().toLowerCase();
          form_data.append("image", document.getElementById("product_image").files[0]);
          new_imgname = new_imgname.replace(/^.*[\\\/]/, '');
          var toDisplay = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/" + new_imgname + "\" />";
          //alert(new_imgname);
  
         $.ajax({

          url: "/perl/jadrn030/sessions_cookies/upload.cgi",
          type: "post",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(response) {
          var new_imgname = $("#product_image").val().toLowerCase();
          new_imgname = new_imgname.replace(/^.*[\\\/]/, '');
          //alert(new_imgname);
          
          var param = "sku="+$("#sku").val()+
          "&vendor="+$("#vendor").val()+
          "&category="+$("#category").val()+
          "&mid="+$("#mid").val()+
          "&description="+$("#description").val()+
          "&features="+$("#features").val()+
          "&cost="+$("#cost").val()+
          "&retail="+$("#retail").val()+"&qty="+$("#qty").val()+
          "&product_image="+new_imgname;
          //alert(param);
          $('#pic').html(toDisplay);
          $.post("/perl/jadrn030/sessions_cookies/add.cgi", param, add_data);
        }, // success
        error: function(response) {
          $('#error_form').html("Sorry, an upload error occurred! Please try again.");
          $("#error_form").addClass("error");
          $("#error_form").focus();
        } // error
      }); //ajax end

 } //function end

    function add_data(response) {
    //alert("inside add_data function");
    var ans = $.trim(response);
    if(ans === 'SUCCESS')
    {
      //alert('success');
      var msg = "SKU " + $("#sku").val() + " : Record added successfully!";
      $('#error_form').text(msg);
      $("#category").val("0");
      $("#vendor").val("0");
      $("#mid").val("");
      $("#description").val("");
      $("#features").val("");
      $("#cost").val("");
      $("#retail").val("");
      $("#qty").val("");
      $("#product_image").val("");
      $('#sku').prop('disabled',false);
      $('#sku').val("");
      $('#sku').focus();
    }  // if end

    else
    
    {

      $('#error_form').text("Record Insertion Failed");
    alert(response);
  } // else end 
}  // function end

  }); // submit end

 
  
     $(':reset').on('click', function() {
    	errorStatusHandle.html("");
       	$('*').removeClass("error");
    }); // reset end

}); //  end

////////////////// sku duplicate check //////////////////////

$(document).ready(function() {  
    
    $('#sku').on('blur', function() {
        var sku = $('#sku').val();
        if(!sku) return;
        var url = "/perl/jadrn030/sessions_cookies/check_dup.cgi?sku="+sku;
        $.get(url, process_reply);
    });
    
    $('#sku').on('focus', function() {
        $('#status').text("");
    });
    
    $('#sku').on('focus', function() {
        var sku = $('#sku').val("");    
    });
  });
  
  
function process_reply(response) {
    $('#status').text("");
    $('#status').show();
    if(response == "OK") 
        $('#status').text("");   
    else 
    {
        $('#status').text("ERROR, duplicate");
    }
    setTimeout(clearStatus, 2000);
    }
    
function clearStatus() {    
    $('#status').fadeOut(1000);
    }


//////////////////////////////////////////////////////////////////////

