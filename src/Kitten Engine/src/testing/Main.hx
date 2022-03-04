package testing;
import js.html.Image;
import kittengine.core.Game;
import kittengine.objects.gui.components.UIPanelSkin;
import kittengine.objects.gui.UIBaseComponent;
import kittengine.objects.sprites.SimpleSprite;
import testing.demo1.obj.SquareManager;


/**
 * ...
 * @author Brian
 */
class Main 
{

	static function main()
	// TODO : make GUI demo its own package
	{
		var game = new Game();
		var image:Image = new Image();
		image.onload = function() {
			var spr = new SimpleSprite(image, 64, 64);
			game.init();
			var ui:UIBaseComponent = new UIBaseComponent();
			var ui2:UIPanelSkin = new UIPanelSkin();
			var ui3:UIBaseComponent = new UIBaseComponent();
			ui3.visible = false;
			ui3.resize(0, 600, 0, 400); // todo : no magic numbers!
			ui3.addChild(ui);
			ui.addChild(ui2);
			ui.resize(0, 200, 0, 100);
			ui.setPosition(0, 100, 0, 100);
			ui2.setBorders(16, 4, 4, 4);
			ui2.setPosition(0, 0, 0, 0);
			ui2.resize(1, 0, 1, 0);
			game.gameObjects.push(new SquareManager(game, spr));
			game.gameObjects.push(ui3);
			game.run(0);
		}
		image.src = "assets/demo1_prototype/spritetest.png";
	}
	
}