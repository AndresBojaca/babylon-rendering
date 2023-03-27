'use strict';

import { UiContext } from './controllers/ui.js';
import { CoreContext } from './controllers/core.js';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const Ui = new UiContext();
const Core = new CoreContext({canvas: canvas, engine: engine, scene: scene});

Core.CameraARC();
Core.makePlane(`${CDN_TEXTURES}/Concrete07_GLOSS_6K.jpg`);
// Core.loadDebugger();

// User Interface
Ui.makePoint(scene, { position: { x: 53.63, y: 31.27, z: -25.36 }, marker: { type: 'image', url: `${CDN_TEXTURES}/pngegg.png`, height: '50px', width: '50px' }, modal: { template: '<img style="width: 100%;height: 700px;" src="https://ekoospaces-losrobles.herokuapp.com/static/media/1368_fachada_comunal_plazoleta.f015e9365d16e4ecc4b5.jpg"/>' }});