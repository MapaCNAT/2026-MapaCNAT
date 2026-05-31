import { Application, Sprite, Assets, Texture } from "https://cdn.jsdelivr.net/npm/pixi.js@8/+esm";

let clicking = false;
let touching = false;
let updating = false;

let zoom = 1;
let scaleFactor = 1;

const minZoom = 0.125;
const maxZoom = 4;
const zoomStep = 1.1;

let spriteStartX;
let spriteStartY;

let clickX;
let clickY;

let mouseX;
let mouseY;

let touchX;
let touchY;

let startMidX;
let startMidY;

let startDistance;
let startAngle;

let startZoom;
let startRotation;

let startOffsetX;
let startOffsetY;

const app = new Application();
await app.init({
    resizeTo: window,
    background: "#202020"
});
let gl = app.renderer.gl;

const map = document.getElementById("map");
map.appendChild(app.canvas);

const texture = await Assets.load("../static/svg/mapa.svg");
const sprite = Sprite.from(texture);
sprite.anchor.set(0.5);
app.stage.addChild(sprite);

function ceilPowerOf2(x) {
    if (x <= 0) return 1;
    return Math.pow(2, Math.ceil(Math.log2(x)));
}

function floorPowerOf2(x) {
    if (x <= 0) return 1;
    return Math.pow(2, Math.floor(Math.log2(x)));
}

function getScaleFactor() {
    return Math.min(floorPowerOf2(maxRenderZoom), Math.max(minZoom, multipleZoom * window.devicePixelRatio))
}

function rotatePoint(x, y, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
        x: x * cosA - y * sinA,
        y: x * sinA + y * cosA
    };
}

function midpoint(a, b) {
    return {
        x: (a.clientX + b.clientX) / 2,
        y: (a.clientY + b.clientY) / 2
    };
}

function distance(a, b) {
    return Math.hypot(
        b.clientX - a.clientX,
        b.clientY - a.clientY
    );
}

function angle(a, b) {
    return Math.atan2(
        b.clientY - a.clientY,
        b.clientX - a.clientX
    );
}

async function updateMapTexture() {
    const svgText = await fetch("../static/svg/mapa.svg").then(r => r.text());

    const mapBlob = new Blob(
        [svgText],
        { type: "image/svg+xml" }
    );

    const mapUrl = URL.createObjectURL(mapBlob);

    const img = new Image();

    img.onload = () => {
        const longestSide = Math.max(img.width, img.height);
        const maxRenderZoom = gl.getParameter(gl.MAX_TEXTURE_SIZE) / longestSide;
        let multipleZoom = ceilPowerOf2(zoom);
        let currentFactor = Math.min(floorPowerOf2(maxRenderZoom), Math.max(minZoom, multipleZoom * window.devicePixelRatio));

        if (currentFactor === scaleFactor) {
            URL.revokeObjectURL(mapUrl);
            return;
        }

        scaleFactor = currentFactor;

        const canvas = document.createElement("canvas");
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const texture = Texture.from(canvas);
        sprite.texture = texture;

        sprite.scale.set(zoom / scaleFactor);

        URL.revokeObjectURL(mapUrl);
    };

    img.src = mapUrl;
}

map.addEventListener("touchstart", e => {
    touching = true;

    if (e.touches.length == 1) {
        const touch = e.touches[0];

        touchX = touch.clientX;
        touchY = touch.clientY;

        spriteStartX = sprite.x;
        spriteStartY = sprite.y;
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
        startRotation = sprite.rotation;

        startOffsetX = (sprite.x - startMidX) / zoom;

        startOffsetY = (sprite.y - startMidY) / zoom;
    }
});
map.addEventListener("touchmove", e => {
    if (!touching) return;
    if (e.touches.length == 1) {
        let touch = e.touches[0];
        sprite.x = spriteStartX + (touch.clientX - touchX);
        sprite.y = spriteStartY + (touch.clientY - touchY);
    }
    if (e.touches.length == 2) {
        const a = e.touches[0];
        const b = e.touches[1];

        const mid = midpoint(a, b);
        const currentDistance = distance(a, b);
        const currentAngle = angle(a, b);

        zoom = startZoom * (currentDistance / startDistance);

        zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

        sprite.scale.set(zoom / scaleFactor);

        const deltaAngle = currentAngle - startAngle;
        sprite.rotation = startRotation + deltaAngle;
        const rotated = rotatePoint(
            startOffsetX,
            startOffsetY,
            deltaAngle
        );

        sprite.x = mid.x + rotated.x * zoom;
        sprite.y = mid.y + rotated.y * zoom;
    }
});
map.addEventListener("touchend", () => {
    touching = false;
});

map.addEventListener("pointerdown", (e) => {
    clickX = e.clientX;
    clickY = e.clientY;

    spriteStartX = sprite.x;
    spriteStartY = sprite.y;

    clicking = true;
});
map.addEventListener("pointerup", (e) => {
    clicking = false;
});
map.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!clicking) return;

    sprite.x = spriteStartX + (mouseX - clickX);
    sprite.y = spriteStartY + (mouseY - clickY);
});

map.addEventListener("wheel", (e) => {
    e.preventDefault();

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    let zoomFactor = e.deltaY < 0 ? zoomStep : 1 / zoomStep;

    zoomFactor = Math.min(Math.max(zoom * zoomFactor, minZoom), maxZoom) / zoom;

    sprite.position.x = mouseX - (mouseX - sprite.position.x) * zoomFactor;
    sprite.position.y = mouseY - (mouseY - sprite.position.y) * zoomFactor;

    zoom *= zoomFactor;
    sprite.scale.set(zoom / scaleFactor);
});
map.addEventListener("wheel", updateMap);
map.addEventListener("touchend", updateMap);

async function updateMap() {
    if (updating) {
        return;
    }
    updating = true;
    await updateMapTexture();
    updating = false;
}