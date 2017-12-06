// This is to animate the internal link scrolling, using jQuery
$('a[href^="#"]').click(function () {
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 500);

    return false;
});


//This is to allow some things to fade-in late
$("table.deadlines tbody tr td:last-child, table.info tbody tr td:last-child").delay(1000).animate({"opacity": "1"}, 2000);


//Accordion 
$(document).ready(function() {
    // $(".toggle-content").hide(); // this automatically hides upon pageload
    $(".toggle-title").click(function() {
        $(this).next(".toggle-content").slideToggle("slow");
        $(this).toggleClass('active');
    });
});

//Accordion for notes
// $(document).ready(function() {
// 	$(".toggle-content-notes").hide(); // this automatically hides upon pageload
// 	$(".toggle-title-notes").click(function() {
//         $(this).next(".toggle-content-notes").slideToggle("slow");
//         $(this).toggleClass('active-notes');
//     });
// });

//show/hide all notes
$(document).ready(function() {
	$(".toggle-content-notes").hide(); // this automatically hides upon pageload
	$(".toggle-all-notes").click(function() {
		$(".toggle-content-notes").slideToggle("slow");
		$(".toggle-title-notes").toggleClass('active-notes');
	});
});

// this works for toggling notes by clicking row; but does it work if links in row?
$(document).ready(function() {
	$("td").click(function() {
		var sel = getSelection().toString(); // this "sel" business is to prevent clicking on selection of text
		if(!sel){
			$(this).parent().find('.toggle-content-notes').slideToggle("slow");
			$(this).parent().find('.toggle-title-notes').toggleClass('active-notes');
		}
	});
});
// This may help if links in row: https://jsfiddle.net/purmou/4n9AW/
// $("td").click(function(e){
// 	var tag = e.target.nodeName;
// 	if( tag === 'A' ){
// 		alert("link");
// 	} else {
// 		alert("normal td");
// 	}
// });
