import * as Graficos from "./graficos.js";

let clicking = false;
let touching = false;

let minZoom;
let maxZoom;
let zoomStep;

let zoom = Graficos.zoom;

let mapStartX, mapStartY;
let clickX, clickY;
let mouseX, mouseY;
let touchX, touchY;
let startMidX, startMidY;
let startDistance, startAngle;
let startZoom, startRotation;
let startOffsetX, startOffsetY;

export function setContext(context) {
    minZoom = context.zoom_range[0];
    maxZoom = context.zoom_range[1];
    zoomStep = context.scroll_ratio;
}

class Touch {
    constructor() {
        throw new Error("Classe estática. Não instancie.");
    }

    static begin(e) {
        touching = true;
        if (e.touches.length == 1) {
            const touch = e.touches[0];
            touchX = touch.clientX;
            touchY = touch.clientY;
            mapStartX = Graficos.mapContainer.x;
            mapStartY = Graficos.mapContainer.y;
        }
        if (e.touches.length == 2) {
            const a = e.touches[0];
            const b = e.touches[1];
            const mid = midpoint(a, b);
            startMidX = mid.x;
            startMidY = mid.y;
            startDistance = distance(a, b);
            startAngle = angle(a, b);
            startZoom = zoom;
            startRotation = Graficos.mapContainer.rotation;
            startOffsetX = (Graficos.mapContainer.x - startMidX) / zoom;
            startOffsetY = (Graficos.mapContainer.y - startMidY) / zoom;
        }
    }

    static step(e) {
        if (!touching) return;
        if (e.touches.length == 1) {
            let touch = e.touches[0];
            Graficos.setPosition(
                mapStartX + (touch.clientX - touchX),
                mapStartY + (touch.clientY - touchY)
            );
        }
        if (e.touches.length == 2) {
            const a = e.touches[0];
            const b = e.touches[1];
            const mid = midpoint(a, b);
            const currentDistance = distance(a, b);
            const currentAngle = angle(a, b);

            zoom = Math.min(Math.max(startZoom * (currentDistance / startDistance), minZoom), maxZoom);
            Graficos.setZoom(zoom);

            const deltaAngle = currentAngle - startAngle;
            Graficos.setRotation(startRotation + deltaAngle);
            
            const rotated = rotatePoint(startOffsetX, startOffsetY, deltaAngle);
            Graficos.setPosition(
                mid.x + rotated.x * zoom,
                mid.y + rotated.y * zoom
            );
        }
    }

    static end(e) {
        touching = false;
        Graficos.updateMap();
    }
}

class Pointer {
    constructor() {
        throw new Error("Classe estática. Não instancie.");
    }
    static down(e) {
        clickX = e.clientX;
        clickY = e.clientY;
        mapStartX = Graficos.mapContainer.x;
        mapStartY = Graficos.mapContainer.y;
        clicking = true;
    }

    static move(e) {
        if (!clicking) return;
        Graficos.setPosition(
            mapStartX + (e.clientX - clickX),
            mapStartY + (e.clientY - clickY)
        );
    }

    static up(e) {
        clicking = false;
    }

    static wheel(e) {
        e.preventDefault();
        const mX = e.offsetX;
        const mY = e.offsetY;

        let zoomFactor = e.deltaY < 0 ? zoomStep : 1 / zoomStep;
        const nextZoom = Math.min(Math.max(zoom * zoomFactor, minZoom), maxZoom);
        zoomFactor = nextZoom / zoom;

        Graficos.setPosition(
            mX - (mX - Graficos.mapContainer.x) * zoomFactor,
            mY - (mY - Graficos.mapContainer.y) * zoomFactor
        );
        
        zoom = nextZoom;
        Graficos.setZoom(zoom);
        Graficos.updateMap();
    }
}

export function addListeners(map) {
    map.addEventListener("pointerdown", Pointer.down);
    map.addEventListener("pointermove", Pointer.move);
    map.addEventListener("pointerup", Pointer.up);
    map.addEventListener("pointerleave", Pointer.up);
    map.addEventListener("wheel", Pointer.wheel, { passive: false });
    map.addEventListener("touchstart", Touch.begin, { passive: false });
    map.addEventListener("touchmove", Touch.step, { passive: false });
    map.addEventListener("touchend", Touch.end);

    const optionsBtn = document.getElementById('options');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const orientationBtn = document.getElementById('orientation');

    optionsBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        backdrop.classList.add('active');
    });

    const closeMenu = () => {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
    };

    const alignMap = () => {
        Graficos.smoothRotation(0);
    }

    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    orientationBtn.addEventListener('click', alignMap);
}