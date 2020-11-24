


jQuery(document).ready(function () {
    var parent = jQuery("#map-wrapper");
    var childPos = jQuery("#canvas");

    jQuery("#canvas").draggable({
        drag: function (event, map) {
            const boundaryOffset = 20
            const headerOffset = document.getElementById("header").offsetHeight
            const footerOffset = document.getElementById("footer").offsetHeight

            var mapWrapperWidth = parent.width()
            var mapWidth = childPos.width()

            var mapWrapperHeight = parent.height()
            var mapHeight = childPos.height()

            var mapBoundaryRight = mapWrapperWidth - mapWidth - boundaryOffset
            var mapBoundaryBottom = mapWrapperHeight - mapHeight - boundaryOffset - footerOffset

            // Check for top boundary
            if (map.position.top > boundaryOffset + headerOffset) {
                map.position.top = boundaryOffset + headerOffset;
            }
            // Check for left boundary
            if (map.position.left > boundaryOffset) {
                map.position.left = boundaryOffset;
            }
            // Check for bottom boundary
            if (map.position.top < mapBoundaryBottom) {
                map.position.top = mapBoundaryBottom;
            }
            // Check for right boundary
            if (map.position.left < mapBoundaryRight) {
                map.position.left = mapBoundaryRight;
            }

        },

        scroll: false
    });
});
