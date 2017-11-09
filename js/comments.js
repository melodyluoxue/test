/**
 * Created by luoxue on 2017/6/20.
 */


// Get the path object from the plugin.
var path = $.fn.scrollPath("getPath");

// Start the path at the center of #me
path.moveTo(300, 150, {name: "me"});
// Vertical line going right towards the #about section
path.lineTo(1600, 150, {name: "about"});
// Arc down towards the design gallery, rotating a quarter of a circle along the way
path.arc(1600, 975, 825, -Math.PI / 3, 0, false, {rotate: -Math.PI / 2});
// Short vertical line to the design gallery
path.lineTo(2425, 1150, {name: "designed"});
// Diagonal line down to the development gallery
path.lineTo(1050, 1450, {name: "developed"});
// Another line diagonal going up towards to the contact section
path.lineTo(-525, 1050, {name: "contact"});
//			path.lineTo( -625, 1450, { name: "contact1" });
// Short vertical line upwards
path.lineTo(-1000, 975);
// The last arc that connects back to the beginning,
// going clockwise from the left to the top while rotating.
path.arc(300, 975, 825, -Math.PI, -Math.PI / 2, false, {rotate: -Math.PI});
// Rotate back to original angle.
path.rotate(0);

// Initiate the plugin
$(".wrapper").scrollPath({drawPath: false, wrapAround: true});

// Set navigation link click behavior to animate to the different sections
// over a duration of 2 seconds.
$("nav a").click(function (e) {
    e.preventDefault();
    $.fn.scrollPath("scrollTo", this.hash.substring(1), 100);
});

var id = 0;

$('#comments').keydown(function (e) {
    if (e.keyCode === 13) {
        if (id == 0) {
            $('#contact2').append(`<h1>${$('#comments').val()}</h1>`);
        } else if (id == 1) {
            // $('#contact2').append(`<h1>${$('#comments').val()}</h1>`);
        } else {
            var x = Math.floor(Math.random() * 1700);
            var y = Math.floor(Math.random() * 1700);
            $('.wrapper').append(`
                    <section id="add${id}" style="
                    left: ${x}px;top: ${y}px; position: absolute;
                    -webkit-transform: rotate(90deg);
                    -moz-transform: rotate(90deg);
                    -o-transform: rotate(90deg);
                    -ms-transform: rotate(90deg);
                    transform: rotate(90deg);
                    ">
                        <h1>${$('#comments').val()}</h1>
                    </section>
                `)
        }
        id++;
        $('#comments').val('');
    }
});




    $(function(){
        $(".menu").click(function(){
            var span = $(this).find("span");
            if(span.hasClass("open")){
                span.removeClass("open").addClass("close");
                $(".btn").removeClass("open").addClass("close");
            }else{
                span.removeClass("close").addClass("open");
                $(".btn").removeClass("close").addClass("open");
            }
        });
    });
