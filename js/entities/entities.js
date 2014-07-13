/* --------------------------
an shushi Entity
------------------------ */

game.SushiEntity = me.ObjectEntity.extend({
    init: function init(x, y, image) {
        var settings = {};
		settings.image = me.loader.getImage(image);
		settings.width = 128;
		settings.height = 128;
		settings.spritewidth = 128;
		settings.spriteheight= 128; 
        settings.name = image;
        this.parent(x, y , settings );
 
        // walking & jumping speed
        this.setVelocity(4, 0);
         
        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        
        // register mouse event
		var self = this;
        me.input.registerPointerEvent("pointerdown", this, function ( event ) {
			console.log("touch");
			if (self.notEaten) {
				console.log("clicked");
				self.renderable.alpha = 0;
				self.notEaten = false;
                me.state.current().HUD.check_and_pop(self.name);
			}
        }, true);
        // eaten or not?
        this.notEaten = true;
    },
 
    // call by the engine when colliding with another object
    onCollision: function(res, obj) {

    },
	
 
    // manage the sushi movement
    update: function(dt) {
        if (this.alive) {
            this.walkLeft = false;
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        } else {
			me.game.world.removeChild(this);
			return true;
        }
         
        // check and update movement
        this.updateMovement();
        
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent(dt);
            return true;
        } 
		
		if (this.pos.x > 576) {
			me.game.world.removeChild(this);
		}
        return false;
    }
});

/* --------------------------
an shushi Generator 
------------------------ */
game.SushiGenerator = me.Renderable.extend({
  init: function() {
    this.parent(new me.Vector2d(), 0, 0);
    this.alwaysUpdate = true;
    this.pipeFrequency = 64;
	this.alpha  = 0;
	this.generate = 0;
	this.sushis = [];
  },

  update: function(dt) {
    if (this.generate++ % this.pipeFrequency == 0) {
	    rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
		var sushi = new game.SushiEntity(0, 225, "sushi_" + rand);
		me.game.world.addChild(sushi, 10);
		this.sushis.push(sushi);
		if (this.sushis.length > 5) {
			me.game.world.removeChild(this.sushis.shift());
		}
    }
    return true;
  }

});