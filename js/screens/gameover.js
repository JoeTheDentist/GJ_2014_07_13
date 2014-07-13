game.GameOverScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
        this.background = new me.SpriteObject ( 0,0, me.loader.getImage('background'));
		me.game.world.addChild(this.background, 1);
        
        // add a new renderable component with the scrolling text
        this.text = new (me.Renderable.extend ({
            // constructor
            init : function() {
                this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
                // font for the scrolling text
                this.font = new me.BitmapFont("32x32_font", 32);
                 
                 // a tween to animate the arrow
                this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
         
                this.scroller = "       A GAME BY GUILLAUME, JEREMY, NATHANAEL AND PIERRE-JEAN";
                this.scrollerpos = 600;
            },
             
            // some callback for the tween objects
            scrollover : function() {
                // reset to default value
                this.scrollerpos = 640;
                this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
            },
         
            update : function (dt) {
                return true;
            },
             
            draw : function (context) {
                this.font.draw (context, "GAME OVER\nYOU THROW UP " + game.data.sushi_eaten + " SUSHIS\nYOUR SCORE IS " + game.data.score + " POINTS"
                + "\n\nPRESS ENTER TO RESTART", 20, 240);
                this.font.draw(context, this.scroller, this.scrollerpos, 440);
            },
            onDestroyEvent : function() {
                //just in case
                this.scrollertween.stop();
            }
        }));

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                me.state.change(me.state.PLAY);
            }
        });
        
        me.game.world.addChild(this.text, 2);
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.game.world.removeChild(this.background);
        me.game.world.removeChild(this.text);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
	}
});