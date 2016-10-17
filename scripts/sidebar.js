//SIDEBAR
//can add category to change the title
function updateSidebarContainers(amount) {
  var count = 0;
  if( amount < 10 ){
    count = amount;
  }else{
    count = 10;
  }

  var sidebar = "<div id="testSidebar" style="opacity:0;" class="panel-group" role="tablist" aria-multiselectable="true"><h2 style="text-align:center;color:whitesmoke;">Top Ten News</h2>";
  var i = 0;
  while (i < count) {
    sidebar +=
   "<div class=\"panel panel-default\"><div class=\"panel-heading\" id=\"heading"+i.toString()+"\" role=\"tab\" value=\""+i.toString()+"\">
        <h4 class=\"panel-title\">
          <a id=\"news"+i.toString()+"title\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#testSidebar\" href=\"#collapse"+i.toString()+"\" aria-expanded=\"false\" aria-controls=\"collapse"+i.toString()+"\" style=\"text-decoration:none\"></a>
        </h4> 
      </div>
      <div id=\"collapse"+i.toString()+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading"+i.toString()+"\">
        <div class=\"panel-body\" id=\"news0abstract\"></div>
      </div>
    </div>";
    i++;
  }
  sidebar += "</div>"
}
