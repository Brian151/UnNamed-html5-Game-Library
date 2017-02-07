This project started in late 2015 as an attempt to make a very basic html5 game engine.
All of my previous attempts to actually code any kind of game in language, or with 
any library, have failed. In this folder are some tech demos of various features. 
Every time a new feature is added, there probably will be a tech demo for it.

[list]

tech demo 1 : 
The first "version" of the library.
This didn't do much, it was purely proof of concept.
file: game.html

tech demo 2 : 
WIP
not on github yet
license*: free to research, re-distribution or adaptation not permitted.
The goal was to actually flesh-out the asset manager and add image assets.
At first, this didn't go over too well, but in the end, I managed to pull it off.
The other goal, ofc, was to make an actual game.
One other driving force for this was I wanted to make a present for the LEGO Mars Mission fan wiki
(http://marsmissionwiki.wikifoundry.com)
Link to .html : http://crystalien-redux.com/unrelated/ETX/games/conceptual-crap/HTML5GAME/gameXMAS.html
*A few reasons, including the usage of artwork I did not create, nor do I technically own, have me
in a diffuclt position. I need to create some special license terms just for it.

tech demo 3 :
question "Prototype preformance boosts?"
A quick edit of the original script to see if any perforamnce boost was granted by declaring 
methods using prototype**. The results seemed to conclude it was a good idea.
This is the only tech demo to date that hasn't seen any public release...until now.
file: gameP.html
**prototype was only applied to the SquareBro object.

tech demo 4 :
UI Component System (which is still very WIP)
Goal was to add UI components that can be skinned using slice-9 and slice-3 images,
or even, colors. It currently only supports slice-9, and it doesn't actually interact with 
the user much, except for some stuff being resize-able or move-able with the mouse. 
This also was an experiment with protype inheritance, which worked-out. One other nice 
feature is that it does properly z-sort the top-level UI Components 
(that may or may not be used as panes, in this example, they all are). The utlity function
checkNull was added, but also doesn't yet work 100% of the time.
asset credits: 
Skin images ripped from Windows XP and Windows 8, and re-colored a bit
BG Image is a colorized version of the hexorium glow texture from HexCraft
(https://github.com/CelesTek-Team/HexCraft)
Far as I know, the skin images cannot be used commercially, or at least, it's not advised
file: gameUI.html

tech demo 5 :
Addded the txt asset type
Added a very basic sprite API that does partially mimick the Flash MovieClip API...at a
very basic level. (Like most other features, this part is still WIP.) This also is where I seriously started
to re-structure the entire library. Two more utility functions which are applied as methods to Math
were added. I found these somewhere on the internet. Math.radians(), and Math.degrees() . Both of
these convert from one to the other (as would be expected). I have actually used them in 
another project that may or may not get merged into this one. Said project is an experiment 
with drawing vector shapes.
credits: HexCraft's Hexorium Glow used again.
file: gameSprite.html
standardization progress:
	Sprite,SpriteSheet - ~85%

tech demo 6 :
Testing the ability to render UI themes similar to that of the Aero theme,
aka: the theme used in Windows Vista and Windows 7. 
status: WIP(?)
next step: fix what seems to be a bug(?)
finished: titlebar effect, colorization and opacity filter
file : gameUIAero.html
credits/license:
code is free to modify and extend, crediting me (https://github.com/Brian151)
However, using the original Windows Aero assets is not recommended, 
commercially, anyways. I technically do not have permission to dictate what you
do with them (if anything) , but if developing a commercial application, you might or
might not get sued by microsoft for using their copyrighted assets. I chose to
use the Aero assets because, A: I love that theme's appearance, and B: I am
trying to re-produce one of its cool window effects, the gradient pattern overlay.
Other notes:
1. The official in-library name of this UI effect is undecided.
2. Until feature is completed, it is not an official feature of
the UI API in my game library, sorry.

tech demo 7 :
Purpose: 
1] test progress meter classes
2] test dynamic script loading via the script importer util
directory: 0_7_0
notes: 
not runnable as-is. Keeping different versions of the library 
in the demo directory would start taking up a lot of space.
Should work with any version of the library 0.7.0 and up.
This will change in the future as I standardize other features,
thus the other tech demos start using the same exact library code.

tech demo 8 :
Purpose:
Test version-checking class
file : VersionCheck.html
notes:
same as 7