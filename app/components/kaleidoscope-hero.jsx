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

export function KaleidoscopeHero() {
    const canvasRef = useRef(null);

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
            const radius = tileSize * 0.34;
            const center = tileSize / 2;

            tileCtx.clearRect(0, 0, tileSize, tileSize);

            for (let i = 0; i < SOURCE_IMAGE_COUNT; i += 1) {
                const angle = (Math.PI * 2 * i) / SOURCE_IMAGE_COUNT + time * 0.36;
                const orbit = radius + Math.sin(time * 0.8 + i) * tileSize * 0.035;
                const x = center + Math.cos(angle) * orbit + pointer.x * tileSize * 0.045 * (i % 2 === 0 ? 1 : -1);
                const y = center + Math.sin(angle) * orbit + pointer.y * tileSize * 0.045 * (i % 2 === 0 ? -1 : 1);
                const size = tileSize * (0.14 + (i % 3) * 0.018);
                const rotation = -angle + pointer.x * 0.28 + Math.sin(time + i) * 0.12;
                const mirror = i % 2 === 0 ? 1 : -1;

                drawSmallImage(tileCtx, images[i], x, y, size, rotation, mirror);
            }

            tileCtx.globalCompositeOperation = 'screen';
            tileCtx.fillStyle = 'rgba(157, 255, 232, 0.06)';
            tileCtx.beginPath();
            tileCtx.arc(center, center, tileSize * 0.31, 0, Math.PI * 2);
            tileCtx.fill();
            tileCtx.globalCompositeOperation = 'source-over';
        };

        const drawKaleidoscope = (x, y, size) => {
            const half = size / 2;
            const wedge = (Math.PI * 2) / KALEIDOSCOPE_SEGMENTS;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(time * 0.08 + pointer.x * 0.08);
            ctx.globalAlpha = 0.9;

            ctx.beginPath();
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = -Math.PI / 2 + i * wedge;
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

            const tileGradient = ctx.createRadialGradient(-size * 0.16, -size * 0.2, size * 0.05, 0, 0, size * 0.62);
            tileGradient.addColorStop(0, 'rgba(154, 244, 226, 0.18)');
            tileGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
            tileGradient.addColorStop(1, 'rgba(10, 14, 18, 0.44)');
            ctx.fillStyle = tileGradient;
            ctx.fillRect(-size / 2, -size / 2, size, size);

            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const mirror = i % 2 === 0 ? 1 : -1;

                ctx.save();
                ctx.rotate(i * wedge);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, half, -wedge / 2, wedge / 2);
                ctx.closePath();
                ctx.clip();
                ctx.scale(mirror, 1);
                ctx.rotate(pointer.y * 0.05 + Math.sin(time + i) * 0.025);
                ctx.drawImage(tileCanvas, -size / 2, -size / 2, size, size);
                ctx.restore();
            }

            ctx.strokeStyle = 'rgba(200, 255, 246, 0.36)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = -Math.PI / 2 + i * wedge;
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

            ctx.strokeStyle = 'rgba(235, 255, 247, 0.24)';
            ctx.lineWidth = 0.8;
            for (let i = 0; i < KALEIDOSCOPE_SEGMENTS; i += 1) {
                const angle = -Math.PI / 2 + i * wedge;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * half, Math.sin(angle) * half);
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(0, 0, size * 0.13, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
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

            const shade = ctx.createLinearGradient(0, 0, width, height);
            shade.addColorStop(0, 'rgba(5, 8, 11, 0.76)');
            shade.addColorStop(0.38, 'rgba(5, 8, 11, 0.38)');
            shade.addColorStop(0.78, 'rgba(5, 8, 11, 0.08)');
            shade.addColorStop(1, 'rgba(5, 8, 11, 0.52)');
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
