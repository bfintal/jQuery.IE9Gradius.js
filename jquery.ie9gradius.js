(function($){
	$.fn.ie9gradius = function(){
		var that = $(this);
		for (var i = this.length - 1; i >= 0; i--) {
			// define filter test
			var filterscheck = this[i].filters && this[i].filters.length>0;

			// check each css property, we need a border radius and filter
			if ((parseInt($(this[i]).css('borderTopLeftRadius')) > 0 ||
				parseInt($(this[i]).css('borderTopRightRadius')) > 0 ||
				parseInt($(this[i]).css('borderBottomLeftRadius')) > 0 ||
				parseInt($(this[i]).css('borderBottomRightRadius')) > 0) &&
				filterscheck) {

				// carry over the border radius
				var s = 'border-top-left-radius: ' + parseInt($(this[i]).css('borderTopLeftRadius')) + 'px;';
				s += 'border-top-right-radius: ' + parseInt($(this[i]).css('borderTopRightRadius')) + 'px;';
				s += 'border-bottom-left-radius: ' + parseInt($(this[i]).css('borderBottomLeftRadius')) + 'px;';
				s += 'border-bottom-right-radius: ' + parseInt($(this[i]).css('borderBottomRightRadius')) + 'px;';

				// find the start and end colors
				thisFilter = this[i].filters.item('DXImageTransform.Microsoft.gradient');
				var c1 = thisFilter.startColorstr;
				var c2 = thisFilter.endColorstr;

				// form the filter rule
				var g = 'filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+c1+'\', endColorStr=\''+c2+'\');';

				var id = 'ie9gradius_'+parseInt(Math.random() * 100000);

				// we need to remove the current filter because this is spilling outside the border radius
				thisFilter.enabled=0;

				// relative position is needed for proper positioning of the gradient
				$(this[i]).css('position', 'relative');

				// add support for adding hover styling
				$(this[i]).mouseenter(function() { $('#'+id).addClass('gradiusover'); }).mouseleave(function() { $('#'+id).removeClass('gradiusover'); });

				// we need this so that the contents show on top
				$(this[i]).find('> *:not(ul)').css('position', 'relative');

				// the magic is all here
				$(this[i]).prepend('\
				<div style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"> \
					<div style="'+s+' height: 100%; overflow: hidden;"> \
						<div id="'+id+'" style="'+g+' height: 100%; width: 100%;"> \
						</div></div></div>');
			}
		}
		return $(this);
	};
})(jQuery);