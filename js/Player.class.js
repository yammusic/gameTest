jQuery( function( $ ) {

	$.Player = function( element, frames ) {
		this.element = ( element instanceof $ ) ? element : $( element );
		this.frames = frames;
		this.direction;
		this.Left;
		this.Top;
		this.Right;
		this.Bottom;
		this.width;
		this.height;
		this.velocity;
		this.velocityDown;
	};

	$.Player.prototype = {

		InitEvents : function() {
			this.InitDefault();
			this.InitPlayer();
			var that = this;

			$( document ).keydown( function( event ) {
				var keydownCode = event.which;
				// event.preventDefault();

				switch ( keydownCode ) {
					case 37:
						that.moveLeft();
					break;
					case 38:
					break;
					case 39:
						that.moveRight();
					break;
					case 40:
					break;
				}
			} );
		},

		InitDefault : function() {
			// SET X AND Y POSITION
			setInterval( ( function() {
				this.setPosition( 
				    this.element.position().left,
				    this.element.position().top
				);				
			} ).bind( this ), 10 );
		},

		setPosition : function( left, top ) {
			this.Left = left;
			this.Top = top;
			this.Right = left + this.element.width();
			this.Bottom = top + this.element.height();
			this.width = this.element.width();
			this.height = this.element.height();
		},

		Width : function() {
			return this.width;
		},

		setWidth : function( width ) {
			this.width = width;
		},

		Height : function() {
			return this.height;
		},

		setHeight : function( height ) {
			this.height = height;
		},

		getLeft : function() {
			return this.Left;
		},

		getTop : function() {
			return this.Top;
		},

		getRight : function() {
			return this.Right;
		},

		getBottom : function() {
			return this.Bottom;
		},

		InitPlayer : function() {
			var that = this;
			that.setVelocity( 5 );
			that.setVelocityDown( 5 );

			this.element.ready( function() {
				var frameX = 0;

				setInterval( ( function() {
					var x = frameX + that.element.width();
					if ( that.direction == 'right' ) {
						that.element.removeClass( 'direction-left' );
						that.element.css( { "background-position" : "-"+ x +"px 0px" } );
					} else if ( that.direction == 'left' ) {
						that.element.addClass( 'direction-left' );
						that.element.css( {
							"background-position" : "-"+ x +"px 0px"
						} );
					} else if ( that.direction == null ) {
						that.element.css( { "background-position" : "0px 0px" } );
						if ( that.getVelocityDown == 0 ) {
							that.element.css( { "top" : this.getTop() } );
						}
					}
					frameX = x;
					if ( x >= that.frames * that.element.width() )
						frameX = 0;
					that.direction = null;
				} ).bind( this ), 170 );

			} );
		},

		setVelocity : function( velocity ) {
			this.velocity = velocity;
		},

		getVelocity : function() {
			return this.velocity;
		},

		setVelocityDown : function( velocityDown ) {
			this.velocityDown = velocityDown;
		},

		getVelocityDown : function() {
			return this.velocityDown;
		},

		moveLeft : function() {
			this.direction = 'left';
			var left = this.element.position().left;
			if ( left <= 0 ) {
				this.element.css( { "left" : '0px' } );
			} else {
				this.element.css( { "left" : "-="+ this.getVelocity() } );
			}
		},

		moveRight : function() {
			this.direction = 'right';
			var left = this.element.position().left;
			if ( left >= 960 ) {
				this.element.css( { 
					"left" : ( this.element.parent().width() - this.element.width() ) +'px'
				} );
			} else{
				this.element.css( { "left" : "+=" + this.getVelocity() } );
			}
		},

		Intersects : function( obj ) {
			if ( this.getLeft() > obj.getRight() )
				return( false );
			else if ( this.getRight() < obj.getLeft() ) 
				return( false );
			else if ( this.getTop > obj.getBottom() )
				return( false );
			else if ( this.getBottom() < obj.getTop() )
				return( false );
			else
				return( true );
		},

		IntersectBottom : function( obj ) {
			if ( this.getBottom() >= obj.getTop() ) {
				this.setVelocityDown( 0 );
				return( true );
			} else return( false );
		},

		IntersectLeft : function( obj ) {
			if ( this.getLeft() >= obj.getRight() - 5 ) {
				this.setVelocityDown( 5 );
				return( true );
			} else return( false )
		}

	};

} );