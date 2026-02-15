import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// Rotating Championship Ring
function ChampionRing({ position, color, speed = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
            ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={ref} position={position}>
                <torusGeometry args={[1.2, 0.18, 16, 48]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

// Glowing Energy Sphere
function EnergyOrb({ position, color, scale = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.scale.setScalar(
                scale + Math.sin(state.clock.elapsedTime * 2) * 0.15
            );
            ref.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <Float speed={1.5} floatIntensity={2}>
            <mesh ref={ref} position={position}>
                <icosahedronGeometry args={[0.6, 2]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    metalness={0.3}
                    roughness={0.2}
                    transparent
                    opacity={0.7}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

// Floating Crystal
function Crystal({ position, color, speed = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * speed;
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={ref} position={position}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.7}
                    metalness={0.8}
                    roughness={0.15}
                    transparent
                    opacity={0.75}
                />
            </mesh>
        </Float>
    );
}

// Main Scene
function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00e5ff" />
            <pointLight position={[-5, -5, 3]} intensity={1} color="#c788ff" />
            <pointLight position={[0, 3, -5]} intensity={0.8} color="#ff4655" />

            {/* Championship Rings */}
            <ChampionRing position={[-3, 1.5, -1]} color="#00e5ff" speed={0.8} />
            <ChampionRing position={[3.5, -1, -2]} color="#c788ff" speed={0.6} />

            {/* Energy Orbs - wireframe for visibility */}
            <EnergyOrb position={[2.5, 2, 0]} color="#00e5ff" scale={0.9} />
            <EnergyOrb position={[-2.5, -1.5, -1]} color="#ff4655" scale={0.7} />

            {/* Crystals */}
            <Crystal position={[-1.5, 2.5, -2]} color="#ffd700" speed={1.2} />
            <Crystal position={[3, -2.5, -1]} color="#00e5ff" speed={0.9} />
            <Crystal position={[0, -2, 0]} color="#c788ff" speed={0.7} />
        </>
    );
}

export default function EsportsScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 3,
            }}
            gl={{ alpha: true, antialias: true }}
        >
            <Scene />
        </Canvas>
    );
}
