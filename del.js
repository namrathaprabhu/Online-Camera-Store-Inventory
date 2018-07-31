
$(document).ready(function() {
    $("#tabs").tabs(); 
    $("#derror_form").css('color','red');
    //$("#dstatus").css('color','red');
    $("#dsku").focus();

  });

function isSkuFormat(name){
        var format = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return format.test(name);
    }

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

$(document).ready( function() {
    var errorStatusHandle = $('[name="derror_form"]');
    var elementHandle = new Array(10);
    elementHandle[20] = $('[name="dsku"]');
    elementHandle[20].focus();

    $('[name="delinvent"]').on('click', function(e) {
  
    	$('*').removeClass("error");	
        errorStatusHandle.html("");
	    if(!isValidData()){
	    	e.preventDefault();
        	return;    
        }   
	   	else {
	   		var sku = document.getElementById('dsku').value;
        var image = $("#dproduct_image").val();
            alert(sku);
	   	    alert(image);
   	   	    $.ajax({
            type: "post",
            url: '/perl/jadrn030/sessions_cookies/delete.cgi',
            data: {'sku': sku,
            'image': image},
            success: function(res) {
            	//alert(res);
                //alert("deleted");
                $('#dstatus').html("Data deleted successfully");
            },
            error: function(res) {
            	alert("unable to delete record");
                //alert(res);
                $('#dstatus').html("Unable to delete the record");
            }

        });
	   	}
});

    $(':reset').on('click', function() {
    	errorStatusHandle.html("");
       	$('*').removeClass("error");
    });


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
    
});


$(document).ready(function() {  
    
    $('#dsku').on('blur', function() {
        var sku = $('#dsku').val();
        alert(sku);
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


//fn to check for duplicate
function d_process_reply(response){
    //$('#busy_wait_del').css('visibility','hidden');
    if(response.startsWith("duplicate")) {
        $('#derror_form').text(" sku present");
        $('#delinvent').prop('disabled',false);
        var sku = $("#dsku").val();
        getAllData(sku);
    }
    
    else if(response.startsWith("ok")) {
        $('#status_del').text("No SKU exist");
        $('#submit_button_del').prop('disabled',true);
        
    }
}

function getAllData(sku) {
 $.ajax({
    type: 'POST',
    url: '/perl/jadrn030/sessions_cookies/fetchdata.cgi ',
    data: {'sku': sku},
    success: function(res) {
        $('#dstatus').html("Record Found");
        res=res.split("=");

        //alert(res);
        document.getElementById('dcategory').innerHTML =  "Category: "+res[1];
        document.getElementById('dvendor').innerHTML =  "Vendor: "+res[2];
        document.getElementById('dmid').innerHTML =  "Manufacturer's Identifier: "+res[3];
        document.getElementById('ddescription').innerHTML =  "Description: "+res[4];
        document.getElementById('dfeatures').innerHTML =  "Features: "+res[5];
        document.getElementById('dcost').innerHTML =  "Cost: "+res[6];
        document.getElementById('dretail').innerHTML =  "Retail: "+res[7];
        document.getElementById('dqty').innerHTML =  "qty: "+res[8];
        document.getElementById('dproduct_image').innerHTML = res[9];
        document.getElementById('dpic').innerHTML = "<img src=\"http://jadran.sdsu.edu/~jadrn004/proj1/_uploadDIR_/"+res[9]+"\"  />";
    },
    error: function(res) {
        $('#status_delete').html("Sorry, an error occurred");
    }
});
}


