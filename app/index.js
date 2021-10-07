/**
 * Main App File
 */
import { Camera, Plane, Renderer, Transform } from "ogl";

import { debounce } from "lodash";

// Image files for the gallery
import Image1 from "images/1.jpg";
import Image2 from "images/2.jpg";
import Image3 from "images/3.jpg";
import Image4 from "images/4.jpg";
import Image5 from "images/5.jpg";
import Image6 from "images/6.jpg";
import Image7 from "images/7.jpg";
import Image8 from "images/8.jpg";
import Image9 from "images/9.jpg";
import Image10 from "images/10.jpg";
import Image11 from "images/11.jpg";
import Image12 from "images/12.jpg";
import Media from "./Media";

export default class App {
    constructor() {
        document.documentElement.classList.remove("no-js");

        this.scroll = {
            ease: 0.05,
            current: 0,
            target: 0,
            last: 0
        };

        this.onCheckDebounce = debounce(this.onCheck, 200);

        this.createRenderer();
        this.createCamera();
        this.createScene();

        this.onResize();

        this.createGeometry();
        this.createMedias();
    }

    /**
     * Create OGL renderer
     */
    createRenderer() {
        this.renderer = new Renderer();

        this.gl = this.renderer.gl;
        this.gl.clearColor(0.79607843137, 0.79215686274, 0.74117647058, 1);

        document.body.appendChild(this.gl.canvas);
    }

    /**
     * Create OGL camera
     */
    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    /**
     * Create OGL scene
     */
    createScene() {
        this.scene = new Transform();
    }

    /**
     * Resize
     */
    onResize() {
        this.screen = {
            height: window.innerHeight,
            width: window.innerWidth
        };

        this.renderer.setSize(this.screen.width, this.screen.height);

        this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        });

        const fov = this.camera.fov * (Math.PI / 180);
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;

        this.viewport = {
            height,
            width
        };

        if (this.medias) {
            // TODO: Media resize function
        }
    }

    /**
     * Create Geometry
     */
    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }

    createMedias() {
        this.mediasImagesImages = [
            { image: Image1, text: "New Synagogue" },
            { image: Image2, text: "Paro Taktsang" },
            { image: Image3, text: "Petra" },
            { image: Image4, text: "Gooderham Building" },
            { image: Image5, text: "Catherine Palace" },
            { image: Image6, text: "Sheikh Zayed Mosque" },
            { image: Image7, text: "Madonna Corona" },
            { image: Image8, text: "Plaza de Espana" },
            { image: Image9, text: "Saint Martin" },
            { image: Image10, text: "Tugela Falls" },
            { image: Image11, text: "Sintra-Cascais" },
            { image: Image12, text: "The Prophet's Mosque" },
            { image: Image1, text: "New Synagogue" },
            { image: Image2, text: "Paro Taktsang" },
            { image: Image3, text: "Petra" },
            { image: Image4, text: "Gooderham Building" },
            { image: Image5, text: "Catherine Palace" },
            { image: Image6, text: "Sheikh Zayed Mosque" },
            { image: Image7, text: "Madonna Corona" },
            { image: Image8, text: "Plaza de Espana" },
            { image: Image9, text: "Saint Martin" },
            { image: Image10, text: "Tugela Falls" },
            { image: Image11, text: "Sintra-Cascais" },
            { image: Image12, text: "The Prophet's Mosque" }
        ];

        this.medias = this.mediasImagesImages.map(({ image, text }, index) => new Media({
            geometry: this.planeGeometry,
            gl: this.gl,
            image,
            text,
            length: this.mediasImagesImages.length,
            renderer: this.renderer,
            scene: this.scene,
            screen: this.screen,
            index,
            viewport: this.viewport
        }));
    }

    onCheck() {
        return;
    }

}

new App();