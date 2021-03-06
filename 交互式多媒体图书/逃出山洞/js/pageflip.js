

(function() {
	
	// Dimensions of the whole book
	var BOOK_WIDTH = 830;
	var BOOK_HEIGHT = 560; 
	
	// Dimensions of one page in the book
	var PAGE_WIDTH = 400;
	var PAGE_HEIGHT = 550;
	
	// Vertical spacing between the top edge of the book and the papers
	var PAGE_Y = ( BOOK_HEIGHT - PAGE_HEIGHT ) / 2;
	
	// The canvas size equals to the book dimensions + this padding
	var CANVAS_PADDING = 60;
	
	page = 0; 
	num= [];
	
	
	var canvas = document.getElementById( "pageflip-canvas" ); 
	var context = canvas.getContext( "2d" );
	
	var mouse = { x: 0, y: 0 };
	
	flips = [];
	
	var book = document.getElementById( "book" );
	
	// List of all the page elements in the DOM
	pages = book.getElementsByTagName( "section" );
	
	// Organize the depth of our pages and create the flip definitions
	for( var i = 0, len = pages.length; i < len; i++ ) {
		if(i==0)pages[i].style.zIndex=101;
		else{
		pages[i].style.zIndex = len - i;
		}
		num[i]=len - i;
		
		flips.push( {
			// Current progress of the flip (left -1 to right +1)
			progress: 1,
			// The target value towards which progress is always moving
			target: 1,
			// The page DOM element related to this flip
			page: pages[i], 
			// True while the page is being dragged
			dragging: false
		} );
	}
	
	// Resize the canvas to match the book size
	canvas.width = BOOK_WIDTH + ( CANVAS_PADDING * 2 );
	canvas.height = BOOK_HEIGHT + ( CANVAS_PADDING * 2 );
	
	// Offset the canvas so that it's padding is evenly spread around the book
	canvas.style.top = -CANVAS_PADDING + "px";
	canvas.style.left = -CANVAS_PADDING + "px";
	
	// Render the page flip 60 times a second
	setInterval( render, 1000 / 60 );
	
	
	
    document.addEventListener( "keyup" ,getKeyUp, false );
	 document.addEventListener( "keydown" ,getKeyDown, false );
   
	
  
	
	function getKeyUp(e){
      e = e || window.event;
      var keycode = e.which ? e.which : e.keyCode;
	   if(page==3){
	     if (keycode == 39){
			 
			 document.getElementById('food').focus();
           
		 }
	  }
	  if(page!=4&&page!=3){
      if (keycode == 39 || keycode == 37){ //37表示左箭头，39表示右箭头
           for( var i = 0; i < flips.length; i++ ) {
			// If this flip was being dragged, animate to its destination
			if( flips[i].dragging ) {
				// Figure out which page we should navigate to
				if(keycode==39 ) {
					
					flips[i].target = -1;
					page = Math.min( page + 1, flips.length );
					au.play();//play music
					if(page==3){scr.play();}
					
				}
				else if(keycode==37){
					
					flips[i].target = 1;
					page = Math.max( page - 1, 0 );
					au.play();//play music
                   
				}
			}
			flips[i].dragging = false;
		}
		pages[page].style.zIndex =101;
        }
	  }
	 
	  if(keycode==27 ) {					
		  
		  setTimeout(function(){self.location='bookshelf.html';},1000)}
 }

 function getKeyDown(e){
      e = e || window.event;
      var keycode = e.which ? e.which : e.keyCode;
	 
	  if(page!=4&&page!=3){
      if (keycode == 39&& page + 1 < flips.length){ 
          pages[page].style.zIndex =num[page];
          flips[page].dragging = true;
		  
      }
	  else if(keycode == 37&& page - 1 >= 0){
	     flips[page - 1].dragging = true;
		 pages[page].style.zIndex =num[page];
		 
	  }
	  }
 }
	
	function render() {
		
		// Reset all pixels in the canvas
		context.clearRect( 0, 0, canvas.width, canvas.height );
		
		for( var i = 0, len = flips.length; i < len; i++ ) {
			var flip = flips[i];
			
			if( flip.dragging ) {
				flip.target = Math.max( Math.min( mouse.x / PAGE_WIDTH, 1 ), -1 );
			}
			
			// Ease progress towards the target value 
			flip.progress += ( flip.target - flip.progress ) * 0.2;
			
			// If the flip is being dragged or is somewhere in the middle of the book, render it
			if( flip.dragging || Math.abs( flip.progress ) < 0.997 ) {
				drawFlip( flip );
			}
			

		}
		
	}
	
	function drawFlip( flip ) {
		// Strength of the fold is strongest in the middle of the book
		var strength = 1 - Math.abs( flip.progress );
		
		// Width of the folded paper
		var foldWidth = ( PAGE_WIDTH * 0.5 ) * ( 1 - flip.progress );
		
		// X position of the folded paper
		var foldX = PAGE_WIDTH * flip.progress + foldWidth;
		
		// How far the page should outdent vertically due to perspective
		var verticalOutdent = 20 * strength;
		
		// The maximum width of the left and right side shadows
		var paperShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
		var rightShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		var leftShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		
		
		// Change page element width to match the x position of the fold
		flip.page.style.width = Math.max(foldX, 0) + "px";
		
		context.save();
		context.translate( CANVAS_PADDING + ( BOOK_WIDTH / 2 ), PAGE_Y + CANVAS_PADDING );
		
		
		// Draw a sharp shadow on the left side of the page
		context.strokeStyle = 'rgba(0,0,0,'+(0.05 * strength)+')';
		context.lineWidth = 30 * strength;
		context.beginPath();
		context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
		context.lineTo(foldX - foldWidth, PAGE_HEIGHT + (verticalOutdent * 0.5));
		context.stroke();
		
		
		// Right side drop shadow
		var rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
		rightShadowGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.2)+')');
		rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
		
		context.fillStyle = rightShadowGradient;
		context.beginPath();
		context.moveTo(foldX, 0);
		context.lineTo(foldX + rightShadowWidth, 0);
		context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
		context.lineTo(foldX, PAGE_HEIGHT);
		context.fill();
		
		
		// Left side drop shadow
		var leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
		leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
		leftShadowGradient.addColorStop(1, 'rgba(0,0,0,'+(strength*0.15)+')');
		
		context.fillStyle = leftShadowGradient;
		context.beginPath();
		context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
		context.lineTo(foldX - foldWidth, 0);
		context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
		context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
		context.fill();
		
		
		// Gradient applied to the folded paper (highlights & shadows)
		var foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
		foldGradient.addColorStop(0.35, '#fafafa');
		foldGradient.addColorStop(0.73, '#eeeeee');
		foldGradient.addColorStop(0.9, '#fafafa');
		foldGradient.addColorStop(1.0, '#e2e2e2');
		
		context.fillStyle = foldGradient;
		context.strokeStyle = 'rgba(0,0,0,0.06)';
		context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		context.beginPath();
		context.moveTo(foldX, 0);
		context.lineTo(foldX, PAGE_HEIGHT);
		context.quadraticCurveTo(foldX, PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
		context.lineTo(foldX - foldWidth, -verticalOutdent);
		context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		
		context.fill();
		context.stroke();
		
		
		context.restore();
	}
	
})();


