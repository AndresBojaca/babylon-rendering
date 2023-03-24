
const glbs = [{
  "name": "babylon_express_server",
  "version": "1.0.0",
  "description": "An implementation of Express and BabylonJS to make it easier to code BabylonJS apps in NodeJS",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "babel src --out-file dist/src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yazheirx/babylon_express_server.git"
  },
  "keywords": [
    "BabylonJS",
    "Express",
    "NodeJS"
  ],
  "author": "Justin G. Cramer",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/yazheirx/babylon_express_server/issues"
  },
  "homepage": "https://github.com/yazheirx/babylon_express_server#readme",
  "dependencies": {
    "babylonjs": "^5.52.0",
    "cors": "^2.8.5",
    "express": "^4.16.4"
  },
  "devDependencies": {
    "@babel/cli": "^7.21.0"
  }
}
];

// Obtener el lienzo de la página
var canvas = document.getElementById("renderCanvas");

// Crear una nueva escena en Babylon.js
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
// scene.debugLayer.show();

loadModelsAndTextures();
// CameraDRONE();
CameraARC();

function loadModelsAndTextures() {
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
  return Promise.all(promises);
}

function loadModel(modelFile, textureModel, materialName) {
  return new Promise((resolve) => {
    BABYLON.SceneLoader.ImportMesh("", "", modelFile, scene, function (meshes) {
      const meshMaterial = new BABYLON.StandardMaterial(materialName, scene);
      //Texture Type Validation
      if (textureModel.type === 'file') {
        const texture = new BABYLON.Texture(textureModel.texture, scene);
        texture.vScale = -1;
        // meshMaterial.diffuseTexture = texture;
      } else if (textureModel.type === 'color') {
        meshMaterial.diffuseColor = new BABYLON.Color3.FromHexString(textureModel.texture.color);
        meshMaterial.alpha = textureModel.texture.alpha;
      }
      meshes.forEach(mesh => {
        meshes[0].material = meshMaterial;
        meshes[1].material = meshMaterial;
        mesh.checkCollisions = true;
      })
      resolve();
    });
  });
}

//SKY
const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
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
  var camera = new BABYLON.ArcRotateCamera("camera1", -200, -200, -80, new BABYLON.Vector3(0, 200, 0), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 150;
  camera.upperRadiusLimit = 300;
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
