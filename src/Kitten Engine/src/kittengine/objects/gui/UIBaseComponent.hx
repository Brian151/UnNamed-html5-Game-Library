package kittengine.objects.gui;
import kittengine.core.service.GUIManager;
import kittengine.objects.GameObject;
import kittengine.objects.gui.*;
import kittengine.core.api.BasicGraphicsAPI;

/**
 * ...
 * @author Brian
 */
class UIBaseComponent extends GameObject
{
	var width : Int;
	var height : Int;
	var width_scale : Float;
	var width_offset : Int;
	var height_scale : Float;
	var height_offset : Int;
	var posX_scale : Float;
	var posX_offset : Int;
	var posY_scale : Float;
	var posY_offset : Int;
	var posX : Int = 0;
	var posY : Int = 0;
	public var parent : UIBaseComponent;
	var depth:Int; // in UI Heirarchy
	public var children:Array<UIBaseComponent>;
	var root:GUIManager;
	var color:String = "#888888";

	public function new() 
	{
		super();
		children = new Array();
		// depth = parent.get_depth() + 1;
		
	}
	
	public function resize(ws:Float,wo:Int,hs:Float,ho:Int) {
		width_scale = ws;
		width_offset = wo;
		height_scale = hs;
		height_offset = ho;
		calc_size();
	}
	
	public function setPosition(pxs,pxo,pys,pyo) {
		posX_scale = pxs;
		posX_offset = pxo;
		posY_scale = pys;
		posY_offset = pyo;
		untyped __js__("console.log(parent.width,parent.y)");
		posX = Math.floor((posX_scale * parent.width) + posX_offset);
		posY = Math.floor((posY_scale * parent.height) + posY_offset);
	}
	
	function calc_size() {
		width = Math.floor((600 * width_scale) + width_offset);
		height = Math.floor((400 * height_scale) + height_offset);
	}
	
	public function get_depth() : Int {
		return depth;
	}
	
	// get top level component or the manager
	public function get_root_component() : UIBaseComponent {
		if (depth > 1) {
			return parent.get_root_component();
		} else {
			return this;
		}
	}
	
	public function get_manager()
	{
		return root;
	}
	
	public override function tick() {
		// bleh
	}
	
	public override function draw()
	{
		// also bleh...
		// TODO : graphics services... [fun]
		BasicGraphicsAPI.setFillStyle(color);
		BasicGraphicsAPI.fillRect(posX, posY, width, height);
	}
}