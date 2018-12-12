var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1280,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [

      Boot,
      // Boot2,
      Boot3,
      // BootScene,
      World,
      // World2
      World3
      // WorldScene,
    ]
};
var game = new Phaser.Game(config);
