// jquery.ie9gradius.js
// copyright benjamin intal
// https://github.com/bfintal/jQuery.IE9Gradius.js

jQuery(document).ready(function($){
    $('a, div, span, p, li, button').each(function() {
        // check each css property, we need a border radius and filter
        if ((parseInt($(this).css('borderTopLeftRadius')) > 0 ||
            parseInt($(this).css('borderTopRightRadius')) > 0 ||
            parseInt($(this).css('borderBottomLeftRadius')) > 0 ||
            parseInt($(this).css('borderBottomRightRadius')) > 0) &&
            $(this).css('filter') != '' &&
            $(this).css('filter').match(/DXImageTransform\.Microsoft\.gradient/i) != null) {
                
            // carry over the border radius
            var s = 'border-top-left-radius: ' + parseInt($(this).css('borderTopLeftRadius')) + 'px;';
            s += 'border-top-right-radius: ' + parseInt($(this).css('borderTopRightRadius')) + 'px;';
            s += 'border-bottom-left-radius: ' + parseInt($(this).css('borderBottomLeftRadius')) + 'px;';
            s += 'border-bottom-right-radius: ' + parseInt($(this).css('borderBottomRightRadius')) + 'px;';
            
            // find the start and end colors
            var c1 = $(this).css('filter').match(/startcolorstr\=\"?\'?\#([0-9a-fA-F]{6})\'?\"?/i);
            var c2 = $(this).css('filter').match(/endcolorstr\=\"?\'?\#([0-9a-fA-F]{6})\'?\"?/i);
            if (c1 != null) { if (c1.length == 2) { c1 = c1[1]; } else { c1 = null; } }
            if (c2 != null) { if (c2.length == 2) { c2 = c2[1]; } else { c2 = null; } }
            if (c1 == null && c2 != null) { c1 = c2; }
            else if (c2 == null && c1 != null) { c2 = c1; }
            
            // form the filter rule
            var g = '';
            if (c1 != null) { var g = 'filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=\'#'+c1+'\', EndColorStr=\'#'+c2+'\');'; }
            
            var id = 'ie9gradius_'+parseInt(Math.random() * 100000);
            
            // we need to remove the current filter because this is spilling outside the border radius
            // relative position is needed for proper positioning of the gradient
            $(this).css('filter', '').css('position', 'relative');
            
            // add support for adding hover styling
            $(this).mouseenter(function() { $('#'+id).addClass('gradiusover'); }).mouseleave(function() { $('#'+id).removeClass('gradiusover'); });
            
            // we need this so that the contents show on top
            $(this).find('> *:not(ul)').css('position', 'relative');
            
            // the magic is all here
            $(this).prepend('\
            <div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"> \
                <div style="'+s+' height: 100%; overflow: hidden;"> \
                    <div id="'+id+'" style="'+g+' height: 100%; width: 100%;"> \
                    </div></div></div>');
        }
    });
});