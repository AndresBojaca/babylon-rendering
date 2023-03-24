import glbs from "../assets/utils/glbs.json" assert { type: "json" };
window.addEventListener("DOMContentLoaded", function async() {
  var toLoad = glbs.length;
  var canvas = document.getElementById("canvas");
  var engine = new BABYLON.Engine(canvas, true, {
    adaptToDeviceRatio: true,
    disableWebGL2Support: true,
  });

  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FlyCamera(
      "cameraDrone",
      new BABYLON.Vector3(0, 200, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(20, 20, 0));
    scene.activeCamera = camera;
    new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1000, 300),
      scene
    ).intensity = 0.9;
    var toLoad = glbs.length;
    loadModelsAndTextures();
    return scene;
  };

  var scene = createScene();
  scene.debugLayer.show();

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

  async function whenDoneFunction(meshe, glbdata, scene) {
    toLoad--;
    /*await loadTextures();
          let texture = new BABYLON.Texture("assets/textures/torre1/Torre1low.webp", scene);
          texture.vScale = -1;
          let meshMaterial = new BABYLON.StandardMaterial("test", scene);
          meshMaterial.diffuseTexture = texture;
          meshe.forEach((mesh) => {
               mesh[0].material = meshMaterial;
               mesh[1].material = meshMaterial;
               mesh.checkCollisions = true;
          });*/
    if (toLoad === 0) {
      alert("loading done!");
    }
  }

  engine.runRenderLoop(function () {
    scene.render();
  });
});
