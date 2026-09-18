import { useCallback, useEffect, useRef, type CSSProperties } from 'react';
import './GooeyNav.css';

interface GooeyNavItem {
  label: string;
  id: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  activeIndex?: number;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  onSelect: (id: string) => void;
}

interface ParticleData {
  start: [number, number];
  end: [number, number];
  time: number;
  scale: number;
  color: number;
  rotate: number;
}

const GooeyNav = ({
  items,
  activeIndex = 0,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  onSelect,
}: GooeyNavProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<number[]>([]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (index: number, time: number): ParticleData => {
    const rotate = noise(particleR / 10);
    return {
      start: getXY(particleDistances[0], particleCount - index, particleCount),
      end: getXY(particleDistances[1] + noise(7), particleCount - index, particleCount),
      time,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)] ?? 1,
      rotate: rotate > 0 ? (rotate + particleR / 20) * 10 : (rotate - particleR / 20) * 10,
    };
  };

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    const container = containerRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    if (!container || !filter || !text) return;

    const containerRect = container.getBoundingClientRect();
    const position = element.getBoundingClientRect();
    const styles = {
      left: `${position.x - containerRect.x}px`,
      top: `${position.y - containerRect.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    };
    Object.assign(filter.style, styles);
    Object.assign(text.style, styles);
    text.textContent = element.textContent;
  }, []);

  const makeParticles = (element: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let index = 0; index < particleCount; index += 1) {
      const time = animationTime * 2 + noise(timeVariance * 2);
      const particleData = createParticle(index, time);
      element.classList.remove('active');
      const creationTimer = window.setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.className = 'particle';
        const style = particle.style as CSSProperties & CSSStyleDeclaration;
        style.setProperty('--start-x', `${particleData.start[0]}px`);
        style.setProperty('--start-y', `${particleData.start[1]}px`);
        style.setProperty('--end-x', `${particleData.end[0]}px`);
        style.setProperty('--end-y', `${particleData.end[1]}px`);
        style.setProperty('--time', `${particleData.time}ms`);
        style.setProperty('--scale', `${particleData.scale}`);
        style.setProperty('--color', `var(--color-${particleData.color})`);
        style.setProperty('--rotate', `${particleData.rotate}deg`);
        point.className = 'point';
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add('active'));

        const removalTimer = window.setTimeout(() => particle.remove(), time);
        timersRef.current.push(removalTimer);
      }, 30);
      timersRef.current.push(creationTimer);
    }
  };

  const handleClick = (element: HTMLLIElement, index: number) => {
    if (activeIndex !== index) {
      updateEffectPosition(element);
      filterRef.current?.querySelectorAll('.particle').forEach((particle) => particle.remove());
      textRef.current?.classList.remove('active');
      void textRef.current?.offsetWidth;
      textRef.current?.classList.add('active');
      if (filterRef.current) makeParticles(filterRef.current);
    }
    const item = items[index];
    if (item) onSelect(item.id);
  };

  useEffect(() => {
    const nav = navRef.current;
    const container = containerRef.current;
    if (!nav || !container) return;
    const activeItem = nav.querySelectorAll('li')[activeIndex];
    if (activeItem instanceof HTMLElement) updateEffectPosition(activeItem);

    const observer = new ResizeObserver(() => {
      const currentItem = nav.querySelectorAll('li')[activeIndex];
      if (currentItem instanceof HTMLElement) updateEffectPosition(currentItem);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex, updateEffectPosition]);

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="Main navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.id} className={activeIndex === index ? 'active' : ''}>
              <button type="button" onClick={(event) => handleClick(event.currentTarget.parentElement as HTMLLIElement, index)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
};

export default GooeyNav;