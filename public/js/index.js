
window.addEventListener('DOMContentLoaded',function async() {
     let glbs = [
          {
            "modelName": "torre1",
            "glbfile": "assets/models/torre1/Torre1.glb",
            "texture": {
              "url": "assets/textures/torre1/Torre1low.webp"
            }
          },
          {
            "modelName": "torre1_ventanas",
            "glbfile": "assets/models/torre1/Torre1Ventanas.glb",
            "texture": {
              "url": "assets/textures/torre1/Torre1Ventanaslow.webp"
            }
          },
          {
              "modelName": "torre1_fachada_falsa",
              "glbfile": "assets/models/torre1/Torre1FachadaFalsa.glb",
              "texture": {
                "url": "assets/textures/torre1/Torre1FachadaFalsalow.webp"
              }
          },
          {
              "modelName": "torre1_cubierta",
              "glbfile": "assets/models/torre1/Torre1Cubierta.glb",
              "texture": {
                "url": "assets/textures/torre1/Torre1Cubiertalow.webp"
              }
          },
          {
              "modelName": "torre1_escaleras",
              "glbfile": "assets/models/torre2/Torre2Escaleras.glb",
              "texture": {
                "url": "assets/textures/torre1/Torre1Escaleraslow.webp"
              }
          },
          {
              "modelName": "torre2",
              "glbfile": "assets/models/torre2/Torre2.glb",
              "texture": {
                "url": "assets/textures/torre2/Torre2.webp"
              }
          },
          {
              "modelName": "torre2_ventanas",
              "glbfile": "assets/models/torre2/Torre2Ventanas.glb",
              "texture": {
                "url": "assets/textures/torre2/Torre2Ventanas.webp"
              }
          },
          {
              "modelName": "torre2_fachada_falsa",
              "glbfile": "assets/models/torre2/Torre2FachadaFalsa.glb",
              "texture": {
                "url": "assets/textures/torre2/Torre2FachadaFalsa.webp"
              }
          },
          {
              "modelName": "torre2_cubierta",
              "glbfile": "assets/models/torre2/Torre2Cubierta.glb",
              "texture": {
                "url": "assets/textures/torre2/Torre2Cubierta.webp"
              }
          },
          {
              "modelName": "torre2_escaleras",
              "glbfile": "assets/models/torre2/Torre2Escaleras.glb",
              "texture": {
                "url": "assets/textures/torre2/Torre2Escaleras.webp"
              }
          },
          {
                "modelName": "torre3",
              "glbfile": "assets/models/torre3/Torre3.glb",
              "texture": {
                "url": "assets/textures/torre3/Torre3.webp"
              }
          },
          {
                "modelName": "torre3_cubierta",
              "glbfile": "assets/models/torre3/Torre3Cubierta.glb",
              "texture": {
                "url": "assets/textures/torre3/Torre3Cubierta.webp"
              }
          },
          {
                "modelName": "torre4",
              "glbfile": "assets/models/torre4/Torre4.glb",
              "texture": {
                "url": "assets/textures/torre4/Torre4.webp"
              }
          },
          {
                "modelName": "torre4_cubierta",
              "glbfile": "assets/models/torre4/Torre4Cubierta.glb",
              "texture": {
                "url": "assets/textures/torre4/Torre4Cubierta.webp"
              }
          },
          {
                "modelName": "torre3y4_ventanas",
              "glbfile": "assets/models/torre3y4/Torre3y4Ventanas.glb",
              "texture": {
                "url": "assets/textures/torre3y4/Torre3y4Ventanas.webp"
              }
          },
          {
                "modelName": "torre3y4_Fachada_Falsa",
              "glbfile": "assets/models/torre3y4/Torre3y4FachadaFalsa.glb",
              "texture": {
                "url": "assets/textures/torre3y4/Torre3y4FachadaFalsa.webp"
              }
          },
          {
                "modelName": "torre3y4_Deck",
              "glbfile": "assets/models/torre3y4/Torre3y4Deck.glb",
              "texture": {
                "url": "assets/textures/torre3y4/Torre3y4Deck.webp"
              }
          },
          {
                "modelName": "salon_ascensor",
              "glbfile": "assets/models/saloncomunal/Ascensor.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Ascensor.webp"
              }
          },
          {
                "modelName": "salon_baranda_escalera",
              "glbfile": "assets/models/saloncomunal/BarandaEscalera.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/BarandaEscalera.webp"
              }
          },
          {
                "modelName": "salon_bordillo",
              "glbfile": "assets/models/saloncomunal/Bordillo.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Bordillo.webp"
              }
          },
          {
                "modelName": "salon_chimenea",
              "glbfile": "assets/models/saloncomunal/Chimenea.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Chimenea.webp"
              }
          },
          {
                "modelName": "salon_comunal",
              "glbfile": "assets/models/saloncomunal/Comunal.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Comunal.webp"
              }
          },
          {
                "modelName": "salon_escaleras",
              "glbfile": "assets/models/saloncomunal/Escaleras.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Escaleras.webp"
              }
          },
          {
                "modelName": "salon_fachada",
              "glbfile": "assets/models/saloncomunal/FachadaFalsa.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/FachadaFalsa.webp"
              }
          },
          {
                "modelName": "salon_laminado1",
              "glbfile": "assets/models/saloncomunal/Laminado1.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Laminado1.webp"
              }
          },
          {
                "modelName": "salon_laminado2",
              "glbfile": "assets/models/saloncomunal/Laminado2.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Laminado2.webp"
              }
          },
          {
                "modelName": "salon_logotipo",
              "glbfile": "assets/models/saloncomunal/Logotipo.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Logotipo.webp"
              }
          },
          {
                "modelName": "salon_pasto",
              "glbfile": "assets/models/saloncomunal/Pasto.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Pasto.webp"
              }
          },
          {
                "modelName": "salon_salida",
              "glbfile": "assets/models/saloncomunal/SalidaEmergencia.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/SalidaEmergencia.webp"
              }
          },
          {
                "modelName": "salon_ventanas",
              "glbfile": "assets/models/saloncomunal/Ventanas.glb",
              "texture": {
                "url": "assets/textures/saloncomunal/Ventanas.webp"
              }
          },
          {
            "modelName": "urbanismo_adoquin",
            "glbfile": "assets/models/urbanismo/Adoquin.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Adoquin.webp"
            }
          },
          {
            "modelName": "urbanismo_adoquin_ocre",
            "glbfile": "assets/models/urbanismo/AdoquinOcre.glb",
            "texture": {
              "url": "assets/textures/urbanismo/AdoquinOcre.webp"
            }
          },
          {
            "modelName": "urbanismo_caminos_robles",
            "glbfile": "assets/models/urbanismo/CaminosRobles.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CaminosRobles.webp"
            }
          },
          {
            "modelName": "urbanismo_andenes",
            "glbfile": "assets/models/urbanismo/Andenes.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Andenes.webp"
            }
          },
          {
            "modelName": "urbanismo_andenes",
            "glbfile": "assets/models/urbanismo/Andenes.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Andenes.webp"
            }
          },
          {
            "modelName": "urbanismo_arcos_futbol",
            "glbfile": "assets/models/urbanismo/ArcosFutbol.glb",
            "texture": {
              "url": "assets/textures/urbanismo/ArcosFutbol.webp"
            }
          },
          {
            "modelName": "urbanismo_cancha",
            "glbfile": "assets/models/urbanismo/Cancha.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Cancha.webp"
            }
          },
          {
            "modelName": "urbanismo_cancha_alpha",
            "glbfile": "assets/models/urbanismo/Cancha.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CanchaAlpha.webp"
            }
          },
          {
            "modelName": "urbanismo_cancha_voley",
            "glbfile": "assets/models/urbanismo/CanchaVolley.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CanchaVolley.webp"
            }
          },
          {
            "modelName": "urbanismo_carretera",
            "glbfile": "assets/models/urbanismo/Carretera.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Carretera.webp"
            }
          },
          {
            "modelName": "urbanismo_casas_vecinas",
            "glbfile": "assets/models/urbanismo/CasasVecinas.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CasasVecinas.webp"
            }
          },
          {
            "modelName": "urbanismo_casas_vecinas",
            "glbfile": "assets/models/urbanismo/CasasVecinas.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CasasVecinas.webp"
            }
          },
          {
            "modelName": "urbanismo_cerramiento_parques",
            "glbfile": "assets/models/urbanismo/CerramientoParques.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CerramientoParques.webp"
            }
          },
          {
            "modelName": "urbanismo_ciclovia",
            "glbfile": "assets/models/urbanismo/Ciclovia.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Ciclovia.webp"
            }
          },
          {
            "modelName": "urbanismo_circuito_trote",
            "glbfile": "assets/models/urbanismo/CircuitoTrote.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CircuitoTrote.webp"
            }
          },
          {
            "modelName": "urbanismo_concreto",
            "glbfile": "assets/models/urbanismo/Concreto.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Concreto.webp"
            }
          },
          {
            "modelName": "urbanismo_deck_concreto",
            "glbfile": "assets/models/urbanismo/DeckConcreto.glb",
            "texture": {
              "url": "assets/textures/urbanismo/DeckConcreto.webp"
            }
          },
          {
            "modelName": "urbanismo_malla_volley",
            "glbfile": "assets/models/urbanismo/MallaVoley.glb",
            "texture": {
              "url": "assets/textures/urbanismo/MallaVoley.webp"
            }
          },
          {
            "modelName": "urbanismo_parque_futbol",
            "glbfile": "assets/models/urbanismo/ParqueFutbol.glb",
            "texture": {
              "url": "assets/textures/urbanismo/ParqueFutbol.webp"
            }
          },
          {
            "modelName": "urbanismo_pasto",
            "glbfile": "assets/models/urbanismo/Pasto.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Pasto4.webp"
            }
          },
          {
            "modelName": "urbanismo_pasto_sendero",
            "glbfile": "assets/models/urbanismo/PastoSendero.glb",
            "texture": {
              "url": "assets/textures/urbanismo/PastoSendero.webp"
            }
          },
          {
            "modelName": "urbanismo_rampas",
            "glbfile": "assets/models/urbanismo/Rampas.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Rampas.webp"
            }
          },
          {
            "modelName": "urbanismo_sinteticos",
            "glbfile": "assets/models/urbanismo/Sinteticos.glb",
            "texture": {
              "url": "assets/textures/urbanismo/Sinteticos.webp"
            }
          },
          {
            "modelName": "flora_adoquin",
            "glbfile": "assets/models/flora/FloraAdoquin.glb",
            "texture": {
              "url": "assets/textures/flora/FloraAdoquin.webp"
            }
          },
          {
            "modelName": "flora_anden",
            "glbfile": "assets/models/flora/FloraAnden.glb",
            "texture": {
              "url": "assets/textures/flora/FloraAnden.webp"
            }
          },
          {
            "modelName": "flora_bancas",
            "glbfile": "assets/models/flora/FloraBancas.glb",
            "texture": {
              "url": "assets/textures/flora/FloraBancas.webp"
            }
          },
          {
            "modelName": "flora_baranda_escaleras",
            "glbfile": "assets/models/flora/FloraBarandaEscaleras.glb",
            "texture": {
              "url": "assets/textures/flora/FloraBarandaEscaleras.webp"
            }
          },
          {
            "modelName": "flora_bordillo",
            "glbfile": "assets/models/flora/FloraBordillo.glb",
            "texture": {
              "url": "assets/textures/flora/FloraBordillo.webp"
            }
          },
          {
            "modelName": "flora_cerramiento",
            "glbfile": "assets/models/flora/FloraCerramiento.glb",
            "texture": {
              "url": "assets/textures/flora/FloraCerramiento.webp"
            }
          },
          {
            "modelName": "flora_escaleras",
            "glbfile": "assets/models/flora/FloraEscaleras.glb",
            "texture": {
              "url": "assets/textures/flora/FloraEscaleras.webp"
            }
          },
          {
            "modelName": "flora_lobby",
            "glbfile": "assets/models/flora/FloraLobby.glb",
            "texture": {
              "url": "assets/textures/flora/FloraLobby.webp"
            }
          },
          {
            "modelName": "flora_ventana",
            "glbfile": "assets/models/flora/FloraVentana.glb",
            "texture": {
              "url": "assets/textures/flora/FloralVentana.webp"
            }
          },
          {
            "modelName": "flora_muros",
            "glbfile": "assets/models/flora/FloraMuros.glb",
            "texture": {
              "url": "assets/textures/flora/FloraMuros.webp"
            }
          },
          {
            "modelName": "flora_muros_parqueadero",
            "glbfile": "assets/models/flora/FloraMurosParqueadero.glb",
            "texture": {
              "url": "assets/textures/flora/FloraMurosParqueadero.webp"
            }
          },
          {
            "modelName": "flora_capuchino",
            "glbfile": "assets/models/flora/FloraParedCapuchino.glb",
            "texture": {
              "url": "assets/textures/flora/FloraParedCapuchino.webp"
            }
          },
          {
            "modelName": "flora_pisos",
            "glbfile": "assets/models/flora/FloraPisos.glb",
            "texture": {
              "url": "assets/textures/flora/FloraPisos.webp"
            }
          },
          {
            "modelName": "flora_sintetico_azul",
            "glbfile": "assets/models/flora/FloraSinteticoAzul.glb",
            "texture": {
              "url": "assets/textures/flora/FloraSinteticoAzul.webp"
            }
          },
          {
            "modelName": "flora_tierra",
            "glbfile": "assets/models/flora/FloraTierra.glb",
            "texture": {
              "url": "assets/textures/flora/FloraTierra3.webp"
            }
          },
          {
            "modelName": "flora_volumen",
            "glbfile": "assets/models/flora/FloraVolumen.glb",
            "texture": {
              "url": "assets/textures/flora/FloraVolumen.webp"
            }
          },
          {
            "modelName": "urbanismo_cancha_alpha",
            "glbfile": "assets/models/urbanismo/Cancha.glb",
            "texture": {
              "url": "assets/textures/urbanismo/CanchaAlpha.webp"
            }
          },
          {
            "modelName": "urbanismo_malla_volley_alpha",
            "glbfile": "assets/models/urbanismo/MallaVoley.glb",
            "texture": {
              "url": "assets/textures/urbanismo/MallaVoleyAlpha.webp"
            }
          },
          {
            "modelName": "urbanismo_base_sintetico",
            "glbfile": "assets/models/urbanismo/BaseSintetico.glb",
            "texture": {
              "url": "assets/textures/urbanismo/BaseSintetico.webp"
            }
          },
          {
            "modelName": "urbanismo_arcos_futbol_alpha",
            "glbfile": "assets/models/urbanismo/ArcosFutbol.glb",
            "texture": {
              "url": "assets/textures/urbanismo/ArcosFutbolalpha.webp"
            }
          }
        ]    
        
        var toLoad = glbs.length;
     var canvas = document.getElementById('canvas');
     var engine = new BABYLON.Engine(canvas, true);

     var createScene = function() {
          var scene = new BABYLON.Scene(engine);
          var camera = new BABYLON.FlyCamera(
               "cameraDrone",
               new BABYLON.Vector3(0, 200, 0),
               scene
             );
             camera.attachControl(canvas, true);
             camera.setTarget(new BABYLON.Vector3(20, 20, 0));
          scene.activeCamera = camera;
          new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1000, 300), scene).intensity = 0.9;
          var toLoad = glbs.length;
          loadModelsAndTextures();
          return scene;
     };
     var scene = createScene();
     scene.debugLayer.show();
     function loadModelsAndTextures() {
          for (var index = 0; index < glbs.length; index++) {
            let glb = glbs[index];
            // The first parameter can be used to specify which mesh to import. Here we import all meshes
            BABYLON.SceneLoader.ImportMesh(
              "",
              "",
              glbs[index].glbfile,
              scene,
              function (meshe) {
                // Set the target of the camera to the first imported mesh
                //let meshMaterial = new BABYLON.StandardMaterial("test", scene);
                //Texture Type Validation
                let texture = new BABYLON.Texture(glb.texture.url, scene);
               texture.vScale = -1;
               let meshMaterial = new BABYLON.StandardMaterial(glb.modelName, scene);
               meshMaterial.diffuseTexture = texture;
               meshe.material = meshMaterial;
               meshe.forEach((mesh) => {
                    console.log(mesh);
                    mesh.material = meshMaterial;
                    
               mesh.checkCollisions = true;
          });
                whenDoneFunction(meshe, glb, scene);
                //let kek = scene.getMeshByName(glb.modelName);
                //kek.isVisible =false;
              }
            );
          }
     }

     async function loadTextures() {
          for (var index = 0; index < glbs.length; index++) {
            if (index < 30) {
              // Real KTX2
              const textureOriginalUrl = glbs[index].texture.url;
              // Download texture to local
              const textureArrayBuffer = await BABYLON.Tools.LoadFileAsync(
                textureOriginalUrl,
                true
              );
              const textureBlob = new Blob([textureArrayBuffer]);
              const textureUrl = URL.createObjectURL(textureBlob);
              let texture = new BABYLON.Texture(textureUrl, scene);
              texture.vScale = -1;
            }
          }
        }

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

     engine.runRenderLoop(function() {
          scene.render();
     });
});
