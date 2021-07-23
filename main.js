

var stats = initStats();

// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

// create a render and set the size
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(0xEEEEEE, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

//-------------------------- Initialization-------------------------------

var pi = Math.PI;
var carview = false;                        // option to switch views
var npoints = 10;                           // number of points in the round curve
var sin_values = [];
var cos_values = [];

// sinus and cosinus values to be used in making round curve
for (var i = 0; i < npoints + 1; i++) {
    sin_values[i] = Math.sin(i * pi / npoints / 2);
    cos_values[i] = Math.cos(i * pi / npoints / 2);
}

var garage_state = 0;

var loader = new THREE.TextureLoader();
var texture_images = [
    'assets/textures/general/bathroom.jpg',             // 0
    'assets/textures/general/brick-wall.jpg',           // 1
    'assets/textures/general/darker_wood.jpg',          // 2
    'assets/textures/general/floor-wood.jpg',           // 3
    'assets/textures/general/metal-floor.jpg',          // 4
    'assets/textures/general/metal-rust.jpg',           // 5
    'assets/textures/general/plaster.jpg',              // 6
    'assets/textures/general/plaster-diffuse.jpg',      // 7
    'assets/textures/general/stone.jpg',                // 8
    'assets/textures/general/weave.jpg',                // 9
    'assets/textures/general/weave-bump.jpg',           // 10
    'assets/textures/general/wood-2.jpg'               // 11
]
//---------------------------------------------------------------------------


//-------------------------- add street, sideways to the land ---------------
var land = new THREE.Object3D();

scene.add(land);
land.castShadow = true;

// add 8 sideways to the land
var sideway = [];
sideway[0] = createmesh_texture(1, [224, 1, 4], texture_images[5], 0, 0, 0, 0, 0, 60);
sideway[1] = createmesh_texture(1, [304, 1, 4], texture_images[5], 0, 0, 0, 0, 0, 100);
sideway[2] = createmesh_texture(1, [4, 1, 124], texture_images[5], 0, 0, 0, 110, 0, 0);
sideway[3] = createmesh_texture(1, [4, 1, 204], texture_images[5], 0, 0, 0, 150, 0, 0);
sideway[4] = createmesh_texture(1, [224, 1, 4], texture_images[5], 0, 0, 0, 0, 0, -60);
sideway[5] = createmesh_texture(1, [304, 1, 4], texture_images[5], 0, 0, 0, 0, 0, -100);
sideway[6] = createmesh_texture(1, [4, 1, 124], texture_images[5], 0, 0, 0, -110, 0, 0);
sideway[7] = createmesh_texture(1, [4, 1, 204], texture_images[5], 0, 0, 0, -150, 0, 0);

for (var i = 0; i < 8; i++) {
    land.add(sideway[i]);
}

// add middlelines 
for (var i = 0; i < 21; i++) {
    middleline1 = createmesh_color(1, [7, 0.2, 1], 0xffffff, 0, 0, 0, i * 12 - 120, 0, 80);
    middleline2 = createmesh_color(1, [7, 0.2, 1], 0xffffff, 0, 0, 0, i * 12 - 120, 0, -80);
    land.add(middleline1);
    land.add(middleline2);
}

for (var i = 0; i < 13; i++) {
    middleline1 = createmesh_color(1, [1, 0.2, 7], 0xffffff, 0, 0, 0, -130, 0, 70 - i * 12);
    middleline2 = createmesh_color(1, [1, 0.2, 7], 0xffffff, 0, 0, 0, 130, 0, 70 - i * 12);
    land.add(middleline1);
    land.add(middleline2);
}

// add plane to the land
var plane = createmesh_color(1, [340, 0.5, 240], 0x999999, 0, 0, 0, 0, -0.5, 0);
land.add(plane);


var apart_area = createmesh_texture(1, [220, 0.8, 120], texture_images[7], 0, 0, 0, 0, 0, 0);
land.add(apart_area);

//-----------------------------------------------------------------------------------------

//-----------------------------------add lightposts the the street -----------------------

var lamp1 = [];                             // source of streetlight                                     
var target1 = [];                           // target where light should be directed to
var reflection1 = [];                       // refelction of streetlight on the road
lightpost1 = [];                            // streetlight object
lightpost_p11 = [];                         // part of streetlight
lightpost_p12 = [];
lightpost_p13 = [];
lightpost_p14 = [];
var lamp2 = [];
var target2 = [];
var reflection2 = [];
lightpost2 = [];
lightpost_p21 = [];
lightpost_p22 = [];
lightpost_p23 = [];
lightpost_p24 = [];

for (var i = 0; i < 7; i++) {
    lightpost1[i] = new THREE.Object3D();
    land.add(lightpost1[i]);
    lightpost_p11[i] = createmesh_color(1, [2, 1, 4], 0x0000ff, 0, 0, 0, i * 44 - 130, 34, 92);
    lightpost_p12[i] = createmesh_color(3, [0.5, 0.5, 8, 16], 0x0000ff, -pi / 3, 0, 0, i * 44 - 130, 32, 97);
    lightpost_p13[i] = createmesh_color(3, [0.5, 0.5, 30, 16], 0x0000ff, 0, 0, 0, i * 44 - 130, 15, 100);
    lightpost_p14[i] = createmesh_color(3, [1, 1.5, 8, 4], 0, 0, 0x0000ff, 0, i * 44 - 130, 4, 100);
    lightpost1[i].add(lightpost_p11[i]);
    lightpost1[i].add(lightpost_p12[i]);
    lightpost1[i].add(lightpost_p13[i]);
    lightpost1[i].add(lightpost_p14[i]);

    reflection1[i] = createmesh_color(3, [15, 15, 1, 32], 0xb3b3b3, 0, 0, 0, i * 44 - 130, -0.5, 80);
    reflection1[i].visible = false;
    land.add(reflection1[i]);

    target1[i] = new THREE.Object3D();
    target1[i].position.set(i * 44 - 130, 0, 80);
    scene.add(target1[i]);

    lamp1[i] = new THREE.SpotLight(0xffffff, 2, 30, pi / 3, 0.5);
    lamp1[i].position.set(i * 44 - 130, 19, 80);
    lamp1[i].target = target1[i];
    lamp1[i].castShadow = true;
    land.add(lamp1[i]);

    lightpost2[i] = new THREE.Object3D();
    land.add(lightpost2[i]);
    lightpost_p21[i] = createmesh_color(1, [2, 1, 4], 0x0000ff, 0, 0, 0, i * 44 - 130, 34, -92);
    lightpost_p22[i] = createmesh_color(3, [0.5, 0.5, 8, 16], 0x0000ff, pi / 3, 0, 0, i * 44 - 130, 32, -97);
    lightpost_p23[i] = createmesh_color(3, [0.5, 0.5, 30, 16], 0x0000ff, 0, 0, 0, i * 44 - 130, 15, -100);
    lightpost_p24[i] = createmesh_color(3, [1, 1.5, 8, 4], 0, 0, 0x0000ff, 0, i * 44 - 130, 4, -100);
    lightpost2[i].add(lightpost_p21[i]);
    lightpost2[i].add(lightpost_p22[i]);
    lightpost2[i].add(lightpost_p23[i]);
    lightpost2[i].add(lightpost_p24[i]);

    reflection2[i] = createmesh_color(3, [15, 15, 1, 32], 0xb3b3b3, 0, 0, 0, i * 44 - 130, -0.5, -80);
    reflection2[i].visible = false;
    land.add(reflection2[i]);

    target2[i] = new THREE.Object3D();
    target2[i].position.set(i * 44 - 130, 0, -80);
    scene.add(target2[i]);

    lamp2[i] = new THREE.SpotLight(0xffffff, 2, 30, pi / 3, 0.5);
    //lamp.intensity =6000;
    lamp2[i].position.set(i * 44 - 130, 19, -80);
    lamp2[i].target = target2[i];
    lamp2[i].castShadow = true;
    land.add(lamp2[i]);
}


//---------------------------------------------------------------------------------------------


{//------------------------ add garage -------------------------------------- 
    var garage = new THREE.Object3D();
    garage_p1 = createmesh_color(1, [1, 16, 24], 0x0066ff, 0, 0, 0, 76, 8, 48);
    garage_p2 = createmesh_color(1, [24, 16, 1], 0x0066ff, 0, 0, 0, 88, 8, 36);
    garage_p3 = createmesh_color(1, [1, 16, 24], 0x0066ff, 0, 0, 0, 100, 8, 48);
    garage_p4 = createmesh_color(1, [24, 1, 24], 0x0066ff, 0, 0, 0, 88, 16, 48);
    garage_door = createmesh_color(1, [24, 32, 1], 0x0066ff, 0, 0, 0, 88, 0, 60);
    land.add(garage_p1);
    land.add(garage_p2);
    land.add(garage_p3);
    land.add(garage_p4);
    land.add(garage_door);
}



lawn = createmesh_texture(1, [180, 1, 70], texture_images[11], 0, 0, 0, 0, 0, -20);
land.add(lawn);

{//--------------------------building2-------------------------------------
    
    var b2_s = 4;
    var length = 8 * b2_s;
    var segments = 10;
    var body_geom = createExtrudedGeometry0(length, segments);
    var body_mesh = createMesh(body_geom, 2);
    body_mesh.position.x = 25 * b2_s;
    scene.add(body_mesh);

    var length = 5 * b2_s;
    var segments = 10;
    var roof1_geom = createExtrudedGeometry1(length, segments);
    var roof1_mesh = createMesh(roof1_geom, 3);
    roof1_mesh.position.y = 4 * b2_s;
    roof1_mesh.position.x = 7 * b2_s;
    roof1_mesh.position.z = -4.5 * b2_s;
    scene.add(roof1_mesh);

    var length = 0.4 * b2_s;
    var segments = 10;
    var roof2_geom = createExtrudedGeometry1(length, segments);
    var roof2_mesh = createMesh(roof2_geom, 3);
    roof2_mesh.position.y = 4 * b2_s;
    roof2_mesh.position.x = 7 * b2_s;
    roof2_mesh.position.z = -7.19 * b2_s;
    scene.add(roof2_mesh);

    var length = 0.4 * b2_s;
    var segments = 10;
    var roof3_geom = createExtrudedGeometry1(length, segments);
    var roof3_mesh = createMesh(roof3_geom, 3);
    roof3_mesh.position.y = 4 * b2_s;
    roof3_mesh.position.x = 14.5 * b2_s;
    roof3_mesh.position.z = -7.19 * b2_s;
    scene.add(roof3_mesh);

    var length = 12 * b2_s;
    var segments = 10;
    var roof4_geom = createExtrudedGeometry2(length, segments);
    var roof4_mesh = createMesh(roof4_geom, 2);
    roof4_mesh.position.y = 4 * b2_s;
    roof4_mesh.position.x = 13 * b2_s;
    roof4_mesh.position.z = 1 * b2_s;
    scene.add(roof4_mesh);

    var length = 12.6 * b2_s;
    var segments = 10;
    var roof5_geom = createExtrudedGeometry2(length, segments);
    var roof5_mesh = createMesh(roof5_geom, 3);
    roof5_mesh.position.y = 4 * b2_s;
    roof5_mesh.position.x = 13 * b2_s;
    roof5_mesh.position.z = 1 * b2_s;
    scene.add(roof5_mesh);

    var length = 0.3 * b2_s;
    var segments = 10;
    var roof6_geom = createExtrudedGeometry1(length, segments);
    var roof6_mesh = createMesh(roof6_geom, 3);
    roof6_mesh.position.y = 3.95 * b2_s;
    roof6_mesh.position.x = 6.7 * b2_s;
    roof6_mesh.position.z = 1.1 * b2_s;
    scene.add(roof6_mesh);

    var length = 0.35 * b2_s;
    var segments = 10;
    var roof7_geom = createExtrudedGeometry2(length, segments);
    var roof7_mesh = createMesh(roof7_geom, 3);
    roof7_mesh.position.y = 4 * b2_s;
    roof7_mesh.position.x = 6.85 * b2_s;
    roof7_mesh.position.z = -1 * b2_s;
    scene.add(roof7_mesh);

    var length = 0.35 * b2_s;
    var segments = 10;
    var roof8_geom = createExtrudedGeometry2(length, segments);
    var roof8_mesh = createMesh(roof8_geom, 3);
    roof8_mesh.position.y = 4 * b2_s;
    roof8_mesh.position.x = 19.1 * b2_s;
    roof8_mesh.position.z = -1 * b2_s;
    //scene.add(roof8_mesh);

    var length = 8 * b2_s;
    var segments = 10;
    var roof9_geom = createExtrudedGeometry1(length, segments);
    var roof9_mesh = createMesh(roof9_geom, 2);
    roof9_mesh.position.y = 4 * b2_s;
    roof9_mesh.position.x = 11.5 * b2_s;
    roof9_mesh.position.z = -1.5 * b2_s;
    scene.add(roof9_mesh);

    var length = 8.6 * b2_s;
    var segments = 10;
    var roof10_geom = createExtrudedGeometry1(length, segments);
    var roof10_mesh = createMesh(roof10_geom, 3);
    roof10_mesh.position.y = 4 * b2_s;
    roof10_mesh.position.x = 11.5 * b2_s;
    roof10_mesh.position.z = -1.5 * b2_s;
    scene.add(roof10_mesh);

    var length = 5 * b2_s;
    var segments = 10;
    var roof11_geom = createExtrudedGeometry1(length, segments);
    var roof11_mesh = createMesh(roof11_geom, 3);
    roof11_mesh.position.y = 4 * b2_s;
    roof11_mesh.position.x = 14.5 * b2_s;
    roof11_mesh.position.z = -4.5 * b2_s;
    scene.add(roof11_mesh);

    var loader = new THREE.TextureLoader();
    var windows1_material = new THREE.MeshLambertMaterial({
        map: loader.load('assets/mini street/Untitled-1 copy.png')
    });

    var windows1_geometry = new THREE.PlaneGeometry(2.5 * b2_s, 3 * b2_s);
    var windows1_mesh = new THREE.Mesh(windows1_geometry, windows1_material);
    windows1_mesh.position.set(13 * b2_s, 2.5 * b2_s, 2.51 * b2_s);

    // add the image to the scene
    scene.add(windows1_mesh);
    var loader = new THREE.TextureLoader();

    // Load an image file into a custom material
    var windows_material = new THREE.MeshLambertMaterial({
        map: loader.load('assets/mini street/Untitled111.png')
    });

    var windows2_geometry = new THREE.PlaneGeometry(0.65 * b2_s, 1.1 * b2_s);
    var windows2_mesh = new THREE.Mesh(windows2_geometry, windows_material);
    windows2_mesh.position.set(11.45 * b2_s, 1.5 * b2_s, 1.7 * b2_s);
    scene.add(windows2_mesh);

    var windows3_geometry = new THREE.PlaneGeometry(0.65 * b2_s, 1.1 * b2_s);
    var windows3_mesh = new THREE.Mesh(windows3_geometry, windows_material);
    windows3_mesh.position.set(6.9 * b2_s, 2 * b2_s, -5.5 * b2_s);
    scene.add(windows3_mesh);

    var windows4_geometry = new THREE.PlaneGeometry(0.65 * b2_s, 1.1 * b2_s);
    var windows4_mesh = new THREE.Mesh(windows4_geometry, windows_material);
    windows4_mesh.position.set(6.9 * b2_s, 2 * b2_s, -2.5 * b2_s);
    scene.add(windows4_mesh);

    var windows5_geometry = new THREE.PlaneGeometry(0.65 * b2_s, 1.1 * b2_s);
    var windows5_mesh = new THREE.Mesh(windows5_geometry, windows_material);
    windows5_mesh.position.set(6.9 * b2_s, 2 * b2_s, -1.2 * b2_s);
    scene.add(windows5_mesh);

}

//-----------------------------------------------

{//------------------------------car------------------------------

    var carHeight = 0.7;
    var carGroup = new THREE.Object3D();
    carGroup.scale.set(3, 3, 3);
    carGroup.position.x = 0;
    carGroup.position.z = 70;
    carGroup.rotation.y = Math.PI;
    scene.add(carGroup);

    // create a group to contain the car body and add it to the car group
    var bodyGroup = new THREE.Object3D();
    carGroup.add(bodyGroup);

    // create a group to contain the wheels and add it to the car group
    var wheelGroup = new THREE.Object3D();
    wheelGroup.position.y = 0.4;
    wheelGroup.position.x = 1.8;
    carGroup.add(wheelGroup);

    var wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x191E22 });
    var wheelGeometry = new THREE.CylinderGeometry(0.3, 0.5, 0.1);

    // create a wheels

    var wheel = [];
    for (var i = 0; i < 4; i++) {
        wheel[i] = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel[i].castShadow = true;
        wheel[i].rotation.x = Math.PI / 2;
        switch (i) {
            case 0:
                wheel[i].position.z = 1.35;
                break;
            case 1:
                wheel[i].position.z = -1.35;
                wheel[i].position.x = -3.5;
                wheel[i].rotation.x = -Math.PI / 2;
                break;
            case 2:
                wheel[i].position.z = 1.35;
                wheel[i].position.x = -3.5;
                break;
            case 3:
                wheel[i].position.z = -1.35;
                wheel[i].rotation.x = -Math.PI / 2;
                break;
        }

        // add the rotor blade to the rotor group
        wheelGroup.add(wheel[i]);
    }

    var wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x505153 });
    var wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.1);

    // create a wheel

    var wheel1 = [];
    for (var i = 0; i < 4; i++) {
        wheel1[i] = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1[i].castShadow = true;
        wheel1[i].rotation.x = Math.PI / 2;
        switch (i) {
            case 0:
                wheel1[i].position.z = 1.35;
                break;
            case 1:
                wheel1[i].position.z = -1.35;
                wheel1[i].position.x = -3.5;
                wheel1[i].rotation.x = -Math.PI / 2;
                break;
            case 2:
                wheel1[i].position.z = 1.35;
                wheel1[i].position.x = -3.5;
                break;
            case 3:
                wheel1[i].position.z = -1.35;
                wheel1[i].rotation.x = -Math.PI / 2;
                break;
        }

        // add the rotor blade to the rotor group
        wheelGroup.add(wheel1[i]);
    }

    var bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x7CF0FF });

    // create a sphere (radius 1) to use a a cab
    var cabGeometry = new THREE.CubeGeometry(6, 0.6, 2.4);
    var cab = new THREE.Mesh(cabGeometry, bodyMaterial);
    cab.castShadow = true;

    // position the cab
    cab.position.y = carHeight;

    // add the cab to the body group
    bodyGroup.add(cab);

    var length = 1.8;
    var segments = 10;
    var car_window_shape = createExtrudedGeometry1(length, segments);
    var car_window = createMesh(car_window_shape, 4);
    car_window.position.y = -0.15;
    bodyGroup.add(car_window);

    var length = 0.2;
    var segments = 10;
    var car_part_geo1 = createExtrudedGeometry4(length, segments);
    var car_part = [];
    for (i = 0; i < 2; i++) {
        car_part[i] = createMesh(car_part_geo1, 5);
        if (i == 0) {
            car_part[i].position.z = 0.9;
        } else {
            car_part[i].position.z = -0.9;
        }
        car_part[i].position.y = -0.15;

        bodyGroup.add(car_part[i]);
    }

    var length = 1.8;
    var segments = 10;
    var car_part_geo2 = createExtrudedGeometry4(length, segments);

    var car_part = createMesh(car_part_geo2, 5);
    car_part.position.z = 0;
    car_part.position.y = -0.15;
    bodyGroup.add(car_part);

    var length = 1.8;
    var segments = 10;
    var car_part_geo3 = createExtrudedGeometry4(length, segments);

    var car_part = createMesh(car_part_geo3, 5);
    car_part.position.z = 0;
    car_part.position.y = -0.15;
    bodyGroup.add(car_part);

    var length = 0.7;
    var segments = 10;
    var car_part_geo4 = createExtrudedGeometry4(length, segments);
    var car_part = [];
    for (i = 0; i < 2; i++) {
        car_part[i] = createMesh(car_part_geo4, 5);
        if (i == 0) {
            car_part[i].position.z = 0.75;
        } else {
            car_part[i].position.z = -0.75;
        }
        bodyGroup.add(car_part[i]);
    }

    for (var i = 0; i < 2; i++) {
        var points = [
            new THREE.Vector3(-1, 1, -2),
            new THREE.Vector3(-3, 1, -2),
            new THREE.Vector3(-0.2, 0.7, -2),
            new THREE.Vector3(-3, 0.4, -2),
            new THREE.Vector3(-3, 0.7, -1.9)
        ];
        var geoms = [];
        geoms[i] = new THREE.ConvexGeometry(points);
        var mesh = [];
        mesh[i] = createMesh(geoms[i], 5);

        mesh[i].traverse(function (e) {
            e.castShadow = true;
        });
        if (i == 0) {
            mesh[i].position.z = 3.2;
        } else {
            mesh[i].position.y = 1.4;
            mesh[i].position.z = -3.2;
            mesh[i].rotation.x = Math.PI;
        }
        carGroup.add(mesh[i]);
    }

    var length = 0.04;
    var segments = 10;
    var material = new THREE.MeshLambertMaterial({ color: 0x7CF0FF });
    var car_part_geo6 = createExtrudedGeometry2(length, segments);

    var car_part = new THREE.Mesh(car_part_geo6, material);
    car_part.position.z = 5.2;
    car_part.position.x = -3;
    car_part.position.y = 1;
    bodyGroup.add(car_part);

    var length = 0.03;
    var segments = 10;
    var material = new THREE.MeshLambertMaterial({ color: 0xFDFA20 });
    var car_part_geo7 = createExtrudedGeometry2(length, segments);

    var car_part = [];
    for (i = 0; i < 2; i++) {
        car_part[i] = new THREE.Mesh(car_part_geo7, material);
        if (i == 0) {
            car_part[i].position.z = 0.75;
            car_part[i].rotation.x = Math.PI;
            car_part[i].position.y = 1.1;
        } else {
            car_part[i].position.z = -0.75;
            car_part[i].position.y = 0.3;
        }
        car_part[i].position.x = -3;
        bodyGroup.add(car_part[i]);
    }

    var length = 0.04;
    var segments = 10;
    var material = new THREE.MeshLambertMaterial({ color: 0x3D3936 });
    var car_part_geo8 = createExtrudedGeometry4(length, segments);

    var car_part = [];
    for (i = 0; i < 2; i++) {
        car_part[i] = new THREE.Mesh(car_part_geo8, material);
        if (i == 0) {
            car_part[i].position.z = 1.2; 
        } else {
            car_part[i].position.z = -1.2;

        }
        car_part[i].position.x = 2.5;
        car_part[i].position.y = -0.4;

        bodyGroup.add(car_part[i]);
    }

    var length = 0.04;
    var segments = 10;
    var material = new THREE.MeshLambertMaterial({ color: 0x7CF0FF });
    var car_part_geo9 = createExtrudedGeometry2(length, segments);

    var car_part = new THREE.Mesh(car_part_geo9, material);
    car_part.position.z = 5.2;
    car_part.position.x = -3;
    car_part.position.y = 1;
    bodyGroup.add(car_part);

    var length = 1;
    var segments = 10;
    var material = new THREE.MeshLambertMaterial({ color: 0x080808 });
    var car_part_geo10 = createExtrudedGeometry1(length, segments);
    for (i = 0; i < 4; i++) {
        var car_part = [];
        car_part[i] = new THREE.Mesh(car_part_geo10, material);
        car_part[i].position.z = 0;
        car_part[i].position.x = -3.02;
        car_part[i].position.y = 0.8 - i * 0.08;
        bodyGroup.add(car_part[i]);
    }

    for (var i = 0; i < 2; i++) {
        var points = [
            new THREE.Vector3(0, -0.4, 0),
            new THREE.Vector3(-1, -0.7, 0),
            new THREE.Vector3(0, -1, 0),
            new THREE.Vector3(0, -0.7, 0.1)
        ];
        var geoms = [];
        geoms[i] = new THREE.ConvexGeometry(points);
        var mesh = [];
        mesh[i] = createMesh(geoms[i], 5);

        mesh[i].traverse(function (e) {
            e.castShadow = true;
        });
        if (i == 0) {
            mesh[i].position.z = 1.2;
            mesh[i].position.y = 1.4;
        } else {
            mesh[i].position.y = 0;
            mesh[i].position.z = -1.2;
            mesh[i].rotation.x = Math.PI;
        }
        mesh[i].position.x = 3;
        carGroup.add(mesh[i]);
    }
    var car_vector = new THREE.Vector3(30, 12, 70);
}

//------------------------------------------------------------------------------

{//-----------------------------fence---------------------
    var FenceGroup = new THREE.Object3D();
    FenceGroup.scale.set(4, 4, 4);
    scene.add(FenceGroup);

    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });
    var FenceLegGeometry = new THREE.CubeGeometry(0.05, 2, 0.2);
    // create the legs
    var FenceLegs = [];
    for (var i = 0; i < 40; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = -15 + 0.5 * i;
        FenceLegs[i].position.x = 2;
        FenceGroup.add(FenceLegs[i]);
    }
    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });
    var FenceLegGeometry = new THREE.CubeGeometry(0.05, 2, 0.2);
    var FenceLegs = [];
    for (var i = 0; i < 40; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = -15 + 0.5 * i;
        FenceLegs[i].position.x = 23;
        FenceGroup.add(FenceLegs[i]);
    }
    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(0.05, 2, 0.2);
    var FenceLegs = [];
    for (var i = 0; i < 40; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = -15 + 0.5 * i;
        FenceLegs[i].position.x = -23;
        FenceGroup.add(FenceLegs[i]);
    }
    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(0.05, 2, 0.2);
    var FenceLegs = [];
    for (var i = 0; i < 93; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = -15;
        FenceLegs[i].rotation.y = Math.PI / 2;
        FenceLegs[i].position.x = -23 + 0.5 * i;
        FenceGroup.add(FenceLegs[i]);
    }
    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(46, 0.1, 0.05);
    FenceLegs = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
    FenceLegs.position.z = -15;
    FenceLegs.position.y = 0.6;
    FenceGroup.add(FenceLegs);

    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(0.04, 0.07, 19.6);
    var FenceLegs = [];
    for (var i = 0; i < 3; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        switch (i) {
            case 0:
                FenceLegs[i].position.x = -22.98;
                break;
            case 1:
                FenceLegs[i].position.x = 1.98;
                break;
            case 2:
                FenceLegs[i].position.x = 22.98;
                break;
        }
        FenceLegs[i].position.z = -5.2;
        FenceLegs[i].position.y = 0.6;
        FenceGroup.add(FenceLegs[i]);
    }

    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(0.05, 2, 0.2);
    var FenceLegs = [];
    for (var i = 0; i < 93; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = 4.8;
        FenceLegs[i].rotation.y = Math.PI / 2;
        if (i == 15) {
            i = 19;
        } else if (i == 69) {
            i = 73;
        } else {
            FenceLegs[i].position.x = -23 + 0.5 * i;
        }
        FenceGroup.add(FenceLegs[i]);
    }
    var FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x189B4B });

    var FenceLegGeometry = new THREE.CubeGeometry(2, 0.1, 0.02);
    var FenceLegs = [];
    for (var i = 0; i < 45; ++i) {
        FenceLegs[i] = new THREE.Mesh(FenceLegGeometry, FenceMaterial);
        FenceLegs[i].castShadow = true;
        FenceLegs[i].position.z = 4.77;
        FenceLegs[i].position.y = 0.65;

        if (i == 6) {
            i = 9;
        } else if (i == 33) {
            i = 36;
        } else {
            FenceLegs[i].position.x = -22 + 1 * i;
        }
        FenceGroup.add(FenceLegs[i]);
    }
}
//-----------------------------------------------------------------

{/////-------------------------tree---------------------
    var materials = new THREE.MeshLambertMaterial({ color: 0x141206 });
    var tree1 = new THREE.CylinderGeometry(0.4, 0.6, 12)
    var treemesh = [];
    for (i = 0; i < 6; i++) {
        treemesh[i] = new THREE.Mesh(tree1, materials);
        switch (i) {
            case 0:
                treemesh[i].position.set(-20, 6, -52);
                break;
            case 1:
                treemesh[i].position.set(-60, 4, -52);
                break;
            case 2:
                treemesh[i].position.set(84, 6, -44);
                break;
            case 3:
                treemesh[i].position.set(40, 6, -48);
                break;
            case 4:
                treemesh[i].position.set(12, 6, -20);
                break;
            case 5:
                treemesh[i].position.set(16, 0, 8);
                break;
        }
        scene.add(treemesh[i]);

    }

    var bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x315D1E });

    // create a sphere (radius 1) to use a a cab
    var cabGeometry = new THREE.SphereGeometry(4);
    var cockit = [];
    for (var i = 0; i < 6; i++) {
        cab[i] = new THREE.Mesh(cabGeometry, bodyMaterial);
        // cab[i].castShadow = true;
        switch (i) {
            case 0:
                cab[i].scale.y = 6;
                cab[i].position.set(-20, 26, -52);
                cab[i].rotation.y = 0.5 * Math.PI;
                break;
            case 1:
                cab[i].scale.y = 4;
                cab[i].position.set(-60, 18, -52);
                cab[i].rotation.y = 0.5 * Math.PI;
                break;
            case 2:
                cab[i].scale.y = 5;
                cab[i].position.set(84, 22, -44);
                cab[i].rotation.y = 0.5 * Math.PI;
                break;
            case 3:
                cab[i].scale.y = 4.6;
                cab[i].position.set(40, 22, -48);
                break;
            case 4:
                cab[i].scale.y = 3;
                cab[i].position.set(12, 14, -20);
                cab[i].rotation.y = 0.5 * Math.PI;
                break;
            case 5:
                cab[i].scale.y = 1;
                cab[i].position.set(16, 4, 8);
                cab[i].rotation.y = 0.5 * Math.PI;
                break;
        }
        // extend the sphere by a factor of 2 in the x direction to represent a cab
        // add the cab to the body group
        scene.add(cab[i]);
    }
}

function createMesh(geom, i) {
    switch (i){
        case 0:
            color = 0xAEB9BD;
            break;
        case 1:
            color = 0x888F97;
            break;
        case 2:
            color = 0xB2A592;
            break;
        case 3:
            color = 0xE34544;
            break;
        case 4:
            color = 0xFeFFFF;
            break;
        case 5:
            color = 0x7CF0FF;
            break;
    }
    var meshMaterial = new THREE.MeshLambertMaterial({ color: color });
    var wireFrameMat = new THREE.MeshLambertMaterial({ color: color });
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return mesh;
}

// -------------------------------dome building---------------------------------------------------

{
    var r = 3;                  // radius of curve in the intruded part of dom
    var points_group = [];      // points to draw curve shape
    var wall1 = [];
    var wall2 = [];
    var wall3 = [];
    var wall4 = [];
    var wall5 = [];
    var wall6 = [];
    points_group[0] = [[9, 0], [12, 0], [12, 7.5], [3, 12], [-3, 12], [-12, 7.5], [-12, 0], 'curve', [-9, 0], [-9, 9], [0, 9], 'curve', [0, 9], [9, 9], [9, 0]];  // arch gate of dome
    points_group[1] = [[1 * r, 0 * r], [1.5 * r, 0 * r], [1.5 * r, 5.2 * r], [-1.5 * r, 5.2 * r], [-1.5 * r, 0 * r], [-1 * r, 0 * r], 'curve', [-1 * r, 4 * r], [-1 * r, 5 * r], [0 * r, 5 * r], 'curve', [0 * r, 5 * r], [1 * r, 5 * r], [1 * r, 4 * r], [1 * r, 0 * r]];    //arch pattern on the wall of dome

    var dome = new THREE.Object3D();
    dome.position.x = -50;
    dome.position.z = -20;
    dome.scale.x = 0.4;
    dome.scale.y = 0.4;
    dome.scale.z = 0.4;
    var vertical_pattern = [];
    var horizontal_pattern = [];
    var dome_arch = [];
    var dome_upbar = [];
    var dome_downbar= [];
    scene.add(dome);
    for (var i = 0; i < 7; i++) {
        wall1[i] = createmesh_color(1, [21 * r, 10 * r, 2], 0x0099cc, 0, pi * i / 3, 0, 18 * r * Math.sin(pi * i / 3), 11 * r, 18 * r * Math.cos(pi * i / 3));
        wall2[i] = createmesh_color(1, [21 * r, 5 * r, 2], 0xffe6e6, 0, pi * i / 3, 0, 18 * r * Math.sin(pi * i / 3), 3.5 * r, 18 * r * Math.cos(pi * i / 3));
        wall3[i] = createmesh_color(1, [22 * r, 2 * r, 2], 0xffe6e6, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3), 0, 18.5 * r * Math.cos(pi * i / 3));
        wall4[i] = createmesh_color(1, [21 * r, 1 * r, 2], 0x006600, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3), 11.7 * r, 18.5 * r * Math.cos(pi * i / 3));
        wall5[i] = createmesh_color(1, [21 * r, 0.5 * r, 2], 0xffe6e6, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3), 12.45 * r, 18.5 * r * Math.cos(pi * i / 3));
        wall6[i] = createmesh_color(1, [21 * r, 3.3 * r, 2], 0x008080, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3), 14.2 * r, 18.5 * r * Math.cos(pi * i / 3));

        if (i > 0) {

            for (var j = -3; j < 4; j++) {

                var dome_arch_geom = createExtrudedGeometry(1, points_group[1], 1);
                var material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
                dome_arch[i * 7 + j+3] = new THREE.Mesh(dome_arch_geom, material, 1);
                dome_arch[i * 7 + j+3].rotation.y = (i - 1) * pi / 3 - pi / 6;
                dome_arch[i * 7 + j+3].rotation.z = -pi / 2;
                dome_arch[i * 7 + j+3].position.x = 18.5 * r * Math.sin(pi * i / 3) + 3 * r * j * Math.sin(pi * (-1 / 2 + i / 3));
                dome_arch[i * 7 + j+3].position.y = 6 * r;
                dome_arch[i * 7 + j+3].position.z = 18.5 * r * Math.cos(pi * i / 3) + 3 * r * j * Math.cos(pi * (-1 / 2 + i / 3));
                dome.add(dome_arch[i * 7 + j+3]);

                dome_upbar[(i-1) * 6 + j+3] = createmesh_color(1, [0.6 * r, 5.2 * r, 2], 0x006600, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3) + 3 * r * (j - 0.5) * Math.sin(pi * (-1 / 2 + i / 3)), 8.6 * r, 18.5 * r * Math.cos(pi * i / 3) + 3 * r * (j - 0.5) * Math.cos(pi * (-1 / 2 + i / 3)));
                dome.add(dome_upbar[(i-1) * 6 + j+3]);
                dome_downbar[(i-1) * 6 + j+3] = createmesh_color(1, [0.6 * r, 5 * r, 2], 0xffe6e6, 0, pi * i / 3, 0, 18.5 * r * Math.sin(pi * i / 3) + 3 * r * (j - 0.5) * Math.sin(pi * (-1 / 2 + i / 3)), 3.5 * r, 18.5 * r * Math.cos(pi * i / 3) + 3 * r * (j - 0.5) * Math.cos(pi * (-1 / 2 + i / 3)));
                dome.add(dome_downbar[(i-1) * 6 + j+3]);
            }
        }
        dome.add(wall1[i]);
        dome.add(wall2[i]);
        dome.add(wall3[i]);
        dome.add(wall4[i]);
        dome.add(wall5[i]);
        dome.add(wall6[i]);
    }
    var radius = [9.8, 9.2, 7.9, 5.8];
    for (var i = 0; i < 15; i++) {
        vertical_pattern[i] = createmesh_color(3, [10.05 * r, 10.05 * r, 0.2, 32], 0x0099cc, pi / 2, 0, i * pi / 14, 0, 75, 0);
        dome.add(vertical_pattern[i]);
        if (i < 4) {
            horizontal_pattern[i] = createmesh_color(3, [radius[i] * r, radius[i] * r, 0.2, 32], 0x0099cc, 0, 0, 0, 0, 75 + 2 * (i + 1) * r, 0);
            dome.add(horizontal_pattern[i]);
        }
    }

    // add components of building 2
    geometry_array = [3, 3, 4, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 6, 4, 4, 4, 3];
    geometry_parameter1 = [0, 10 * r, 10 * r, 10.2 * r, r * 3, r * 20.4, 20, 20, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 10, 2, 1.2, 1.4, 1, 0.4];
    geometry_parameter2 = [21 * r, 10 * r, 32.8, 10.2 * r, 20, 20, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 20, 0.5, 16, 16, 16, 0.6];
    geometry_parameter3 = [30, 40, 8, 1, 20.4 * r, 3 * r, 15, 15, 6 * r, 6 * r, 6 * r, 6 * r, 6 * r, 6 * r, 6 * r, 6 * r, 1, 16, 16, 16, 16, 16];
    geometry_parameter4 = [6, 16, 0, 32, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 16, 0, 0, 0, 16];
    color_array = [0x999966, 0x999966, 0xff9933, 0xffff99, 0x999966, 0x999966, 0x0099cc, 0x0099cc, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0xffe6e6, 0x004466, 0xff9933, 0xff9933, 0xff9933, 0xff9933, 0xff9933];
    rotation_x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rotation_y = [pi / 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rotation_z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    position_x = [0, 0, 0, 0, 0, 0, -20, 20, -27, -27, -9, -9, 9, 9, 27, 27, 0, 0, 0, 0, 0, 0];
    position_y = [55, 55, 75, 75, 65, 65, 6 * r, 6 * r, 3 * r, 3 * r, 3 * r, 3 * r, 3 * r, 3 * r, 3 * r, 3 * r, 10, 118, 106, 110, 114, 109];
    position_z = [0, 0, 0, 0, 0, 0, 60, 60, 66, 58, 66, 58, 66, 58, 66, 58, 58, 0, 0, 0, 0, 0];
    
    var dome_mesh = [];
    create_dom();
    function create_dom() {
        for (var i = 0; i < geometry_array.length; i++) {
            switch (geometry_array[i]) {
                case 1:
                    // Box
                    dome_mesh[i] = createmesh_color(1, [geometry_parameter1[i], geometry_parameter2[i], geometry_parameter3[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 2:
                    // plane
                    dome_mesh[i] = createmesh_color(2, [geometry_parameter1[i], geometry_parameter2[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 3:
                    // cylinder
                    dome_mesh[i] = createmesh_color(3, [geometry_parameter1[i], geometry_parameter2[i], geometry_parameter3[i], geometry_parameter4[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 4:
                    // sphere
                    dome_mesh[i] = createmesh_color(4, [geometry_parameter1[i], geometry_parameter2[i], geometry_parameter3[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 5:
                    // Dodecahedron
                    dome_mesh[i] = createmesh_color(5, [geometry_parameter1[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 6:
                    // torus
                    dome_mesh[i] = createmesh_color(6, [geometry_parameter1[i], geometry_parameter2[i], geometry_parameter3[i], geometry_parameter4[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                case 7:
                    // Cone
                    dome_mesh[i] = createmesh_color(7, [geometry_parameter1[i], geometry_parameter2[i], geometry_parameter3[i]], color_array[i], rotation_x[i], rotation_y[i], rotation_z[i], position_x[i], position_y[i], position_z[i]);
                    break;
                default:
                    break;
            }
            dome.add(dome_mesh[i]);
        }
    }

    var archmaterial = new THREE.MeshPhongMaterial({ color: 0xffe6e6 });
    var archmesh = new THREE.Mesh(dome_arch_geom, material, 1);
    mesh.receiveShadow = true;
    var archgeom = createExtrudedGeometry(10, points_group[0], 1);
    var archmaterial = new THREE.MeshPhongMaterial({ color: 0x0099cc });
    var arch_mesh = new THREE.Mesh(archgeom, archmaterial);
    arch_mesh.rotation.x = -pi / 2;
    arch_mesh.rotation.y = pi / 2;
    arch_mesh.position.set(0, 6 * r, 62);
    dome.add(arch_mesh);

}

//------------------------- add trees on the land--------------------------------
var forest = new THREE.Object3D();
land.add(forest);
// 
var treePos_x = -120;
var treePos_z = 110;
for (var i = 0; i < 8; i++) {
    {
        treePos_x = i * 40 - 140;
        treePos_z = 110;
    }
    // assemble a tree with leaves and trunk
    var tree1 = new THREE.Object3D();
    forest.add(tree1);
    var leaves = createmesh_color(5, 4, 0x009933, 0, 0, 0, treePos_x, 20, treePos_z);
    tree1.add(leaves);
    for (var j = 0; j < 5; j++) {
        leaves = createmesh_color(5, 4, 0x009933, 0, 0, 0, treePos_x + 4 * Math.sin(pi * 2 * j / 5), 15, treePos_z + 4 * Math.cos(pi * 2 * j / 5));
        tree1.add(leaves);
    }

    for (var k = 0; k < 8; k++) {
        leaves = createmesh_color(5, 4, 0x009933, 0, 0, 0, treePos_x + 6 * Math.sin(pi * 2 * k / 5), 10, treePos_z + 6 * Math.cos(pi * 2 * k / 5));
        tree1.add(leaves);
    }
    tree1.add(leaves);
    trunk1 = createmesh_color(3, [1, 1, 10, 8], 0x663300, 0, 0, 0, treePos_x, 4, treePos_z);
    tree1.add(trunk1);
}

for (var i = 0; i < 4; i++) {
    var tree2 = new THREE.Object3D();
    forest.add(tree2);
    leaves1 = createmesh_color(3, [0, 3, 15, 32], 0x009933, 0, 0, 0, -80 + 20 * i, 18, 45);
    leaves2 = createmesh_color(4, [3, 16, 16], 0x009933, 0, 0, 0, -80 + 20 * i, 10, 45);
    trunk2 = createmesh_color(3, [1, 1, 10, 8], 0x663300, 0, 0, 0, -80 + 20 * i, 4, 45);
    tree2.add(leaves1);
    tree2.add(leaves2);
    tree2.add(trunk2);
}

treeland = createmesh_texture(1, [340, 0.8, 20], texture_images[11], 0, 0, 0, 0, 0, 110);
land.add(treeland);

function createExtrudedGeometry1(length, segments) {
    // this is the cross section
    var points = [];
    var geomid;
    switch (geomid) {
        case roof1_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(-1.1 * b2_s, 2.25 * b2_s));
            break;
        case roof2_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(-1.1 * b2_s, 2.25 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(0.05 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(-1.05 * b2_s, 2.25 * b2_s));
            points.push(new THREE.Vector2(0.05 * b2_s, 0 * b2_s));
            break;
        case roof3_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(-1.1 * b2_s, 2.25 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(0.05 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(-1.05 * b2_s, 2.25 * b2_s));
            points.push(new THREE.Vector2(0.05 * b2_s, 0 * b2_s));
            break;
        case roof6_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 12.6 * b2_s));
            points.push(new THREE.Vector2(-0.05 * b2_s, 12.6 * b2_s));
            points.push(new THREE.Vector2(-0.05 * b2_s, 0 * b2_s));
            break;
        case roof9_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 3 * b2_s));
            points.push(new THREE.Vector2(-0.3 * b2_s, 3 * b2_s));
            points.push(new THREE.Vector2(-1.4 * b2_s, 1.5 * b2_s));
            points.push(new THREE.Vector2(-0.3 * b2_s, 0 * b2_s));
            break;
        case roof10_geom:
            points.push(new THREE.Vector2(-0.3 * b2_s, 3.01 * b2_s));
            points.push(new THREE.Vector2(-1.41 * b2_s, 1.5 * b2_s));
            points.push(new THREE.Vector2(-0.3 * b2_s, -0.01 * b2_s));
            points.push(new THREE.Vector2(-0.3 * b2_s, -0.3 * b2_s));
            points.push(new THREE.Vector2(-0.25 * b2_s, -0.3 * b2_s));
            points.push(new THREE.Vector2(-0.25 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(-1.35 * b2_s, 1.5 * b2_s));
            points.push(new THREE.Vector2(-0.25 * b2_s, 3 * b2_s));
            points.push(new THREE.Vector2(-0.25 * b2_s, 3.3 * b2_s));
            points.push(new THREE.Vector2(-0.3 * b2_s, 3.3 * b2_s));
            break;
        case roof11_geom:
            points.push(new THREE.Vector2(0 * b2_s, 0 * b2_s));
            points.push(new THREE.Vector2(0 * b2_s, 4.5 * b2_s));
            points.push(new THREE.Vector2(-1.1 * b2_s, 2.25 * b2_s));
            break;
        case car_window_shape:
            points.push(new THREE.Vector2(-1, -1));
            points.push(new THREE.Vector2(-3, 0));
            points.push(new THREE.Vector2(-3, 1.5));
            points.push(new THREE.Vector2(-1, 2));
            break;
        case car_part_geo10:
            points.push(new THREE.Vector2(0, 0));
            points.push(new THREE.Vector2(-0.02, 0));
            points.push(new THREE.Vector2(-0.03, 0.01));
            points.push(new THREE.Vector2(-0.025, 0.02));
            break;
    }
    var shape = new THREE.Shape(points);
    var extrudeSettings = { steps: segments };
    extrudeSettings.extrudePath = new THREE.LineCurve3(new THREE.Vector3(0, 0, -length / 2), new THREE.Vector3(0, 0, length / 2));
    var prismGeometry = shape.extrude(extrudeSettings);
    return prismGeometry;
}
function createExtrudedGeometry2(length, segments) {
    // this is the cross section
    var points = [];
    var geomid;
    switch (geomid) {
        case roof4_geom:
            points.push(new THREE.Vector3(0 * 4 , 0 * 4 ));
            points.push(new THREE.Vector3(6 * 4 , 0 * 4 ));                            
            points.push(new THREE.Vector3(3 * 4 , 1.4 * 4 ));                           
            break;
        case roof5_geom:
            points.push(new THREE.Vector3(-0.05 * 4 , 0 * 4 ));
            points.push(new THREE.Vector3(3 * 4 , 1.405 * 4 ));  
            points.push(new THREE.Vector3(6.05 * 4 , 0 * 4 )); 
            points.push(new THREE.Vector3(6 * 4 , -0.05 * 4 ));
            points.push(new THREE.Vector3(3 * 4 , 1.35 * 4 ));  
            points.push(new THREE.Vector3(0 * 4 , -0.05 * 4 ));                                                
            break;
        case car_part_geo6: 
            points.push(new THREE.Vector3(4, 0));
            points.push(new THREE.Vector3(6.4, 0));
            points.push(new THREE.Vector3(6.5, -0.3));
            points.push(new THREE.Vector3(6.4, -0.6));
            points.push(new THREE.Vector3(4, -0.6));
            points.push(new THREE.Vector3(3.9, -0.3));
            points.push(new THREE.Vector3(3.98, -0.3));
            points.push(new THREE.Vector3(4.04, -0.52));
            points.push(new THREE.Vector3(6.36, -0.52));
            points.push(new THREE.Vector3(6.42, -0.3));
            points.push(new THREE.Vector3(6.36, -0.08));
            points.push(new THREE.Vector3(4.04, -0.08));
            points.push(new THREE.Vector3(3.98, -0.3));
            points.push(new THREE.Vector3(3.9, -0.3));
            break;
        case car_part_geo7:
            points.push(new THREE.Vector3(0.4, 0.2));
            points.push(new THREE.Vector3(0, 0.2));
            points.push(new THREE.Vector3(0, 0.6));
            points.push(new THREE.Vector3(0.4, 0.6));
            points.push(new THREE.Vector3(0.45, 0.4));
            break;
        case car_part_geo9:
            points.push(new THREE.Vector3(4.48, -0.08));
            points.push(new THREE.Vector3(5.93, -0.08));
            points.push(new THREE.Vector3(5.93, -0.52));
            points.push(new THREE.Vector3(4.48, -0.52));
            points.push(new THREE.Vector3(4.48, -0.47));
            points.push(new THREE.Vector3(5.73, -0.47));
            points.push(new THREE.Vector3(5.73, -0.13));
            points.push(new THREE.Vector3(4.68, -0.13));
            points.push(new THREE.Vector3(4.68, -0.47));
            points.push(new THREE.Vector3(4.48, -0.47));
            break;
    }
    var shape = new THREE.Shape(points);

    var extrudeSettings = { steps: segments };
    extrudeSettings.extrudePath = new THREE.LineCurve3(new THREE.Vector3(-length / 2, 0, 0), new THREE.Vector3(length / 2, 0, 0));

    var prismGeometry = shape.extrude(extrudeSettings);
    return prismGeometry;
}
function createExtrudedGeometry0(length, segments) {
    // this is the cross section
    var points = [];
    var meshid;
    switch (meshid) {
        //-------------------------------------building2---------------------
        case body_geom:
            points.push(new THREE.Vector2(7 * b2_s, 6 * b2_s));
            points.push(new THREE.Vector2(-1 * b2_s, 6 * b2_s));
            points.push(new THREE.Vector2(-1 * b2_s, 10.5 * b2_s));
            points.push(new THREE.Vector2(-2.5 * b2_s, 10.5 * b2_s));
            points.push(new THREE.Vector2(-2.5 * b2_s, 13.5 * b2_s));
            points.push(new THREE.Vector2(-1 * b2_s, 13.5 * b2_s));
            points.push(new THREE.Vector2(-1 * b2_s, 18 * b2_s));
            points.push(new THREE.Vector2(7 * b2_s, 18 * b2_s));
            points.push(new THREE.Vector2(7 * b2_s, 13.5 * b2_s));
            points.push(new THREE.Vector2(5.5 * b2_s, 13.5 * b2_s));
            points.push(new THREE.Vector2(5.5 * b2_s, 10.5 * b2_s));
            points.push(new THREE.Vector2(7 * b2_s, 10.5 * b2_s));
            break;
    }
    var shape = new THREE.Shape(points);
    var extrudeSettings = { steps: segments };
    extrudeSettings.extrudePath = new THREE.LineCurve3(new THREE.Vector3(0, -length / 2, 0), new THREE.Vector3(0, length / 2, 0));
    var prismGeometry = shape.extrude(extrudeSettings);
    return prismGeometry;
}

function createExtrudedGeometry4(length, segments) {
    // this is the cross section
    var points = [];
    var meshid;
    switch (meshid) {
        case car_part_geo1:
            points.push(new THREE.Vector2(-3, 1.55));
            points.push(new THREE.Vector2(-1, 2.05));
            points.push(new THREE.Vector2(-1, -1.05));
            points.push(new THREE.Vector2(-3, -0.05));
            points.push(new THREE.Vector2(-3, 0.05));
            points.push(new THREE.Vector2(-1.3, -0.75));
            points.push(new THREE.Vector2(-1.3, 1.85));
            points.push(new THREE.Vector2(-2.9, 1.45));
            points.push(new THREE.Vector2(-2.9, -0.08));
            points.push(new THREE.Vector2(-3, 0.05));
            break;
        case car_part_geo2:
            points.push(new THREE.Vector2(-3.001, 1.55));
            points.push(new THREE.Vector2(-3.001, -0.05));
            points.push(new THREE.Vector2(-2.9, -0.1));
            points.push(new THREE.Vector2(-2.9, 1.58));
            break;
        case car_part_geo3:
            points.push(new THREE.Vector2(-1, 2.05));
            points.push(new THREE.Vector2(-1, -1.06));
            points.push(new THREE.Vector2(-1.3, -0.9));
            points.push(new THREE.Vector2(-1.3, 1.97));
            break;
        case car_part_geo4:
            points.push(new THREE.Vector2(-1, -1));
            points.push(new THREE.Vector2(-1, -3));
            points.push(new THREE.Vector2(-1.1, -1));
            break;
        case car_part_geo8:
            points.push(new THREE.Vector2(-1.2, -1));
            points.push(new THREE.Vector2(-1.2, -1.2));
            points.push(new THREE.Vector2(-1.3, -1.23));
            points.push(new THREE.Vector2(-1.3, -0.97));
            break;


    }
    var shape = new THREE.Shape(points);
    var extrudeSettings = { steps: segments };
    extrudeSettings.extrudePath = new THREE.LineCurve3(new THREE.Vector3(0, 0, -length / 2), new THREE.Vector3(0, 0, length / 2));
    extrudeSettings.extrudetype = false;
    var prismGeometry = shape.extrude(extrudeSettings);
    return prismGeometry;
}

// -------------------------------------- three functions used to model any curved shape--------

function createPoint(z, x, pts, scale) {

    pts.push(new THREE.Vector2(z * scale, x * scale));

}

function createExtrudedGeometry(length, point_grp, scale) {

    var points = [];
    var i = 0;
    while (i < point_grp.length) {
        if (point_grp[i] == 'curve') {
            i++;
            createCurve(point_grp[i++], point_grp[i++], point_grp[i++], points, scale);
        }
        else {
            createPoint(point_grp[i][0], point_grp[i][1], points, scale);
            i++;
        }
    }

    var shape = new THREE.Shape(points);
    var extrudeSettings = { steps: 1 };
    var pathPoints = [];
    pathPoints.push(new THREE.Vector3(0, -length / 2, 0));
    pathPoints.push(new THREE.Vector3(0, length / 2, 0));
    extrudeSettings.extrudePath = new THREE.SplineCurve3(pathPoints);
    var prismGeometry = shape.extrude(extrudeSettings);
    return prismGeometry;
}

function createCurve(p1, p2, p3, pathpoints, scale) {
    for (var i = 0; i < npoints; i++) {
        if (p2[0] == p1[0])
            pathpoints.push(new THREE.Vector2((p1[0] + (1 - cos_values[i]) * (p3[0] - p1[0])) * scale, (p1[1] + sin_values[i] * (p3[1] - p1[1])) * scale));
        else
            pathpoints.push(new THREE.Vector2((p1[0] + sin_values[i] * (p3[0] - p1[0])) * scale, (p1[1] + (1 - cos_values[i]) * (p3[1] - p1[1])) * scale));
    }
}
//-----------------------------------------------------------------------------------------------------------

///////
// position and point the camera to the center of the scene

camera.position.x = 120;
camera.position.y = 70;
camera.position.z = 200;

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

// add Directionallight for the shadows
var lightColor = "#ffffff"
var light = new THREE.SpotLight(lightColor);
light.position.set(140, 250, 250);
light.intensity = 1;
light.castShadow = true;
scene.add(light);

// add the output of the renderer to the html element
$("#WebGL-output").append(renderer.domElement);

var controls = new function () {
    this.forward = 'W';
    this.left = 'A';
    this.right = 'D';
    this.increase = 'O';
    this.decrease = 'P';
    this.debug = false;
    this.lightColor = lightColor;
    this.intensity = 1  ;
    this.carview = carview;
    this.roofcolor = 0xE34544;
    this.bodycolor = 0x888F97;
    this.domeroofcolor = 0xff9933;
    this.domebodycolor = 0x999966;
    this.domewallupper = 0x008080;
    this.domewalldown = 0xffe6e6;
    this.domewallmiddle = 0x0099cc;

    this.changeview = function () {
        carGroup.visible = true;
        camera.position.x = 150;
        camera.position.y = 100;
        camera.position.z = 200;
    }
    this.changeintensity = function () {
        orbitcontrols.enabled = false;
    }
};

var gui = new dat.GUI();
var keys = gui.addFolder('Keyboard controls');
keys.add(controls, 'forward');
keys.add(controls, 'left');
keys.add(controls, 'right');
keys.open();
var keys = gui.addFolder('intensity controls');
keys.add(controls, 'increase');
keys.add(controls, 'decrease');
keys.open();
gui.add(controls, 'intensity', 0, 1.0).onChange(controls.changeintensity);
gui.add(controls, 'carview').onChange(controls.changeview);

// control on dome building color
var keys = gui.addFolder('Building1_Color');
keys.addColor(controls, 'domeroofcolor').onChange(function(e) {
    domeroof_color = new THREE.Color(e);
    orbitcontrols.enabled = false;
    dome_mesh[2].material.color = domeroof_color;
});
keys.addColor(controls, 'domebodycolor').onChange(function(e) {
    domebody_color = new THREE.Color(e);
    orbitcontrols.enabled = false;
    dome_mesh[0].material.color = domebody_color;
    dome_mesh[1].material.color = domebody_color;
    dome_mesh[4].material.color = domebody_color;
    dome_mesh[5].material.color = domebody_color;
});
keys.addColor(controls, 'domewallupper').onChange(function(e) {
    domewallupper = new THREE.Color(e);
    orbitcontrols.enabled = false;
    for (var i = 0; i< 7; i++){
        wall6[i].material.color = domewallupper;
    }
});
keys.addColor(controls, 'domewallmiddle').onChange(function(e) {
    domewallmiddle = new THREE.Color(e);
    orbitcontrols.enabled = false;
    for (var i = 0; i< 7; i++){
        wall1[i].material.color = domewallmiddle;
    }
});
keys.addColor(controls, 'domewalldown').onChange(function(e) {
    domewalldown = new THREE.Color(e);
    orbitcontrols.enabled = false;
    for (var i = 0; i< 7; i++){
        wall2[i].material.color = domewalldown;
        wall3[i].material.color = domewalldown;
        // if(i > 1)
        // {
        //     for(var j = 0; j < 7;j ++)
        //     dome_downbar[(i-1)*6+j].material.color = domewalldown;
        // }
    }
});

keys.open();

// control on the color of red roof building
var keys = gui.addFolder('Building2_Color');
keys.addColor(controls, 'roofcolor').onChange(function(e) {
    roof_color = new THREE.Color(e);
    orbitcontrols.enabled = false;
    roof1_mesh.children[1].material.color = roof_color;
    roof2_mesh.children[1].material.color = roof_color;
    roof3_mesh.children[1].material.color = roof_color;
    roof4_mesh.children[1].material.color = roof_color;
    roof5_mesh.children[1].material.color = roof_color;
    roof6_mesh.children[1].material.color = roof_color;
    roof7_mesh.children[1].material.color = roof_color;
    roof8_mesh.children[1].material.color = roof_color;
    roof9_mesh.children[1].material.color = roof_color;
    roof10_mesh.children[1].material.color = roof_color;
    roof11_mesh.children[1].material.color = roof_color;
});
keys.addColor(controls, 'bodycolor').onChange(function(e) {
    body_color = new THREE.Color(e);
    orbitcontrols.enabled = false;
    body_mesh.children[1].material.color = body_color;
});
keys.open();


if (controls.carview == false) {
    var orbitcontrols = new THREE.OrbitControls(camera);
    orbitcontrols.rotateSpeed = 2.0;
    orbitcontrols.zoomSpeed = 2.0;
    orbitcontrols.panSpeed = 2.0;
    orbitcontrols.staticMoving = true;
    orbitcontrols.preventDefault = false;
}

var clock = new THREE.Clock();

var keysDown = {}; //empty object to store which keys are being held down

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true; //create a property  for the key being pressed
    //https://css-tricks.com/snippets/javascript/javascript-keycodes/
    //console.log(JSON.stringify(keysDown));
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});

// tests if a car is inside the road or not
var temp_x = [0, 1, 0, -1, 0, 1, 1, -1, -1];
var temp_z = [0, 0, -1, 0, 1, 1, -1, -1, 1];

//------------------------------ function to test if the car is out of the road
function test_ifout(i) {
    if (carGroup.position.z + temp_z[i] > 45 && carGroup.position.x + temp_x[i] > 85 && carGroup.position.x + temp_x[i] < 90 && carGroup.position.z + temp_z[i] < 70)
        return false;
    if ((Math.abs(carGroup.position.z + temp_z[i]) < 65 && Math.abs(carGroup.position.x + temp_x[i]) < 115) || (Math.abs(carGroup.position.z + temp_z[i]) > 95) || Math.abs(carGroup.position.x + temp_x[i]) > 145)
        return true;
    else
        return false;
}


var angle = 0; // angle that the car rotates by
var garage_vector = new THREE.Vector3(88, 0, 60);       // 3d vector which is targeted from inside a car to view outside

// check which key was pressed
function checkKeys() {

    //prevent a car from going out
    if (test_ifout(0)) {
        for (var i = 1; i < 9; i++) {
            if (test_ifout(i) == false) {
                carGroup.position.x += temp_x[i];
                carGroup.position.z += temp_z[i];
                break;
            }
        }
    }
    else {
        if (keysDown[87]) { //w car forward
            carGroup.translateX(-0.8);
        }

        if (keysDown[83]) { //s car backward
            carGroup.translateX(0.5);
        }

        if (keysDown[65]) { //a car left
            carGroup.rotation.y += 0.015;
            angle += 0.015;
        }

        if (keysDown[68]) { //d car right
            carGroup.rotation.y -= 0.015;
            angle -= 0.015;
        }

        if (keysDown[79]) { // o increase intensity
            if (controls.intensity < 1.5)
                controls.intensity += 0.05;
        }

        if (keysDown[80]) { // p decrease intensity
            if (controls.intensity > 0)
                controls.intensity -= 0.05;
        }
    }

    // ------------------ if a user switches to view from car, camera is moved to inside the car
    car_vector.set(carGroup.position.x + 2 * Math.cos(angle), carGroup.position.y + 12, carGroup.position.z - 2 * Math.sin(angle));
    if (controls.carview) {

        camera.position.x = carGroup.position.x;
        camera.position.y = 12;
        camera.position.z = carGroup.position.z;
        camera.lookAt(car_vector);
    }

    //--------------------if a car approaches parking box, it opens automatically
    distance = car_vector.distanceTo(garage_vector);
    if (distance < 30)
        garage_state = 1;
    else if (garage_state == 1) {
        garage_state = 2;
    }

    // -------------------if it gets dark, streetlights are turned on
    if (light.intensity < 0.1) {
        for (var i = 0; i < 7; i++) {
            reflection1[i].visible = true;
            reflection2[i].visible = true;
        }
    }
    else {
        for (var i = 0; i < 7; i++) {
            reflection1[i].visible = false;
            reflection2[i].visible = false;
        }
    }

}


// generate mesh according the given geometry and color, rotation and position information
function createmesh_color(geometry, geometryParameter, color_value, r_x, r_y, r_z, p_x, p_y, p_z) {
    var mat = new THREE.MeshLambertMaterial({ color: color_value });

    switch (geometry) {
        case 1:
            var geo = new THREE.BoxGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2]);
            break;
        case 2:
            var geo = new THREE.PlaneGeometry(geometryParameter[0], geometryParameter[1]);
            break;
        case 3:
            var geo = new THREE.CylinderGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2], geometryParameter[3]);
            break;
        case 4:
            var geo = new THREE.SphereGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2]);
            break;
        case 5:
            var geo = new THREE.DodecahedronGeometry(geometryParameter);
            break;
        case 6:
            var geo = new THREE.TorusGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2], geometryParameter[3]);
            break;
        default:
            break;
    }

    var obj = new THREE.Mesh(geo, mat);
    obj.castShadow = true;
    obj.receiveShadow = true;
    obj.rotation.x = r_x;
    obj.rotation.y = r_y;
    obj.rotation.z = r_z;
    obj.position.x = p_x;
    obj.position.y = p_y;
    obj.position.z = p_z;

    return obj;

}

function createmesh_texture(geometry, geometryParameter, texture, r_x, r_y, r_z, p_x, p_y, p_z) {
    var mat = new THREE.MeshLambertMaterial({ map: loader.load(texture) });

    switch (geometry) {
        case 1:
            var geo = new THREE.BoxGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2]);
            break;
        case 2:
            var geo = new THREE.PlaneGeometry(geometryParameter[0], geometryParameter[1]);
            break;
        case 3:
            var geo = new THREE.CylinderGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2], geometryParameter[3]);
            break;
        case 4:
            var geo = new THREE.SphereGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2]);
            break;
        case 5:
            var geo = new THREE.DodecahedronGeometry(geometryParameter);
            break;
        case 6:
            var geo = new THREE.TorusGeometry(geometryParameter[0], geometryParameter[1], geometryParameter[2], geometryParameter[3]);
            break;
        default:
            break;
    }
    var obj = new THREE.Mesh(geo, mat);
    obj.castShadow = true;
    obj.receiveShadow = true;
    obj.rotation.x = r_x;
    obj.rotation.y = r_y;
    obj.rotation.z = r_z;
    obj.position.x = p_x;
    obj.position.y = p_y;
    obj.position.z = p_z;
    return obj;

}

// make a responsive scene
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false);
render();

console.log(roof2_mesh);
function render() {
    checkKeys();
    stats.update();
    light.intensity = controls.intensity;
    windows2_mesh.rotation.y = -Math.PI / 2;
    windows3_mesh.rotation.y = -Math.PI / 2;
    windows4_mesh.rotation.y = -Math.PI / 2;
    windows5_mesh.rotation.y = -Math.PI / 2;

    //-----------------------------keep the wheels of the car rolling---------------
    for (var i = 0; i < 4; i++) {
        wheel[i].rotation.y += 0.3;
        wheel1[i].rotation.y += 0.3;
    }

    orbitcontrols.enabled = true;
    if (controls.carview == false) {
        var delta = clock.getDelta();
        orbitcontrols.update(delta);
    }
    //------------------------------controls the state of parking box---------------
    if (garage_state == 1 && garage_door.rotation.x < pi / 2) {
        garage_door.rotation.x += 0.02;
    }
    else if (garage_state == 2) {
        if (garage_door.rotation.x > 0)
            garage_door.rotation.x -= 0.02;
        if (garage_door.rotation.x == 0 && garage_state == 2)
            garage_state = 0;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

//------------------show how to interact with this file--------------------------
function notify() {
    alert("Hello!\n\nPlease use your mouse to move, zoom and rotate.\n\nKeyboards\n  (car)  w: forward\n           s: backward\n           a: left\n           d: right\n    Car cannot go out of the road. If the car goes near the parking box, door is open.\n    If you check carview option, you can switch to a view from the car.\n\n  (light intensity)\n        o: increase\n        p:decrease\n    If you lower the intensity of light, lightpost in the street are turned on automatically.");
}

function initStats() {

    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $("#Stats-output").append(stats.domElement);

    return stats;
}
