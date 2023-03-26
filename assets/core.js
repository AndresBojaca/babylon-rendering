
import glbs from './utils/glbs.json' assert { type: "json" };
import { UiContext } from './ui.js';

// Obtener el lienzo de la página
var canvas = document.getElementById("renderCanvas");

// Crear una nueva escena en Babylon.js
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
scene.debugLayer.show();

loadModelsAndTextures();
// CameraDRONE();
CameraARC();
const Ui = new UiContext();



function loadModelsAndTextures() {
  const loadingEl = document.getElementById('loading-message');
  const promises = []
  glbs.forEach(glb => {
    //Texture Type Validation
    if (glb.texture?.url) {
      promises.push(loadModel(glb.glbfile, { type: 'file', texture: glb.texture.url }, `${glb.modelName}`));
    }
    if (glb.texture?.color) {
      promises.push(loadModel(glb.glbfile, { type: 'color', texture: glb.texture }, `${glb.modelName}`));
    }
  });
  return Promise.all(promises)
}

function loadModel(modelFile, textureModel, materialName) {
  return new Promise((resolve) => {
    BABYLON.SceneLoader.ImportMesh("", "", modelFile, scene, function (meshes) {
      const meshMaterial = new BABYLON.StandardMaterial(materialName, scene);
      //Texture Type Validation
      if (textureModel.type === 'file') {
        const texture = new BABYLON.Texture(textureModel.texture, scene);
        texture.vScale = -1;
        meshMaterial.diffuseTexture = texture;
      } else if (textureModel.type === 'color') {
        meshMaterial.diffuseColor = new BABYLON.Color3.FromHexString(textureModel.texture.color);
        meshMaterial.alpha = textureModel.texture.alpha;
      }
      meshes.forEach(mesh => {
        meshes[0].material = meshMaterial;
        meshes[1].material = meshMaterial;
        mesh.checkCollisions = true;
      })
      //Make GM Plane
      makePlane();
      resolve();
      //GUI
      var meshT = new BABYLON.Mesh("box", scene);
      var advancedTexture =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

      var markerImage = new BABYLON.GUI.Image("marker", "https://babylongrendering.blob.core.windows.net/textures/pngegg.png");
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
      var light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

    });
  });
}


//Make Plane
function makePlane(){
  const options = {
    width: 3000,
    height: 3000,
    sideOrientation: BABYLON.Mesh.FRONTSIDE,
    updatable: true
  };
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", options, scene);
  const texture = new BABYLON.Texture('https://babylongrendering.blob.core.windows.net/textures/Concrete07_GLOSS_6K.jpg', scene);
  const material = new BABYLON.StandardMaterial("PLANO", scene);
  material.diffuseTexture = texture;
  plane.material = material;
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -1;
}
//SKY
const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 4000.0 }, scene);
const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox", scene);
skybox.infiniteDistance = true;
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

function CameraARC() {
  // Configurar la cámara y la luz
  let camera = new BABYLON.ArcRotateCamera(
    "ArcRotateCamera",
    39.2484,
    1.4,
    122.0,
    new BABYLON.Vector3(43.16, 16.59, -8.31),
    scene
  );

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 50;
  camera.upperRadiusLimit = 300;
  camera.wheelDeltaPercentage = 0.01;
  camera.applyGravity = true;
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;

  // Cambiar la velocidad horizontal y vertical
  camera.speed = 1;
  camera.angularSensibility = 1000;

  //Lights
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1000, 300), scene).intensity = 0.9;
}

function CameraDRONE() {
  const camera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(40, 60, 150), scene);
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
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
}


function createRandomTree(scene, trunkHeight, numBranches) {
  // crear tronco
  var trunk = BABYLON.Mesh.CreateCylinder("trunk", trunkHeight, 0.5, 0.5, 12, 1, scene);

  // crear ramas
  var branches = [];
  for (var i = 0; i < numBranches; i++) {
    var branchPoints = [
      new BABYLON.Vector3(0, trunkHeight * 0.5, 0),
      new BABYLON.Vector3(Math.random() * 2 - 1, Math.random() * 0.5, Math.random() * 2 - 1).normalize().scale(0.5),
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