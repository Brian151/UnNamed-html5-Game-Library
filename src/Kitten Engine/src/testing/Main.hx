package testing;
import js.html.Image;
import kittengine.objects.gui.components.UIPanelSkin;
import testing.demo1.obj.SquareManager;
import kittengine.core.Game;
import kittengine.objects.sprites.SimpleSprite;
import kittengine.objects.gui.UIBaseComponent;
import kittengine.core.service.GUIManager;

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
			var ui3:GUIManager = new GUIManager();
			/*ui.resize(0, 200, 0, 100);
			ui.parent = ui3;
			ui.setPosition(0, 20, 0, 20);
			ui3.children.push(ui);
			ui2.resize(0,200,0,100);
			ui2.setBorders(10, 3, 3, 3);
			ui.children.push(ui2);*/
			game.gameObjects.push(new SquareManager(game, spr));
			//game.gameObjects.push(ui3);
			game.run(0);
		}
		image.src = "assets/demo1_prototype/spritetest.png";
	}
	
}