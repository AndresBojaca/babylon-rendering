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
      document.getElementById('modal').style.opacity = 1;
      document.getElementById('modal').style.display = "none";
      let opacidad = 1;
      const intervalo = setInterval(function() {
        opacidad -= 1;
        document.getElementById('modal').style.opacity = opacidad;
        if (opacidad <= 1) {
          clearInterval(intervalo);
        }
      }, 50);
    })
    if(show === true){
      this.modalContentDOM.innerHTML = template;
      document.getElementById('modal').style.opacity = 0;
      document.getElementById('modal').style.display = "block";
      let opacidad = 0;
      const intervalo = setInterval(function() {
        opacidad += 0.1;
        document.getElementById('modal').style.opacity = opacidad;
        if (opacidad >= 1) {
          clearInterval(intervalo);
        }
      }, 50);
    }
  }
}
