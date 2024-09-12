import { ComponentWithChildren } from "../../shared/types";

export default function CameraRig({
  children,
}: ComponentWithChildren): JSX.Element {
  return <group>{children}</group>;
}
