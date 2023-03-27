export class CoreContext {
  constructor(args) {
    this.canvas = args.canvas;
    this.engine = args.engine;
    this.scene = args.scene;
    this.loadModelsAndTextures();
    this.loadSky();
    this.loadCars(this.scene);
    this.engine.runRenderLoop(() => this.scene.render()); // Iniciar la renderización
  }

  loadModelsAndTextures() {
    const loader = document.getElementById('loader');
    loader.classList.add('show');
    glbs.forEach(glb => {
      if (glb.texture?.url) {
        this.loadModel(glb.glbfile, this.scene, { type: 'file', texture: glb.texture }, `${glb.modelName}`);
      }
      if (glb.texture?.color) {
        this.loadModel(glb.glbfile, this.scene, { type: 'color', texture: glb.texture }, `${glb.modelName}`);
      }
    });
    // Quita el loader despues de que los modelos cargaron
    this.scene.executeWhenReady(() => {
      loader.classList.remove('show');
      setTimeout(() => {
      loader.style.display = 'none';
      }, 100);
    });
  }
  
  loadModel(urlGlb, scene, textureModel, modelName, position = false) {
    BABYLON.SceneLoader.ImportMesh("", "", urlGlb, scene, function (meshes) {
      const meshMaterial = new BABYLON.StandardMaterial(modelName, scene);
      //Texture Type Validation
      if (textureModel.type === 'file') {
        let texture = new BABYLON.Texture(textureModel.texture.url, scene);
        texture.vScale = -1;
        meshMaterial.diffuseTexture = texture;
      } else if (textureModel.type === 'color') {
        meshMaterial.diffuseColor = new BABYLON.Color3.FromHexString(textureModel.texture.color);
        meshMaterial.alpha = textureModel.texture.alpha;
      }
      if(textureModel.texture.hasOwnProperty('alphaurl')){
        let texture = new BABYLON.Texture(textureModel.texture.alphaurl, scene);
        texture.vScale = -1;
        meshMaterial.opacityTexture = texture;
        meshMaterial.backFaceCulling = false;
        texture.getAlphaFromRGB = true;
      }
      if (position) {
        meshes.forEach((ev) => {
          ev.position = new BABYLON.Vector3(position.x, position.y, position.z);
        });
      }
      meshes.forEach((ev) => { ev.material = meshMaterial; ev.checkCollisions = true;});
    });
  }
  
  loadSky() {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 4000.0 }, this.scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    //Propiedades del Cielo
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`${CDN_TEXTURES}/skybox`,this.scene);
    skybox.infiniteDistance = true;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }

  makePlane(textureURL) {
    const options = { width: 3000, height: 3000, sideOrientation: BABYLON.Mesh.FRONTSIDE, updatable: true };
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", options, this.scene);
    const texture = new BABYLON.Texture(textureURL, this.scene);
    const material = new BABYLON.StandardMaterial("PLANO", this.scene);
    material.diffuseTexture = texture;
    plane.material = material;
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -1;
  }

  CameraARC() {
    // Configurar la cámara y la luz
    let cameraArcRotateCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 39.2484, 1.4, 122.0,new BABYLON.Vector3(38, 16.59, -8.31),this.scene);
    cameraArcRotateCamera.attachControl(this.canvas, true);
    cameraArcRotateCamera.lowerRadiusLimit = 90;
    cameraArcRotateCamera.upperRadiusLimit = 400.0;
    cameraArcRotateCamera.lowerBetaLimit = 1.0;
    cameraArcRotateCamera.upperBetaLimit = 1.4;
    cameraArcRotateCamera.wheelDeltaPercentage = 0.01;
    cameraArcRotateCamera.applyGravity = true;
    this.scene.collisionsEnabled = true;
    cameraArcRotateCamera.checkCollisions = true;
    //Lights
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    light.intensity = 2.0;
  }
  CameraDRONE() {
    const camera = new BABYLON.FlyCamera(
      "FlyCamera",
      new BABYLON.Vector3(40, 60, 150),
      this.scene
    );
    camera.setTarget(new BABYLON.Vector3(20, 20, 0));
    camera.rollCorrect = 10;
    camera.bankedTurn = true;
    camera.bankedTurnLimit = Math.PI / 2;
    camera.bankedTurnMultiplier = 1;
    this.scene.gravity = new BABYLON.Vector3(0, -0.15, 0);

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    this.scene.collisionsEnabled = true;
    camera.checkCollisions = true;
  }

  loadCars(scene) {
    var positionInitial = {
      x: -7.08,
      y: 0.21,
      z: -3,
    };
    const box = BABYLON.MeshBuilder.CreateBox("box", {
      height: 1,
      width: 0.75,
      depth: 0.25,
    });
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {
      height: 1,
      width: 0.75,
      depth: 0.25,
    });

    box2.position.x = 90;
    box2.position.y = 0.21;
    box2.position.z = -3;
    box2.visibility = 0;
    box.position.x = positionInitial.x;
    box.position.y = positionInitial.y;
    box.position.z = positionInitial.z;
    box.visibility = 0;

    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      `${CDN_MODELS}/_CARROS001.glb`,
      this.scene,
      function (ev) {
        // Set the target of the camera to the first imported mesh
        const meshMaterial = new BABYLON.StandardMaterial("_CARROS001",scene);
        let texture = new BABYLON.Texture(`${CDN_TEXTURES}/_CARROS001_Corona_Diffuse.webp`,scene);
        texture.vScale = -1;
        meshMaterial.diffuseTexture = texture;
        ev[0].material = meshMaterial;
        ev[1].material = meshMaterial;
        ev[0].setParent(box2);
        ev[1].setParent(box2);
        box2.rotation.y = 254.508;
        //POSITIONS
        ev[0].position.x = 0.29;
        ev[0].position.y = 0.22;
        ev[0].position.z = -0.74;
        ev[1].position.x = 0.29;
        ev[1].position.y = 0.22;
        ev[1].position.z = -0.74;
      }
    );
    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      `${CDN_MODELS}/_CARROS001.glb`,
      this.scene,
      function (ev) {
        // Set the target of the camera to the first imported mesh
        const meshMaterial = new BABYLON.StandardMaterial(
          "_CARROS001.glb",
          scene
        );
        let texture = new BABYLON.Texture(`${CDN_TEXTURES}/_CARROS001_Corona_Diffuse.webp`,scene);
        texture.vScale = -1;
        meshMaterial.diffuseTexture = texture;
        ev[0].setParent(box);
        ev[1].setParent(box);
        ev[0].material = meshMaterial;
        ev[1].material = meshMaterial;
        ev[0].position.x = -0.7;
        ev[0].position.y = 0.21;
        ev[0].position.z = -1.61;
        ev[1].position.x = -0.7;
        ev[1].position.y = 0.21;
        ev[1].position.z = -1.61;
      }
    );

    //Points
    var points = [];
    var points2 = [];
    for (var i = 0; i < 100; i = i + 0.2) {
      points.push(new BABYLON.Vector3(i - 7.08, 0.22, -3));
    }
    var w = 0;
    this.scene.registerAfterRender(function () {
      var n = 500;
      box.position.x = points[w].x;
      box.position.z = points[w].z;
      box2.position.x = points[points.length - 1 - w].x;
      box2.position.z = points[points.length - 1 - w].z;
      w = (w + 1) % (n - 1); //continuous looping
    });
  }

  loadDebugger(){
    this.scene.debugLayer.show();
  }
}


