import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense } from "react";

function UVieAvatar3D({ emotion, talking }: { emotion: string, talking: boolean }) {
  const { scene } = useGLTF("https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb");

  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 5]} />
      <Suspense fallback={null}>
        <primitive object={scene} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default UVieAvatar3D;
