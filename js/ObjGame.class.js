jQuery( function( $ ) {

    $.ObjGame = function( element ) {
        this.element = ( element instanceof $ ) ? element : $( element );
        this.direction;
        this.Left;
        this.Top;
        this.Right;
        this.Bottom;
        this.velocity;
    };

    $.ObjGame.prototype = {

        InitEvents : function() {
            this.setPosition( this.element.position().left, this.element.position().top );
        },

        setPosition : function( left, top ) {
            this.Left = left;
            this.Top = top;
            this.Right = left + this.element.width();
            this.Bottom = top + this.element.height();
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

        Intersects : function( obj ) {
            if ( this.getLeft() > obj.getRight() )
                return( true );
            else if ( this.getRight() < obj.getLeft() )
                return( true );
            else if ( this.getTop > obj.getBottom() )
                return( true );
            else if ( this.getBottom() < obj.getTop() )
                return( true );
            else
                return( false );
        }

    };

} );