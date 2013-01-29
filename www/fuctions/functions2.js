//ONLY ADD TO AIRCRAFT WITH CHECKLISTE
//////////////////////////////////////////////////////////////////////////////////
// check checklist all done
//
window.onload = function()
{
	document.getElementById("a_next").onclick = function(e)
    {
        e = e || window.event;
        var els = document.getElementsByTagName("input"),
        i;
        for (i=0; i < els.length; i++)
        {
            if (!els[i].checked)
            {
                showAlertChecklist();
                return false;
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////
