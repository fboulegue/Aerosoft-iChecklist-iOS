/**
 *
 * @param elementAppend (das DOM-Element, in welchem die News ausgegeben werden soll
 * @return gibt die News zurueck
 */
function loadNews(elementIdToAppend) {
    var url = 'http://news.aerosoft.com/list_news.php?cat=fs&lang=de';

    jQuery.ajax({
        url: 'ajax.getNews.php', //Bitte die richtige URL angeben
        data: {url: url},
        success: function(responseHTML){
            /* Wenn News erfolgreich abgerufen */
            if(responseHTML != '0') {
                jQuery('body').append('<div id="hidden-news-html" style="display:none;">'+responseHTML+'</div>');
                // Das Loader Icon langsam einblenden
                jQuery('#ajax-loader-news').fadeOut('slow', function(){
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
        contentHTML += '<li class="textbox">';
        contentHTML += '<span class="header">'+headline+'</span>';
        contentHTML += '<p>';
        contentHTML += '<img align="left" src="'+image+'">';
        contentHTML += content;
        contentHTML += '</p>';
        contentHTML += '<br><br>';
        contentHTML += '</li>';
    });
    contentHTML += '</ul>';

    return contentHTML;
}


jQuery(document).ready(function() {
    loadNews('aeorosoft-news');
});