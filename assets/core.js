
import glbs from './utils/glbs.json' assert { type: "json" };

// Obtener el lienzo de la página
var canvas = document.getElementById("renderCanvas");

// Crear una nueva escena en Babylon.js
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
scene.debugLayer.show();

window.onload = function () {
  // Mostrar el mensaje o el elemento de carga
  const loadingEl = document.getElementById('loading-message');
  if(loadingEl){
    loadingEl.style.opacity = '0';
    setTimeout(() => {
      loadingEl.style.display = 'none';
    }, 1000);
  }
};

loadModelsAndTextures();
// CameraDRONE();
CameraARC();

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
    loadingEl.style.display = 'flex'; // Mostrar el loader
  return Promise.all(promises).then(() => {
    loadingEl.style.display = 'none'; // Ocultar el loader
  });
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
      // makePlane();
      resolve();
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
    const texture = new BABYLON.Color3.FromHexString('#555555');
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", options, scene);
    plane.material = new BABYLON.StandardMaterial("material", scene);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -1;
    plane.material.diffuseColor = texture;
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
  var camera = new BABYLON.ArcRotateCamera("camera1", -900, 30, -200, new BABYLON.Vector3(0, 200, 0), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 150;
  camera.upperRadiusLimit = 8000;
  camera.wheelDeltaPercentage = 0.01;
  camera.applyGravity = true;
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
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

// Iniciar la renderización
engine.runRenderLoop(function () {
  scene.render();
});