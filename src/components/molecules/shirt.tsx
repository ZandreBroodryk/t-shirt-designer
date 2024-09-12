import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { Color, Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";
import { DecalType } from "../../shared/types";
import { MeshProps } from "@react-three/fiber";

type GLTFShirt = GLTF & {
  nodes: {
    T_Shirt_male: Mesh;
  };
  materials: {
    lambert1: MeshStandardMaterial;
  };
};

type ShirtProps = MeshProps & {
  decals: DecalType[];
  color: string;
};

export default function Shirt({ decals, color, ...props }: ShirtProps) {
  const { nodes, materials } = useGLTF(
    "/shirt_baked_collapsed.glb"
  ) as unknown as GLTFShirt;
  materials.lambert1.color = new Color(color);

  const textures = useTexture(decals.map((decal) => decal.src));
  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry as any}
      material={materials.lambert1 as any}
      dispose={null}
      {...props}
    >
      {decals.map((decal, index) => (
        <Decal
          position={[decal.position.x, decal.position.y, decal.position.z]}
          rotation={[0, 0, 0]}
          scale={decal.scale}
          map={textures[index]}
        />
      ))}
    </mesh>
  );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
