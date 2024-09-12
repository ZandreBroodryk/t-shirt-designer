import { Canvas } from "@react-three/fiber";
import CameraRig from "./camera-rig";
import { Center, OrbitControls } from "@react-three/drei";
import Shirt from "./shirt";
import { useState } from "react";
import { MathUtils, Vector3 } from "three";
import { DecalType } from "../../shared/types";
import Backdrop from "../atoms/backdrop";

export default function ShirtCanvas(): JSX.Element {
  const [decals, setDecals] = useState<DecalType[]>([]);
  
  return (
    <>
      <button
        className="p-4 bg-neutral-500 rounded-lg w-fit absolute top-3 right-3 bg-opacity-80 z-10"
        onClick={() =>
          setDecals([
            ...decals,
            {
              position: new Vector3(0, 0.04, 0.15),
              scale: 0.15,
              src: "/react.png",
            },
          ])
        }
      >
        Add Image
      </button>
      <button
        className="p-4 bg-neutral-500 rounded-lg w-fit absolute top-20 right-3 bg-opacity-80 z-10"
        onClick={() => {
          const link = document.createElement("a");
          const view = document
            .getElementById("all-views")
            ?.querySelector("canvas");
          link.setAttribute("download", "front.png");
          link.setAttribute(
            "href",
            view!
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          );
          link.click();
        }}
      >
        Download
      </button>
      <div className="absolute flex flex-col top-0 left-3 max-h-screen overflow-auto z-10 max-w-44 gap-4 py-4">
        {decals.map((decal, index) => (
          <div
            className="flex flex-col bg-neutral-600 p-2 rounded-md"
            key={`${decal.src}-${index}`}
          >
            <img src={decal.src} alt="uploaded image" />
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files?.item(0)?.type.includes("image")) {
                  const imageUrl = URL.createObjectURL(
                    event.target.files.item(0)!
                  );
                  const oldDecals = [...decals];
                  oldDecals[index].src = imageUrl;
                  setDecals(oldDecals);
                }
              }}
            />
            <p>Left/Right</p>
            <input
              type="range"
              min={-0.1}
              max={0.2}
              step={0.01}
              value={decal.position.x}
              onChange={(event) => {
                const oldDecals = [...decals];
                oldDecals[index].position.x = +event.target.value;
                setDecals(oldDecals);
              }}
            />
            <p>Up/Down</p>
            <input
              type="range"
              min={-0.2}
              max={0.1}
              step={0.01}
              value={decal.position.y}
              onChange={(event) => {
                const oldDecals = [...decals];
                oldDecals[index].position.y = +event.target.value;
                setDecals(oldDecals);
              }}
            />
            <p>
              z (The default should work, but you can tweak this if the image
              gets clipped)
            </p>
            <input
              type="range"
              min={-0.25}
              max={0.26}
              step={0.001}
              value={decal.position.z}
              onChange={(event) => {
                const oldDecals = [...decals];
                oldDecals[index].position.z = +event.target.value;
                setDecals(oldDecals);
              }}
            />
            <p>size</p>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.01}
              value={decal.scale}
              onChange={(event) => {
                const oldDecals = [...decals];
                oldDecals[index].scale = +event.target.value;
                setDecals(oldDecals);
              }}
            />
            <button
              className="bg-red-500 bg-opacity-80 w-fit rounded-lg mx-auto px-2"
              onClick={() => {
                const oldDecals = [...decals];
                oldDecals.splice(index, 1);
                setDecals(oldDecals);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 w-full h-full">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 25 }} id="left-view">
          <ambientLight intensity={0.5} />
          <CameraRig>
            {/* <Backdrop /> */}
            <Center>
              <Shirt decals={decals} />
            </Center>
          </CameraRig>
          <OrbitControls />
        </Canvas>
        <div className="flex flex-col gap-4 max-h-screen">
          <Canvas
            id="all-views"
            camera={{
              position: [0, 0, 3.5],
              fov: 30,
            }}
          >
            <Backdrop />
            <ambientLight intensity={0.5} />
            <Shirt
              decals={decals}
              rotation={[0, MathUtils.degToRad(90), 0]}
              position={[-0.3, 0.4, 0]}
            />
            <Shirt
              decals={decals}
              rotation={[0, MathUtils.degToRad(270), 0]}
              position={[0.3, 0.4, 0]}
            />
            <Shirt
              decals={decals}
              rotation={[0, MathUtils.degToRad(0), 0]}
              position={[-0.3, -0.4, 0]}
            />
            <Shirt
              decals={decals}
              rotation={[0, MathUtils.degToRad(180), 0]}
              position={[0.3, -0.4, 0]}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
}
