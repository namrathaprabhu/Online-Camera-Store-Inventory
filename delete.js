

function isSkuFormat(name){
        var format = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return format.test(name);
    }

$(document).ready(function() {
    $("#tabs").tabs(); 
    $("#derror_form").css('color','red');
    //$("#dstatus").css('color','red');
    $("#dsku").focus();

  });

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

$(document).ready( function() {
    var errorStatusHandle = $('[name="derror_form"]');
    var elementHandle = new Array(10);
    elementHandle[20] = $('[name="dsku"]');
    elementHandle[20].focus();

    function isValidData() {
        if(isEmpty(elementHandle[20].val())) {
            elementHandle[20].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product");
            elementHandle[20].focus();
            return false;
            }

        else if(!isSkuFormat(elementHandle[20].val())) {
            elementHandle[20].addClass("error");
            errorStatusHandle.text("Please enter SKU with proper format");
            elementHandle[20].focus();
            return false;	
        }

        return true;
        }

        elementHandle[20].on('keyup', function() {
        elementHandle[20].val(elementHandle[20].val().toUpperCase());
        });

        $("#delinvent").on('click', function(e) {
  
        $('*').removeClass("error");    
        errorStatusHandle.html("");
        if(isValidData()){
            
            del_data();    
        }  //if 
        else {

        e.preventDefault();
        return; 
    
    }// else
        
    function del_data() {
        var sku = document.getElementById('dsku').value;
        //var image = $("#dproduct_image").val();
        var message = "";
        $.ajax({
            type: 'POST',
            url: '/perl/jadrn030/sessions_cookies/delete.cgi',
            data: {'sku': sku
            // 'image': image
            },
            success: function(respons) {
                //alert(res);
     //            alert("deleted");
                $('#derror_form').text("Data deleted successfully");
            }, // success
            error: function(respons) {
                //alert("unable to delete record");
     //            alert(res);
                alert("Record has been deleted")
                $('#derror_form').text("Unable to delete the record");
            }  // error
            });  // ajax

            } //del_data
        });  // submit


    $(':reset').on('click', function() {
        errorStatusHandle.html("");
        $('*').removeClass("error");
    });
    
});

////////////////////////////////////////////////////////////////////////////////

////////////// sku duplicate check //////////////////////

$(document).ready(function() {  
    
    $('#dsku').on('blur', function() {
        var sku = $('#dsku').val();
        if(!sku) return;
        var url = "/perl/jadrn030/sessions_cookies/check_dup.cgi?sku="+sku;
        $.get(url, d_process_reply);
    });
    
    $('#dsku').on('focus', function() {
        $('#dstatus').text("");
    });
    
    $('#dsku').on('focus', function() {
        var sku = $('#dsku').val("");    
    });
  });
  setTimeout(d_clearStatus, 2000);

  function d_clearStatus() {    
    $('#dstatus').fadeOut(1000);
    }
    
  
function d_process_reply(response) {
    
    if(response == "OK") 
        $('#derror_form').text("This SKU does not exist");   
    else if(response == "DUPLICATE") 
    {
        var sku = $("#dsku").val();
        
        $('#dsku').prop('disabled',true);
        del_fetchData(sku);
        
        }
    }

    function del_fetchData(sku) {
    
    $.ajax({
    type: 'POST',
    url: '/perl/jadrn030/sessions_cookies/fetchdata.cgi ',
    data: {'sku': sku},
    success: function(res) {
        $('#dstatus').html("Record Found");
        res=res.split("=");
        // var img_src = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/"+res[9]+"\"/>"; 
        // alert(img_src);
        document.getElementById('dcategory').value =  parseInt(res[1]);document.getElementById('dvendor').value =  parseInt(res[2]);
        document.getElementById('dmid').value =  res[3]; document.getElementById('ddescription').value =  res[4]; document.getElementById('dfeatures').value =  res[5];
        document.getElementById('dcost').value =  parseFloat(res[6]); document.getElementById('dretail').value =  parseFloat(res[7]);
        document.getElementById('dqty').value =  parseFloat(res[8]); document.getElementById('dproduct_image').value = res[9];
        //document.getElementById('dpic').innerHTML = "<img src=\"http://jadran.sdsu.edu/~jadrn030/abccba/"+res[9]+"\"  />";
    },
    error: function(res) {
        $('#derror_form').html("Sorry, an error occurred");
    }
});
}
    




//////////////////////////////////////////////////////////////////////