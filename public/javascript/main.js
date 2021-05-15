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

/*========PAGINATION JAVASCRIPT ===========*/
function pagedisplay(n) {
    var x = document.querySelectorAll("#a1");
    var y = document.querySelectorAll("#a2");
    var t = document.querySelectorAll(".page-item");

      if(n == 1) {
          for(var i = 0; i<10;i++){
              x[i].style.display = "block";
              y[i].style.display = "none";                              
          }
          
      }
      else if(n == 2) {
          for(var i = 0; i<10;i++){
              x[i].style.display = "none";
              y[i].style.display = "block";
              
          }

      }
    
  }