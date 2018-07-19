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

//hide all notes
$(document).ready(function() {
	$(".toggle-content-notes").hide(); //  automatically hide all upon pageload
	
	$(".show-all-notes").click(function() { // show all notes
		$(".toggle-content-notes").slideDown("slow");
		$(".toggle-title-notes").addClass('active-notes');
	});

	$(".hide-all-notes").click(function() { // hide all notes
		$(".toggle-content-notes").slideUp("slow"); 
		$(".toggle-title-notes").removeClass('active-notes');
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


//NAVBAR STUFF
var toc = document.querySelector( '.toc' );
var tocPath = document.querySelector( '.toc-marker path' );
var tocItems;

// Factor of screen size that the element must cross
// before it's considered visible
var TOP_MARGIN = 0.1,
    BOTTOM_MARGIN = 0.2;

var pathLength;

window.addEventListener( 'resize', drawPath, false );
window.addEventListener( 'scroll', sync, false );

drawPath();

function drawPath() {
  
  tocItems = [].slice.call( toc.querySelectorAll( 'li' ) );

  // Cache element references and measurements
  tocItems = tocItems.map( function( item ) {
    var anchor = item.querySelector( 'a' );
    var target = document.getElementById( anchor.getAttribute( 'href' ).slice( 1 ) );

    return {
      listItem: item,
      anchor: anchor,
      target: target
    };
  } );

  // Remove missing targets
  tocItems = tocItems.filter( function( item ) {
    return !!item.target;
  } );

  var path = [];
  var pathIndent;

  tocItems.forEach( function( item, i ) {

    var x = item.anchor.offsetLeft - 5,
        y = item.anchor.offsetTop,
        height = item.anchor.offsetHeight;

    if( i === 0 ) {
      path.push( 'M', x, y, 'L', x, y + height );
      item.pathStart = 0;
    }
    else {
      // Draw an additional line when there's a change in
      // indent levels
      if( pathIndent !== x ) path.push( 'L', pathIndent, y );

      path.push( 'L', x, y );
      
      // Set the current path so that we can measure it
      tocPath.setAttribute( 'd', path.join( ' ' ) );
      item.pathStart = tocPath.getTotalLength() || 0;
      
      path.push( 'L', x, y + height );
    }
    
    pathIndent = x;
    
    tocPath.setAttribute( 'd', path.join( ' ' ) );
    item.pathEnd = tocPath.getTotalLength();

  } );
  
  pathLength = tocPath.getTotalLength();
  
  sync();
  
}

function sync() {
  
  var windowHeight = window.innerHeight;
  
  var pathStart = pathLength,
      pathEnd = 0;
  
  var visibleItems = 0;
  
  tocItems.forEach( function( item ) {

    var targetBounds = item.target.getBoundingClientRect();
    
    if( targetBounds.bottom > windowHeight * TOP_MARGIN && targetBounds.top < windowHeight * ( 1 - BOTTOM_MARGIN ) ) {
      pathStart = Math.min( item.pathStart, pathStart );
      pathEnd = Math.max( item.pathEnd, pathEnd );
      
      visibleItems += 1;
      
      item.listItem.classList.add( 'visible' );
    }
    else {
      item.listItem.classList.remove( 'visible' );
    }
    
  } );
  
  // Specify the visible path or hide the path altogether
  // if there are no visible items
  if( visibleItems > 0 && pathStart < pathEnd ) {
    tocPath.setAttribute( 'stroke-dashoffset', '1' );
    tocPath.setAttribute( 'stroke-dasharray', '1, '+ pathStart +', '+ ( pathEnd - pathStart ) +', ' + pathLength );
    tocPath.setAttribute( 'opacity', 1 );
  }
  else {
    tocPath.setAttribute( 'opacity', 0 );
  }

}
