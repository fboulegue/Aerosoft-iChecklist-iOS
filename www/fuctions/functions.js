//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//
//aerosoft ichecklist 
//1.0
//
//////////////////////////////////MAIN FUNCTIONS//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// wait for load finish
//
	document.addEventListener("deviceready", onDeviceReady, false);
//////////////////////////////////////////////////////////////////////////////////
// device ready
//
function onDeviceReady()
{
        
		// Empty
}
//////////////////////////////////////////////////////////////////////////////////
// alert dialog dismissed
//
	function alertDismissed()
{
		// do something
}
//////////////////////////////////////////////////////////////////////////////////
// show a custom alert for checklist
//
function showAlertChecklist()
{
    navigator.notification.alert
    (
        'Bitte Checkliste überprüfen, alle Punkte müssen gechecked sein.',  // message
        alertDismissed,         // callback
        'Achtung!',            // title
        'OK'                  // buttonName
    )
    console.log('show_message_checklist + vibrate ');
    navigator.notification.vibrate(2500);

}
//////////////////////////////////////////////////////////////////////////////////
// show a custom alert for comingsoon
//
function showAlertCommingSoon()
{
    navigator.notification.alert
    (
        'Weitere Flugzeugen werden bald erscheinen',  // message
        alertDismissed,         // callback
        'Coming soon...',            // title
        'OK'                  // buttonName
     
     )
    console.log('show_message_soon');
}
//////////////////////////////////////////////////////////////////////////////////
// reset the checklist
//
function resetChecklist()
{
    window.location.reload()
    console.log('click_resetchecklist');
}
//////////////////////////////////////////////////////////////////////////////////
//internet connection check
//
function checkInternet()
{
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
        window.location = "fuctions_pages/offline_news.html";
        console.log('no_internet_connection_called');
    }
}
//internet connection check from aircraft
//
function checkInternetFromAircraft()
{
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
        window.location = "../../fuctions_pages/offline_news.html";
        console.log('no_internet_connection_called');
    }
}
//////////////////////////////////////////////////////////////////////////////////
//open aerosoft.de if offline show alert
//
function openAerosoftDE()
{
    var ref = window.open('http://aerosoft.de', '_blank', 'location=no');
    console.log('click_openAerosoftDE_succes');
}
//////////////////////////////////////////////////////////////////////////////////
//open news iframeaerosoft.de
//
function openAerosoftNews()
{
    var ref = window.open('http://fboulegue.pf-control.de/aerosoftapp/', '_blank', 'location=no');
    console.log('openNewsAerosoft');
}
//////////////////////////////////////////////////////////////////////////////////
//open addpage if offline show alert
//
function openaddPage()
{
    var ref = window.open('http://fboulegue.pf-control.de/aerosoftapp/add.html', '_blank', 'location=no');
    console.log('openAddsAerosoft');

}
//////////////////////////////////////////////////////////////////////////////////
//load news aerosoft.de
//
/**
 *
 * @param elementAppend (das DOM-Element, in welchem die News ausgegeben werden soll
 * @return gibt die News zurueck
 */
function loadNews(elementIdToAppend) {
    var urlNews = 'http://news.aerosoft.com/list_news.php?cat=fs&lang=de';
    jQuery.ajax({
        url: 'http://fboulegue.pf-control.de/aerosoftapp/ajax.getNews.php', //Bitte die richtige URL angeben
        data: {url: urlNews},
        type:'POST',
        success: function(responseHTML){
            /* Wenn News erfolgreich abgerufen */
            if(responseHTML != '0') {
                jQuery('body').append('<div id="hidden-news-html" style="display:none;">'+responseHTML+'</div>');
                // Das Loader Icon langsam einblenden
                jQuery('#ajax-loader-news').fadeOut('fast', function(){
                    // Wenn Einblendevorgang beendet, den Newsquellcode versteckt dem document anhängen
                    jQuery('body').find('#'+elementIdToAppend).append(responseHTML);
                    // dem UL die News (welche in der Funktion generateNews() zusammengestellt werden) anhängen
                    jQuery('#content').append(generateNews());
                    // danach langsam einblenden
                    jQuery('ul.pageitem').fadeIn('slow', function() {
                        // den versteckten Quellcode, welcher als Hilfe zuvor benötigt wurde, wieder entfernen
                        jQuery('#hidden-news-html').remove();
                    });
                });
            }
            else {
                /* Bei Fehler den Fade ausblenden und auf Seite eiterleiten */
                jQuery('#ajax-loader-news').fadeOut('slow',function() {
                    window.location = 'offline_news.html';
                });
            }
        },
        beforeSend: function() {
            jQuery('#ajax-loader-news').fadeIn('fast');
        }
    })
}
/**
 * Function: Generiert die Newsliste
 * @return {String} -> generierte HTML UL Liste
 */
function generateNews() {
    jQuery('ul.pageitem').fadeOut('fast', function() {
        jQuery(this).remove();
    });
    var contentHTML = '<ul class="pageitem" style="display:none">';
    jQuery('#hidden-news-html').find('table.text_end_small').each(function() {
        var headline = jQuery(this).find('.Stil12').text();
        var content = jQuery(this).find('.text_body p').text();
        var image = jQuery(this).find('.navlink img').attr('src');
        var linkText = jQuery(this).find('.text_bodyred a.navlinkred:first').text();
        var linkUrl = jQuery(this).find('.text_bodyred a.navlinkred:first').attr('href');
        linkUrl = '"'+linkUrl+'"';
                                                                  
        contentHTML += '<li class="textbox">';
        contentHTML += '<span class="header">'+headline+'</span>';
        contentHTML += '<p>';
        contentHTML += '<img align="left" src="'+image+'">';
        contentHTML += content;
        contentHTML += '</p>';
        contentHTML += '<br>';
        contentHTML += '<a href="#" onClick="openAerosoftNews();" style="color:red; font-weight:bold; text-decoration:none;">[Zur Link Liste]</a>';
        contentHTML += '<div style="float:right;">';
        contentHTML += '<a href="#" style="color:red; font-weight:bold; text-decoration:none;">[Nach oben]</a>';                                                          
        contentHTML += '<br><br>';
        contentHTML += '</li>';
    });
    contentHTML += '</ul>';

    return contentHTML;
}



//////////////////////////////////////////////////////////////////////////////////
//check first run
//
function checkFirstRun()
{
    if(window.localStorage.getItem('run')==null)
    {
        window.localStorage.setItem('run','1');
        console.log('FirstRun_FIRSTRUN');
        //alert("First start");
    }
        else if(window.localStorage.getItem('run')==25) //ANZAHL DER STARTS BIS WERBUNG KOMMT
    {
        window.localStorage.setItem('run','1');
        window.location = "fuctions_pages/add.html";
        console.log('FirstRun_25RUN');
        //alert(window.localStorage.getItem('run'));
    }
        else
            {
                var run = window.localStorage.getItem('run');
                var irun;
                irun = (parseInt(run) + 1);
                window.localStorage.setItem('run',irun.toString());
                window.location = "index_aerosoft.html";
                console.log('FirstRun_NOTFIRSTRUN');
                //alert(window.localStorage.getItem('run'));
            }
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////MAIN FUNCTIONS//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////AIRPLANES/////////////////////////////////////
//make checked <li> item green after checked -> uncheck red and remove checkmark
function checkChanges() {
    var $this = $(this);
    
    if (!$this.parent().hasClass("checked")) {
        $this.attr("checked", "checked");
        $this.parent().find("font").attr("color", "green");
        $this.parent().addClass("checked");
    } else {
        $this.parent().removeClass("checked");
        $this.parent().find("font").attr("color", "red");
        $this.removeAttr("checked");
        console.log('li-red');
    }
}
//!!!!SET FOR STANDARD
//<script>
//need for function.js
//make checked <li> item green after checked -> uncheck red and remove checkmark
//
//$(document).ready(function() {
//                  activateStateToggle();
//                  });
//</script>
//!!!!!AT PAGE HEAD
function activateStateToggle() {
    $(".radiobutton").bind("click", function () {
                           var $this = $(this);
                           if (!$this.hasClass("checked")) {
                           $this.find("input").attr("checked", "checked");
                           $this.find("font").attr("color", "green");
                           $this.addClass("checked");
                           console.log('li-green');
                           } else {
                           $this.removeClass("checked");
                           $this.find("font").attr("color", "red");
                           $this.find("input").removeAttr("checked");
                           console.log('li-red');
                           }
                           });
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////KATANA//////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//open buy katana check internet connection first
//
function openBuyKatanaCheckConnection()
{
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE)
    {
        window.location = "../../fuctions_pages/offline_checklist_katana.html";
        console.log('buy-katana-offline');
    }
	else
	{
		var ref = window.open('http://en.shop.aerosoft.com/eshop.php?action=article_detail&s_supplier_aid=11388', '_blank', 'location=no');
        console.log('buykatana');
	}
}
//////////////////////////////////////////////////////////////////////////////////
//open video katana check internet connection first
//
function openVideoKatanaCheckConnection()
{
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE)
    {
        window.location = "../../fuctions_pages/offline_checklist_katana.html";
        console.log('videokatana-offline');
    }
	else
	{
		var ref = window.open('http://www.youtube.com/embed/Mnpbroh3rjU', '_blank', 'location=no');
        console.log('videokatana');
	}
}
//////////////////////////////////////////////////////////////////////////////////
//open PDF katana check internet connection first
//
function openPDFKatanaCheckConnection()
{
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE)
    {
        window.location = "../../fuctions_pages/offline_checklist_katana.html";
        console.log('pdfkatana-offline');
    }
	else
	{
		var ref = window.open('http://http://www.aerosoft2.de/downloads/katana4x/DA20-100-Katana-Engl.pdf', '_blank', 'location=no');
        console.log('pdfkatana');
	}
}
//////////////////KATANA//////////////////
////////////////////////////////////AIRPLANES/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////fabian.boulegue (cc)////////////////////////////