/**
 * Code based (heavily) off of: http://code.google.com/p/scrollbarpaper/
 * @author Henri MEDOT
 * @version last revision 2009-12-01
 */

$.fn.extend({
  jScrollie: function() {
    this.each(function(i) {
      var $this = $(this);
      var paper = $this.data('paper');
      if (paper == null) {
        var barWidth = 14;
        $this.wrap('<div class="jScrollieMetaContainer">');
        $this.before('<div class="jScrollieContainer" style="width:' + barWidth + 'px"><div class="jScrollieTrack"><div class="jScrollieDrag"><div class="jScrollieDragTop"></div><div class="jScrollieDragBottom"></div></div></div></div>');
        $this.append('<div style="clear:both;"></div>');
        $this.wrap('<div class="jScrollie">');      
        var scrollie = $this.parent();
        paper = scrollie.prev();
        var content = $('> :first', $this);
        content.css('overflow', 'hidden');
        $this.data('paper',      paper);
        $this.data('track',      $('.jScrollieTrack', paper));
        $this.data('drag',       $('.jScrollieDrag', paper));
        $this.data('dragTop',    $('.jScrollieDragTop', paper));
        $this.data('dragBottom', $('.jScrollieDragBottom', paper));
        $this.data('content',    content);
        $this.data('clearer',    $('> :last', $this));
        $this.data('scroller',   scrollie);
        paper.hide();

        var rs=function(e) {
            var offset = scroller.offset();
            var dataOffset = $this.data('offset');
            if (($this.height() != $this.data('height'))
             || (clearer.position().top - content.position().top != $this.data('contentHeight'))
             || (offset.top != dataOffset.top)
             || (offset.left != dataOffset.left)) {
              $this.jScrollie();
            }
          }
        $(window).resize(rs);
        $('img').load(rs);
      }

      var barWidth =   $this.data('barWidth');
      var track =      $this.data('track');
      var drag =       $this.data('drag');
      var dragTop =    $this.data('dragTop');
      var dragBottom = $this.data('dragBottom');
      var content =    $this.data('content');
      var clearer =    $this.data('clearer');
      var scroller = $this.data('scroller');
      var contentHeight = clearer.position().top - content.position().top;
      $this.data('height', scroller.height());
      $this.data('contentHeight', contentHeight);
      $this.data('offset', scroller.offset());

      $this.unbind();

      var ratio = scroller.height() / contentHeight;
      if (ratio < 1) {

        paper.show();
        content.addClass('jScrollieVisible');
        //content.width($this.width() - content.innerWidth() + content.width() - barWidth);
        paper.height(scroller.height()-10);
        var offset = scroller.offset();
       // paper.css('left', (offset.left + $this.innerWidth() - paper.width()) + 'px').css('top', offset.top);
        paper.css('right', '2px').css('top', '10px');
        var dragHeight = Math.max(Math.round(scroller.height() * ratio), dragTop.height() + dragBottom.height());
        drag.height(dragHeight-20);
        var updateDragTop = function() {
          drag.css('top', Math.min(Math.round(scroller.scrollTop() * ratio), scroller.height() - dragHeight) + 'px');
        };
        updateDragTop();

        scroller.scroll(function(event) {
          updateDragTop();
        });

        var unbindMousemove = function() {
          $('html').unbind('mousemove.jScrollie');
        };
        drag.mousedown(function(event) {
          unbindMousemove();
          var offsetTop = event.pageY - drag.offset().top;
          $('html').bind('mousemove.jScrollie', function(event) {
            scroller.scrollTop((event.pageY - scroller.offset().top - offsetTop) / ratio);
            return false;
          }).mouseup(unbindMousemove);
          return false;
        });
      }
      else {
        $this.unbind();
        paper.hide();
        content.removeClass('jScrollieVisible');
        content.width($this.width() - content.innerWidth() + content.width());
      }
      
      });
  }
});