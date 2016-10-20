//SIDEBAR
//can add category to change the title
function updateSidebarContainers(amount, category_name) {
  $('#newsContainer').empty(); // remove all previous results  
  var count = 0;
  if( amount < 10 ){
    count = amount;
  }else{
    count = 10;
  }
  var sidebar = "<div id=\"testSidebar\" style=\"opacity:0;\" class=\"panel-group\" role=\"tablist\" aria-multiselectable=\"true\">" +
                  "<div id=\"testSidebar-title\">" +
                    "<div style=\"display:inline-block;width:100%;text-align:center\"><h2 style=\"color:whitesmoke;padding-bottom:10px;\"><span style=\"color:darkgray;font-size:25px;margin: 0 15px 0 -30px\"class=\"glyphicon " + category_icons[category_name] + " bigger\" aria-hidden=\"true\"></span>Top Stories</h2></div>" +
                  "</div>";
  var i = 0;
  while (i < count) {
    sidebar +=
    "<div class=\"panel panel-default\">" + 
      "<div class=\"panel-heading\" id=\"heading"+i.toString()+"\" role=\"tab\" value=\""+i.toString()+"\">" + 
        "<h4 class=\"panel-title\"><a id=\"news"+i.toString()+"title\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#testSidebar\" href=\"#collapse"+i.toString()+"\" aria-expanded=\"false\" aria-controls=\"collapse"+i.toString()+"\" style=\"text-decoration:none\"></a></h4>" + 
      "</div>" +
      "<div id=\"collapse"+i.toString()+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading"+i.toString()+"\">" + 
        "<div class=\"panel-body\" id=\"news"+i.toString()+"abstract\"></div>" + 
      "</div>" + 
    "</div>";
    i++;
  }
  sidebar += "</div>";

  $('#newsContainer').append(sidebar); // add raw html to the newsContainer
  //$('#newsContainer').html(sidebar); // add raw html to the newsContainer
  $( function() {
    $('.panel-heading').click( function() {
        setTimeout(function() {
            try {
                /* try to get category name if that was what was clicked */
                var newVal = parseInt(Cookies.get(category_name))+ 1;
                Cookies.expire(category_name);
                console.log("cookie value: "  + newVal);
                Cookies.set(category_name, newVal);
            } catch (e) {
                /* else ignore cookies */
            }
            selected = $('.active');
            selected_index = selected.attr('value');
            console.log("selected number: " + selected_index);
            var heading = Cesium.Math.toRadians(0);
            var pitch = Cesium.Math.toRadians(-30);
            var range = 10000000; // 10000km
            viewer.zoomTo(pin[selected_index], new Cesium.HeadingPitchRange(heading, pitch, range));
            viewer.selectedEntity = undefined;
        }, 50);
    });
  });

  $(document).ready(function() {
    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
    });

    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
        selected_index = undefined;
        $('.twitter').hide();
        $('.youtube').hide();
    });

    /* function to link "read more" icon in news list to pop articles and highlight pins */
    $('#testSidebar').click(function () {
        console.log("testSidebar got clicked!");
        $('.twitter').hide();
        $('.youtube').hide();

        viewer.selectedEntity = pin[selected_index];
        //console.log("article selected is " + selected_index);
    });
  });
}
