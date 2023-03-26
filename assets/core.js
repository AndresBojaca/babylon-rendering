import { UiContext } from "./ui.js";

// Obtener el lienzo de la página
let canvas = document.getElementById("renderCanvas");

// Crear una nueva escena en Babylon.js
let engine = new BABYLON.Engine(canvas, true);
let scene = new BABYLON.Scene(engine);
scene.debugLayer.show();

loadModelsAndTextures();
// CameraDRONE();
const Ui = new UiContext();

function loadModelsAndTextures() {
  glbs.forEach(glb => {
    //Texture Type Validation
    if (glb.texture?.url) {
      loadModel(glb.glbfile, scene, { type: 'file', texture: glb.texture.url }, `${glb.modelName}`);
    }
    if (glb.color) {
      loadModel(glb.glbfile, scene, { type: 'color', texture: glb.texture }, `${glb.modelName}`);
    }
  });
}

function loadModel(
  urlGlb,
  scene,
  textureModel,
  modelName,
  position = false) {
  BABYLON.SceneLoader.ImportMesh("", "", urlGlb, scene, function (meshes) {
    const meshMaterial = new BABYLON.StandardMaterial(modelName, scene);
    //Texture Type Validation
    if (textureModel.type === 'file') {
      let texture = new BABYLON.Texture(textureModel.texture, scene);
      //Flip Textures
      texture.vScale = -1;
      //Make Diffuse Texture
      meshMaterial.diffuseTexture = texture;
    } else if (textureModel.type === 'color') {
      meshMaterial.diffuseColor = new BABYLON.Color3.FromHexString(textureModel.texture.color);
      meshMaterial.alpha = textureModel.texture.alpha;
    }
    //Positon Validation
    if (position) {
      meshes.forEach((ev) => {
        ev.position = new BABYLON.Vector3(
          position.x,
          position.y,
          position.z
        );
      });
    }
    meshes.forEach((ev) => {
      ev.material = meshMaterial;
      ev.checkCollisions = true;
    });
  });
}
//Lights
let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 2.0;

//Make Plane
function makePlane() {
  const options = {
    width: 3000,
    height: 3000,
    sideOrientation: BABYLON.Mesh.FRONTSIDE,
    updatable: true,
  };
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", options, scene);
  const texture = new BABYLON.Texture(
    "https://babylongrendering.blob.core.windows.net/textures/Concrete07_GLOSS_6K.jpg",
    scene
  );
  const material = new BABYLON.StandardMaterial("PLANO", scene);
  material.diffuseTexture = texture;
  plane.material = material;
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -1;
}
//Make GM Plane
makePlane();
// Puntos de Interes
Ui.makePoint(scene, { position: {x: 0, y: 10, z: 0}, markerImg: { url: 'https://babylongrendering.blob.core.windows.net/textures/pngegg.png' }, modal: { template: '<img style="width: 100%;height: 700px;object-fit: contain;" src="https://ekoospaces-losrobles.herokuapp.com/static/media/1368_fachada_comunal_plazoleta.f015e9365d16e4ecc4b5.jpg"/>' }});

//SKY
const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 4000.0 }, scene);
const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
  "assets/textures/skybox",
  scene
);
skybox.infiniteDistance = true;
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

let cameraArcRotateCamera = new BABYLON.ArcRotateCamera(
  "ArcRotateCamera",
  39.2484,
  1.4,
  122.0,
  new BABYLON.Vector3(43.16, 16.59, -8.31),
  scene
);

cameraArcRotateCamera.attachControl(canvas, true);
cameraArcRotateCamera.lowerRadiusLimit = 2; //122.0000;
cameraArcRotateCamera.upperRadiusLimit = 400.0;
cameraArcRotateCamera.lowerBetaLimit = 1.0;
cameraArcRotateCamera.upperBetaLimit = 1.4;
cameraArcRotateCamera.wheelDeltaPercentage = 0.01;
cameraArcRotateCamera.applyGravity = true;
scene.collisionsEnabled = true;
cameraArcRotateCamera.checkCollisions = true;

function CameraDRONE() {
  const camera = new BABYLON.FlyCamera(
    "FlyCamera",
    new BABYLON.Vector3(40, 60, 150),
    scene
  );
  camera.setTarget(new BABYLON.Vector3(20, 20, 0));
  // Airplane like rotation, with faster roll correction and banked-turns.
  // Default is 100. A higher number means slower correction.
  camera.rollCorrect = 10;
  // Default is false.
  camera.bankedTurn = true;
  // Defaults to 90° in radians in how far banking will roll the camera.
  camera.bankedTurnLimit = Math.PI / 2;
  // How much of the Yawing (turning) will affect the Rolling (banked-turn.)
  // Less than 1 will reduce the Rolling, and more than 1 will increase it.
  camera.bankedTurnMultiplier = 1;
  scene.gravity = new BABYLON.Vector3(0, -0.15, 0);

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
  //Lights
}

function createRandomTree(scene, trunkHeight, numBranches) {
  // crear tronco
  let trunk = BABYLON.Mesh.CreateCylinder(
    "trunk",
    trunkHeight,
    0.5,
    0.5,
    12,
    1,
    scene
  );

  // crear ramas
  let branches = [];
  for (let i = 0; i < numBranches; i++) {
    let branchPoints = [
      new BABYLON.Vector3(0, trunkHeight * 0.5, 0),
      new BABYLON.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 0.5,
        Math.random() * 2 - 1
      )
        .normalize()
        .scale(0.5),
    ];
    let branch = BABYLON.Mesh.CreateLines("branch" + i, branchPoints, scene);
    branch.parent = trunk;
    branches.push(branch);
  }

  return trunk;
}

// Iniciar la renderización
engine.runRenderLoop(function () {
  scene.render();
});
