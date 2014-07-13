/* --------------------------
an shushi Entity
------------------------ */
game.SushiEntity = me.CollectableEntity.extend({
    init: function(x, y, settings) {
           
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 128;
        settings.spritewidth = settings.height = 128;
         
        // call the parent constructor
        this.parent(x, y , settings);
 
        // walking & jumping speed
        this.setVelocity(4, 0);
         
        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        
        // register mouse event
        me.input.registerPointerEvent("pointerdown", this, this.touch.bind(this), true);
        
        // eaten or not?
        this.notEaten = true;
    },
    
    touch: function(e) {
        if (this.notEaten) {
          console.log("click !");
          this.renderable.alpha= 0;
          this.notEaten = false;
        }
    },
 
    // call by the engine when colliding with another object
    onCollision: function(res, obj) {

    },
 
    // manage the enemy movement
    update: function(dt) {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
 
        if (this.alive) {
            this.walkLeft = false;
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent(dt);
            return true;
        }
        return false;
    }
});