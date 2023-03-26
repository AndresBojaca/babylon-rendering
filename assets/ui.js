export class UiContext {
  constructor() {
  }

  makePoint(scene, props) {
    //GUI
    let advancedTextureMarker = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let markerContainer = new BABYLON.GUI.Container();
    advancedTextureMarker.addControl(markerContainer);
    advancedTextureMarker.isPointerBlocker = false;
    
    BABYLON.SceneLoader.ImportMesh("", "/assets/textures/map_point/", "scene.gltf", scene, function onSuccess(meshes) {
      let markerMesh = meshes[0];
      markerMesh.isVisible = false;
      markerMesh.actionManager = new BABYLON.ActionManager(scene);
      markerMesh.position.y = 10;
    
      // Crear imagen GUI para el marcador
      let markerImage = new BABYLON.GUI.Image("marker");
      markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
      markerContainer.addControl(markerImage);
      markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
      markerContainer.linkWithMesh(markerMesh);
    
      markerImage.onPointerUpObservable.add(function () {
        // modal.style.display = "block";
      });
    
      markerMesh.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);

    }, null, function onError(scene, message, exception) {
      try {
          console.error("Error cargando archivo GLTF:", message, exception);
          console.log("Valor de t:", t);
      } catch (error) {
          console.error("Error en la función onError:", error);
      }
    });

    let pickCylinder = function (meshEvent) {
      // modal.style.display = "block";
    };
  }
}
