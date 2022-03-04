package kittengine.objects.gui;
import js.Browser;
import js.lib.Error;
import kittengine.objects.GameObject;
import kittengine.core.api.BasicGraphicsAPI;

/**
 * ...
 * @author Brian
 */

 // do i need the GameObject type to exist?
class UIBaseComponent extends GameObject
{
	public var width : Int;
	public var height : Int;
	var width_scale : Float;
	var width_offset : Int;
	var height_scale : Float;
	var height_offset : Int;
	var posX_scale : Float;
	var posX_offset : Int;
	var posY_scale : Float;
	var posY_offset : Int;
	public var posX : Int = 0;
	public var posY : Int = 0;
	var parent : UIBaseComponent;
	var depth:Int; // in UI Heirarchy
	var children:Array<UIBaseComponent>;
	var root:UIBaseComponent;
	var color:String = "#888888";
	public var visible:Bool;

	public function new() {
		super();
		children = new Array();
		depth = 0;
		root = this;
		visible = true;
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
		// untyped __js__("console.log(parent.width,parent.y)");
		if (depth > 0) {
			posX = Math.floor((posX_scale * parent.width) + posX_offset + parent.posX);
			posY = Math.floor((posY_scale * parent.height) + posY_offset + parent.posY);
		} else {
			posX = Math.floor(posX_offset);
			posY = Math.floor(posY_offset);
		}
		
	}
	
	function calc_size() {
		if (depth > 0) {
			width = Math.floor((parent.width * width_scale) + width_offset);
			height = Math.floor((parent.height * height_scale) + height_offset);
		} else {
			width = width_offset;
			height = height_offset;
		}
		
	}
	
	public function get_depth() : Int {
		return depth;
	}
	
	// get top level component or the manager
	public function get_root_component() : UIBaseComponent {
		if (depth > 0) {
			return parent.get_root_component();
		} else {
			return this;
		}
	}
	
	public override function tick() {
		// bleh
	}
	
	public override function draw()
	{
		// also bleh...
		
		if (depth > 0 || visible) {
			BasicGraphicsAPI.setFillStyle(color);
			BasicGraphicsAPI.fillRect(posX, posY, width, height);
		}
		for (i in 0...children.length) {
			children[i].draw();
		}
	}
	
	public function addChild(c:UIBaseComponent) {
		if (c != this) {
			c.depth = depth + 1;
			c.root = this.get_root_component();
			c.parent = this;
			Browser.console.log(c.depth);
			this.children.push(c);
		} else {
			// for the love of... DON'T DO THIS!
			throw new Error("attempted to set a UI component's parent as itself");
		}
	}
}