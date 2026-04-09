'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useEffect, useRef } from 'react';

function RotatingStars() {
    const starsGroupRef = useRef(null);
    const scrollRotationRef = useRef(0);
    const smoothScrollRotationRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollRotationRef.current = window.scrollY * 0.00025;
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useFrame((state, delta) => {
        if (!starsGroupRef.current) {
            return;
        }

        const baseRotation = state.clock.elapsedTime * 0.006;
        smoothScrollRotationRef.current +=
            (scrollRotationRef.current - smoothScrollRotationRef.current) * Math.min(delta * 1.4, 1);

        starsGroupRef.current.rotation.y = baseRotation + smoothScrollRotationRef.current;
    });

    return (
        <group ref={starsGroupRef}>
            <Stars radius={120} depth={80} count={7000} factor={4.5} saturation={0.8} speed={0} />
            <Stars radius={200} depth={120} count={9000} factor={3.2} saturation={0.7} speed={0} />
        </group>
    );
}

export function ThreeBackdrop() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0.4, 8], fov: 52 }}>
                <color attach="background" args={['#040b17']} />
                <fog attach="fog" args={['#040b17', 8, 24]} />
                <ambientLight intensity={0.55} />
                <directionalLight position={[3, 4, 2]} intensity={1} color="#96e6ff" />
                <pointLight position={[-3, -2, -2]} intensity={1.5} color="#b8a4ff" />

                <RotatingStars />
            </Canvas>
        </div>
    );
}
