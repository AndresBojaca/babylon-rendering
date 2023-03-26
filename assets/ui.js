export class UiContext {
  constructor() {
  }

  makePoint(scene, props) {
    //GUI
    let meshT = new BABYLON.Mesh("box", scene);
    let modal = document.getElementById('myModal');
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let markerImage = new BABYLON.GUI.Image(
      "marker",
      props.markerImg.url
    );
    markerImage.width = "32px";
    markerImage.height = "32px";
    markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    //Modal Validation with template
    if(props.hasOwnProperty('modal')){
      markerImage.onPointerUpObservable.add(() => {
        modal.innerHTML = props.modal.template;
        modal.style.opacity = 1;
      });
    }
    advancedTexture.addControl(markerImage);
    markerImage.linkWithMesh(meshT);
    markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;

    meshT.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);

    let pickCylinder = function (meshEvent) {
      // modal.style.display = "block";
    };
  }
}
