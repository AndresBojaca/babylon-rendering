export class CoreContext {
  constructor(args) {
    this.canvas = args.canvas;
    this.engine = args.engine;
    this.scene = args.scene;
    this.loadModelsAndTextures();
    this.loadSky();
    this.engine.runRenderLoop(() => this.scene.render()); // Iniciar la renderización
  }

  loadModelsAndTextures() {
    glbs.forEach(glb => {
      //Texture Type Validation
      if (glb.texture?.url) {
        this.loadModel(glb.glbfile, this.scene, { type: 'file', texture: glb.texture.url }, `${glb.modelName}`);
      }
      if (glb.texture?.color) {
        this.loadModel(glb.glbfile, this.scene, { type: 'color', texture: glb.texture }, `${glb.modelName}`);
      }
    });

  }

  loadModel(urlGlb, scene, textureModel, modelName, position = false) {
    BABYLON.SceneLoader.ImportMesh("", "", urlGlb, scene, function (meshes) {
      const meshMaterial = new BABYLON.StandardMaterial(modelName, scene);
      //Texture Type Validation
      if (textureModel.type === 'file') {
        let texture = new BABYLON.Texture(textureModel.texture, scene);
        //Voltea las Texturas
        texture.vScale = -1;
        meshMaterial.diffuseTexture = texture;
      } else if (textureModel.type === 'color') {
        meshMaterial.diffuseColor = new BABYLON.Color3.FromHexString(textureModel.texture.color);
        meshMaterial.alpha = textureModel.texture.alpha;
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
    cameraArcRotateCamera.lowerRadiusLimit = 2//90;
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

  loadDebugger(){
    this.scene.debugLayer.show();
  }
}


