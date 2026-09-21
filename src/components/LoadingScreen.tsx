import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './LoadingScreen.css';

const ASSETS = [
  '/exterior.webp',
  '/instore.webp',
  'https://i.herbalreality.com/wp-content/uploads/2022/05/21124107/saffron-Crocus-sativus-wooden-bowl-scaled.jpg',
  'https://etimg.etb2bimg.com/photo/110025886.cms',
  'https://health.osu.edu/-/media/health/images/stories/2018/05/essential-oils.jpg',
  'https://i5.walmartimages.com/asr/ab7a5623-f78e-4f30-8600-b3c5c87da75f.c8a86ff1220b9de3da80692e95818a9c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
];

type LoaderState = 'loading' | 'leaving' | 'hidden';

const LoadingScreen = () => {
  const [state, setState] = useState<LoaderState>('loading');
  const [progress, setProgress] = useState(8);
  const [canSkip, setCanSkip] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const startedAt = useRef(Date.now());
  const finishedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    setState('leaving');
    window.setTimeout(() => setState('hidden'), 620);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    let loaded = 0;
    let settled = 0;
    let fontsDone = !document.fonts;
    let windowDone = document.readyState === 'complete';
    const total = ASSETS.length + 2;

    const update = () => {
      const complete = loaded + Number(fontsDone) + Number(windowDone);
      setProgress(Math.min(96, Math.round((complete / total) * 100)));
      const criticalReady = loaded >= 2;
      const mostReady = complete / total >= 0.75;
      if ((criticalReady && mostReady) || settled === ASSETS.length) {
        const wait = Math.max(0, 850 - (Date.now() - startedAt.current));
        window.setTimeout(dismiss, wait);
      }
    };

    ASSETS.forEach((src) => {
      const image = new Image();
      const settle = (success: boolean) => {
        settled += 1;
        if (success) loaded += 1;
        update();
      };
      image.onload = () => settle(true);
      image.onerror = () => settle(false);
      image.src = src;
    });

    document.fonts?.ready.then(() => { fontsDone = true; update(); });
    const onWindowLoad = () => { windowDone = true; update(); };
    window.addEventListener('load', onWindowLoad, { once: true });
    update();

    const skipTimer = window.setTimeout(() => setCanSkip(true), 2000);
    const safetyTimer = window.setTimeout(dismiss, 6500);
    return () => {
      window.removeEventListener('load', onWindowLoad);
      window.clearTimeout(skipTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [dismiss]);

  useEffect(() => {
    if (state !== 'loading') return;
    let timer = 0;
    const scheduleBlink = () => {
      timer = window.setTimeout(() => {
        setBlinking(true);
        window.setTimeout(() => setBlinking(false), 170);
        scheduleBlink();
      }, 1800 + Math.random() * 1600);
    };
    scheduleBlink();
    return () => window.clearTimeout(timer);
  }, [state]);

  const trackEyes = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    setPupil({ x: Math.max(-5, Math.min(5, dx * 10)), y: Math.max(-4, Math.min(4, dy * 8)) });
  };

  if (state === 'hidden') return null;

  return (
    <div
      className={`loading-screen ${state === 'leaving' ? 'loading-screen--leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Bahar Al Zafran"
      onPointerMove={trackEyes}
      onPointerLeave={() => setPupil({ x: 0, y: 0 })}
    >
      <div className="loading-screen__grain" aria-hidden="true" />
      <header className="loading-screen__brand">
        <span>Bahar Al Zafran</span>
        <span className="font-noto-kufi" dir="rtl">بحر الزعفران</span>
      </header>

      <main className="loading-screen__content">
        <div className="loading-screen__stage" aria-hidden="true">
          <svg className="pencil-loader" viewBox="0 0 200 200">
            <defs>
              <clipPath id="loader-pencil-eraser"><rect height="30" width="30" ry="5" rx="5" /></clipPath>
            </defs>
            <circle className="pencil-loader__stroke" r="70" strokeDasharray="439.82 439.82" strokeDashoffset="439.82" />
            <g className="pencil-loader__rotate">
              <g fill="none">
                <circle className="pencil-loader__body1" r="64" strokeDasharray="402.12 402.12" strokeDashoffset="402" strokeWidth="30" />
                <circle className="pencil-loader__body2" r="74" strokeDasharray="464.96 464.96" strokeDashoffset="465" strokeWidth="10" />
                <circle className="pencil-loader__body3" r="54" strokeDasharray="339.29 339.29" strokeDashoffset="339" strokeWidth="10" />
              </g>
              <g className="pencil-loader__eraser">
                <g className="pencil-loader__eraser-skew">
                  <rect className="pencil-loader__eraser-main" height="30" width="30" ry="5" rx="5" />
                  <rect className="pencil-loader__eraser-side" clipPath="url(#loader-pencil-eraser)" height="30" width="5" />
                  <rect className="pencil-loader__metal" height="20" width="30" />
                  <rect className="pencil-loader__metal-shadow" height="20" width="15" />
                  <rect className="pencil-loader__metal-shine" height="20" width="5" />
                </g>
              </g>
              <g className="pencil-loader__point">
                <polygon className="pencil-loader__wood" points="15 0,30 30,0 30" />
                <polygon className="pencil-loader__wood-shadow" points="15 0,6 30,0 30" />
                <polygon className="pencil-loader__lead" points="15 0,20 10,10 10" />
              </g>
            </g>
          </svg>

          <div className={`loader-face ${blinking ? 'loader-face--blink' : ''}`}>
            {[0, 1].map((eye) => (
              <span className="loader-eye" key={eye}>
                <span className="loader-pupil" style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)` }}>
                  <span className="loader-catchlight" />
                </span>
                <span className="loader-eyelid loader-eyelid--top" />
                <span className="loader-eyelid loader-eyelid--bottom" />
              </span>
            ))}
          </div>
          <span className="loading-screen__chomp">READY</span>
        </div>

        <h1>Preparing the spice market</h1>
        <p>Bringing the saffron, herbs and mill into view.</p>
        <div className="loading-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="loading-progress__label" aria-live="polite">{progress}% loaded</span>

        <div className={`loading-screen__skip ${canSkip ? 'loading-screen__skip--ready' : ''}`}>
          {canSkip && (
            <Button onClick={dismiss} className="loading-screen__skip-button" size="lg">
              <FastForward />
              Skip loading
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoadingScreen;