/*========SIGNUP JAVASCRIPT ===========*/

var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

/*========CALENDER JAVASCRIPT ===========*/

n =  new Date();
d = n.getDate();                                               
var element = document.getElementById(d);
element.className += "btn-primary";

/*========UPDATE AVATAR JAVASCRIPT ===========*/
var f_name=document.getElementById("customFile");
document.getElementById("customFile").addEventListener("change",()=>{
    f_name=f_name.value;
    f_name=f_name.replace(/C:\\fakepath\\/i, '');
    document.getElementById("custom-file-label").innerHTML=f_name;
})
