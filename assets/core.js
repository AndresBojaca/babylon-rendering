import glbs from "./utils/glbs.json";
import { UiContext } from "./ui.js";

// Obtener el lienzo de la página
var canvas = document.getElementById("renderCanvas");

// Crear una nueva escena en Babylon.js
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
scene.debugLayer.show();

loadModelsAndTextures();
// CameraDRONE();
const Ui = new UiContext();

function loadModelsAndTextures() {
  for (let i = 0; i < glbs.length; i++) {
    loadModel(
      glbs[i].glbfile,
      scene,
      glbs[i].texture.url,
      glbs[i].texture.isAlpha,
      glbs[i].texture.backFaceCulling,
      glbs[i].texture.position
    );
  }
}

function loadModel(
  urlGlb,
  scene,
  textureUrl,
  isAlpha = false,
  backFaceCulling = false,
  position = false
) {
  BABYLON.SceneLoader.ImportMesh("", "", urlGlb, scene, function (meshes) {
    const meshMaterial1 = new BABYLON.StandardMaterial("AdoquinOcre", scene);
    let texture = new BABYLON.Texture(textureUrl, scene);
    texture.vScale = -1;
    if (isAlpha) {
      texture.hasAlpha = true;
      texture.useAlphaFromDiffuseTexture = true;
      meshMaterial1.alpha = 0.36;
    }
    if (backFaceCulling) {
      meshMaterial1.backFaceCulling = false;
    }

    if (position) {
      meshes.forEach((ev) => {
        ev.position = new BABYLON.Vector3(
          position.x,
          position.y,
          position.z
        );
      });
    }

    meshMaterial1.diffuseTexture = texture;
    meshes.forEach((ev) => {
      ev.material = meshMaterial1;
      ev.checkCollisions = true;
    });
  });
}

//GUI
var meshT = new BABYLON.Mesh("box", scene);
var advancedTexture =
  BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

var markerImage = new BABYLON.GUI.Image(
  "marker",
  "https://babylongrendering.blob.core.windows.net/textures/pngegg.png"
);
markerImage.width = "32px";
markerImage.height = "32px";
markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
markerImage.onPointerUpObservable.add(function () {
  modal.style.display = "block";
});
advancedTexture.addControl(markerImage);
markerImage.linkWithMesh(meshT);
markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;

meshT.position = new BABYLON.Vector3(53.63, 31.27, -25.36);

var pickCylinder = function (meshEvent) {
  modal.style.display = "block";
};
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
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

var cameraArcRotateCamera = new BABYLON.ArcRotateCamera(
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
  var trunk = BABYLON.Mesh.CreateCylinder(
    "trunk",
    trunkHeight,
    0.5,
    0.5,
    12,
    1,
    scene
  );

  // crear ramas
  var branches = [];
  for (var i = 0; i < numBranches; i++) {
    var branchPoints = [
      new BABYLON.Vector3(0, trunkHeight * 0.5, 0),
      new BABYLON.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 0.5,
        Math.random() * 2 - 1
      )
        .normalize()
        .scale(0.5),
    ];
    var branch = BABYLON.Mesh.CreateLines("branch" + i, branchPoints, scene);
    branch.parent = trunk;
    branches.push(branch);
  }

  return trunk;
}

// Iniciar la renderización
engine.runRenderLoop(function () {
  scene.render();
});
