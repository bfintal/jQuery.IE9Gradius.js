## IE9 + CSS3 border-radius + Gradient filter = :(

## What is IE9Gradius?

CSS3 gradients looks nice, and it is nice also when you mix in a CSS3 border radius to it. These 2 CSS3 features are supported by almost all the major browsers.

IE9 already supports CSS3 border radius, but unfortunately it still does not support CSS3 gradients. So as an alternative, the gradient filter rule is usually used (check [CSS3Please](http://css3please.com/)).

The bad thing is that these two features when used together do not render properly in IE9: the resulting gradient spills over outside the bounds of the border radius.  
       
This small jquery plugin solves this for IE9.  

## Why is it now a jQuery Plugin?

This is a jquery plugin version of the [original script](https://github.com/bfintal/jQuery.IE9Gradius.js). The point of making this a plugin is two fold—one, it saves precious cycles by specifically targeting only those selectors that the user has deemed necessary (i.e. selectors the users has styled with CSS3 radius and gradients), and two, being a plugin it doesn't matter where the script is called or when it's invoked, it will work regardless (provided jQuery has been called).

## Usage

1. Use the any CSS3 radius gradient rule set in combination (`.box_round` and `.box_gradient` styles from [CSS3Please](http://css3please.com/) are a good start).
2. Include jquery.ie9gradius.js jquery plugin in your header **after** jQuery.
3. Invoke the function on one or any collection of selectors requiring IE9Gradius, i.e. `$('p, div, #someID, .someClass').ie9gradius();`

		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<!--[if IE 9]>
			<script src="path/to/jquery.ie9gradius.js"></script>
			<script type="text/javascript" charset="utf-8">
				jQuery(document).ready(function($){
					$('#my_rounded_gradient, #my_rounded_gradient_with_hover').ie9gradius();
				});
			</script>
		<![endif]-->

## How does it work?

This works similar to [adding a wrapper div](http://www.timmywillison.com/2011/Gradients-plus-border-radius-in-IE9.html) to hide the overflow beyond the border of the container.

But instead of adding a wrapper, the script prepends a few nested divs in the container that mimics a background. Your code may have something like this:

	<div id="my_rounded_gradient">
	    <p>Some contents</p>
	</div>

...and some styling:

	#my_rounded_gradient {
	  background-color: #444444;
	  background-image: -webkit-gradient(linear, left top, left bottom, from(#999999), to(#444444)); 
	  background-image: -webkit-linear-gradient(top, #999999, #444444); 
	  background-image:    -moz-linear-gradient(top, #999999, #444444); 
	  background-image:     -ms-linear-gradient(top, #999999, #444444); 
	  background-image:      -o-linear-gradient(top, #999999, #444444); 
	  background-image:         linear-gradient(top, #999999, #444444);
	              filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#999999', EndColorStr='#444444'); /* IE6–IE9 */
                        
	  -webkit-border-radius: 15px; 
	     -moz-border-radius: 15px; 
	          border-radius: 15px; 
	  -moz-background-clip: padding; -webkit-background-clip: padding-box; background-clip: padding-box;
	} 

After the script runs, you'll have something like this:

	<div id="my_rounded_gradient">
	    <div style="left: 0px; top: 0px; width: 100%; height: 100%; position: absolute;">
	        <div style="height: 100%; overflow: hidden; border-top-left-radius: 15px; border-top-right-radius: 15px; border-bottom-right-radius: 15px; border-bottom-left-radius: 15px;">
	            <div id="ie9gradius_43730" style="width: 100%; height: 100%; filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#999999', EndColorStr='#444444');">
	            </div>
	        </div>
	    </div>
	    <p>Some contents</p>
	</div>

The script gets the border radius and filter style rules from the container and places them in the newly created nested divs.

## Using hover styles

Because of the new divs that handle the proper rendering, :hover styles will no longer be applied to the container. To support hover styles, you can instead style the child of your container of the class `gradiusover`

For example, you might have the following CSS:

	#my_rounded_gradient:hover {
	  background-color: #444444;
	  background-image: -webkit-gradient(linear, left top, left bottom, from(#444444), to(#444444)); 
	  background-image: -webkit-linear-gradient(top, #444444, #444444); 
	  background-image:    -moz-linear-gradient(top, #444444, #444444); 
	  background-image:     -ms-linear-gradient(top, #444444, #444444); 
	  background-image:      -o-linear-gradient(top, #444444, #444444); 
	  background-image:         linear-gradient(top, #444444, #444444); 
	              filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#444444', EndColorStr='#444444'); /* IE6–IE9 */ 
	}

This won't be applied in IE9 anymore because of the script. To style on hover, you can add something like this:

	#my_rounded_gradient .gradiusover {
	    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#444444', EndColorStr='#444444') !important; /* IE6–IE9 */
	}

*Note the `!important` keyword and the lack of the `:hover` selector in the CSS style definition.*

*Note also that only a background color or a filter applies here since this is only the style of the background*