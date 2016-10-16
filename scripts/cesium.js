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
    console.log("cesium got clicked!");
    mouse_position();

    try {
        selected_pin = pickEntity(viewer, new Cesium.Cartesian2(posX, posY));
    }
    catch(err) {
        selected_pin = -1;
    }

    setTimeout(function() {
        /* find out what pin is selected and activate corresponding sidepanel's news article */
        if (typeof viewer.selectedEntity === 'undefined') {
            console.log("enter first condition");
            /* deactivate news panel regardless of what is active */
            var deactivate = $('.active');
            deactivate.siblings('.panel-collapse').removeClass('in');
            deactivate.removeClass('active');
            console.log(" deactivated panel num " + deactivate.attr('value'));
            $('.twitter').hide();
        } else {
            console.log("enter second condition");
            selected_pin = pickEntity(viewer, new Cesium.Cartesian2(posX, posY));
            var index = selected_pin._id;
            if (selected_index === index) {
                /* selected_pin is same pin as before, leave everything as is */
                console.log(" same active panel " + activate.attr('value'));
            } else {
                selected_index = index;
                var deactivate = $('.active');
                deactivate.siblings('.panel-collapse').removeClass('in');
                deactivate.removeClass('active');
                console.log(" deactivated panel num " + deactivate.attr('value'));
                $('.twitter').hide();

                var activate = $($('#testSidebar').children()[index + 1]);
                activate.find('.panel-heading').addClass('active');
                activate.find('.panel-collapse').addClass('in');
                console.log(" change active panel num " + activate.attr('value'));
            }
        }
    }, 100);
});
