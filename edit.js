

///////////////////////////////////////////////////////

 function isSkuFormat(name){
        var format = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return format.test(name);
    }

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

var handle = $('input[name="eproduct_image"]');
    var size=0;

$(document).ready(function() {
    $("#tabs").tabs(); 
    $("#editerror_form").css('color','red');
    $("#estatus").css('color','red');
  });

$(document).ready(function() {
	$('[name="esku"]').val('');
	$('[name="esku"]').focus();	
	});

$(document).ready( function() {
    var errorStatusHandle = $('[name="editerror_form"]');
    var elementHandle = new Array(10);
    elementHandle[10] = $('[name="esku"]');
    elementHandle[11] = $('[name="ecategory"]');
    elementHandle[12] = $('[name="evendor"]');
    elementHandle[13] = $('[name="emid"]');
    elementHandle[14] = $('[name="edescription"]');
    elementHandle[15] = $('[name="efeatures"]');
    elementHandle[16] = $('[name="ecost"]');
    elementHandle[17] = $('[name="eretail"]');
    elementHandle[18] = $('[name="eqty"]');
    elementHandle[19] = $('[name="eproduct_image"]');
    elementHandle[10].focus();
    
    function isValidData() {

      var retail = 1.25*elementHandle[16].val();
        var value_retail= elementHandle[17].val();

        if(isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product");
            elementHandle[10].focus();
            return false;
            }

        else if(!isSkuFormat(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU with proper format");
            elementHandle[10].focus();
            return false;	
        }

        if(elementHandle[11].val() == 0) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("Please select a category of the product");
            elementHandle[11].focus();
            return false;
            }

        if(elementHandle[12].val() == 0) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please select a vendor of the product");
            elementHandle[12].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[13].val())) {
            elementHandle[13].addClass("error");
            errorStatusHandle.text("Please enter Manufacturer's ID");
            elementHandle[13].focus();
            return false;
            } 
        
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please enter a description of the product");
            elementHandle[14].focus();
            return false;
            }

        if(isEmpty(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("Please enter features of the product");
            elementHandle[15].focus();
            return false;
            }
        
        if(isEmpty(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Please enter cost of the product");
            elementHandle[16].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Error in cost value, numbers only please");
            elementHandle[16].focus();            
            return false;
            }

        if(isEmpty(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Please enter retail of the product");
            elementHandle[17].focus();
            return false;
        }

        else if(!$.isNumeric(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Error in retail value, numbers only please ");
            elementHandle[17].focus();            
            return false;
            }

        
        if(value_retail < retail) {
          elementHandle[17].addClass("error");
            errorStatusHandle.html("Retail prce should be 25% more than the cost price");
            elementHandle[17].focus();
            return false; 
        }

        if(isEmpty(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("Please enter quantity of the product");
            elementHandle[18].focus();
            return false;
        }
        
        $('input[name="eproduct_image"]').on('change',function(e) {
        size = this.files[0].size;
        });

        if(elementHandle[19].val() == "") {
               elementHandle[19].addClass("error");
               errorStatusHandle.text("Please select a file");  
               elementHandle[19].focus();
               return false;
            }

        else if(size/1000 > 3000) {
                elementHandle[19].addClass("error");
                errorStatusHandle.text("File cannot exceed 3MB");  
                elementHandle[19].focus();
                return false;

            }
        
        return true;
}

        elementHandle[10].on('keyup', function() {
        elementHandle[10].val(elementHandle[10].val().toUpperCase());
        });

//////////////////// submit button //////////////////////////////


        $("#editinvent").on('click', function(e) {
  
      $('*').removeClass("error");  
        errorStatusHandle.html("");
      if(isValidData()){

        e.preventDefault();
        esend_file();
        }  

      else {
            e.preventDefault();
            return;     
    }   

    function esend_file() {

 ///////////////////////Image Upload/////////////////////////////////     
      
  var form_data = new FormData($('form')[0]);
  var edit_imgname = $("#eproduct_image").val().toLowerCase();
  form_data.append("product_image", document.getElementById("eproduct_image").files[0]);
  edit_imgname = edit_imgname.replace(/^.*[\\\/]/, '');
  var toDisplay = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/" + edit_imgname + "\" />";
  //alert(edit_imgname);
        
        $.ajax({
          url: "/perl/jadrn030/sessions_cookies/edit_upload.cgi",
          type: "post",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(response) {
          var edit_imgname = $("#eproduct_image").val().toLowerCase();
          edit_imgname = edit_imgname.replace(/^.*[\\\/]/, '');
          //alert(edit_imgname);
          
          var param = "sku="+$("#esku").val()+
          "&vendor="+$("#evendor").val()+
          "&category="+$("#ecategory").val()+
          "&mid="+$("#emid").val()+
          "&description="+$("#edescription").val()+
          "&features="+$("#efeatures").val()+
          "&cost="+$("#ecost").val()+
          "&retail="+$("#eretail").val()+"&qty="+$("#eqty").val();
          //"&product_image="+edit_imgname;
          //alert(param);
          //$('#epic').html(toDisplay);
          $.post("/perl/jadrn030/sessions_cookies/add.cgi", param, edit_data);
        }, //success
         
    error: function(response) {
          $('#error_form').html("Sorry, an upload error occurred! Please try again.");
          $("#error_form").addClass("error");
          $("#error_form").focus();
        } //error
      });   //ajax

    } //function end

    function edit_data(response) {
    //alert("inside edit_data function");
    var ans = $.trim(response);
    if(ans === 'SUCCESS')
    {
      //alert('success');
      var msg = "SKU " + $("#sku").val() + " :  Record updated successfully!";
      $('#editerror_form').text(msg);
      $("#ecategory").val("0");
      $("#evendor").val("0");
      $("#emid").val("");
      $("#edescription").val("");
      $("#efeatures").val("");
      $("#ecost").val("");
      $("#eretail").val("");
      $("#eqty").val("");
      $("#eproduct_image").val("");
      $('#esku').prop('disabled',false);
      $('#esku').val("");
      $('#esku').focus();
    } // else

    else

    {

      $('#editerror_form').text("Record Insertion Failed");
    alert(response);
  }  //else end
}  //function end

  }); //submit end


$(':reset').on('click', function() {
      errorStatusHandle.html("");
        $('*').removeClass("error");
    });

});


////////////////////////////////////////////////////////////////////////////////


////////////// sku available check //////////////////////////////////

$(document).ready(function() {  
    
    $('#esku').on('blur', function() {
        var sku = $('#esku').val();
        if(!sku) return;
        var url = "/perl/jadrn030/sessions_cookies/check_dup.cgi?sku="+sku;
        $.get(url, e_process_reply);
    });
    
    $('#esku').on('focus', function() {
        $('#estatus').text("");
    });
    
    $('#esku').on('focus', function() {
        var sku = $('#esku').val("");    
    });
  });
  setTimeout(e_clearStatus, 2000);
    
  
function e_process_reply(response) {
    
    if(response == "OK") 
        $('#editerror_form').text("This SKU does not exist");   
    else if(response == "DUPLICATE") 
    {
        var sku = $("#esku").val();
        //alert(sku);
         
        
        $('#editinvent').prop('disabled',false);
        $('#esku').prop('disabled',true);

        var sku = $("#esku").val();
        edit_fetchData(sku);
        //alert("sku exists");
        }
    }

function edit_fetchData(sku) {
 $.ajax({
    type: 'POST',
    url: '/perl/jadrn030/sessions_cookies/fetchdata.cgi ',
    data: {'sku': sku},
    success: function(respons) {
        $('#editerror_form').html("Record Found");
        respons=respons.split("=");
        // var img_src = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/"+respons[9]+"\"/>"; 
        // alert(img_src);

        document.getElementById('ecategory').value =  parseInt(respons[1]);
        document.getElementById('evendor').value =  parseInt(respons[2]);
        document.getElementById('emid').value =  respons[3];
        document.getElementById('edescription').value =  respons[4];
        document.getElementById('efeatures').value =  respons[5];
        document.getElementById('ecost').value =  parseFloat(respons[6]);
        document.getElementById('eretail').value =  parseFloat(respons[7]);
        document.getElementById('eqty').value =  parseFloat(respons[8]);
        document.getElementById('eproduct_image').value = respons[9];
        document.getElementById('epic').innerHTML = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/"+respons[9]+"\"  />";
    },
    error: function(respons) {
        $('#editerror_form').html("Sorry, an error occurred");
    }
});
}
    
function e_clearStatus() {    
    $('#estatus').fadeOut(1000);
    }


//////////////////////////////////////////////////////////////////////
