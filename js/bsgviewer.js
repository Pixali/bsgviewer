/// <reference path="three.js" />
/// <reference path="OBJLoader.js" />
/// <reference path="xml2json.js" />
/// <reference path="OrbitControls.js" />

var bsgPath = "bsg/testbsg.bsg";

var bsgObjectDefs = {
    "0": { "name": "StartingBlock", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 4.875, "y": 4.875, "z": 4.875 }, "objpath": "Skins/Template/StartingBlock/startblock.obj", "texpath": "Skins/Template/StartingBlock/startblocktex_png.png" },
    "1": { "name": "DoubleWoodenBlock", "pos": { "x": 0, "y": 0, "z": 0.5 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.5, "z": 0.5 }, "objpath": "Skins/Template/DoubleWoodenBlock/doublewood.obj", "texpath": "Skins/Template/DoubleWoodenBlock/woodmetal_png.png" },
    "2": { "name": "Wheel", "pos": { "x": 0, "y": 0, "z": 0.1652584 }, "rot": { "x": 1, "y": 0, "z": 0, "w": 1.293876E-06 }, "scale": { "x": 0.95, "y": 0.95, "z": 1.365625 }, "objpath": "Skins/Template/Wheel/wheel.obj", "texpath": "Skins/Template/Wheel/wheeltex_png.png" },
    "3": { "name": "MetalBlade", "pos": { "x": 0, "y": 0.0014925, "z": 0.6514261 }, "rot": { "x": 0.707106, "y": 0, "z": 0, "w": 0.7071076 }, "scale": { "x": 0.52729, "y": 0.5272901, "z": 0.5272901 }, "objpath": "Skins/Template/MetalBlade/blade.obj", "texpath": "Skins/Template/MetalBlade/bladetex_png.png" },
    "4": { "name": "Decoupler", "pos": { "x": 0, "y": 0, "z": 0.3485764 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071067 }, "scale": { "x": 0.4940817, "y": 0.4940817, "z": 0.4940817 }, "objpath": "Skins/Template/Decoupler/decoupler.obj", "texpath": "Skins/Template/Decoupler/metalmetal_png.png" },
    "5": { "name": "Hinge", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0, "y": -1, "z": 0, "w": 1.840502E-06 }, "scale": { "x": 0.6077, "y": 0.6076998, "z": 0.6076998 }, "objpath": "Skins/Template/Hinge/hinge.obj", "texpath": "Skins/Template/Hinge/metalmetal_png.png" },
    "6": { "name": "MetalBall", "pos": { "x": 0.04866147, "y": 0, "z": 1.01745 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071067 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/MetalBall/spikeball.obj", "texpath": "Skins/Template/MetalBall/spikeballtex_png.png" },
    //"8": { "name": "Unused", "pos": { "x": 0, "y": -5.866983E-08, "z": 0.4921582 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.4999999, "z": 0.4999999 }, "objpath": "Skins/Template/Unused/unused.obj", "texpath": "Skins/Template/Unused/unusedtex_png.png" },
    "10": { "name": "WoodenPanel", "pos": { "x": 0, "y": -0.9783106, "z": 0.06599998 }, "rot": { "x": 0, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/WoodenPanel/panel.obj", "texpath": "Skins/Template/WoodenPanel/panel_png.png" },
    "11": { "name": "Cannon", "pos": { "x": 0, "y": 0.0422553, "z": 0.317178 }, "rot": { "x": -3.090859E-08, "y": 0.7071077, "z": 0.707106, "w": -3.090866E-08 }, "scale": { "x": 0.297578, "y": 0.2975781, "z": 0.2975781 }, "objpath": "Skins/Template/Cannon/cannon.obj", "texpath": "Skins/Template/Cannon/darkmetal_png.png" },
    //"12": { "name": "Unused2", "pos": { "x": 0, "y": -5.866983E-08, "z": 0.4921582 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.4999999, "z": 0.4999999 }, "objpath": "Skins/Template/Unused2/unused2.obj", "texpath": "Skins/Template/Unused2/unused2tex_png.png" },
    "13": { "name": "SteeringBlock", "pos": { "x": 0, "y": 1.126949E-08, "z": 0.5571556 }, "rot": { "x": 1, "y": 0, "z": 0, "w": 9.315281E-07 }, "scale": { "x": 0.335099, "y": 0.335099, "z": 0.335099 }, "objpath": "Skins/Template/SteeringBlock/steeringblock.obj", "texpath": "Skins/Template/SteeringBlock/metalmetal_png.png" },
    "15": { "name": "SingleWoodenBlock", "pos": { "x": 0, "y": 0, "z": 0.5 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.4999999, "z": 0.4999999 }, "objpath": "Skins/Template/SingleWoodenBlock/singlewood.obj", "texpath": "Skins/Template/SingleWoodenBlock/woodmetal_png.png" },
    "16": { "name": "Suspension", "pos": { "x": 0, "y": 0, "z": 0.623455 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.4051183, "y": 0.4051183, "z": 0.4051183 }, "objpath": "Skins/Template/Suspension/suspension.obj", "texpath": "Skins/Template/Suspension/metalmetal_png.png" },
    "17": { "name": "CircularSaw", "pos": { "x": 0, "y": 0, "z": 0.3428955 }, "rot": { "x": -0.707107, "y": 0, "z": 0, "w": 0.7071066 }, "scale": { "x": 0.929824, "y": 0.9298239, "z": 0.9298239 }, "objpath": "Skins/Template/CircularSaw/saw.obj", "texpath": "Skins/Template/CircularSaw/sawtex_png.png" },
    "18": { "name": "Piston", "pos": { "x": 0, "y": 0, "z": -0.406875 }, "rot": { "x": 0.707106, "y": 0, "z": 0, "w": 0.7071076 }, "scale": { "x": 0.4143265, "y": 0.4143264, "z": 0.4143264 }, "objpath": "Skins/Template/Piston/piston.obj", "texpath": "Skins/Template/Piston/metalmetal_png.png" },
    "19": { "name": "Swivel", "pos": { "x": 0, "y": -4.470348E-07, "z": 0.5070467 }, "rot": { "x": 0.707106, "y": 0, "z": 0, "w": 0.7071076 }, "scale": { "x": 0.5201194, "y": 0.5201194, "z": 0.5201194 }, "objpath": "Skins/Template/Swivel/swivel.obj", "texpath": "Skins/Template/Swivel/swiveltex_png.png" },
    "20": { "name": "Spike", "pos": { "x": 0, "y": 0, "z": 0.9961691 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.6438569, "y": 0.595993, "z": 0.6438569 }, "objpath": "Skins/Template/Spike/spike.obj", "texpath": "Skins/Template/Spike/metal_png.png" },
    "21": { "name": "Flamethrower", "pos": { "x": 0.0001522064, "y": 0, "z": 0.426198 }, "rot": { "x": -3.160865E-06, "y": -0.7071076, "z": -0.707106, "w": 1.5641E-06 }, "scale": { "x": 0.3154398, "y": 0.3154399, "z": 0.3154399 }, "objpath": "Skins/Template/Flamethrower/flamethrower.obj", "texpath": "Skins/Template/Flamethrower/flamethrowertex_png.png" },
    "22": { "name": "SpinningBlock", "pos": { "x": 0, "y": 0, "z": 0.5 }, "rot": { "x": -2.938764E-07, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 0.3501763, "y": 0.3501763, "z": 0.3501763 }, "objpath": "Skins/Template/SpinningBlock/spinningblock.obj", "texpath": "Skins/Template/SpinningBlock/metalmetal_png.png" },
    "23": { "name": "Bomb", "pos": { "x": 0, "y": 0, "z": 0.9991226 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.7, "y": 0.7, "z": 0.7 }, "objpath": "Skins/Template/Bomb/bomb.obj", "texpath": "Skins/Template/Bomb/bombnotex_png.png" },
    "24": { "name": "ArmorPlateSmall", "pos": { "x": 0, "y": 0, "z": 0.05188822 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.5, "z": 0.5 }, "objpath": "Skins/Template/ArmorPlateSmall/armorplatesmall.obj", "texpath": "Skins/Template/ArmorPlateSmall/armorplatesmalltex_png.png" },
    "25": { "name": "Wing", "pos": { "x": -0.03579378, "y": 0, "z": 0 }, "rot": { "x": 0.5000001, "y": 0.5, "z": 0.5, "w": 0.4999999 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/Wing/wing.obj", "texpath": "Skins/Template/Wing/wingtex_png.png" },
    "26": { "name": "Propeller", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": -0.1993679, "y": 0.9799247, "z": 3.248116E-08, "w": -1.5965E-07 }, "scale": { "x": 0.6941729, "y": 0.761317, "z": 0.4499473 }, "objpath": "Skins/Template/Propeller/propeller.obj", "texpath": "Skins/Template/Propeller/propellertex_png.png" },
    "27": { "name": "Grabber", "pos": { "x": 2.264977E-06, "y": 9.834766E-07, "z": 0.8785169 }, "rot": { "x": 0.4999991, "y": -0.4999996, "z": -0.5000004, "w": 0.500001 }, "scale": { "x": 0.494082, "y": 0.494082, "z": 0.494082 }, "objpath": "Skins/Template/Grabber/grabber.obj", "texpath": "Skins/Template/Grabber/grabbertex_png.png" },
    "28": { "name": "SteeringHinge", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 1, "y": 0, "z": 0, "w": 1.293876E-06 }, "scale": { "x": 0.6, "y": 0.6, "z": 0.6 }, "objpath": "Skins/Template/SteeringHinge/steeringhinge.obj", "texpath": "Skins/Template/SteeringHinge/steeringhingetex_png.png" },
    "29": { "name": "ArmorPlateRound", "pos": { "x": 0, "y": 0, "z": 0.2906733 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.7396067, "y": 0.7396067, "z": 0.7396067 }, "objpath": "Skins/Template/ArmorPlateRound/armorplateround.obj", "texpath": "Skins/Template/ArmorPlateRound/armorplateroundtex_png.png" },
    "30": { "name": "BombHolder", "pos": { "x": 0, "y": 0, "z": 0.3485764 }, "rot": { "x": 0, "y": -0.707106, "z": 0, "w": 0.7071076 }, "scale": { "x": 0.4940817, "y": 0.4940817, "z": 0.4940817 }, "objpath": "Skins/Template/BombHolder/bombholder.obj", "texpath": "Skins/Template/BombHolder/metalmetal_png.png" },
    "31": { "name": "FlameBall", "pos": { "x": 0, "y": 0, "z": 0.969149 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.845, "y": 0.845, "z": 0.845 }, "objpath": "Skins/Template/FlameBall/flameball.obj", "texpath": "Skins/Template/FlameBall/flameballtex_png.png" },
    "32": { "name": "ArmorPlateLarge", "pos": { "x": 0, "y": 0, "z": 0.05188823 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.5, "z": 0.5 }, "objpath": "Skins/Template/ArmorPlateLarge/armorplatelarge.obj", "texpath": "Skins/Template/ArmorPlateLarge/armorplatelargetex_png.png" },
    "33": { "name": "Plow", "pos": { "x": 1.883738E-07, "y": 0, "z": 0.5267314 }, "rot": { "x": 0, "y": -0.7071066, "z": 0, "w": 0.7071069 }, "scale": { "x": 0.2440893, "y": 0.2440893, "z": 0.2440893 }, "objpath": "Skins/Template/Plow/plow.obj", "texpath": "Skins/Template/Plow/plowtex_png.png" },
    "34": { "name": "WingPanel", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0.5, "y": 0.5, "z": 0.5, "w": 0.5 }, "scale": { "x": 0.5000001, "y": 0.5, "z": 0.5000001 }, "objpath": "Skins/Template/WingPanel/wingpanel.obj", "texpath": "Skins/Template/WingPanel/wingpaneltex_png.png" },
    "35": { "name": "Ballast", "pos": { "x": 0, "y": 0, "z": 0.5 }, "rot": { "x": 0, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 0.4333429, "y": 0.4333428, "z": 0.4333428 }, "objpath": "Skins/Template/Ballast/ballast.obj", "texpath": "Skins/Template/Ballast/ballasttex_png.png" },
    "36": { "name": "Boulder", "pos": { "x": 0.002133574, "y": 0.0008690357, "z": 0.999558 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.9183035, "y": 0.9183035, "z": 0.9183035 }, "objpath": "Skins/Template/Boulder/boulder.obj", "texpath": "Skins/Template/Boulder/bouldertex_png.png" },
    "37": { "name": "HalfPipe", "pos": { "x": 0, "y": 0, "z": 1 }, "rot": { "x": 0.7071063, "y": -6.172251E-08, "z": -6.471782E-08, "w": 0.7071073 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/HalfPipe/halfpipe.obj", "texpath": "Skins/Template/HalfPipe/halfpipetex_png.png" },
    "38": { "name": "CogMediumUnpowered", "pos": { "x": 0, "y": 1.358525E-06, "z": 0.5249825 }, "rot": { "x": 0.982449, "y": -0.1865316, "z": 5.256422E-07, "w": 8.153573E-09 }, "scale": { "x": 0.7592531, "y": 0.7592529, "z": 0.7592529 }, "objpath": "Skins/Template/CogMediumUnpowered/cogunpowered.obj", "texpath": "Skins/Template/CogMediumUnpowered/cogunpoweredtex_png.png" },
    "39": { "name": "CogMediumPowered", "pos": { "x": 0, "y": 1.358525E-06, "z": 0.5249825 }, "rot": { "x": 0.982449, "y": -0.1865316, "z": 5.256422E-07, "w": 8.153573E-09 }, "scale": { "x": 0.7592531, "y": 0.7592529, "z": 0.7592529 }, "objpath": "Skins/Template/CogMediumPowered/cogpowered.obj", "texpath": "Skins/Template/CogMediumPowered/cogpoweredtex_png.png" },
    "40": { "name": "WheelUnpowered", "pos": { "x": 0, "y": 0, "z": 0.1652584 }, "rot": { "x": 1, "y": 5.644104E-13, "z": 4.362167E-07, "w": 1.293876E-06 }, "scale": { "x": 0.7170968, "y": 0.7170968, "z": 0.7170968 }, "objpath": "Skins/Template/WheelUnpowered/wheelunpowered.obj", "texpath": "Skins/Template/WheelUnpowered/wheelunpoweredtex_png.png" },
    "41": { "name": "WoodenPole", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.5, "y": 0.4999999, "z": 0.4999999 }, "objpath": "Skins/Template/WoodenPole/woodenpole.obj", "texpath": "Skins/Template/WoodenPole/woodenpoletex_png.png" },
    "42": { "name": "Slider", "pos": { "x": 0, "y": -4.689969E-08, "z": 0.5 }, "rot": { "x": 1.477368E-07, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 0.5161913, "y": 0.5161911, "z": 0.5161911 }, "objpath": "Skins/Template/Slider/slider.obj", "texpath": "Skins/Template/Slider/slidertex_png.png" },
    "43": { "name": "Balloon", "pos": { "x": 0, "y": 0, "z": 1.080837 }, "rot": { "x": -0.6809976, "y": 0.1903743, "z": 0.1903743, "w": -0.6809976 }, "scale": { "x": 0.756782, "y": 0.7567818, "z": 0.7567818 }, "objpath": "Skins/Template/Balloon/balloon.obj", "texpath": "Skins/Template/Balloon/balloontex_png.png" },
    "44": { "name": "BallJoint", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0.4999991, "y": -0.4999991, "z": -0.500001, "w": 0.500001 }, "scale": { "x": 0.5, "y": 0.5, "z": 0.5 }, "objpath": "Skins/Template/BallJoint/balljoint.obj", "texpath": "Skins/Template/BallJoint/balljointtex_png.png" },
    "46": { "name": "LargeWheel", "pos": { "x": 0, "y": 2.099629E-07, "z": 0.4583082 }, "rot": { "x": -0.7071068, "y": 0, "z": 0, "w": 0.7071067 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/LargeWheel/largewheel.obj", "texpath": "Skins/Template/LargeWheel/largewheeltex_png.png" },
    "47": { "name": "Torch", "pos": { "x": 1.494135E-08, "y": 0.01838541, "z": 0.04177904 }, "rot": { "x": 0, "y": 1, "z": 0, "w": -8.42937E-08 }, "scale": { "x": 0.2290106, "y": 0.2290106, "z": 0.2290106 }, "objpath": "Skins/Template/Torch/torch.obj", "texpath": "Skins/Template/Torch/torchtex_png.png" },
    "48": { "name": "Drill", "pos": { "x": 0, "y": 5.491339E-07, "z": 0.2122049 }, "rot": { "x": 3.090862E-08, "y": 0.7071068, "z": 0.7071068, "w": -3.090862E-08 }, "scale": { "x": 0.7, "y": 0.7, "z": 0.7 }, "objpath": "Skins/Template/Drill/drill.obj", "texpath": "Skins/Template/Drill/drilltex_png.png" },
    "49": { "name": "GripPad", "pos": { "x": -0.002750303, "y": -0.004072905, "z": 0.2618589 }, "rot": { "x": -0.5000013, "y": -0.4999987, "z": 0.5000014, "w": 0.4999986 }, "scale": { "x": 1.02003, "y": 1.02003, "z": 1.02003 }, "objpath": "Skins/Template/GripPad/grippad.obj", "texpath": "Skins/Template/GripPad/grippadtex_png.png" },
    "51": { "name": "CogLargeUnpowered", "pos": { "x": -1.907349E-06, "y": 1.36973E-06, "z": 0.5293124 }, "rot": { "x": 0.7037177, "y": -0.0691478, "z": -0.06914745, "w": 0.7037177 }, "scale": { "x": 0.7592529, "y": 0.7592529, "z": 0.7592529 }, "objpath": "Skins/Template/CogLargeUnpowered/coglarge.obj", "texpath": "Skins/Template/CogLargeUnpowered/coglargetex_png.png" },
    //"52": { "name": "Unused3", "pos": { "x": 2.738541E-06, "y": 1.144409E-05, "z": 0.0143978 }, "rot": { "x": -0.1993679, "y": 0.9799247, "z": 3.248116E-08, "w": -1.5965E-07 }, "scale": { "x": 0.6425632, "y": 0.7047153, "z": 0.3452507 }, "objpath": "Skins/Template/Unused3/unused3.obj", "texpath": "Skins/Template/Unused3/unused3tex_png.png" },
    "53": { "name": "ShrapnelCannon", "pos": { "x": 0, "y": 0.0107822, "z": 0.6404025 }, "rot": { "x": -3.805949E-07, "y": -0.707107, "z": -0.7071066, "w": -3.825606E-07 }, "scale": { "x": 0.3572383, "y": 0.3572382, "z": 0.3572382 }, "objpath": "Skins/Template/ShrapnelCannon/shrapnelcannon.obj", "texpath": "Skins/Template/ShrapnelCannon/shrapnelcannontex_png.png" },
    "54": { "name": "Grenade", "pos": { "x": 0, "y": 0, "z": 0.7089567 }, "rot": { "x": 0.7071068, "y": 0, "z": 0, "w": 0.7071068 }, "scale": { "x": 0.4985441, "y": 0.498544, "z": 0.498544 }, "objpath": "Skins/Template/Grenade/grenade.obj", "texpath": "Skins/Template/Grenade/grenadetex_png.png" },
    "55": { "name": "SmallPropeller", "pos": { "x": 2.738541E-06, "y": 1.144409E-05, "z": 0.0143978 }, "rot": { "x": -0.1993679, "y": 0.9799247, "z": 3.248116E-08, "w": -1.5965E-07 }, "scale": { "x": 0.6425632, "y": 0.7047153, "z": 0.3452507 }, "objpath": "Skins/Template/SmallPropeller/smallpropeller.obj", "texpath": "Skins/Template/SmallPropeller/smallpropellertex_png.png" },
    "56": { "name": "WaterCannon", "pos": { "x": 0, "y": -0.07700001, "z": 0.6380001 }, "rot": { "x": -3.501757E-07, "y": -0.7071073, "z": -0.7071064, "w": -6.354434E-07 }, "scale": { "x": 0.2948551, "y": 0.2948552, "z": 0.2948552 }, "objpath": "Skins/Template/WaterCannon/watercannon.obj", "texpath": "Skins/Template/WaterCannon/watercannontex_png.png" },
    //"57": { "name": "Pin", "pos": { "x": 0, "y": -0.0539999, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0, "w": 1 }, "scale": { "x": 0.120271, "y": 0.120271, "z": 0.120271 }, "objpath": "Skins/Template/Pin/pin.obj", "texpath": "Skins/Template/Pin/pintex_png.png" },
    //"58": { "name": "CameraBlock", "pos": { "x": 0, "y": 0, "z": 0 }, "rot": { "x": 0.7071068, "y": 1.485349E-15, "z": -1.485349E-15, "w": 0.7071068 }, "scale": { "x": 0.6962658, "y": 0.5275334, "z": 0.6962659 }, "objpath": "Skins/Template/CameraBlock/camerablock.obj", "texpath": "Skins/Template/CameraBlock/camerablocktex_png.png" },
    "59": { "name": "Rocket", "pos": { "x": 0, "y": -0.2777042, "z": 0.4999999 }, "rot": { "x": 0, "y": 1, "z": 0, "w": -1.629207E-07 }, "scale": { "x": 0.4564806, "y": 0.4564806, "z": 0.4564807 }, "objpath": "Skins/Template/Rocket/rocket.obj", "texpath": "Skins/Template/Rocket/rockettex_png.png" },
    "60": { "name": "LargeWheelUnpowered", "pos": { "x": 0, "y": 2.099629E-07, "z": 0.4583082 }, "rot": { "x": -0.7071068, "y": 0, "z": 0, "w": 0.7071067 }, "scale": { "x": 1, "y": 1, "z": 1 }, "objpath": "Skins/Template/LargeWheelUnpowered/largewheelunpowered.obj", "texpath": "Skins/Template/LargeWheelUnpowered/largewheelunpoweredtex_png.png" }
}
var bsgPrefabs = {};

var objLoader = new THREE.OBJLoader();
var imgLoader = new THREE.ImageLoader();

function createBsgObject(id) {
    var od = bsgObjectDefs[id];
    var name = od.name;
    var objpath = od.objpath;
    var texpath = od.texpath;
    var nPos = new THREE.Vector3(Number(od.pos.x), Number(od.pos.y), Number(od.pos.z));
    var nRot = new THREE.Quaternion(Number(od.rot.x), Number(od.rot.y), Number(od.rot.z), Number(od.rot.w));
    var nScale = new THREE.Vector3(Number(od.scale.x), Number(od.scale.y), Number(od.scale.z));


    var tex = new THREE.Texture();
    imgLoader.load(texpath, function (image) {
        tex.image = image;
        tex.needsUpdate = true;
    });
    objLoader.load(objpath, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = tex;
            }
        });
        object.position.copy(nPos);
        object.quaternion.copy(nRot);
        object.scale.copy(nScale);
        bsgPrefabs[id] = {
            "obj": object,
            "name": name
        };
    });
}

var divElem = document.getElementById("RenderContainer");
var dWidth = divElem.clientWidth;
var dHeight = divElem.clientHeight;
var aspect = dWidth / dHeight;
var frustrumSize = 1000;

for (var id in bsgObjectDefs) {
    createBsgObject(id);
}

var scene = new THREE.Scene();
//var camera = new THREE.OrthographicCamera(frustrumSize * aspect / -4, frustrumSize * aspect / 4, frustrumSize / 4, frustrumSize / -4, frustrumSize / -2, frustrumSize);
//var camera3 = new THREE.PerspectiveCamera(75, aspect, 0.1, frustrumSize);
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, frustrumSize);

//var orthoCamHelper = new THREE.CameraHelper(camera2);
//var perspCamHelper = new THREE.CameraHelper(camera3);
//scene.add(orthoCamHelper);
//scene.add(perspCamHelper);
camera.position.set(0, 15, 15);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(dWidth, dHeight);
divElem.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var ambient = new THREE.AmbientLight(0xaaaaaa);
scene.add(ambient);

var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(-1, 2, 3);
scene.add(directionalLight);

//var dLHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add(dLHelper);

// floor
var floorGeom = new THREE.PlaneGeometry(128, 128);
var floorMat = new THREE.MeshPhongMaterial({ color: 0x546B80, emissive : 0x534D00 });
var floorMesh = new THREE.Mesh(floorGeom, floorMat);
//floorMesh.position.y = -9;
floorMesh.rotation.x = -Math.PI / 2;

var floorTex = new THREE.Texture();
imgLoader.load("Res/gridSimple.png", function (image) {
    floorTex.image = image;
    floorTex.needsUpdate = true;
    
    floorMat.emissiveMap = floorTex;
    scene.add(floorMesh);
});

var reflectionCubeMap;
function loadCubeMap() {
    var path = "Res/besiegeCube/";
    var format = '.png';
    var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
    ];
    reflectionCubeMap = new THREE.CubeTextureLoader().load(urls);
    reflectionCubeMap.format = THREE.RGBFormat;
    scene.background = reflectionCubeMap;
}
loadCubeMap();

var boundsGeom = new THREE.BoxGeometry(18, 10.1, 18);
var boundsMat = new THREE.MeshPhongMaterial({ transparent: true, color: 0xDDDDDD, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false });
var boundsMesh = new THREE.Mesh(boundsGeom, boundsMat);
boundsMesh.position.set(0, 5.06, 0);

var boundsTex = new THREE.Texture();
imgLoader.load("Res/grid-dashed.png", function (image) {
    boundsTex.image = image;
    boundsTex.needsUpdate = true;

    boundsMat.map = boundsTex;
    scene.add(boundsMesh);
});

function toggleBB(cb) {
    boundsMesh.visible = cb.checked;
}

var machine = {};
var machineBlocks = [];

function HandleFiles(files) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var d = (new DOMParser()).parseFromString(event.target.result, "text/xml");
        var s = xml2json(d, "");
        machine = JSON.parse(s);
        doStuffWithMachine();
    };
    reader.readAsText(files[0]);
}

function parseMachine(path) {
    var loader = new THREE.XHRLoader();
    loader.setWithCredentials(false);
    loader.load(path, function (text) {
        var d = (new DOMParser()).parseFromString(text, "text/xml");
        var s = xml2json(d, "");
        machine = JSON.parse(s);
        doStuffWithMachine();
    });
    
}
var boxGeom = new THREE.BoxGeometry(1, 1, 1);
var boxMat = new THREE.MeshPhongMaterial();
var boxFlatMat = new THREE.MeshPhongMaterial({ "color": 0x303030 });
var boxMesh = new THREE.Mesh(boxGeom, boxMat);
var boxFlatMesh = new THREE.Mesh(boxGeom, boxFlatMat);
var boxTex = new THREE.Texture();
imgLoader.load("Skins/Template/Cannon/darkmetal_png.png", function (image) {
    boxTex.image = image;
    boxTex.needsUpdate = true;
    boxMat.map = boxTex;
});

var showBraces = true;
function toggleBrace(cb) {
    showBraces = cb.checked;
}

function doStuffWithMachine() {
    //floorMesh.position.y = -Number(machine["Machine"]["Global"].Position.y);
    var machineOffset = new THREE.Vector3(
        /*Number(machine["Machine"]["Global"].Position.x)*/0,
        Number(machine["Machine"]["Global"].Position.y),
        /*Number(machine["Machine"]["Global"].Position.z)*/0);
    //camera.position.set(0, 15, 15).add(machineOffset);
    //controls.target.set(0, 0, 0).add(machi;
    //camera.lookAt(controls.target);
    if (machineBlocks.length > 0) {
        machineBlocks.forEach(function (v, i) {
            scene.remove(v);
        });
        machineBlocks = [];
    }
    var blocks = machine["Machine"]["Blocks"];
    blocks = blocks["Block"];
    for (var i = 0; i < blocks.length; i++) {
        if (bsgPrefabs[blocks[i].id]) {
            var o2 = new THREE.Object3D();
            var o = bsgPrefabs[blocks[i].id].obj.clone();
            o2.add(o);
            var pos = blocks[i].Transform.Position;
            var q = blocks[i].Transform.Rotation;
            var scale = blocks[i].Transform.Scale;
            scene.add(o2);
            machineBlocks.push(o2);
            o2.position.set(Number(pos.x), Number(pos.y), Number(pos.z)); o2.position.add(machineOffset);
            o2.quaternion.set(Number(q.x), Number(q.y), Number(q.z), Number(q.w));
            o2.scale.set(Number(scale.x), Number(scale.y), Number(scale.z));
        }
        else
        {
            switch (blocks[i].id) {
                case "7": // brace
                    if (!showBraces) break; // toggle adding braces
                    var sPoint = boxMesh.clone(),
                        ePoint = boxMesh.clone(),
                        line = boxFlatMesh.clone();
                    var cont = new THREE.Object3D();
                    sPoint.scale.set(0.4, 0.4, 0.4); ePoint.scale.set(0.4, 0.4, 0.4);
                    var ePos = blocks[i].Data.Vector3[1];
                    ePoint.position.set(Number(ePos.X), Number(ePos.Y), Number(ePos.Z));
                    
                    var length = ePoint.position.length();
                    var quat = new THREE.Quaternion();
                    var nP = ePoint.position.clone(); nP.setLength(1);
                    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nP);
                    line.quaternion.copy(quat);
                    line.position.copy(ePoint.position);
                    line.position.multiplyScalar(0.5);
                    line.scale.set(0.2, length, 0.2);
                    cont.add(sPoint, ePoint, line);
                    var pos = blocks[i].Transform.Position;
                    var q = blocks[i].Transform.Rotation;
                    var scale = blocks[i].Transform.Scale;
                    
                    cont.position.set(Number(pos.x), Number(pos.y), Number(pos.z)); cont.position.add(machineOffset);
                    cont.quaternion.set(Number(q.x), Number(q.y), Number(q.z), Number(q.w));
                    cont.scale.set(Number(scale.x), Number(scale.y), Number(scale.z));
                    /*raycaster.set(ePoint.getWorldPosition().add(ePoint.up), nP); raycaster.far = 200;
                    var result = raycaster.intersectObjects(scene.children);
                    if (result.length > 0) {
                        console.log("raycast hit something");
                        //var ePHit = result[0].object.getWorldQuaternion();
                        //ePoint.setRotationFromQuaternion(ePoint.getWorldQuaternion().inverse().multiply(ePHit));
                        var wd = cont.worldToLocal(result[0].object.getWorldDirection()).normalize();
                        //console.log(wd);
                        var lineGeom = new THREE.Geometry();
                        lineGeom.vertices.push(
                            new THREE.Vector3(0, 0, 0),
                            wd.multiplyScalar(2)
                        );
                        var eLine = new THREE.Line(lineGeom);
                        eLine.position.copy(ePoint.position);
                        cont.add(eLine);
                        //ePoint.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), wd);
                        //ePoint.material = boxFlatMat;
                    }*/
                    scene.add(cont);
                    machineBlocks.push(cont);

                    break;
                case "9": // spring
                    break;
                case "45": // rope & winch
                    break;
                case "57": // pin
                    break;
                case "58": // camera
                    break;
            }
        }
    }
}

//camera.position.z = 5;

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();