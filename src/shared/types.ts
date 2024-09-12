import { ReactNode } from "react";
import { Vector3 } from "three";

export type ComponentWithChildren = { children: ReactNode };
export type DecalType = { position: Vector3; scale: number; src: string };
