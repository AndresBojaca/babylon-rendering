export class UiContext {
  constructor() {
  }

  makePoints() {
    // Obtener el lie zo de la página
    let canvas = document.getElementById("renderCanvas"); 
    // Crear una nueva escena en Babylon.js
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);
    //GUI
    let modal = this.makeModal();
    let meshT = new BABYLON.Mesh("box", scene);
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let markerImage = new BABYLON.GUI.Image("marker", "https://babylongrendering.blob.core.windows.net/textures/pngegg.png");
    markerImage.width = "32px";
    markerImage.height = "32px";
    markerImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    markerImage.onPointerUpObservable.add(function () {
      modal.style.display = "block";
    });
    advancedTexture.addControl(markerImage);
    markerImage.linkWithMesh(meshT);
    markerImage.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;

    meshT.position = new BABYLON.Vector3(53.63, 31.27, -25.36);

    let pickCylinder = function (meshEvent) {
      modal.style.display = "block";
    };
    let light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
  }

  makeModal() {
    return `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <img style="    width: 100%;
        height: 700px;
        object-fit: contain;" src="https://ekoospaces-losrobles.herokuapp.com/static/media/1368_fachada_comunal_plazoleta.f015e9365d16e4ecc4b5.jpg">
      </div>
    </div>`;
  }
}