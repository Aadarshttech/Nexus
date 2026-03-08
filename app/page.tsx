'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineScene } from '@/components/SplineScene';
import Link from 'next/link';

/* ───────────────────────── Types & Data ───────────────────────── */
type AppState = 'LOADING' | 'MENU' | 'VIEWING';

interface ComponentItem {
    id: string;
    title: string;
    description: string;
    sceneUrl: string;
    isAvailable: boolean;
    color: string;
}

const COMPONENTS: ComponentItem[] = [
    {
        id: 'ai-robot',
        title: 'THE AI SOLUTIONS',
        description: 'Interactive humanoid robot with advanced UI overlays.',
        sceneUrl: '/projects/nexus/scene-clean.splinecode',
        isAvailable: true,
        color: '#ff7e33' // Brand primary
    },
    {
        id: 'scene-2',
        title: 'NEURAL CORE',
        description: 'Quantum processing unit visualization.',
        sceneUrl: '/projects/nexus/scene2.splinecode',
        isAvailable: true,
        color: '#06b6d4'
    },
    {
        id: 'scene-3',
        title: 'TYPOGRAPHIC REFLECTION',
        description: 'Glass-like refraction and typographic distortion study.',
        sceneUrl: '/projects/nexus/scene3.splinecode',
        isAvailable: true,
        color: '#a855f7' // Purple accent for the glass/text aesthetic
    },
    {
        id: 'scene-4',
        title: '3D CRICKET JERSEY',
        description: 'Interactive 3D sports apparel visualization.',
        sceneUrl: '/projects/nexus/scene4.splinecode',
        isAvailable: true,
        color: '#dc2626' // Crimson Red to match Nepal branding
    }
];

/* ───────────────────────── Main Page ───────────────────────── */
export default function NewSitePage() {
    const [appState, setAppState] = useState<AppState>('LOADING');
    const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
    const [sceneLoaded, setSceneLoaded] = useState(false);

    // Initial loading sequence
    useEffect(() => {
        if (appState === 'LOADING') {
            const timer = setTimeout(() => {
                setAppState('MENU');
            }, 2500); // Show loader for 2.5s
            return () => clearTimeout(timer);
        }
    }, [appState]);

    const handleSelect = (comp: ComponentItem) => {
        if (!comp.isAvailable) return;
        setSelectedComponent(comp);
        setSceneLoaded(false);
        setAppState('VIEWING');
    };

    const handleBackToMenu = () => {
        setAppState('MENU');
        setSelectedComponent(null);
    };

    return (
        <main className="newsite-root">
            <AnimatePresence mode="wait">
                {appState === 'LOADING' && <LoadingScreen key="loading" />}
                {appState === 'MENU' && <MenuScreen key="menu" onSelect={handleSelect} />}
                {appState === 'VIEWING' && selectedComponent && (
                    <ShowcaseScreen
                        key="viewing"
                        comp={selectedComponent}
                        onBack={handleBackToMenu}
                        sceneLoaded={sceneLoaded}
                        setSceneLoaded={setSceneLoaded}
                    />
                )}
            </AnimatePresence>
            <GlobalStyles />
        </main>
    );
}

/* ───────────────────────── 1. Loading Screen (Cinematic Nexus Boot) ───────────────────────── */
function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random jumps for "hacking" feel
                return p + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="screen-container bg-[#020202] flex flex-col items-center justify-center p-8 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Background Grid & Vignette */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4vw_4vw]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
                {/* Tech Bar */}
                <div className="w-full flex justify-between text-[#ff7e33] font-mono text-[10px] uppercase tracking-[0.3em] mb-4 opacity-50">
                    <span suppressHydrationWarning>Sys.Boot_Seq__{Math.floor(Math.random() * 1000)}</span>
                    <span className="animate-pulse">Aadarsh_OS // v4.0.2</span>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/50 to-transparent mb-12" />

                {/* Glitching Title Container */}
                <div className="relative mb-12">
                    <motion.h1
                        className="text-white font-outfit text-5xl md:text-7xl font-black italic tracking-tighter uppercase relative z-10"
                        animate={{
                            textShadow: [
                                "4px 0px 0px rgba(255,85,0,0.5), -4px 0px 0px rgba(0,255,255,0.5)",
                                "0px 0px 0px rgba(255,85,0,0), 0px 0px 0px rgba(0,255,255,0)",
                            ]
                        }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
                    >
                        NEXUS
                    </motion.h1>
                    <span className="absolute top-0 right-[-30px] font-mono text-[#ff5500] text-xs font-bold transform -translate-y-2">TM</span>
                </div>

                {/* Progress Visualizer */}
                <div className="w-full max-w-sm flex flex-col gap-3">
                    <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-white/40">
                        <span>Compiling Environment...</span>
                        <span className="text-white">{progress >= 100 ? 100 : progress}%</span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-[2px] bg-white/5 relative overflow-hidden flex">
                        <motion.div
                            className="h-full bg-[#ff7e33]"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                        {/* Scanning highlight */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                            animate={{ left: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>

                {/* Status Readouts */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-8 opacity-40">
                    <div className="flex flex-col gap-1 border-l border-[#ff5500]/30 pl-3">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-gray-500">Core Engine</span>
                        <span className="font-mono text-[10px] text-white">ONLINE</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-[#ff5500]/30 pl-3">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-gray-500">WebGL Context</span>
                        <span className="font-mono text-[10px] text-white">MOUNTED</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


/* ───────────────────────── 2. Menu Screen (Accordion Gallery) ───────────────────────── */
function MenuScreen({ onSelect }: { onSelect: (comp: ComponentItem) => void }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <motion.div
            className="screen-container bg-[#020202] flex flex-col overflow-hidden min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Global HUD Header overlaying the accordion */}
            <header className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-50 pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <span className="text-white/40 font-mono text-[9px] font-bold tracking-[0.3em] uppercase">Terminal_Access</span>
                    <h1 className="text-white font-outfit text-2xl md:text-3xl font-black italic tracking-tighter uppercase mix-blend-difference">COMPONENT_HUB</h1>
                </div>
                <Link
                    href="/"
                    className="pointer-events-auto text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 px-5 py-2 border border-white/10 rounded-full hover:border-[#ff5500]/50 bg-black/40 backdrop-blur-md group"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-colors">
                        Return
                    </span>
                    <span className="text-sm leading-none group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
            </header>

            {/* Expanding Flex Gallery */}
            <div className="flex-1 flex flex-col md:flex-row w-full h-[100dvh]">
                {COMPONENTS.map((comp, i) => {
                    const isHovered = hoveredId === comp.id;
                    const isAnyHovered = hoveredId !== null;

                    return (
                        <motion.div
                            key={comp.id}
                            className={`group relative flex flex-col md:justify-end justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${comp.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            style={{
                                flexGrow: isHovered ? 4 : isAnyHovered ? 0.5 : 1,
                                flexBasis: 0,
                                backgroundColor: isHovered ? `${comp.color}15` : '#050507'
                            }}
                            onMouseEnter={() => comp.isAvailable && setHoveredId(comp.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => comp.isAvailable && (hoveredId === comp.id ? onSelect(comp) : setHoveredId(comp.id))}
                        >
                            {/* Layer 1: Ambient Background Color Glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                                style={{ background: `radial-gradient(circle at bottom, ${comp.color}40 0%, transparent 70%)` }}
                            />

                            {/* Layer 2: Giant Background Number */}
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:bottom-[-5vh] md:left-4 font-outfit font-black italic text-white/[0.03] text-[15vh] md:text-[30vh] leading-none pointer-events-none transition-transform duration-[1000ms] ease-out group-hover:scale-105 group-hover:-translate-y-10 group-hover:text-white/[0.05]">
                                0{i + 1}
                            </span>

                            {/* Layer 3: Vertical/Horizontal Content */}
                            <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-end">

                                {/* Idle State Layout (Vertical Text on Desktop) */}
                                <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex flex-col items-center md:items-start transition-all duration-500 ${isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                    <div className="md:-rotate-90 md:origin-bottom-left flex whitespace-nowrap mb-8 md:mb-0">
                                        <h2 className="text-white/40 font-outfit text-2xl md:text-3xl font-black italic tracking-widest uppercase transition-colors group-hover:text-white">
                                            {comp.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Hovered State Layout */}
                                <div className={`flex flex-col items-start gap-4 transition-all duration-700 transform origin-bottom-left ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none absolute bottom-12'}`}>
                                    {/* Badges */}
                                    <div className="flex gap-3 items-center">
                                        {comp.isAvailable ? (
                                            <span
                                                className="px-3 py-1 border text-[10px] font-bold tracking-[0.2em] rounded bg-black/40 backdrop-blur-md uppercase"
                                                style={{ borderColor: `${comp.color}50`, color: comp.color }}
                                            >
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 border border-white/10 text-gray-500 text-[10px] font-bold tracking-[0.2em] rounded bg-black/40 backdrop-blur-md uppercase">
                                                Classified
                                            </span>
                                        )}
                                        <div className="flex gap-[3px]">
                                            {[...Array(3)].map((_, j) => (
                                                <div key={j} className="w-1 h-1 rounded-full" style={{ backgroundColor: comp.isAvailable ? comp.color : '#333', opacity: comp.isAvailable ? 1 : 0.5 }} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Main Focus Title */}
                                    <h2 className="text-white font-outfit text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase max-w-[90%] leading-[0.9]">
                                        {comp.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-400 font-inter text-sm md:text-base max-w-sm leading-relaxed mt-2 opacity-80 mix-blend-screen">
                                        {comp.description}
                                    </p>

                                    {/* Launch Button */}
                                    {comp.isAvailable && (
                                        <div className="mt-6 flex items-center gap-3 group/btn cursor-pointer">
                                            <div
                                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover/btn:scale-110"
                                                style={{ backgroundColor: `${comp.color}20`, borderColor: comp.color }}
                                            >
                                                <span className="text-white leading-none rotate-45 group-hover/btn:rotate-0 transition-transform duration-500">↗</span>
                                            </div>
                                            <span className="text-white font-mono text-xs tracking-[0.3em] uppercase group-hover/btn:tracking-[0.4em] transition-all duration-500">Initiate</span>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

/* ───────────────────────── 3. Showcase Screen (Hero) ───────────────────────── */
function ShowcaseScreen({
    comp,
    onBack,
    sceneLoaded,
    setSceneLoaded
}: {
    comp: ComponentItem;
    onBack: () => void;
    sceneLoaded: boolean;
    setSceneLoaded: (v: boolean) => void;
}) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isIdle, setIsIdle] = useState(true);
    const [splineApp, setSplineApp] = useState<any>(null);
    const [spinPaused, setSpinPaused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Sync screen size for responsive 3D scaling
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // initial
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const isIdleRef = useRef(true);
    const spinPausedRef = useRef(false);

    // Sync fullscreen state
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Keep refs in sync with state for use inside animation frames
    useEffect(() => {
        isIdleRef.current = isIdle;
    }, [isIdle]);
    useEffect(() => {
        spinPausedRef.current = spinPaused;
    }, [spinPaused]);

    // Track mouse position and idle state
    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleMouseMove = () => {
            // Hide text when moving
            setIsIdle(false);

            // Clear previous timer
            clearTimeout(timer);

            // Set timer to show text again after 1.5s of no movement
            timer = setTimeout(() => {
                setIsIdle(true);
            }, 1500);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    // Auto-rotate ONLY the jersey mesh on its own Y-axis — stops on CLICK, not hover
    useEffect(() => {
        if (!splineApp || comp.id !== 'scene-4') return;

        // Find ONLY the jersey object — skip lights, cameras, etc.
        let jerseyObj: any = null;
        try {
            jerseyObj = splineApp.findObjectByName('ESports Jersey Mockup');
            if (!jerseyObj) {
                const allObjects = splineApp.getAllObjects();
                jerseyObj = allObjects.find((o: any) =>
                    o.name && !o.name.toLowerCase().includes('light') && !o.name.toLowerCase().includes('camera')
                );
            }
            if (jerseyObj) {
                console.log('[Spline] Rotating object:', jerseyObj.name);
            }
        } catch (e) {
            console.warn('[Spline] Could not find jersey object:', e);
            return;
        }

        if (!jerseyObj) return;

        // Save the original position so the jersey stays perfectly in place
        const originX = jerseyObj.position.x;
        const originY = jerseyObj.position.y;
        const originZ = jerseyObj.position.z;

        let animationFrameId: number;

        const rotate = () => {
            if (!spinPausedRef.current) {
                try {
                    // Spin on its own Y-axis — faster speed
                    jerseyObj.rotation.y += 0.012;
                    // Lock position to prevent any drift/orbit
                    jerseyObj.position.x = originX;
                    jerseyObj.position.y = originY;
                    jerseyObj.position.z = originZ;
                } catch (e) {
                    // skip if not supported
                }
            }
            animationFrameId = requestAnimationFrame(rotate);
        };

        animationFrameId = requestAnimationFrame(rotate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [splineApp, comp.id]);

    return (
        <motion.div
            className="screen-container bg-[#030712] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Back Button */}
            <motion.button
                className="absolute top-6 left-6 md:top-10 md:left-10 z-[100] text-white flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors font-inter text-sm"
                onClick={onBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <span>←</span> Back
            </motion.button>

            {/* Fullscreen Toggle Button */}
            <motion.button
                className="absolute top-6 right-6 md:top-10 md:right-10 z-[100] text-white flex items-center gap-3 px-5 py-2.5 bg-black/60 backdrop-blur-xl border rounded-full transition-all font-inter text-[13px] font-medium group"
                style={{
                    borderColor: `${comp.color}40`,
                    boxShadow: isFullscreen ? `0 0 25px ${comp.color}30` : `0 0 10px rgba(0,0,0,0.5)`
                }}
                whileHover={{
                    backgroundColor: `${comp.color}15`,
                    borderColor: `${comp.color}60`,
                    scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch((err) => {
                            console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
                        });
                    } else {
                        document.exitFullscreen();
                    }
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className="relative flex items-center justify-center w-4 h-4">
                    {isFullscreen ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                    )}
                </div>
                <span className="tracking-wider uppercase opacity-90 group-hover:opacity-100">
                    {isFullscreen ? 'Exit Focus' : 'Focus Mode'}
                </span>
            </motion.button>

            {/* Side HUD Panels — only for 'ai-robot' on Desktop */}
            {sceneLoaded && comp.id === 'ai-robot' && !isMobile && (
                <>
                    <LeftHUDPanel />
                    <RightHUDPanel />
                </>
            )}

            {/* Spline 3D Scene */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <AnimatePresence mode="wait">
                    {!sceneLoaded && (
                        <motion.div
                            key="loader"
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#020202] backdrop-blur-md"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2vw_2vw] opacity-50" />

                            <div className="relative flex flex-col items-center z-10">
                                {/* Wireframe Scanner Box */}
                                <div className="w-32 h-32 relative border border-white/10 mb-8 rounded-sm overflow-hidden flex items-center justify-center">
                                    {/* Rotating Reticle */}
                                    <motion.div
                                        className="absolute w-[120%] h-[120%] border-[0.5px] border-dashed rounded-full pointer-events-none"
                                        style={{ borderColor: `${comp.color}50` }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Inner Solid Box */}
                                    <motion.div
                                        className="w-12 h-12 border-2"
                                        style={{ borderColor: comp.color, boxShadow: `0 0 20px ${comp.color}40` }}
                                        animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.8, 1, 0.8, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    {/* Scanning Laser Line */}
                                    <motion.div
                                        className="absolute top-0 w-full h-[2px]"
                                        style={{ backgroundColor: comp.color, boxShadow: `0 0 10px ${comp.color}` }}
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>

                                {/* Dynamic Text Readouts */}
                                <div className="flex flex-col items-center text-center gap-2">
                                    <span
                                        className="font-mono text-xs tracking-[0.4em] uppercase font-bold"
                                        style={{ color: comp.color }}
                                    >
                                        Acquiring Asset
                                    </span>
                                    <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">
                                        Module :: {comp.id}
                                    </span>
                                    <div className="mt-4 flex gap-1">
                                        {[...Array(3)].map((_, j) => (
                                            <motion.div
                                                key={j}
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: `${comp.color}80` }}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    onClick={() => {
                        if (comp.id === 'scene-4') {
                            setSpinPaused(true);
                            // Auto-resume spinning after 2 seconds
                            setTimeout(() => setSpinPaused(false), 2000);
                        }
                    }}
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'relative',
                        zIndex: 10,
                        cursor: comp.id === 'scene-4' ? 'pointer' : 'default',
                        opacity: sceneLoaded ? 1 : 0,
                        transform: `scale(${isMobile
                                ? (comp.id === 'ai-robot' ? 0.75 : comp.id === 'scene-3' ? 0.8 : comp.id === 'scene-4' ? 0.9 : 0.8)
                                : (comp.id === 'ai-robot' ? 1.15 : comp.id === 'scene-3' ? 1.1 : comp.id === 'scene-4' ? 1.45 : 1.6)
                            })`,
                        transformOrigin: 'center center',
                        transition: 'transform 1s ease-in-out, opacity 1s ease-in-out'
                    }}>
                    <SplineScene
                        scene={comp.sceneUrl}
                        className="w-full h-full pointer-events-auto"
                        onLoad={(app) => {
                            setSplineApp(app);
                            // Add a deliberate delay so shaders compile before we reveal
                            setTimeout(() => {
                                setSceneLoaded(true);
                            }, 1500);
                        }}
                    />
                </div>
            </div>

            {/* Typography Overlay — only for 'ai-robot' */}
            {sceneLoaded && comp.id === 'ai-robot' && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 30,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5vw',
                }}>
                    <motion.div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '1200px',
                            lineHeight: 0.9,
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{
                            opacity: isIdle ? 1 : 0,
                            scale: isIdle ? 1 : 0.98,
                            y: isIdle ? [0, -15, 0] : 10
                        }}
                        transition={{
                            opacity: { duration: 0.6 },
                            scale: { duration: 0.6 },
                            y: {
                                repeat: isIdle ? Infinity : 0,
                                duration: 6,
                                ease: 'easeInOut'
                            }
                        }}
                    >
                        {/* Row 1: THE AI — glowing accents */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '0.15em',
                            marginBottom: '-0.02em',
                        }}>
                            <span className="typography-outline" style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 900,
                                fontSize: '3.5vw',
                                letterSpacing: '0.05em',
                                lineHeight: 1,
                            }}>
                                THE
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 900,
                                fontSize: '4vw',
                                color: '#ff7e33',
                                letterSpacing: '0.02em',
                                lineHeight: 1,
                                textShadow: '0 0 40px rgba(255,126,51,0.6), 0 0 20px rgba(255,126,51,0.4)',
                            }}>
                                AI
                            </span>
                        </div>

                        {/* Row 2: SOLUTIONS — dominant, metallic gradient */}
                        <motion.div
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 20,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 900,
                                fontSize: '7.5vw',
                                background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '-0.03em',
                                lineHeight: 0.95,
                                display: 'block',
                                filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.5))',
                            }}>
                                SOLUTIONS
                            </span>
                        </motion.div>

                        {/* Row 3: AGENCY — tech brackets, glowing trailing cursor */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: '0.05em',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 600,
                                fontSize: '1.5vw',
                                color: '#64748b',
                                letterSpacing: '0.3em',
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5em',
                            }}>
                                {'[ AGENCY ]'}
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    style={{
                                        display: 'inline-block',
                                        width: '12px',
                                        height: '2vw',
                                        backgroundColor: '#ff7e33',
                                        boxShadow: '0 0 10px #ff7e33'
                                    }}
                                />
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Dark gradient fades — only for 'ai-robot' */}
            {comp.id === 'ai-robot' && (
                <>
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030712] to-transparent z-20 pointer-events-none" />
                </>
            )}

            {/* Typography Overlay — exclusively for Neural Core ('scene-2') */}
            {sceneLoaded && comp.id === 'scene-2' && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 30,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5vw',
                }}>
                    <motion.div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '1200px',
                            lineHeight: 0.9,
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{
                            opacity: isIdle ? 1 : 0,
                            scale: isIdle ? 1 : 0.98,
                            y: isIdle ? [0, -15, 0] : 10
                        }}
                        transition={{
                            opacity: { duration: 0.6 },
                            scale: { duration: 0.6 },
                            y: {
                                repeat: isIdle ? Infinity : 0,
                                duration: 6,
                                ease: 'easeInOut'
                            }
                        }}
                    >
                        {/* Row 1: QUANTUM — glowing cyan accents */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '0.15em',
                            marginBottom: '-0.02em',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 900,
                                fontSize: '2.5vw',
                                color: '#06b6d4',
                                letterSpacing: '0.4em',
                                lineHeight: 1,
                                textShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.4)',
                            }}>
                                QUANTUM
                            </span>
                        </div>

                        {/* Row 2: NEURAL CORE — dominant, metallic/glass gradient */}
                        <motion.div
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 20,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 900,
                                fontSize: '7.5vw',
                                background: 'linear-gradient(180deg, #ffffff 0%, #06b6d4 120%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '-0.02em',
                                lineHeight: 0.95,
                                display: 'block',
                                filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.5))',
                            }}>
                                NEURAL CORE
                            </span>
                        </motion.div>

                        {/* Row 3: SYSTEM_ACTIVE — tech brackets, glowing trailing cursor */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: '0.05em',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                                fontWeight: 600,
                                fontSize: '1.2vw',
                                color: '#94a3b8',
                                letterSpacing: '0.5em',
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5em',
                            }}>
                                {'[ SYSTEM_ACTIVE ]'}
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    style={{
                                        display: 'inline-block',
                                        width: '12px',
                                        height: '1.5vw',
                                        backgroundColor: '#06b6d4',
                                        boxShadow: '0 0 10px #06b6d4'
                                    }}
                                />
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Interaction Hint for Neural Core ('scene-2') */}
            {comp.id === 'scene-2' && sceneLoaded && (
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: isIdle ? 0.6 : 0,
                        y: isIdle ? 0 : 20
                    }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-[#06b6d4]/20">
                        <div className="flex flex-col items-center gap-1">
                            <motion.div
                                className="w-4 h-6 rounded-full border border-[#06b6d4]/50 relative"
                                animate={{ borderColor: ["rgba(6,182,212,0.5)", "rgba(6,182,212,1)", "rgba(6,182,212,0.5)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.div
                                    className="w-1 h-2 bg-[#06b6d4] absolute top-1 left-1/2 -translate-x-1/2 rounded-full"
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                            <span className="text-[#06b6d4] text-[8px] font-mono uppercase tracking-tighter">Scroll</span>
                        </div>

                        <div className="w-[1px] h-8 bg-white/10" />

                        <div className="flex flex-col items-center gap-1">
                            <motion.div
                                className="w-6 h-6 flex items-center justify-center"
                                animate={{ rotate: [0, 45, -45, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="text-[#06b6d4]/80 text-lg">✥</span>
                            </motion.div>
                            <span className="text-[#06b6d4] text-[8px] font-mono uppercase tracking-tighter">Rotate</span>
                        </div>
                    </div>
                    <span className="text-[#06b6d4]/50 text-[10px] font-mono tracking-[0.3em] uppercase">Interactive_Module</span>
                </motion.div>
            )}

            {/* Neural Core Theme Objects (Replacement for text) */}
            {comp.id === 'scene-2' && sceneLoaded && (
                <motion.div
                    className="absolute bottom-10 right-10 z-40 flex flex-col items-end gap-4 pointer-events-none"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {/* Abstract Core Visualizer */}
                    <div className="w-48 h-32 rounded-xl border border-[#06b6d4]/30 bg-black/40 backdrop-blur-md p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[#06b6d4] font-mono text-[10px] tracking-widest uppercase">Quantum_Link</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] animate-pulse" />
                        </div>

                        <div className="flex items-end justify-between h-12 gap-1 mt-auto">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-full bg-[#06b6d4]/50 rounded-t-sm"
                                    animate={{ height: ["20%", "100%", "40%", "80%", "30%"] }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                        </div>

                        {/* Scanning line effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-[1px] bg-[#06b6d4]/80 shadow-[0_0_10px_#06b6d4]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Neural Core Bottom-Left Object (Circular Ring) */}
            {comp.id === 'scene-2' && sceneLoaded && (
                <motion.div
                    className="absolute bottom-10 left-10 z-40 flex flex-col items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Outer spinning ring */}
                        <motion.div
                            className="absolute inset-0 border-2 border-dashed border-[#06b6d4]/30 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Middle rotating ring with gaps */}
                        <motion.div
                            className="absolute inset-2 border-b-2 border-r-2 border-[#06b6d4]/50 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner pulsing ring */}
                        <motion.div
                            className="absolute inset-6 border border-[#06b6d4]/40 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Center data readout */}
                        <div className="z-10 flex flex-col items-center justify-center text-center">
                            <span className="text-[#06b6d4] font-mono text-[8px] tracking-[0.3em] uppercase mb-1 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">Core_Status</span>
                            <span className="text-white font-outfit text-xl font-black italic tracking-tighter leading-none">STABLE</span>
                            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-transparent mt-2" />
                            <span className="text-gray-500 font-mono text-[8px] mt-1 tracking-widest">99.98%</span>
                        </div>

                        {/* Orbital tech marks */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-[2px] h-3 bg-[#06b6d4]/30"
                                style={{
                                    transform: `rotate(${i * 45}deg) translateY(-68px)`,
                                    transformOrigin: 'center center',
                                }}
                            />
                        ))}

                        {/* Fast spinning orbital dot */}
                        <motion.div
                            className="absolute w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-[0_0_10px_#06b6d4]"
                            animate={{
                                rotate: [0, 360],
                            }}
                            style={{
                                transformOrigin: 'center 75px',
                                top: '50%',
                                marginTop: '-75.75px',
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* SCENE 4: NEPAL CRICKET JERSEY UI                                  */}
            {/* ----------------------------------------------------------------- */}
            {comp.id === 'scene-4' && sceneLoaded && (
                <>
                    {/* Dynamic Dual-Color Background */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background: `
                                radial-gradient(circle at top right, rgba(0, 56, 147, 0.25) 0%, transparent 60%),
                                radial-gradient(circle at bottom left, rgba(220, 20, 60, 0.2) 0%, rgba(3, 7, 18, 1) 80%)
                            ` // Nepal Blue + Crimson Red blend
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Parallax Background Typography */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <motion.span
                            className="text-transparent font-outfit font-black select-none"
                            style={{
                                fontSize: '25vw',
                                lineHeight: 1,
                                WebkitTextStroke: '2px rgba(0, 56, 147, 0.2)', // Soft blue outline
                                letterSpacing: '-0.02em'
                            }}
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        >
                            NEPAL
                        </motion.span>
                    </div>

                    {/* Stats Card (Left Side) */}
                    <motion.div
                        className="absolute left-10 top-1/2 -translate-y-1/2 z-40 w-72 flex flex-col gap-4 pointer-events-none"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-gradient-to-br from-black/60 to-black/20 backdrop-blur-md border border-[#dc2626]/30 rounded-2xl p-6 shadow-[0_10px_40px_rgba(220,38,38,0.1)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-8 bg-[#dc2626] rounded-full shadow-[0_0_10px_#dc2626]" />
                                <div>
                                    <h3 className="text-white font-outfit font-bold text-xl leading-none uppercase">Nepal cricket Jersey</h3>
                                    <span className="text-[#dc2626] font-mono text-[10px] tracking-[0.2em] uppercase">Match_Kit_v2</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <span className="text-gray-400 font-mono text-xs uppercase">Fabric Tech</span>
                                    <span className="text-white font-bold text-sm">AeroWeave™</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <span className="text-gray-400 font-mono text-xs uppercase">Weight</span>
                                    <span className="text-white font-bold text-sm">142g <span className="text-gray-600 font-normal">Ultra-light</span></span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 font-mono text-xs uppercase">Status</span>
                                    <span className="text-[#dc2626] font-bold text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full animate-pulse" />
                                        Equipped
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Interaction Hint */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="px-6 py-2 rounded-full border border-[#dc2626]/30 bg-black/40 backdrop-blur-sm flex items-center gap-3">
                            <span className="text-white/80 text-lg">✥</span>
                            <span className="text-[#dc2626] font-mono text-[10px] tracking-[0.2em] uppercase">Drag to Inspect</span>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>

    );
}

/* ───────────────────────── 4. Side HUD Panels ───────────────────────── */

function LeftHUDPanel() {
    const [cpuLoad, setCpuLoad] = useState(42);
    const [memLoad, setMemLoad] = useState(88);

    useEffect(() => {
        const interval = setInterval(() => {
            // Generate realistic looking fluctuations every 1.5s
            setCpuLoad(Math.floor(Math.random() * (65 - 35 + 1) + 35));
            setMemLoad(Math.floor(Math.random() * (95 - 80 + 1) + 80));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 w-64 pointer-events-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
        >
            {/* Spinning Radar */}
            <div className="flex flex-col gap-2">
                <span className="text-[#ff7e33] font-inter text-xs tracking-[0.3em] uppercase opacity-80">Sync_Rad</span>
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 border border-white/20 rounded-full border-t-[#ff7e33]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute inset-2 border border-dashed border-white/10 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="w-1 h-1 bg-[#ff7e33] rounded-full shadow-[0_0_10px_#ff7e33]" />
                </div>
            </div>

            {/* System Status */}
            <div className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg backdrop-blur-sm">
                <div className="flex justify-between items-center text-xs font-inter uppercase tracking-widest">
                    <span className="text-gray-400">Core_Sys</span>
                    <span className="text-green-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Online
                    </span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                {/* Progress Bars */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>CPU_LOAD</span>
                        <span>{cpuLoad}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#ff7e33]"
                            animate={{ width: `${cpuLoad}%` }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>MEM_ALLOC</span>
                        <span>{memLoad}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white/40"
                            animate={{ width: `${memLoad}%` }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                </div>
            </div>

            {/* Hex Codes */}
            <div className="font-mono text-[10px] text-gray-600 leading-tight">
                <p>0x4F2A_9B</p>
                <p>0x1C8F_3E</p>
                <p>0x7A4C_8D</p>
            </div>
        </motion.div>
    );
}

function RightHUDPanel() {
    return (
        <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-10 w-64 pointer-events-none text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
        >
            {/* Hexagon Accents */}
            <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 border border-[#ff7e33]/40 rotate-45"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Neural Link */}
            <div className="flex flex-col items-end gap-2 text-xs font-inter uppercase tracking-widest text-[#ff7e33]">
                <span>Neural_Link</span>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-6 bg-[#ff7e33]"
                            animate={{ height: ['8px', '24px', '12px'] }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ opacity: 1 - (i * 0.15) }}
                        />
                    ))}
                </div>
            </div>

            {/* Data Stream */}
            <div className="flex flex-col items-end gap-2">
                <span className="text-gray-500 font-inter text-[10px] tracking-[0.2em] uppercase">Data_Stream_V2</span>
                <div className="p-3 border-r-2 border-[#ff7e33]/50">
                    <p className="font-mono text-sm text-gray-300">INIT: 849.20.1</p>
                    <p className="font-mono text-xs text-gray-500">SEQ: ACTIVE</p>
                </div>
            </div>

            {/* Tracking Bracket */}
            <div className="w-16 h-16 border-t-2 border-r-2 border-white/20 relative mt-10">
                <motion.div
                    className="absolute top-0 right-0 w-2 h-2 bg-[#ff7e33]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
}

/* ───────────────────────── Global Styles CSS ───────────────────────── */
function GlobalStyles() {
    return (
        <style jsx global>{`
            .newsite-root {
                min-height: 100vh;
                background: #030712;
                color: #e2e8f0;
                overflow: hidden;
            }

            .screen-container {
                position: fixed;
                inset: 0;
                width: 100vw;
                height: 100vh;
            }

            .loader-ring {
                width: 64px;
                height: 64px;
                border: 3px solid rgba(255, 126, 51, 0.1);
                border-top-color: #ff7e33;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-radius: 50%;
            }

            /* The specific typography styling requested by the user */
            .typography-outline {
                color: transparent;
                -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
            }
            
            @media (min-width: 768px) {
                .typography-outline {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
                }
            }
            
            @media (min-width: 1024px) {
                .typography-outline {
                    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.6);
                }
            }
        `}</style>
    );
}
