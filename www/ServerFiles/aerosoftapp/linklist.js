//load news aerosoft.de
//
/**
 *
 * @param elementAppend (das DOM-Element, in welchem die News ausgegeben werden soll
 * @return gibt die News zurueck
 */
function generateNewsList(elementIdToAppend) {
    var url = 'http://news.aerosoft.com/list_news.php?cat=fs&lang=de';

    jQuery.ajax({
        url: 'http://fboulegue.pf-control.de/aerosoftapp/ajax.getNews.php', //Bitte die richtige URL angeben
        data: {url: url},
        success: function(responseHTML){
            //alert("test");
            /* Wenn News erfolgreich abgerufen */
            if(responseHTML != '0') {
                jQuery('body').append('<div id="hidden-news-html" style="display:none;">'+responseHTML+'</div>');
                // Das Loader Icon langsam einblenden
                jQuery('#ajax-loader-news').fadeOut('fast', function(){
                    // Wenn Einblendevorgang beendet, den Newsquellcode versteckt dem document anhängen
                    //jQuery('body').find('#'+elementIdToAppend).append(responseHTML);
                    // dem UL die News (welche in der Funktion generateNews() zusammengestellt werden) anhängen
                    jQuery('#content').append(generateHTMLList());
                    // danach langsam einblenden
                    jQuery('#news-list-view').fadeIn('slow', function() {
                        //setNewsLinks();
                        // den versteckten Quellcode, welcher als Hilfe zuvor benötigt wurde, wieder entfernen
                       //jQuery('#hidden-news-html').remove();
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
function generateHTMLList() {
    jQuery('#news-list-view').fadeOut('fast', function() {
        jQuery(this).remove();
    });
    var contentHTML = '<div id="news-list-view">';
    jQuery('#hidden-news-html').find('table.text_end_small').each(function() {
        var headline = jQuery(this).find('.Stil12').text();
		//var content = jQuery(this).find('.text_body p').text();
        var image = jQuery(this).find('.navlink img').attr('src');
		//var linkItems = new Array();
		contentHTML += '<span class="graytitle">'+headline+'</span>';
		contentHTML += '<ul class="pageitem" style="display:block">';
		
		jQuery(this).find('.text_bodyred a.navlinkred').each(function(index, elem){
			//linkItems[index]['title'] = jQuery(this).text();	
			//linkItems[index]['url'] = jQuery(this).attr('href');
			var title = jQuery(this).text();	
			var url = jQuery(this).attr('href');
                        if(url.length >= 8) {
                            contentHTML += '<li class="store">';
                            contentHTML += '<a href="'+url+'">';
                            contentHTML += '<span class="image" style="background-image: url('+image+')"></span>';
                            contentHTML += '<span class="name">'+title+'</span>';
                            contentHTML += '<span class="arrow"></span>';
                            contentHTML += '</a>';
                            contentHTML += '</li>';	    
                        }
			
		});
        
		contentHTML += '</ul>';                                                        

    });
    contentHTML += '</div>';
    return contentHTML;
}


jQuery(document).ready(function() {
    generateNewsList('aeorosoft-news-list');                  //DAS IST FUNKTION
});   //DAS IST FUNKTIONTION