function makeBadgeFlower(canvasId, NUMBER) {
    const NUM = NUMBER;
    const canvas = document.getElementById(canvasId);

    try {
        // Allow transparency (removed alpha: false)
        const ctx = canvas.getContext('2d');
        // 1. Get width and height directly from the HTML attributes
        const width = canvas.width;
        const height = canvas.height;

        // 2. Adjust for device pixel ratio (high-DPI screens)
        const dpr = window.devicePixelRatio || 1;

        // Fix CSS size so it doesn't stretch when we increase the internal resolution
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        // Scale internal drawing resolution
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);


        // String to Seeded PRNG (Avalanche Hash)
        function getSeededRandom(str) {
            let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
            for (let i = 0; i < str.length; i++) {
                let ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            let s = 4294967296 * (2097151 & h2) + (h1 >>> 0);

            return function () {
                let t = s += 0x6D2B79F5;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            }
        }

        // Handle commas, big e notation, and exponents
        function parseBigInt(str) {
            // Fix: Convert number inputs to string to prevent replace() crash
            str = String(str).replace(/[\s,]+/g, '').toLowerCase();
            if (!str) return null;
            try {
                if (str.includes('e')) {
                    let [base, exp] = str.split('e');
                    return BigInt(Math.floor(Number(base))) * (10n ** BigInt(exp));
                }
                if (str.includes('^')) {
                    let [base, exp] = str.split('^');
                    return BigInt(base) ** BigInt(exp);
                }
                return BigInt(str);
            } catch (e) {
                return null;
            }
        }

        // Guarantees perfect K-fold mathematical symmetry while ensuring visual depth.
        function getSymmetryBig(N) {
            if (N === 1n) return { K: 1n, center: 1n, Q: 0n };

            // Prioritize highly composite/beautiful prime symmetries, with 1n included as a pure Fibonacci spiral fallback.
            const candidates = [64n, 60n, 48n, 36n, 32n, 30n, 24n, 20n, 18n, 16n, 14n, 13n, 12n, 11n, 10n, 9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n];

            // To ensure breathtaking floral depth (multiple layers) even for small N,
            // we demand a minimum number of dots per arm (Q). 
            // Q >= 3 creates a beautiful layered interior rather than a flat ring.
            for (let minQ of [3n, 2n, 1n]) {
                for (let k of candidates) {
                    if (N % k === 0n && (N / k) >= minQ) return { K: k, center: 0n, Q: N / k };
                }
                for (let k of candidates) {
                    if ((N - 1n) % k === 0n && ((N - 1n) / k) >= minQ) return { K: k, center: 1n, Q: (N - 1n) / k };
                }
            }

            return { K: 1n, center: 0n, Q: N };
        }

        function generate() {
            const rawVal = NUM;
            const N = parseBigInt(rawVal);

            if (N === null || N <= 0n) return;

            const rng = getSeededRandom(N.toString());
            const { K, center, Q } = getSymmetryBig(N);

            // Scale points for rendering constraints while mathematically keeping pattern structures intact.
            const MAX_RENDER_DOTS = 10000n;
            let Q_draw = Q;
            if (K * Q > MAX_RENDER_DOTS) {
                Q_draw = MAX_RENDER_DOTS / K;
                if (Q_draw < 1n) Q_draw = 1n;
            }

            const numArms = Number(K);
            const numDotsPerArm = Number(Q_draw);

            // Derive unique structural DNA from the BigInt hash
            const baseAngles = [0.618034, 0.414213, 0.732050, 0.236068, 0.280776];
            const baseAngle = baseAngles[Math.floor(rng() * baseAngles.length)];
            const angleOffset = (rng() - 0.5) * 0.05;
            const divergence = baseAngle + angleOffset;
            const deltaTheta = Math.PI * 2 * divergence;

            // Deriving harmonic shape petals (must be multiple of K to preserve symmetry)
            const hasPetals = rng() > 0.3;
            const petalAmp = hasPetals ? (0.1 + rng() * 0.3) : 0;
            const petalFreq = hasPetals ? numArms * Math.floor(rng() * 4 + 1) : 0;

            // Generate Color Motif DNA
            const hue1 = rng() * 360;
            const hue2 = (hue1 + 120 + rng() * 120) % 360; // Guarantee contrasting secondary color
            const colorModes = ["Radial", "Angular", "By Arm", "By Density"];
            const colorModeIdx = Math.floor(rng() * colorModes.length);

            // Clear Background cleanly to preserve transparency
            ctx.clearRect(0, 0, width, height);

            // Dynamic centers & max radius based on the smallest dimension to ensure it fits perfectly
            const maxRadius = Math.min(width, height) / 2 - 2; // Adjusted bounding padding to fit beautifully
            const cx = width / 2;
            const cy = height / 2;

            let points = [];

            // Add center dot if mathematically required
            if (center === 1n) {
                points.push({ x: 0, y: 0, t: 0, arm: 0, theta: 0 });
            }

            // Generate perfect coordinate geometry
            for (let i = 1; i <= numDotsPerArm; i++) {
                let t = i / numDotsPerArm;
                let r_base = maxRadius * Math.sqrt(t);
                let theta_base = i * deltaTheta;

                // Petal Modulation (preserves K-fold symmetry since freq is multiple of K)
                let r_mod = 1 - petalAmp + petalAmp * Math.cos(petalFreq * theta_base);
                let r = r_base * r_mod;

                for (let k = 0; k < numArms; k++) {
                    let theta = theta_base + k * (Math.PI * 2 / numArms);
                    points.push({
                        x: r * Math.cos(theta),
                        y: r * Math.sin(theta),
                        t: t,
                        arm: k,
                        theta: theta
                    });
                }
            }

            // EXACT Spatial Hashing for Guaranteed Periphery Gaps
            const cellSize = maxRadius / 20;
            const grid = new Map();

            function getCell(x, y) {
                return `${Math.floor(x / cellSize)},${Math.floor(y / cellSize)}`;
            }

            for (let p of points) {
                let key = getCell(p.x, p.y);
                if (!grid.has(key)) grid.set(key, []);
                grid.get(key).push(p);
            }

            for (let p of points) {
                let cx = Math.floor(p.x / cellSize);
                let cy = Math.floor(p.y / cellSize);
                let minDistSq = Infinity;

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        let key = `${cx + dx},${cy + dy}`;
                        if (grid.has(key)) {
                            for (let other of grid.get(key)) {
                                if (p === other) continue;
                                let distSq = (p.x - other.x) ** 2 + (p.y - other.y) ** 2;
                                if (distSq < minDistSq) minDistSq = distSq;
                            }
                        }
                    }
                }

                let minDist = Math.sqrt(minDistSq);

                // Bound radius
                if (minDist === Infinity) {
                    p.radius = 4;
                } else {
                    p.radius = Math.max(0.5, Math.min(minDist * 0.42, 10)); // Scaled max size for smaller canvas
                }
            }

            // Draw Phase
            ctx.save();
            ctx.translate(cx, cy);

            for (let p of points) {
                let h;
                if (colorModeIdx === 0) h = hue1 + (hue2 - hue1) * p.t; // Radial
                else if (colorModeIdx === 1) h = hue1 + (hue2 - hue1) * (Math.abs(p.theta % (Math.PI * 2)) / (Math.PI * 2)); // Angular
                else if (colorModeIdx === 2) h = (p.arm % 2 === 0) ? hue1 : hue2; // Arm alternating
                else h = hue1 + (p.radius / 10) * 120; // By Density/Size

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                // Solid meaningful colors based on DNA motif
                ctx.fillStyle = `hsl(${h % 360}, 90%, 65%)`;
                ctx.fill();

                // Draw delicate cellular borders
                ctx.strokeStyle = `rgba(0, 0, 0, 0.5)`; // Softened borders for transparency blending
                ctx.lineWidth = p.radius > 2 ? p.radius * 0.15 : 0.2;
                ctx.stroke();
            }

            ctx.restore();
        }

        // Fix: Execute the render function!
        generate();
    } catch (e) { }
}

// ══════════════════════════════════════════════════════════════════════
// ANIMATED variant — a full-viewport gravity simulation seeded by the
// points value, built from real orbital mechanics instead of a single
// whole-pattern rotation:
//
//   sun (screen center) → planets (Fermat-spiral radii, golden-angle
//   spaced) → moons (one per dot, clustered around each planet, also
//   golden-angle spaced — a self-similar two-level fractal of the same
//   placement math used everywhere else in this file).
//
// Every orbit's angular velocity is derived from its own radius via a
// Kepler-like ω ∝ r^-1.5 law, so inner orbits genuinely sweep faster than
// outer ones — no single fixed omega applied to the whole pattern. Dots
// that drift within merge distance of each other coalesce into one larger
// droplet (mass ∝ volume, radius ∝ cbrt(mass)) with additive-blended glow,
// then quietly respawn elsewhere after a beat — a continuous rain of
// coalescing drops rather than a one-shot merge. A caller-supplied
// "avoidEl" (e.g. the triumph card) pushes nearby dots outward so their
// orbits sweep around it instead of over its text.
//
// Returns a stop() function; call it to cancel the RAF loop and listeners.
// ══════════════════════════════════════════════════════════════════════
function makeAnimatedBadgeFlower(canvasId, NUMBER, avoidEl) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return function () { };
    let stopped = false;
    let resize = function () { };

    try {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let width = 0, height = 0, cx = 0, cy = 0;

        resize = function () {
            width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
            height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
            if (!width) width = window.innerWidth;
            if (!height) height = window.innerHeight;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.width = Math.max(1, Math.round(width * dpr));
            canvas.height = Math.max(1, Math.round(height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cx = width / 2; cy = height / 2;
        }
        resize();
        window.addEventListener('resize', resize);

        function getSeededRandom(str) {
            let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
            for (let i = 0; i < str.length; i++) {
                let ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            let s = 4294967296 * (2097151 & h2) + (h1 >>> 0);
            return function () {
                let t = s += 0x6D2B79F5;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            };
        }

        function parseBigInt(str) {
            str = String(str).replace(/[\s,]+/g, '').toLowerCase();
            if (!str) return null;
            try {
                if (str.includes('e')) {
                    let [base, exp] = str.split('e');
                    return BigInt(Math.floor(Number(base))) * (10n ** BigInt(exp));
                }
                if (str.includes('^')) {
                    let [base, exp] = str.split('^');
                    return BigInt(base) ** BigInt(exp);
                }
                return BigInt(str);
            } catch (e) { return null; }
        }

        const N = parseBigInt(NUMBER);
        if (N === null || N <= 0n) { window.removeEventListener('resize', resize); return function () { }; }

        const rng = getSeededRandom(N.toString() + ':grav');
        const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5°, same divergence math as the static flora

        const MAX_ANIM_DOTS = 240n;
        let total = N > MAX_ANIM_DOTS ? 240 : Number(N);

        // Same DNA scheme as the static generate() in makeBadgeFlower — hue1/
        // hue2 anchor colors and one of 4 color modes (Radial/Angular/Arm/
        // Density) decide how a dot's fixed structural position maps to a
        // hue. Every dot's color is computed ONCE at seed time from this and
        // never drifts afterward — it's derived from the same flora DNA the
        // static badge uses, not an independent time-based animation.
        const hue1 = rng() * 360;
        const hue2 = (hue1 + 100 + rng() * 140) % 360;
        const colorModeIdx = Math.floor(rng() * 4);
        function _hueFor(tPos, theta, armIdx, radius) {
            let h;
            if (colorModeIdx === 0) h = hue1 + (hue2 - hue1) * tPos;
            else if (colorModeIdx === 1) h = hue1 + (hue2 - hue1) * (Math.abs(theta % (Math.PI * 2)) / (Math.PI * 2));
            else if (colorModeIdx === 2) h = (armIdx % 2 === 0) ? hue1 : hue2;
            else h = hue1 + (radius / 10) * 120;
            return ((h % 360) + 360) % 360;
        }

        // A seeded 3D simplex noise field (ported from the classic Gustavson/
        // McEwan reference algorithm, the same noise family used by the
        // simplex-noise chromatic-dot CodePen this was inspired by) — each
        // dot samples its own fixed (x,y) column over time instead of a bare
        // sine wave, giving the pulse organic, non-repeating variation.
        function makeSimplex3(seedRng) {
            const grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
            let p = [];
            for (let i = 0; i < 256; i++) p[i] = i;
            for (let i = 255; i > 0; i--) {
                let j = Math.floor(seedRng() * (i + 1));
                let tmp = p[i]; p[i] = p[j]; p[j] = tmp;
            }
            let perm = new Array(512), gradP = new Array(512);
            for (let i = 0; i < 512; i++) { perm[i] = p[i & 255]; gradP[i] = grad3[perm[i] % 12]; }
            const F3 = 1 / 3, G3 = 1 / 6;
            return function simplex3(xin, yin, zin) {
                let s = (xin + yin + zin) * F3;
                let i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
                let t = (i + j + k) * G3;
                let X0 = i - t, Y0 = j - t, Z0 = k - t;
                let x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0;
                let i1, j1, k1, i2, j2, k2;
                if (x0 >= y0) {
                    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
                    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
                    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
                } else {
                    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
                    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
                    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
                }
                let x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
                let x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
                let x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
                let ii = i & 255, jj = j & 255, kk = k & 255;
                let gi0 = gradP[ii + perm[jj + perm[kk]]];
                let gi1 = gradP[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
                let gi2 = gradP[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
                let gi3 = gradP[ii + 1 + perm[jj + 1 + perm[kk + 1]]];
                function contrib(gi, x, y, z) {
                    let t = 0.6 - x * x - y * y - z * z;
                    if (t < 0) return 0;
                    t *= t;
                    return t * t * (gi[0] * x + gi[1] * y + gi[2] * z);
                }
                return 32 * (contrib(gi0, x0, y0, z0) + contrib(gi1, x1, y1, z1) + contrib(gi2, x2, y2, z2) + contrib(gi3, x3, y3, z3));
            };
        }
        const simplex3 = makeSimplex3(rng);

        // Fractal level 1: a handful of "planets" fanned out in a Fermat
        // spiral (same sqrt(t) radial law as the static flower) around the
        // sun, each with its own wobble phase so no two orbit identically.
        const numPlanets = Math.max(3, Math.min(9, Math.round(Math.sqrt(total)) || 3));
        let planets = [];
        for (let i = 0; i < numPlanets; i++) {
            planets.push({
                angle0: i * GOLDEN_ANGLE,
                rFrac: Math.sqrt((i + 0.5) / numPlanets),
                wobblePhase: rng() * Math.PI * 2,
                wobbleAmp: 0.12 + rng() * 0.22,
                wobbleSpeed: 0.25 + rng() * 0.35,
                dir: rng() > 0.5 ? 1 : -1,
            });
        }

        // Fractal level 2: every point/dot is a "moon" of one planet,
        // itself golden-angle spaced within that planet's own local cluster
        // — self-similar placement math reapplied at a smaller scale.
        const perPlanet = Math.max(1, Math.ceil(total / numPlanets));
        function seedDot(i) {
            let planetIdx = i % numPlanets;
            let moonIdx = Math.floor(i / numPlanets);
            let moonAngle0 = moonIdx * GOLDEN_ANGLE + rng() * 0.4;
            let moonRFrac = Math.sqrt((moonIdx + 0.5) / perPlanet);
            let baseRadius = 1.6 + rng() * 2.4;
            let tPos = (planetIdx + moonRFrac) / numPlanets;
            return {
                id: i,
                alive: true,
                planetIdx,
                moonAngle0,
                moonRFrac,
                dir: rng() > 0.5 ? 1 : -1,
                baseRadius,
                mass: 1,
                hue: _hueFor(tPos, moonAngle0, planetIdx, baseRadius),
                chromaAngle: rng() * Math.PI * 2,
                noiseX: rng() * 1000,
                noiseY: rng() * 1000,
                phase: rng() * Math.PI * 2,
                spawnT: 0,
            };
        }
        let dots = [];
        for (let i = 0; i < total; i++) dots.push(seedDot(i));
        let respawnQueue = [];

        // Chromatic-fringe offset (the CodePen's per-channel RGB shift,
        // adapted here as a warm/cool hue split either side of a dot's true
        // hue) — its magnitude scales with the number of points earned, so
        // more points visibly "earns" a richer, more luminous shimmer.
        const chromaPx = Math.min(4, 0.6 + Math.sqrt(total) * 0.18);

        // Kepler-like law: angular velocity falls off with orbital radius,
        // so inner orbits sweep visibly faster than outer ones — this is
        // what gives every dot a genuinely different, physically-grounded
        // omega instead of one rotation speed for the whole pattern.
        function orbitalOmega(rPix, k) {
            return k / Math.pow(Math.max(14, rPix), 1.5);
        }

        let startTime = null, lastMergeCheck = 0;
        function frame(now) {
            if (stopped) return;
            if (startTime === null) startTime = now;
            let elapsed = (now - startTime) / 1000;

            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';

            let minDim = Math.min(width, height);
            let maxOrbit = minDim * 0.62;
            let sunR = Math.max(24, minDim * 0.05);

            let planetPos = planets.map(p => {
                let R = sunR + (maxOrbit - sunR) * p.rFrac;
                let omega = p.dir * orbitalOmega(R, 340);
                let ang = p.angle0 + elapsed * omega + Math.sin(elapsed * p.wobbleSpeed + p.wobblePhase) * p.wobbleAmp;
                return { x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R, R };
            });

            // Avoidance rect (expanded) for the caller-supplied element, e.g.
            // the triumph card — recomputed every frame so it tracks layout
            // changes (slide swaps resize the card) without extra wiring.
            let avoid = null;
            if (avoidEl && avoidEl.getBoundingClientRect) {
                let r = avoidEl.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                    let pad = 30;
                    avoid = { cx: (r.left + r.right) / 2, cy: (r.top + r.bottom) / 2, halfW: r.width / 2 + pad, halfH: r.height / 2 + pad };
                }
            }

            for (let d of dots) {
                if (!d.alive) continue;
                let pp = planetPos[d.planetIdx];
                let moonR = 10 + pp.R * 0.3 * d.moonRFrac;
                let momega = d.dir * orbitalOmega(moonR, 90);
                let mang = d.moonAngle0 + elapsed * momega;
                let x = pp.x + Math.cos(mang) * moonR;
                let y = pp.y + Math.sin(mang) * moonR;

                if (avoid) {
                    let dx = x - avoid.cx, dy = y - avoid.cy;
                    let ax = Math.abs(dx), ay = Math.abs(dy);
                    if (ax < avoid.halfW && ay < avoid.halfH) {
                        let overX = avoid.halfW - ax, overY = avoid.halfH - ay;
                        if (overX < overY) x += overX * (dx < 0 ? -1 : 1);
                        else y += overY * (dy < 0 ? -1 : 1);
                    }
                }
                d._x = x; d._y = y;
            }

            // Coalescing pass — nearby live dots merge (mass/volume
            // conserved, radius grows by cube root), throttled so it stays
            // cheap even with 200+ dots on screen.
            if (elapsed - lastMergeCheck > 0.1) {
                lastMergeCheck = elapsed;
                let live = dots.filter(d => d.alive);
                for (let i = 0; i < live.length; i++) {
                    let a = live[i];
                    if (!a.alive) continue;
                    for (let j = i + 1; j < live.length; j++) {
                        let b = live[j];
                        if (!b.alive) continue;
                        let dx = a._x - b._x, dy = a._y - b._y;
                        let dist = Math.sqrt(dx * dx + dy * dy);
                        let mergeDist = (a.baseRadius * Math.cbrt(a.mass) + b.baseRadius * Math.cbrt(b.mass)) * 0.5;
                        if (dist < mergeDist) {
                            a.mass += b.mass;
                            b.alive = false;
                            b.respawnAt = elapsed + 1 + rng() * 2.4;
                            respawnQueue.push(b);
                        }
                    }
                }
            }

            respawnQueue = respawnQueue.filter(d => {
                if (elapsed < d.respawnAt) return true;
                d.alive = true;
                d.mass = 1;
                d.planetIdx = Math.floor(rng() * numPlanets);
                d.moonAngle0 = rng() * Math.PI * 2;
                d.moonRFrac = rng();
                // Recompute hue too — it's derived from structural position,
                // so a respawned dot in a new spot gets the color that
                // position's DNA actually maps to, not a stale leftover one.
                d.hue = _hueFor((d.planetIdx + d.moonRFrac) / numPlanets, d.moonAngle0, d.planetIdx, d.baseRadius);
                d.spawnT = elapsed;
                return false;
            });

            function paintGlow(x, y, r, h, alpha) {
                if (alpha <= 0 || r <= 0) return;
                let grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, `hsla(${h}, 95%, 74%, ${alpha})`);
                grad.addColorStop(0.5, `hsla(${h}, 95%, 60%, ${alpha * 0.37})`);
                grad.addColorStop(1, `hsla(${h}, 95%, 55%, 0)`);
                ctx.beginPath();
                ctx.fillStyle = grad;
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let d of dots) {
                if (!d.alive) continue;
                let fadeIn = d.spawnT ? Math.min(1, (elapsed - d.spawnT) / 0.7) : 1;
                // Noise-driven pulse instead of a bare sine — each dot samples
                // its own fixed (noiseX,noiseY) column of the simplex field
                // over time, so the undulation is organic and non-repeating
                // rather than a uniform metronome.
                let n = simplex3(d.noiseX, d.noiseY, elapsed * 0.35 + d.phase);
                let r = d.baseRadius * Math.cbrt(d.mass) * (0.78 + 0.22 * n);
                let glowR = Math.max(0.4, r * 2.4);
                let cx2 = Math.cos(d.chromaAngle) * chromaPx, cy2 = Math.sin(d.chromaAngle) * chromaPx;
                paintGlow(d._x + cx2, d._y + cy2, glowR, (d.hue + 18) % 360, 0.5 * fadeIn);
                paintGlow(d._x - cx2, d._y - cy2, glowR, (d.hue - 18 + 360) % 360, 0.5 * fadeIn);
                paintGlow(d._x, d._y, glowR * 0.7, d.hue, 0.95 * fadeIn);
            }

            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    } catch (e) { }

    return function stop() {
        stopped = true;
        window.removeEventListener('resize', resize);
    };
}
window.makeAnimatedBadgeFlower = makeAnimatedBadgeFlower;