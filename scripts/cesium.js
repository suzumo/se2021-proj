/**
 * Created by Jiyong on 17-Oct-16.
 */
/* function to determine position of mouse when it is called */
function mouse_position() {
    var e = window.event;
    posX = e.clientX;
    posY = e.clientY;
    console.log("mouse position x:" + posX + " y:" + posY);
};

/* standard function to determine the identity of topmost entity when called */
function pickEntity(viewer, windowPosition) {
    var picked = viewer.scene.pick(windowPosition);
    var id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
        return id;
    }
    return undefined;
};

/* upon clicking cesium container, determines the identity of the topmost entity */
$('#cesiumContainer').click( function() {

    /* get mouse pointer position */
    console.log("cesium got clicked!");
    mouse_position();

    setTimeout(function() {
        /* deactivate news panel regardless of what is active */
        var deactivate = $('.active');
        console.log("to deactivate " + deactivate.attr('value'));
        deactivate.siblings('.panel-collapse').removeClass('in');
        deactivate.removeClass('active');
        $('.twitter-btn').hide();
        $('.twitter').hide();

        /* find out what pin is selected and activate corresponding sidepanel's news article */
        selected_pin = pickEntity(viewer, new Cesium.Cartesian2(posX, posY));
        if (selected_pin == undefined) {
            console.log(" --ignoring: no pin was selected");
        } else {
            var index = selected_pin._id;
            selected_index = index;
            var activate = $($('#testSidebar').children()[index+1]);
            console.log("to activate " + activate.attr('value'));
            activate.find('.panel-heading').addClass('active');
            activate.find('.panel-collapse').addClass('in');
            setTimeout(function(){
                $('.twitter-btn').show();
            }, 200);
            /* activate selected pin's news article */
            console.log(" --selected pin id is " + index);
            console.log(" --selected news article id is " + selected_index);
        }
    }, 50);
});