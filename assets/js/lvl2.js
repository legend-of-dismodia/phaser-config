var Boot2 = new Phaser.Class({

  Extends: Phaser.Scene,

    initialize:

    function Boot2 ()
    {
        Phaser.Scene.call(this, { key: 'Boot2' });
    },

    preload: function (){

  //------------------insère les liens de tous ce qu'on a besoin---------------//
      this.load.tilemapTiledJSON("map2", "assets/map/niveau2.json");

      this.load.image("tiles15", "assets/tilesets/Inside_A2.png");
      this.load.image("tiles16", "assets/tilesets/Inside_A4.png");
      this.load.image("tiles17", "assets/tilesets/Outside_A4.png");
      this.load.image("tiles18", "assets/tilesets/Inside_B.png");
      this.load.image("tiles19", "assets/tilesets/SF_Outside_C.png");

      this.load.spritesheet("escalier2", "../Boss_final/assets/tilesets/Inside_B.png", { frameWidth: 48, frameHeight: 48});
      this.load.spritesheet('princess', '../Boss_final/assets/spritesheet/princessfinal clone.png', { frameWidth: 80, frameHeight: 80});


    },

      create: function (){

      this.scene.start('World2');

      },

    });


    var World2 = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function World2 ()
        {
            Phaser.Scene.call(this, { key: 'World2' });
        },

        preload: function (){

      //-------------------il n y a rien c'est normal-----------------------------//

      },


        create:function () {

        //-------------------------on affiche la map--------------------------------//
        //----------------------bien respecter l'ordre des calques------------------//

        const map = this.make.tilemap({ key: "map2" });

        const tiles15 = map.addTilesetImage("Inside_A2", "tiles15");
        const tiles16 = map.addTilesetImage("Dungeon_A4", "tiles16");
        const tiles17= map.addTilesetImage("Outside_A4", "tiles17");
        const tiles18 = map.addTilesetImage("Inside_B", "tiles18");
        const tiles19= map.addTilesetImage("SF_Outside_C", "tiles19");

      //---------------------------ce sont les calques------------------------------//

        const sol = map.createDynamicLayer("sol", tiles15);
        const murs = map.createDynamicLayer("murs", tiles16);
        const objets2 = map.createDynamicLayer("objets 2", tiles17);
        const objets = map.createDynamicLayer("objets", tiles19);


      //----------------------créer l'animation du personnage-----------------------//

        const anims = this.anims;

        anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('princess', { start: 19, end: 25 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('princess', { start: 11, end: 17 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "up",
          frames: anims.generateFrameNames("princess", {start: 2, end: 9}),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "down",
          frames: anims.generateFrameNames("princess",{ start: 26, end: 32}),
          frameRate: 10,
          repeat: -1
        });


      //--------------------------gérer les colisions---------------------------------//
      //
      // mur.setCollisionByExclusion([-1]);


      //----------sert à définir la position du personnage sur la map--------------//

      const spawnPoint = map.findObject("character", obj => obj.name === "Spawn Point");
      player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y);


      //-------------------------on affiche le personnage--------------------------//

      cursors = this.input.keyboard.createCursorKeys();
      showDebug = false;

      //-------------------pour éviter que le personnage sorte du cadre---------------//

      player.setCollideWorldBounds(true);
murs.setCollisionByExclusion([-1]);
objets.setCollisionByExclusion([-1]);
objets2.setCollisionByExclusion([-1]);
     player.setDepth(10);

     this.physics.add.collider(player, murs);




      //--------verifier si phaser a bien pris en compte les colisions--------------//

      // this.input.keyboard.once("keydown_D", event => {
      //     // Turn on physics debugging to show player's hitbox
      //     this.physics.world.createDebugGraphic();


      //     const graphics = this.add
      //       .graphics()
      //       .setAlpha(0.75)
      //       .setDepth(20);
      //     mur.renderDebug(graphics, {
      //     tileColor: null, // Color of non-colliding tiles
      //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),// Color of colliding tiles
      //    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      //  });
      //
      // objet.renderDebug(graphics, {
      //    tileColor: null, // Color of non-colliding tiles
      //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });
      //
      // mur2.renderDebug(graphics, {
      //    tileColor: null, // Color of non-colliding tiles
      //    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),// Color of colliding tiles
      //    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });
      // });

       // escalier = this.physics.add.sprite(1032, 407, "escalier", 20);
       // this.physics.add.overlap(player, escalier, collisionStairs, null, this);

       escalier2 = this.physics.add.sprite(850, 158, "escalier2", 20);
       this.physics.add.overlap(player, escalier2, collisionStairs2, null, this);

      },


      //---------------------------quand le perso bouge---------------------------//



    update: function (){

      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
      }

      else if (cursors.up.isDown)
      {
          player.setVelocityY(-160);

          player.anims.play('up', true);
      }
      else if (cursors.down.isDown)
      {
          player.setVelocityY(160);

          player.anims.play('down', true);
      }
      else
      {

      player.setVelocityX(0);
      player.setVelocityY(0);

    }

 }


         });

         function collisionStairs2(player, escalier2)
                     {
             console.log( this.scene );
             this.scene.switch('Boot3');


         }
