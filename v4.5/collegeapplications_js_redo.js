  window.onload = function() {
      // This is to animate the internal link scrolling, using jQuery

      $('a[href^="#"]').click(function() {
          $('html, body').animate({
              scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top
          }, 500);
          return false;
      });

      //This is to allow some things to fade-in late
      $("table.deadlines tbody tr td:last-child, table.info tbody tr td:last-child").delay(1000).animate({
          "opacity": "1"
      }, 2000);

      //   //Accordion 
      //   $(document).ready(function() {
      //       // $(".toggle-content").hide(); // this automatically hides upon pageload
      //       $(".toggle-title").click(function() {
      //           $(this).next(".toggle-content").slideToggle("slow");
      //           $(this).toggleClass('active');
      //       });
      //   });

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

          $("a").click(function(e) { // This is trying to make the toggle not activate when links are clicked see http://www.ianhoar.com/2011/09/09/jquery-how-to-get-links-to-work-in-toggled-or-dynamic-content/
              e.stopPropagation();
          });

          $("td").click(function() {
              var sel = getSelection().toString(); // this "sel" business is to prevent clicking on selection of text
              if (!sel) {
                  $(this).parent().find('.toggle-content-notes').slideToggle("slow");
                  $(this).parent().find('.toggle-title-notes').toggleClass('active-notes');
              }
          });

          $('a[href^="http"]').attr('target', '_blank');
      });
  }
