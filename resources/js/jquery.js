
$(document).ready(function() {
    
    /* Animate Data */
    $('.js--wayPoint').waypoint(function(direction) {
        $('.js--wayPoint').addClass('animated fadeIn');
    }, {
        offset: '60%'
    });
});