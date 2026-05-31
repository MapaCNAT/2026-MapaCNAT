let clicking = false;
let touching = false;
let updating = false;

let zoom = 1;
let scaleFactor = 1;

const minZoom = 0.125;
const maxZoom = 4;
const zoomStep = 1.1;

let mapStartX, mapStartY;
let clickX, clickY;
let mouseX, mouseY;
let touchX, touchY;
let startMidX, startMidY;
let startDistance, startAngle;
let startZoom, startRotation;
let startOffsetX, startOffsetY;

const app = new PIXI.Application();

await app.init({ 
    resizeTo: window,
    backgroundColor: "#202020",
    resolution: window.devicePixelRatio || 1,
});

let gl = app.renderer.gl;
const map = document.getElementById("map");
map.appendChild(app.canvas);

const mapContainer = new PIXI.Container();
app.stage.addChild(mapContainer);

mapContainer.x = app.screen.width / 2;
mapContainer.y = app.screen.height / 2;

const texture = await PIXI.Assets.load("../static/svg/mapa.svg");
const mapSprite = PIXI.Sprite.from(texture);
mapSprite.anchor.set(0.5); 
mapSprite.x = 0;
mapSprite.y = 0;
mapContainer.addChild(mapSprite);

const texts = new PIXI.Container();
mapContainer.addChild(texts);

function nodeText(text, coordinates) {
    const nodeLabel = new PIXI.Text({
        text: text,
        style: {
            fontFamily: 'Arial',
            fontSize: 28,
            fill: '#202020',
            align: 'center',
            stroke: { color: "white", width: 3 }
        }
    });
    nodeLabel.anchor.set(0.5, 1);
    nodeLabel.x = coordinates.x;
    nodeLabel.y = coordinates.y;
    mapContainer.addChild(nodeLabel);

    texts.addChild(nodeLabel);
}

nodeText("Rosquinhas", { x: -474, y: 14 });
nodeText("Campo", { x: 533.390219080226, y: -579.5920817634556 });
nodeText("DIAC", { x: -1175.9397318446595, y: -795.5558121222449 });
nodeText("DIACON", { x: -1056.6195915551925, y: -617.3532235065069 });
nodeText("DIASIN", { x: -1042.1250015551925, y: -462.7442635065069 });
nodeText("DIATINF", { x: -1045.3460215551927, y: -245.32541350650695 });
nodeText("NIIT", { x: -527.1193347751928, y: -477.4111780765071 });
nodeText("DIAREN", { x: -582.8526438351928, y: -781.8007890965071 });
nodeText("Bosque", { x: 954.4058032948669, y: 848.3737702727246 });
nodeText("Estacionamento", { x: 912.0452730260521, y: 265.14784171897253 });
nodeText("Tapete Vermelho", { x: 414.518310225052, y: 76.51202643897255 });
nodeText("EAD", { x: -409.80350667160724, y: 723.3748203899776 });
nodeText("Quadras", { x: -463.9213292557074, y: 978.6351474457774 });


nodeText("Ginásio", { x: -449.08308058680564, y: 318.863800141916 });
nodeText("Museu de Minérios", { x: 241.0277153119756, y: 883.7653428830032 });
nodeText("Mesas Verdes", { x: -899.8535257034722, y: 217.22081863872342 });
nodeText("Refeitório", { x: -1222.5949485051249, y: 461.2633919197148 });
function ceilPowerOf2(x) { return x <= 0 ? 1 : Math.pow(2, Math.ceil(Math.log2(x))); }
function floorPowerOf2(x) { return x <= 0 ? 1 : Math.pow(2, Math.floor(Math.log2(x))); }

function getNormalizedCoordinates(screenX, screenY) {
    const localPoint = mapContainer.toLocal({ x: screenX, y: screenY });

    return {
        x: localPoint.x,
        y: localPoint.y
    };
}

function rotatePoint(x, y, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
        x: x * cosA - y * sinA,
        y: x * sinA + y * cosA
    };
}

function midpoint(a, b) { return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }; }
function distance(a, b) { return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY); }
function angle(a, b) { return Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX); }

function setPosition(x, y) {
    mapContainer.x = x;
    mapContainer.y = y;
}
function setZoom(z) {
    mapContainer.scale.set(z);
    for (const child of texts.children) {
        child.scale.set(1 / z / 2);
    }
}
function setRotation(r) {
    mapContainer.rotation = r;
    for (const child of texts.children) {
        child.rotation = -r;
    }
}

async function updateMapTexture() {
    const svgText = await fetch("../static/svg/mapa.svg").then(r => r.text());
    const mapBlob = new Blob([svgText], { type: "image/svg+xml" });
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
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        mapSprite.texture = PIXI.Texture.from(canvas);
        mapSprite.scale.set(1 / scaleFactor);

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
        mapStartX = mapContainer.x;
        mapStartY = mapContainer.y;
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
        startRotation = mapContainer.rotation;
        startOffsetX = (mapContainer.x - startMidX) / zoom;
        startOffsetY = (mapContainer.y - startMidY) / zoom;
    }
});

map.addEventListener("touchmove", e => {
    if (!touching) return;
    if (e.touches.length == 1) {
        let touch = e.touches[0];
        setPosition(
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
        setZoom(zoom);

        const deltaAngle = currentAngle - startAngle;
        setRotation(startRotation + deltaAngle);
        
        const rotated = rotatePoint(startOffsetX, startOffsetY, deltaAngle);
        setPosition(
            mid.x + rotated.x * zoom,
            mid.y + rotated.y * zoom
        );
    }
});

map.addEventListener("touchend", () => { touching = false; updateMap(); });

map.addEventListener("pointerdown", (e) => {
    clickX = e.clientX;
    clickY = e.clientY;
    mapStartX = mapContainer.x;
    mapStartY = mapContainer.y;
    clicking = true;
    console.log(getNormalizedCoordinates(clickX, clickY));
});

map.addEventListener("pointerup", () => { clicking = false; });

map.addEventListener("pointermove", (e) => {
    if (!clicking) return;
    setPosition(
        mapStartX + (e.clientX - clickX),
        mapStartY + (e.clientY - clickY)
    );
});

map.addEventListener("wheel", (e) => {
    e.preventDefault();
    const mX = e.offsetX;
    const mY = e.offsetY;

    let zoomFactor = e.deltaY < 0 ? zoomStep : 1 / zoomStep;
    const nextZoom = Math.min(Math.max(zoom * zoomFactor, minZoom), maxZoom);
    zoomFactor = nextZoom / zoom;

    setPosition(
        mX - (mX - mapContainer.x) * zoomFactor,
        mY - (mY - mapContainer.y) * zoomFactor
    );
    
    zoom = nextZoom;
    setZoom(zoom);
    updateMap();
});

async function updateMap() {
    if (updating) return;
    updating = true;
    await updateMapTexture();
    updating = false;
}