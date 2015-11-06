/*------------------------------------------------------------------------------

Objet XHR

-------------------------------------------------------------------------------*/

// Initialisation de lobjet XHR
function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		console.log("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}

// Promise GET
function xhrGet(url){
    
    var promise = new Promise(function(resolve, reject){
        
        var xhr = getXMLHttpRequest();

        xhr.onreadystatechange = function(){

            if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)){

                var data = JSON.parse(xhr.responseText);
            
                return resolve(data);

            }

        };

        xhr.open("GET", url, true);
        xhr.send(null);
        
    });
                              
    return promise;
    
}