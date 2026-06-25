'use client';

import { useEffect, useRef } from 'react';

const IMAGE_SOURCES = [
    '/kaleidoscope-ai-single/camera.png',
    '/kaleidoscope-ai-single/macbook.png',
    '/kaleidoscope-ai-single/coffee.png',
    '/kaleidoscope-ai-single/drill.png',
    '/kaleidoscope-ai-single/pencil.png',
    '/kaleidoscope-ai-single/sofa.png',
    '/kaleidoscope-ai-single/newspaper.png',
    '/kaleidoscope-ai-single/dumbbell.png',
];

const KALEIDOSCOPE_SEGMENTS = 6;
const SOURCE_IMAGE_COUNT = IMAGE_SOURCES.length;
const SOURCE_REPEAT_COUNT = 4;

export function KaleidoscopeHero() {
    const canvasRef = useRef(null);
    const imageLayoutRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) {
            return undefined;
        }

        const tileCanvas = document.createElement('canvas');
        const tileCtx = tileCanvas.getContext('2d');
        const target = { x: 0, y: 0 };
        const pointer = { x: 0, y: 0 };

        let width = 0;
        let height = 0;
        let sourceTileSize = 0;
        let raf = 0;
        let time = 0;

        const images = IMAGE_SOURCES.map((src) => {
            const image = new Image();
            image.src = src;
            return image;
        });

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            sourceTileSize = Math.ceil(Math.max(width, height) * 1.24);
            tileCanvas.width = Math.floor(sourceTileSize * dpr);
            tileCanvas.height = Math.floor(sourceTileSize * dpr);
            tileCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            tileCtx.imageSmoothingEnabled = true;
            tileCtx.imageSmoothingQuality = 'high';

            const totalCopies = SOURCE_IMAGE_COUNT * SOURCE_REPEAT_COUNT;
            imageLayoutRef.current = Array.from({ length: totalCopies }, (_, index) => {
                const layer = Math.floor(index / SOURCE_IMAGE_COUNT);
                const lane = (index * 0.61803398875 + layer * 0.17) % 1;
                const angleOffset = (Math.random() - 0.5) * 0.9;
                const orbitOffset = (Math.random() - 0.5) * sourceTileSize * 0.08;
                const yOffset = (Math.random() - 0.5) * sourceTileSize * 0.06;
                const sizeOffset = 0.018 + Math.random() * 0.028;

                return { lane, angleOffset, orbitOffset, yOffset, sizeOffset };
            });
        };

        const onPointerMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        };

        const drawSmallImage = (context, image, x, y, size, rotation, mirror) => {
            if (!image.complete || !image.naturalWidth) {
                return;
            }

            const imageRatio = image.naturalWidth / image.naturalHeight;
            let drawWidth = size;
            let drawHeight = size;

            if (imageRatio > 1) {
                drawWidth = size * imageRatio;
            } else {
                drawHeight = size / imageRatio;
            }

            context.save();
            context.translate(x, y);
            context.rotate(rotation);
            context.scale(mirror, 1);
            context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
            context.restore();
        };

        const drawSourceTile = () => {
            if (!tileCtx) {
                return;
            }

            const tileSize = sourceTileSize;
            const wedge = (Math.PI * 2) / KALEIDOSCOPE_SEGMENTS;
            const radius = tileSize * 0.62;
            const center = tileSize / 2;
            const totalCopies = SOURCE_IMAGE_COUNT * SOURCE_REPEAT_COUNT;

            tileCtx.clearRect(0, 0, tileSize, tileSize);
            tileCtx.save();
            tileCtx.translate(center, center);
            tileCtx.beginPath();
            tileCtx.moveTo(0, 0);
            tileCtx.arc(0, 0, radius, -wedge / 2, wedge / 2);
            tileCtx.closePath();
            tileCtx.clip();

            const facetGlow = tileCtx.createRadialGradient(0, 0, tileSize * 0.04, 0, 0, radius);
            facetGlow.addColorStop(0, 'rgba(255, 244, 226, 0.38)');
            facetGlow.addColorStop(0.42, 'rgba(167, 236, 226, 0.14)');
            facetGlow.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
            tileCtx.fillStyle = facetGlow;
            tileCtx.fillRect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);

            tileCtx.globalCompositeOperation = 'screen';
            tileCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            tileCtx.beginPath();
            tileCtx.arc(tileSize * 0.22, 0, tileSize * 0.2, 0, Math.PI * 2);
            tileCtx.fill();
            tileCtx.globalCompositeOperation = 'source-over';

            const layouts = imageLayoutRef.current.length === totalCopies ? imageLayoutRef.current : [];

            for (let i = 0; i < totalCopies; i += 1) {
                const layer = Math.floor(i / SOURCE_IMAGE_COUNT);
                const imageIndex = (i + layer * 3) % SOURCE_IMAGE_COUNT;
                const layout = layouts[i] ?? { lane: 0, angleOffset: 0, orbitOffset: 0, yOffset: 0, sizeOffset: 0 };
                const lane = layout.lane;
                const angle = -wedge * 0.47 + lane * wedge * 0.94 + pointer.x * wedge * 0.06 + layout.angleOffset;
                const layerRatio = SOURCE_REPEAT_COUNT === 1 ? 0 : layer / (SOURCE_REPEAT_COUNT - 1);
                const pulse = Math.sin(time * (0.65 + layer * 0.12) + i * 1.7);
                const orbit =
                    tileSize * (0.11 + layerRatio * 0.4 + pulse * 0.01 + pointer.y * 0.014) + layout.orbitOffset;
                const x = Math.cos(angle) * orbit;
                const y = Math.sin(angle) * orbit + layout.yOffset;
                const size = tileSize * (0.086 + (i % 4) * 0.012 + (layer === 0 ? 0.018 : 0) + layout.sizeOffset);
                const rotation = angle + Math.PI / 2 + time * (0.12 + (i % 3) * 0.025) + pointer.x * 0.16;
                const mirror = i % 2 === 0 ? 1 : -1;

                tileCtx.globalAlpha = 0.86 - layer * 0.045;
                drawSmallImage(tileCtx, images[imageIndex], x, y, size, rotation, mirror);
            }

            tileCtx.globalAlpha = 1;
            tileCtx.globalCompositeOperation = 'screen';
            tileCtx.fillStyle = 'rgba(157, 255, 232, 0.06)';
            tileCtx.beginPath();
            tileCtx.arc(0, 0, tileSize * 0.18, 0, Math.PI * 2);
            tileCtx.fill();
            tileCtx.globalCompositeOperation = 'source-over';
            tileCtx.restore();
        };

        const drawKaleidoscope = (x, y, size) => {
            const half = size / 2;
            const wedge = (Math.PI * 2) / KALEIDOSCOPE_SEGMENTS;
            const startAngle = -Math.PI / 2;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(time * 0.06 + pointer.x * 0.06);
            ctx.globalAlpha = 0.96;

            ctx.beginPath();
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = startAngle + i * wedge;
                const px = Math.cos(angle) * half;
                const py = Math.sin(angle) * half;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.clip();

            const tileGradient = ctx.createRadialGradient(0, 0, size * 0.03, 0, 0, size * 0.6);
            tileGradient.addColorStop(0, 'rgba(255, 236, 215, 0.28)');
            tileGradient.addColorStop(0.46, 'rgba(159, 235, 224, 0.1)');
            tileGradient.addColorStop(1, 'rgba(9, 13, 17, 0.42)');
            ctx.fillStyle = tileGradient;
            ctx.fillRect(-size / 2, -size / 2, size, size);

            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                ctx.save();
                ctx.rotate(startAngle + i * wedge);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, half, -wedge / 2, wedge / 2);
                ctx.closePath();
                ctx.clip();
                if (i % 2 === 1) {
                    ctx.scale(1, -1);
                }
                ctx.drawImage(tileCanvas, -size / 2, -size / 2, size, size);
                ctx.restore();
            }

            ctx.strokeStyle = 'rgba(241, 255, 250, 0.42)';
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = startAngle + i * wedge;
                const px = Math.cos(angle) * half;
                const py = Math.sin(angle) * half;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.stroke();

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.32)';
            ctx.lineWidth = 1.8;
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = startAngle - wedge / 2 + i * wedge;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * half, Math.sin(angle) * half);
                ctx.stroke();
            }

            ctx.strokeStyle = 'rgba(246, 255, 251, 0.32)';
            ctx.lineWidth = 0.8;
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = startAngle - wedge / 2 + i * wedge;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * half, Math.sin(angle) * half);
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.stroke();
            ctx.restore();
        };

        const render = () => {
            raf = window.requestAnimationFrame(render);
            time += 0.012;
            pointer.x += (target.x - pointer.x) * 0.06;
            pointer.y += (target.y - pointer.y) * 0.06;

            drawSourceTile();

            ctx.clearRect(0, 0, width, height);
            const background = ctx.createLinearGradient(0, 0, width, height);
            background.addColorStop(0, '#080b0b');
            background.addColorStop(0.38, '#10231f');
            background.addColorStop(0.68, '#251d16');
            background.addColorStop(1, '#05080b');
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, width, height);

            const centerX = width * 0.5;
            const centerY = height * 0.5;
            const tileSize = Math.max(width, height) * 1.18;

            drawKaleidoscope(centerX + pointer.x * 18, centerY + pointer.y * 18, tileSize);

            const glow = ctx.createRadialGradient(
                centerX,
                centerY,
                0,
                centerX,
                centerY,
                Math.max(width, height) * 0.54
            );
            glow.addColorStop(0, 'rgba(255, 241, 221, 0.12)');
            glow.addColorStop(0.58, 'rgba(142, 235, 222, 0.06)');
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

            const shade = ctx.createLinearGradient(0, 0, width, height);
            shade.addColorStop(0, 'rgba(5, 8, 11, 0.66)');
            shade.addColorStop(0.38, 'rgba(5, 8, 11, 0.3)');
            shade.addColorStop(0.78, 'rgba(5, 8, 11, 0.04)');
            shade.addColorStop(1, 'rgba(5, 8, 11, 0.44)');
            ctx.fillStyle = shade;
            ctx.fillRect(0, 0, width, height);
        };

        resize();
        render();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
