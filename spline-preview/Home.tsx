"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentType } from "react"

const BASE_WIDTH = 1440
const BASE_HEIGHT = 900
const CROP_PERCENT = 15
const SIZE_MULTIPLIER = 0.85

interface SplineHeroProps {
    sceneUrl?: string
    className?: string
}

export default function Home({
    sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
    className = "",
}: SplineHeroProps) {
    const outerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [SplineComponent, setSplineComponent] =
        useState<ComponentType<any> | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Dynamic import to prevent SSR issues in Next.js / Vite
    useEffect(() => {
        let isMounted = true
        import("@splinetool/react-spline")
            .then((mod) => {
                if (isMounted) {
                    setSplineComponent(() => mod.default)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.error("Failed to load Spline component:", err)
                if (isMounted) setIsLoading(false)
            })
        return () => {
            isMounted = false
        }
    }, [])

    // Responsive auto-scaler based on outer container width
    useEffect(() => {
        const el = outerRef.current
        if (!el) return

        function updateScale(width: number) {
            setScale((width / BASE_WIDTH) * SIZE_MULTIPLIER)
        }

        updateScale(el.offsetWidth)

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                updateScale(entry.contentRect.width)
            }
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const cropHeight = BASE_HEIGHT * (1 - CROP_PERCENT / 100)
    const aspectRatio = BASE_WIDTH / cropHeight

    return (
        <div
            ref={outerRef}
            className={className}
            style={{
                width: "100%",
                aspectRatio: `${aspectRatio}`,
                overflow: "hidden",
                position: "relative",
                background: "transparent",
            }}
        >
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#888",
                        fontSize: "0.9rem",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                border: "3px solid #333",
                                borderTop: "3px solid #E50914",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                                margin: "0 auto 10px",
                            }}
                        />
                        <span>Loading 3D Scene...</span>
                    </div>
                </div>
            )}

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: BASE_WIDTH,
                    height: cropHeight,
                    overflow: "hidden",
                    transform: `translateX(-50%) scale(${scale})`,
                    transformOrigin: "bottom center",
                    pointerEvents: "auto",
                }}
            >
                <div
                    style={{
                        width: BASE_WIDTH,
                        height: BASE_HEIGHT,
                        transform: `translateY(-${CROP_PERCENT / 2}%)`,
                    }}
                >
                    {SplineComponent && (
                        <SplineComponent scene={sceneUrl} />
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

