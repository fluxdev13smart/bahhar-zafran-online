import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import './GradualBlur.css';

interface GradualBlurProps {
  strength?: number;
  height?: string;
  divCount?: number;
  zIndex?: number;
  className?: string;
}

const GradualBlur = ({
  strength = 1.5,
  height = '5rem',
  divCount = 6,
  zIndex = 40,
  className = '',
}: GradualBlurProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const layers = useMemo(() => {
    const increment = 100 / divCount;
    return Array.from({ length: divCount }, (_, index) => {
      const step = index + 1;
      const blur = 0.0625 * (step + 1) * strength;
      const start = Math.max(0, increment * (step - 1));
      const solidStart = increment * step;
      const solidEnd = Math.min(100, increment * (step + 1));
      const end = Math.min(100, increment * (step + 2));
      const mask = `linear-gradient(to bottom, transparent ${start}%, black ${solidStart}%, black ${solidEnd}%, transparent ${end}%)`;
      return {
        backdropFilter: `blur(${blur.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)`,
        maskImage: mask,
        WebkitMaskImage: mask,
      } as CSSProperties;
    });
  }, [divCount, strength]);

  return (
    <div
      className={`gradual-blur gradual-blur--page ${visible ? 'gradual-blur--visible' : ''} ${className}`}
      style={{ height, zIndex }}
      aria-hidden="true"
    >
      <div className="gradual-blur__inner">
        {layers.map((style, index) => <div key={index} style={style} />)}
      </div>
    </div>
  );
};

export default GradualBlur;