import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    TonemapPlugin,

} from "webgi";
import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Pane } from "tweakpane";
import { DirectionalLight, AmbientLight } from "three";


gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: ".mainContainer" });



async function setupViewer() {
    const viewer = new ViewerApp({
        canvas: document.getElementById("webgi-canvas"),
        useRgbm: false,
        isAntialiased: true,
    });
    viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

// to use the tweakpane function
    // const data = {
    //     position: { x: 0, y: 0, z: 0 },
    //     rotation: { x: 0, y: 0, z: 0 },
    // };
    // const pane = new Pane();


    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;

// add plugins 
// GBufferPlugin: For better handling of geometries and materials.
// ProgressivePlugin: For progressive rendering.
// TonemapPlugin: For better tone mapping.
// SSRPlugin: For screen space reflections.
// SSAOPlugin: For screen space ambient occlusion.
// BloomPlugin: For bloom effects.

    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);
    const tonemapPlugin = await viewer.addPlugin(TonemapPlugin);

    
    // tonemapPlugin.config.brightness = 2.0;
    // tonemapPlugin.config.contrast = 1.5;

    const directionalLight = new DirectionalLight(0xffffff, 1.5);  // Color and intensity
    directionalLight.position.set(5, 5, 5);  // Position of the light source
    viewer.scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 1.5);  // Color and intensity
    viewer.scene.add(ambientLight);



// // to use all the plugins at once
//     await addBasePlugins(viewer);

// pane.addBinding(data, "position", {
//     x: { step: 0.01 },
//     y: { step: 0.01 },
//     z: { step: 0.01 },
// });
// pane.addBinding(data, "rotation", {
//     x: { min: -6.28319, max: 6.28319, step: 0.001 },
//     y: { min: -6.28319, max: 6.28319, step: 0.001 },
//     z: { min: -6.28319, max: 6.28319, step: 0.001 },
// });

// pane.on('change', (ev) => {
//     if (ev.presetKey === 'rotation') {
//         const { x, y, z } = ev.value;
//         modelRotation.set(x, y, z);
//     } else {
//         const { x, y, z } = ev.value;
//         modelPosition.set(x, y, z);
//     }
//     onUpdate();
// });

    const importer = manager.importer;
    importer.addEventListener("onProgress", (ev) => {
        const progressRatio = ev.loaded/ev.total;
        document.querySelector(".progress")?.setAttribute("style", `transform: scaleX(${progressRatio})`);
    });


    importer.addEventListener("onLoad", (ev) => {
        introAnimation();
    });


    // Import and add a GLB file.
    viewer.renderer.refreshPipeline();
    const model = await manager.addFromPath("./assets/scene.glb");
    const Object3d = model[0].modelObject;
    const modelPosition = Object3d.position;
    const modelRotation = Object3d.rotation;

    const loaderElement = document.querySelector(".loader");

    // // Disable shadows for the model
    // Object3d.traverse((child) => {
    //     if (child.isMesh) {
    //         child.castShadow = false;
    //         child.receiveShadow = false;
    //     }
    // });
    


    function introAnimation() {
        const introTL = gsap.timeline();
        introTL
          .to(".loader", {
            x: "150%",
            duration: 0.8,
            ease: "power4.inOut",
            delay: 1,
        onComplete: setupScrollAnimation,
          })
      }


    function setupScrollAnimation() {
        document.body.removeChild(loaderElement);
        
        const t1 = gsap.timeline();
        t1.to(modelPosition, {
            x: -0.9,
            y: -0.43,
            z: 0,
            scrollTrigger: {
                trigger: ".first",
                start: "top top",
                end: "top top",
                scrub: 0.2,
                immediateRender: false,
            },
            onUpdate,
        })
            // n0.2 
            .to(modelPosition, {
                x: 0.2,
                y: 0.4,
                z: -0.22,
                scrollTrigger: {
                    trigger: ".second",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
                onUpdate,
            })
            .to(modelRotation, {
                x: 0.0,
                y: 0,
                z: -1.57,
                scrollTrigger: {
                    trigger: ".second",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
            })
            
            .to(modelPosition, {
                x: 0.38,
                y: -0.11,
                z: -1.06,
                scrollTrigger: {
                    trigger: ".third",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
                onUpdate,
            })
            .to(modelRotation, {
                x: 0.403,
                y: 0.957,
                z: -0.421,
                scrollTrigger: {
                    trigger: ".third",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
            })
            // no.4
            .to(modelPosition, {
                x: 0.92,
                y: -0.31,
                z: 0.66,
                scrollTrigger: {
                    trigger: ".four",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
                onUpdate,
            })
            .to(modelRotation, {
                x: 0.0,
                y: 1.641,
                z: 0,
                scrollTrigger: {
                    trigger: ".four",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
            })
            .to(modelPosition, {
                x: -0.1,
                y: 0.2,
                z: 0.99,
                scrollTrigger: {
                    trigger: ".five",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
                onUpdate,
            })
            .to(modelRotation, {
                x: -0.785,
                y: 2.329,
                z: 1,
                scrollTrigger: {
                    trigger: ".five",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
            })
            .to(modelPosition, {
                x: 0.16,
                y: -0.3,
                z: -0.56,
                scrollTrigger: {
                    trigger: ".six",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
                onUpdate,
            })
            .to(modelRotation, {
                x: -0.261,
                y: 4.911,
                z: -0.277,
                scrollTrigger: {
                    trigger: ".six",
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.2,
                    immediateRender: false,
                },
            });
        console.log("setupScrollAnimation");
    }

    let needsUpdate = true;
    function onUpdate() {
        needsUpdate = true;
        viewer.renderer.resetShadows();
        viewer.setDirty();
    }

    document.queruSelectorAll(".button--footer")?.forEach((item) =>{
        item.addEventListener("click", () => {
            const container = document.getElementsByClassName("mainContainer");
            container[0].scrollTo({top:0, left:0, behavior: 'smooth'});

        });
    });



}

setupViewer();
