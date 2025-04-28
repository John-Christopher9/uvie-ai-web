import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

function UVieAvatar3D({ emotion, talking }: { emotion: string, talking: boolean }) {
  const { scene, animations } = useGLTF("/uvie.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (talking) {
      actions["Talk"]?.reset().fadeIn(0.2).play();
    } else {
      actions["Talk"]?.fadeOut(0.3);
    }

    if (emotion === "happy") {
      actions["Happy"]?.reset().play();
    } else if (emotion === "thinking") {
      actions["Thinking"]?.reset().play();
    } else {
      actions["Idle"]?.reset().play();
    }
  }, [emotion, talking, actions]);

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
