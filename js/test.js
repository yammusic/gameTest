jQuery( function( $ ) {
    var playerTest = new $.Player( $( "div#playerTest" ), 8 );
    var floor = new $.ObjGame( $( "div#floor" ) );

    playerTest.InitEvents();
    floor.InitEvents();

    setInterval( function() {
        if ( playerTest.IntersectLeft( floor ) && playerTest.IntersectBottom( floor ) ) {
            playerTest.element.css( {
                'top' : '+='+ 5,
                'left' : floor.getRight() +'px'
            } );
        } else if ( playerTest.IntersectBottom( floor ) ) {
                playerTest.element.css( 'top', floor.getTop() - playerTest.Height() +'px' );
        } else {
            playerTest.element.css( { 'top' : '+='+ playerTest.getVelocityDown() } );
        }        
    }, 10 );


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