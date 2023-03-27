export class UiContext {
  constructor() {}

  makePoint(scene, props) {
    //GUI
    let meshT = new BABYLON.Mesh("box", scene);
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //Marker validation GLB
    if(props.marker?.type ==='glb'){
        let markerContainer = new BABYLON.GUI.Container();
        advancedTexture.addControl(markerContainer);
        advancedTexture.isPointerBlocker = false;
        BABYLON.SceneLoader.ImportMesh("", props.marker?.type.url, props.marker?.type.sceneUrl, scene, function onSuccess(meshes) {
        let markerMesh = meshes[0];
        markerMesh.isVisible = false;
        markerMesh.actionManager = new BABYLON.ActionManager(scene);
        // Crear imagen GUI para el marcador
        let markerImage = new BABYLON.GUI.Image("marker");
        markerImage.width = props.marker?.width;
        markerImage.height = props.marker?.height;
        markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
        markerContainer.addControl(markerImage);
        markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        markerContainer.linkWithMesh(markerMesh);
        markerMesh.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    
      }, null, function onError(scene, message, exception) {
        try {
            console.error("Error cargando archivo GLTF:", message, exception);
        } catch (error) {
            console.error("Error en la función onError:", error);
        }
      });
    }
    //Marker validation Image
    if(props.marker?.type ==='image'){

    // GUI
      let markerImage = new BABYLON.GUI.Image(
        "marker",
        props.marker?.url
      );
      markerImage.width = props.marker?.width;
      markerImage.height = props.marker?.height;
      markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
      advancedTexture.addControl(markerImage);
      markerImage.linkWithMesh(meshT);
      markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
      meshT.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
      //Modal Validation with template
      if(props.hasOwnProperty('modal')){
        markerImage.onPointerUpObservable.add(() => {
          this.modal(props.modal.template)
        });
      }
    }
  }
  modal(template){
    let modal = document.getElementById('myModal');
    modal.innerHTML = template;
    modal.style.opacity = 1;
  }
}
