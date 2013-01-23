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
	function onDeviceReady() {
		// Empty
	}
//////////////////////////////////////////////////////////////////////////////////
// alert dialog dismissed
//
	function alertDismissed() {
		// do something
	}
//////////////////////////////////////////////////////////////////////////////////
// show a custom alert for checklist
//
	function showAlertChecklist() {
		navigator.notification.alert(
			'Bitte Checkliste überprüfen',  // message
			alertDismissed,         // callback
			'Achtung!',            // title
			'OK'                  // buttonName
            )
        };
//////////////////////////////////////////////////////////////////////////////////
// show a custom alert for comingsoon
//
function showAlertCommingSoon() {
    navigator.notification.alert(
                                 'Weitere Flugzeugen werden bald erscheinen',  // message
                                 alertDismissed,         // callback
                                 'Coming soon...',            // title
                                 'OK'                  // buttonName
                                 )
};
//////////////////////////////////////////////////////////////////////////////////
// check checklist all done
//
window.onload = function() {
	document.getElementById("a_next").onclick = function(e) {
	e = e || window.event;
	var els = document.getElementsByTagName("input"),
	i;
	for (i=0; i < els.length; i++) {
		if (!els[i].checked) {
			showAlertChecklist();
			return false;
            };
        };
    };
};
//////////////////////////////////////////////////////////////////////////////////
// reset the checklist
//
function resetChecklist(){
    window.location.reload()
};
//////////////////////////////////////////////////////////////////////////////////
//internet connection check
//
function checkInternet() {
    var networkState = navigator.connection.type;
    
    if (networkState == Connection.NONE){
        window.location = "offline_news.html";
    };
};
//////////////////////////////////////////////////////////////////////////////////
//open aerosoft.de
//
function openAerosoftDE() {
    var ref = window.open('http://aerosoft.de', '_blank', 'location=no');
    // close InAppBrowser after 5 seconds
    setTimeout(function() {
               ref.close();
               }, 500000);
};
//////////////////////////////////////////////////////////////////////////////////
//open news iframeaerosoft.de
//
function openAerosoftNews() {
    var ref = window.open('http://fboulegue.pf-control.de/aerosoftapp/', '_blank', 'location=no');
    // close InAppBrowser after 5 seconds
    setTimeout(function() {
               ref.close();
               }, 500000);
};
//////////////////////////////////////////////////////////////////////////////////
//load news aerosoft.de
//
/**
 *
 * @param elementAppend (das DOM-Element, in welchem die News ausgegeben werden soll
 * @return gibt die News zurueck
 */
function loadNews(elementIdToAppend) {
    var url = 'http://news.aerosoft.com/list_news.php?cat=fs&lang=de';

    jQuery.ajax({
        url: 'http://fboulegue.pf-control.de/aerosoftapp/ajax.getNews.php', //Bitte die richtige URL angeben
        data: {url: url},
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
                        setNewsLinks();
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


jQuery(document).ready(function() {
    loadNews('aeorosoft-news');                  //DAS IST FUNKTION
});
//////////////////////////////////////////////////////////////////////////////////
//check first run
//

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////MAIN FUNCTIONS//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////AIRPLANES/////////////////////////////////////
//////////////////KATANA//////////////////
//
//
//open buy katana
//
function openbuyKatana() {
    var ref = window.open('http://en.shop.aerosoft.com/eshop.php?action=article_detail&s_supplier_aid=11388', '_blank', 'location=no');
    // close InAppBrowser after 5 seconds
    setTimeout(function() {
               ref.close();
               }, 500000);
}
//////////////////////////////////////////////////////////////////////////////////
//open video katana
//
function openvideoKatana() {
    var ref = window.open('http://www.youtube.com/embed/Mnpbroh3rjU', '_blank', 'location=no');
    // close InAppBrowser after 5 seconds
    setTimeout(function() {
               ref.close();
               }, 500000);
};
//////////////////////////////////////////////////////////////////////////////////
//open aerosoft.de katana
//
function openpdfKatana() {
    var ref = window.open('http://http://www.aerosoft2.de/downloads/katana4x/DA20-100-Katana-Engl.pdf', '_blank', 'location=no');
    // close InAppBrowser after 5 seconds
    setTimeout(function() {
               ref.close();
               }, 500000);
};
//////////////////KATANA//////////////////
////////////////////////////////////AIRPLANES/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////fabian.boulegue (cc)////////////////////////////