import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function UVieAvatar3D({ emotion, talking }: { emotion: string, talking: boolean }) {
  const { scene } = useGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb");

  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 5]} />
      <primitive object={scene} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default UVieAvatar3D;
