import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './GlassSurface.css';

type Channel = 'R' | 'G' | 'B';

interface GlassSurfaceProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: Channel;
  yChannel?: Channel;
  mixBlendMode?: CSSProperties['mixBlendMode'];
  className?: string;
  style?: CSSProperties;
}

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
}: GlassSurfaceProps) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const channels = useRef<Array<SVGFEDisplacementMapElement | null>>([]);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = Math.max(1, Math.round(rect?.width ?? 400));
    const actualHeight = Math.max(1, Math.round(rect?.height ?? 200));
    const edgeSize = Math.max(1, Math.min(actualWidth, actualHeight) * borderWidth);
    const lightness = Math.max(0, Math.min(100, brightness));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${actualWidth}" height="${actualHeight}" viewBox="0 0 ${actualWidth} ${actualHeight}"><defs><linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(0 0% ${lightness}%)" stop-opacity="${opacity}"/><stop offset="1" stop-color="black" stop-opacity="0"/></linearGradient><filter id="soft"><feGaussianBlur stdDeviation="${blur}"/></filter></defs><rect width="100%" height="100%" rx="${borderRadius}" fill="black"/><rect x="${edgeSize}" y="${edgeSize}" width="${Math.max(1, actualWidth - edgeSize * 2)}" height="${Math.max(1, actualHeight - edgeSize * 2)}" rx="${Math.max(0, borderRadius - edgeSize)}" fill="url(#edge)" filter="url(#soft)"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [redOffset, greenOffset, blueOffset].forEach((offset, index) => {
      const channel = channels.current[index];
      channel?.setAttribute('scale', String(distortionScale + offset));
      channel?.setAttribute('xChannelSelector', xChannel);
      channel?.setAttribute('yChannelSelector', yChannel);
    });
    gaussianBlurRef.current?.setAttribute('stdDeviation', String(displace));
  }, [width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(updateDisplacementMap);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isUnsupportedBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) || /Firefox/.test(navigator.userAgent);
    setSvgSupported(!isUnsupportedBrowser && CSS.supports('backdrop-filter', `url(#${filterId})`));
  }, [filterId]);

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`,
  } as CSSProperties;

  return (
    <div ref={containerRef} className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`} style={containerStyle}>
      <svg className="glass-surface__filter" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feImage ref={feImageRef} width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={(node) => { channels.current[0] = node; }} in="SourceGraphic" in2="map" result="red" />
            <feDisplacementMap ref={(node) => { channels.current[1] = node; }} in="SourceGraphic" in2="map" result="green" />
            <feDisplacementMap ref={(node) => { channels.current[2] = node; }} in="SourceGraphic" in2="map" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode={mixBlendMode === 'difference' ? 'difference' : 'normal'} />
            <feGaussianBlur ref={gaussianBlurRef} />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

export default GlassSurface;