/**
 * Animated Gradient Background Component with Feeding Koi Fish
 *
 * Optimized for performance using refs, CSS transforms, and batched updates.
 * Click anywhere to drop fish food. 40% of fish will swim to eat it.
 * Adapts to light/dark mode.
 */
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";

// Memoized fish food component
const FishFood = memo(({ x, y }: { x: number; y: number }) => (
    <Box
        sx={{
            position: "absolute",
            left: x - 6,
            top: y - 6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #fbbf24, #d97706)",
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
        }}
    />
));
FishFood.displayName = "FishFood";

// Static fish configuration
const KOI_PATHS = [
    { speed: 25, amplitude: 50, frequency: 0.4, baseY: 0.05, direction: 1 },
    { speed: 23, amplitude: 40, frequency: 0.35, baseY: 0.30, direction: -1 },
    { speed: 20, amplitude: 60, frequency: 0.25, baseY: 0.60, direction: 1 },
    { speed: 27, amplitude: 45, frequency: 0.3, baseY: 0.80, direction: -1 },
    { speed: 18, amplitude: 0, frequency: 0, baseY: 0, direction: -1 },
    { speed: 20, amplitude: 0, frequency: 0, baseY: 0, direction: 1 },
];

const FISH_COLORS = ["primary", "secondary", "accent", "primary", "secondary", "accent"] as const;
const FISH_SCALES = [5, 6, 7, 5.5, 6, 5];
const FISH_OPACITIES = [0.7, 0.6, 0.5, 0.6, 0.4, 0.5];
const BASE_OFFSETS = [0, 8000, 15000, 25000, 5000, 20000];

// Memoized Koi SVG
const FISH_BLUR_VALUES = [4, 5, 6, 4, 7, 5];

const KoiFishSVG = memo(({
    color,
    scale = 1,
    facing = "right",
    blur = 5,
}: {
    color: string;
    scale?: number;
    facing?: "right" | "left";
    blur?: number;
}) => {
    const filterId = `blur-${blur}`;
    return (
        <svg
            viewBox="-10 -10 220 100"
            style={{
                width: 220 * scale,
                height: 100 * scale,
                transform: facing === "left" ? "none" : "scaleX(-1)",
            }}
        >
            <defs>
                <filter id={filterId}>
                    <feGaussianBlur stdDeviation={blur} />
                </filter>
            </defs>
            <g filter={`url(#${filterId})`}>
                <path d="M40 40 Q60 20, 100 25 Q140 30, 170 35 Q180 37, 185 40 Q180 43, 170 45 Q140 50, 100 55 Q60 60, 40 40 Z" fill={color} opacity={0.7} />
                <ellipse cx="45" cy="40" rx="12" ry="10" fill={color} opacity={0.5} />
                <circle cx="42" cy="38" r="2" fill={color} opacity={0.8} />
                <path d="M80 25 Q90 10, 110 22 Q100 18, 80 25" fill={color} opacity={0.5} />
                <path d="M70 45 Q75 55, 85 48 Q80 52, 70 45" fill={color} opacity={0.5} />
                <path d="M100 52 Q105 62, 115 55 Q110 58, 100 52" fill={color} opacity={0.5} />
                <path d="M170 35 Q185 25, 195 30 Q190 35, 195 40 Q190 45, 185 50 Q180 45, 170 45" fill={color} opacity={0.6} />
                <path d="M175 40 Q190 20, 200 25 Q195 40, 200 55 Q190 50, 175 40" fill={color} opacity={0.4} />
                <ellipse cx="90" cy="38" rx="8" ry="5" fill={color} opacity={0.25} />
                <ellipse cx="120" cy="42" rx="10" ry="6" fill={color} opacity={0.2} />
                <ellipse cx="145" cy="38" rx="6" ry="4" fill={color} opacity={0.3} />
            </g>
        </svg>
    );
});
KoiFishSVG.displayName = "KoiFishSVG";

interface FoodPellet {
    id: number;
    x: number;
    y: number;
    currentY: number;
}

interface FishData {
    id: number;
    currentX: number;
    currentY: number;
    facing: "right" | "left";
    isEating: boolean;
    targetFoodId: number | null;
    element: HTMLDivElement | null;
}

// Initialize fish data
const createInitialFish = (): FishData[] => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    const height = typeof window !== "undefined" ? window.innerHeight : 1080;
    return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        currentX: i % 2 === 0 ? -500 : width + 500,
        currentY: height * KOI_PATHS[i].baseY || (i === 4 ? -100 : height + 100),
        facing: i % 2 === 0 ? "right" : "left",
        isEating: false,
        targetFoodId: null,
        element: null,
    }));
};

const AnimatedBackground = () => {
    const theme = useTheme();
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [canFeed, setCanFeed] = useState(true);
    const [foods, setFoods] = useState<FoodPellet[]>([]);
    const [, forceUpdate] = useState({});

    const foodIdRef = useRef(0);
    const foodsRef = useRef<FoodPellet[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastTimeRef = useRef(0);
    const animationIdRef = useRef<number>(0);
    const fishDataRef = useRef<FishData[]>(createInitialFish());

    // Sync foods ref
    useEffect(() => {
        foodsRef.current = foods;
    }, [foods]);

    // Get colors based on theme
    const koiColors = useMemo(() => isDarkMode
        ? { primary: "rgba(251, 146, 60, 0.35)", secondary: "rgba(245, 158, 11, 0.3)", accent: "rgba(234, 88, 12, 0.28)" }
        : { primary: "rgba(251, 146, 60, 0.3)", secondary: "rgba(245, 158, 11, 0.25)", accent: "rgba(234, 88, 12, 0.22)" }
        , [isDarkMode]);

    const colorMap = useMemo(() => ({
        primary: koiColors.primary,
        secondary: koiColors.secondary,
        accent: koiColors.accent,
    }), [koiColors]);

    // Handle click to drop food
    const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
        if (!canFeed) return;

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newFoodId = foodIdRef.current++;
        const newFood: FoodPellet = { id: newFoodId, x, y, currentY: y };

        foodsRef.current = [...foodsRef.current, newFood];
        setFoods(foodsRef.current);
        setCanFeed(false);

        // Select 2-3 random fish to eat
        const indices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));
        indices.forEach(idx => {
            const fish = fishDataRef.current[idx];
            if (fish) {
                fish.isEating = true;
                fish.targetFoodId = newFoodId;
            }
        });

        // Re-enable feeding after 5s
        setTimeout(() => setCanFeed(true), 5000);
    }, [canFeed]);

    // Animation loop
    useEffect(() => {
        lastTimeRef.current = performance.now();

        const animate = (timestamp: number) => {
            const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
            lastTimeRef.current = timestamp;
            const time = timestamp / 1000;

            const width = window.innerWidth;
            const height = window.innerHeight;
            let foodsChanged = false;
            let fishEatingChanged = false;

            // Update food positions
            const prevFoodCount = foodsRef.current.length;
            foodsRef.current = foodsRef.current.filter(food => {
                food.currentY += 50 * deltaTime;
                return food.currentY < height + 50;
            });
            if (foodsRef.current.length !== prevFoodCount) {
                foodsChanged = true;
            }

            // Update fish positions (using direct DOM manipulation, no React state update needed)
            fishDataRef.current.forEach((fish, i) => {
                const path = KOI_PATHS[i];
                let newX = fish.currentX;
                let newY = fish.currentY;
                let newFacing = fish.facing;

                if (fish.isEating && fish.targetFoodId !== null) {
                    const targetFood = foodsRef.current.find(f => f.id === fish.targetFoodId);

                    if (!targetFood) {
                        fish.isEating = false;
                        fish.targetFoodId = null;
                        fishEatingChanged = true;
                    } else {
                        const dx = targetFood.x - fish.currentX;
                        const dy = targetFood.currentY - fish.currentY;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 30) {
                            foodsRef.current = foodsRef.current.filter(f => f.id !== fish.targetFoodId);
                            fish.isEating = false;
                            fish.targetFoodId = null;
                            foodsChanged = true;
                            fishEatingChanged = true;
                        } else {
                            const targetFacing = dx > 0 ? "right" : "left";
                            if (targetFacing !== fish.facing && Math.abs(dx) > 100) {
                                newFacing = targetFacing;
                            }
                            const speed = 1.5 + Math.random() * 0.5;
                            newX = fish.currentX + (dx / distance) * speed;
                            newY = fish.currentY + (dy / distance) * speed;
                        }
                    }
                } else {
                    if (i < 4) {
                        if (path.direction === 1) {
                            newX = ((time * path.speed + BASE_OFFSETS[i] / 1000) % (width + 1000 + i * 100)) - 500 - (i < 2 ? 0 : 100);
                        } else {
                            newX = width + 500 + (i === 1 ? 0 : 50) - ((time * path.speed + BASE_OFFSETS[i] / 1000) % (width + 1000 + (i === 3 ? 100 : 0)));
                        }
                        newY = height * path.baseY + Math.sin(time * path.frequency + i) * path.amplitude;
                        newFacing = path.direction === 1 ? "right" : "left";
                    } else if (i === 4) {
                        const progress = ((time * path.speed + BASE_OFFSETS[i] / 1000) % 10000) / 10000;
                        newX = width + 400 - progress * (width + 800);
                        newY = -100 + progress * (height + 400);
                        newFacing = "left";
                    } else {
                        const progress = ((time * path.speed + BASE_OFFSETS[i] / 1000) % 9000) / 9000;
                        newX = -450 + progress * (width + 900);
                        newY = height + 100 - progress * (height + 300);
                        newFacing = "right";
                    }
                }

                // Apply transform directly - no React state update needed for movement
                fish.currentX = newX;
                fish.currentY = newY;
                fish.facing = newFacing;
                if (fish.element) {
                    fish.element.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
                }
            });

            // Only update React state when food changes or eating state changes
            if (foodsChanged) {
                setFoods([...foodsRef.current]);
            }
            if (fishEatingChanged) {
                forceUpdate({});
            }

            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationIdRef.current);
    }, []);

    // Memoized gradients
    const lightGradient = useMemo(() => `linear-gradient(
        -45deg, rgba(251, 146, 60, 0.12), rgba(234, 88, 12, 0.08),
        rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.06),
        rgba(255, 255, 255, 0.95), rgba(255, 247, 237, 0.9),
        rgba(254, 215, 170, 0.08), rgba(251, 146, 60, 0.12)
    )`, []);

    const darkGradient = useMemo(() => `linear-gradient(
        -45deg, rgba(251, 146, 60, 0.15), rgba(234, 88, 12, 0.1),
        rgba(124, 45, 18, 0.2), rgba(15, 23, 42, 0.98),
        rgba(30, 41, 59, 0.95), rgba(124, 45, 18, 0.15),
        rgba(234, 88, 12, 0.08), rgba(251, 146, 60, 0.12)
    )`, []);

    return (
        <Box
            ref={containerRef}
            onClick={handleBackgroundClick}
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                background: isDarkMode ? darkGradient : lightGradient,
                overflow: "hidden",
                cursor: canFeed ? "crosshair" : "not-allowed",
                pointerEvents: "auto",
            }}
        >
            {/* Food Pellets */}
            {foods.map(food => <FishFood key={food.id} x={food.x} y={food.currentY} />)}

            {/* Cooldown indicator */}
            {!canFeed && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        px: 2,
                        py: 1,
                        borderRadius: "20px",
                        fontSize: 14,
                        bgcolor: isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
                        color: isDarkMode ? "#fff" : "#333",
                    }}
                >
                    รอให้อาหารย่อย... 🐟
                </Box>
            )}

            {/* Koi Fish Layer */}
            <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {fishDataRef.current.map((fish, i) => (
                    <Box
                        key={i}
                        ref={(el: HTMLDivElement | null) => { fishDataRef.current[i].element = el; }}
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            willChange: "transform",
                            opacity: fish.isEating ? Math.min(FISH_OPACITIES[i] + 0.15, 0.9) : FISH_OPACITIES[i],
                            transform: `translate3d(${fish.currentX}px, ${fish.currentY}px, 0)`,
                        }}
                    >
                        <KoiFishSVG
                            color={colorMap[FISH_COLORS[i]]}
                            scale={FISH_SCALES[i]}
                            facing={fish.facing}
                            blur={FISH_BLUR_VALUES[i]}
                        />
                    </Box>
                ))}
            </Box>

            {/* Overlays */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: isDarkMode
                        ? `radial-gradient(ellipse at 20% 20%, rgba(251, 146, 60, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(234, 88, 12, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(124, 45, 18, 0.04) 0%, transparent 70%)`
                        : `radial-gradient(ellipse at 20% 20%, rgba(251, 146, 60, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 50%)`,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: isDarkMode ? 0.015 : 0.025,
                    mixBlendMode: isDarkMode ? "overlay" : "multiply",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
        </Box>
    );
};

export default memo(AnimatedBackground);
