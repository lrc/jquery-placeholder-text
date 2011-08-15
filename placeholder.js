/**
 * A simple jQuery plugin to convert labels into placeholder text.
 */
(function($) {
	$.fn.labelToPlaceholder = function(settings) {

		if ( this.length == 0 ) return this;

		settings = $.extend({
			overflow : 'hidden',
			opacity : 0.6
		}, settings);

		var $set = this.add('input,textarea',this);

		$set.each(function(){

			var $this = $(this);
			var $label = $('label[for="' + $this.attr('id') + '"]');

			if ( $label.length == 0 ) return;

			$label.css({
				position: 'absolute',
				overflow: settings.overflow,
				margin: 0,
				padding: 0,
				display: 'block',
				width: $this.width(),
				height: $this.height(),
				lineHeight: $this.height() + 'px',
				fontSize: $this.css('fontSize'),
				opacity: settings.opacity,
				'float': 'none'
			}).addClass('placeholder');

			var input_position = $this.position();
			var inner_offset = $this.innerOffset();
			
			$label.css({
				top: input_position.top + inner_offset.top,
				left: input_position.left + inner_offset.left
			});
			if ($this.val() != '') $label.hide();

			$this.focus(function(){
				$label.hide();
			});

			$this.blur(function(){
				if ($($this).val() == '') $label.show();
			});
		});
		return this;
	};
})(jQuery);

/**
 *  A jQuery plugin that returns the 'innerOffset' of an element. That is,
 *  the difference between the outside and the inside of a container for
 *  each of the sides (i.e. the sum of the border width and padding).
 */
(function($) {
	$.fn.innerOffset = function(){
		if (this.length == 0) return null;
		var $first = $(this.get(0));
		
		// TODO: Deal with IE returning text values like 'medium' for border width.
		
		return {
			top : parseFloat($first.css('paddingTop').replace(/px/, '')) + parseFloat($first.css('borderTopWidth').replace(/px/, '')),
			right : parseFloat($first.css('paddingRight').replace(/px/, '')) + parseFloat($first.css('borderRightWidth').replace(/px/, '')),
			bottom : parseFloat($first.css('paddingBottom').replace(/px/, '')) + parseFloat($first.css('borderBottomWidth').replace(/px/, '')),
			left : parseFloat($first.css('paddingLeft').replace(/px/, '')) + parseFloat($first.css('borderLeftWidth').replace(/px/, ''))
		}
	}
})(jQuery);