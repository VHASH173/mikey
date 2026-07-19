"use client";

import React, { useRef, useState } from "react";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.6,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const [isHoveringInternal, setIsHoveringInternal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentHovering = hovering !== undefined ? hovering : isHoveringInternal;
  const setCurrentHovering = setHovering ?? setIsHoveringInternal;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = containerRef.current?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
    };
    setMousePosition({ x: e.clientX - left, y: e.clientY - top });
  }

  const activePosition = isStatic ? position : mousePosition;
  const showLens = isStatic || currentHovering;

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-2xl"
      onMouseEnter={() => setCurrentHovering(true)}
      onMouseLeave={() => setCurrentHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {showLens && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='white'/%3E%3C/svg%3E\")",
            maskRepeat: "no-repeat",
            WebkitMaskImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='white'/%3E%3C/svg%3E\")",
            WebkitMaskRepeat: "no-repeat",
            maskSize: `${lensSize}px`,
            WebkitMaskSize: `${lensSize}px`,
            maskPosition: `${activePosition.x - lensSize / 2}px ${
              activePosition.y - lensSize / 2
            }px`,
            WebkitMaskPosition: `${activePosition.x - lensSize / 2}px ${
              activePosition.y - lensSize / 2
            }px`,
            zIndex: 50,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${activePosition.x}px ${activePosition.y}px`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
