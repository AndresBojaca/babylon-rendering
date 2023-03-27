export class UiContext {
  constructor() {
    this.close = document.getElementById('closeModal');
    this.modalDOM = document.getElementById('modal');
    this.modalContentDOM = document.getElementById('modalContent');
  }

  makePoint(scene, props) {
    let meshT = new BABYLON.Mesh("box", scene);
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //Marker validation Image
    if(props.marker?.type ==='image'){
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
          this.modal(true, props.modal.template);
        });
      }
    }
  }
  modal(show, template = ''){
    this.close.addEventListener('click', ()=>{
      this.modalDOM.classList.remove('show');
    })
    if(show === true){
      this.modalContentDOM.innerHTML = template;
      this.modalDOM.classList.add('show');
    }
  }
}
