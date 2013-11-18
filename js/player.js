jQuery( function( $ ) {
	
	var scenario = $( "section#wrapper-game" );
	var player = $( "div#player" );
	var floor = $( "div#floor" );
	var tree = $( "div#tree" );
	var direction = null;
	var lastDirection = null;

	player.ready( function() {
		var frames = 8;
		var xFrame = 0;
		var nextXFrame = 60;

		setInterval( function() {
			var x = xFrame + nextXFrame;
			if ( direction === 'right' ) {
				lastDirection = direction;
				player.removeClass( 'direction-left' );
				player.css( {
					"background-position" : "-"+ x +"px 0px"
				} );
			} else if ( direction === 'left' ) {
				lastDirection = direction;
				player.addClass( 'direction-left' );
				player.css( {
					"background-position" : "-"+ x +"px 0px"
				} );
			} else if ( direction == null ) {
				player.css( {
					"background-position" : "0px 0px",
				} );
			}
			xFrame = x;
			if ( x >= frames * nextXFrame ) xFrame = 0;
		}, 170 );
	} );

	$( window ).keydown ( function( event ) {

		var top = parseInt( player.css( 'top' ) );
		var left = parseInt( player.css ( 'left' ) );
		var floorTop = parseInt( floor.css ( 'top' ) );
		var treeTop = parseInt( tree.css ( 'top' ) );
		var count = 0;

		switch ( event.keyCode ) {
			case 37:
				direction = 'left';
				if ( left <= 0 ) {
					player.css( { 'left' : '0px' } );
				} else {
					player.css( { 'left' : ( left - 5 ) +'px' } );
				}
			break;
			case 38:
				direction = 'top';
				if ( lastDirection == 'right' ) {
					player.animate( { 'top' : ( top - 80 ) +'px', 'left' : ( left + 80 ) +'px' }, 500 );
					var currentLeft = parseInt( player.css( 'left' ) );
					currentLeft += 100;
					if ( currentLeft >= 750 && currentLeft <= 820 ) {
						player.animate( { 'top' : '200px', 'left' : ( left + 100 ) +'px' }, 300 );
					} else if ( currentLeft < 750 || currentLeft > 820 ) {
						player.animate( { 'top' : '245px', 'left' : ( left + 100 ) +'px' }, 500 );
					}
					console.info( currentLeft );
				} else if ( lastDirection == 'left' ) {
					player.animate( { 'top' : ( top - 80 ) +'px', 'left' : ( left - 80 ) +'px' }, 500 );
					var currentLeft = parseInt( player.css( 'left' ) );
					currentLeft -= 100;
					if ( currentLeft >= 730 && currentLeft <= 840 ) {
						player.animate( { 'top' : '200px', 'left' : ( left - 100 ) +'px' }, 300 );
					} else {
						player.animate( { 'top' : '245px', 'left' : ( left - 100 ) +'px' }, 500 );
					}
					console.info( currentLeft );
				}
			break;
			case 39:
				direction = 'right';
					var frames = 3;
					var nextXFrame = 1024;
				if ( left >= 1024 - 80 ) {
					player.css( { "left" : ( left ) +"px" } );
					if ( count == 0 ) {
						scenario.css( { 'background-position' : '-1024px 0px' } );
						count = 1;
					} else if ( count == 1 ) {
						scenario.css( { 'background-position' : '-'+ nextXFrame + nextXFrame +'px 0px' } );
						count = 2;
					} else if ( count == 2 ) {
						scenario.css( { 'background-position' : '0px 0px' } );
						count = 0;
					}
					player.css( { "left" : "30px" } );
				} else {
					player.css( { "left" : ( left + 5 ) +"px" } );
				}
			break;
			case 40:
				direction = 'bottom';
				var currentLeft = parseInt( player.css( 'left' ) );
				if ( ( top + 5 + player.height() ) > floorTop ) {
					player.css( { "top" : "245px" } );
				} else if ( left >= 750 && left <= 820 ) {
					player.css( { "top" : "200px" } );
				} else {
					player.css( { "top" : ( top + 5 ) +"px" } );
				}
			break;
		}

	});

	$( window ).keyup( function( event ) {
		direction = null;
	});


	var gunOxigeno = $( "div#gun-oxigeno" );
	var ballOxigen = $( "div#ball-oxigen" );

	gunOxigeno.ready( function() {
		setInterval( function() {
			gunOxigeno.animate( { 'top' : '-100px' }, 950 ).animate( { 'top' : '-30px' }, 950 );
		}, 950 );
	} );

	ballOxigen.ready( function() {

		var frames = 4;
		var xFrame = 0;
		var nextXFrame = 60;

		setInterval( function() {
			var gunTop = parseInt( gunOxigeno.position().top );
			var x = xFrame + nextXFrame;
			ballOxigen.animate( { 'top' : '-20px' }, 0 );
			if ( gunTop <= -30 && gunTop >= -35 ) {
				ballOxigen.css( { 'background-position' : '-'+ x +'px 0px' } ).animate( { 'top' : '600px' }, 5000 );
			}
			ballOxigen.css( { 'background-position' : '-'+ x +'px 0px' } );
			xFrame = x;
			if ( x >= frames * nextXFrame ) xFrame = 0;
		}, 200 );
	} );

} );