import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, Sparkles, Film } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:5', '21:9'] as const;
const DURATIONS = ['<10s', '10-30s', '30s-1min', '1-5min'] as const;

type JobStatus = 'idle' | 'queued' | 'created' | 'running' | 'awaiting_user_input' | 'completed' | 'failed';

const STATUS_COPY: Record<string, string> = {
  queued: 'Queued with Motion',
  created: 'Preparing the scene',
  running: 'Rendering your video',
  awaiting_user_input: 'Motion is waiting on more input',
  completed: 'Ready',
  failed: 'Generation failed',
};

const Studio = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>('16:9');
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>('10-30s');
  const [status, setStatus] = useState<JobStatus>('idle');
  const [jobId, setJobId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);

  const isBusy = status === 'queued' || status === 'created' || status === 'running' || status === 'awaiting_user_input';

  useEffect(() => {
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    if (!jobId || !isBusy) return;

    const poll = async () => {
      const { data, error } = await supabase.functions.invoke('motion-video', {
        body: { action: 'status', job_id: jobId },
      });

      if (error) {
        setStatus('failed');
        setErrorMessage('Lost contact with the video service while checking progress.');
        return;
      }
      if (data?.error && !data?.status) {
        setStatus('failed');
        setErrorMessage(String(data.error));
        return;
      }

      const next = String(data?.status ?? 'running') as JobStatus;
      setStatus(next);

      if (next === 'completed' && data?.download_url) {
        setVideoUrl(String(data.download_url));
      }
      if (next === 'failed') {
        setErrorMessage(
          typeof data?.error === 'string' ? data.error : 'Motion could not finish this video.',
        );
      }
    };

    pollRef.current = window.setInterval(poll, 5000);
    void poll();

    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [jobId, isBusy]);

  const handleGenerate = async () => {
    if (prompt.trim().length < 3) {
      toast({ title: 'Add a prompt', description: 'Describe the video you want in a sentence or two.' });
      return;
    }

    setStatus('queued');
    setErrorMessage(null);
    setVideoUrl(null);
    setJobId(null);

    const { data, error } = await supabase.functions.invoke('motion-video', {
      body: {
        action: 'create',
        prompt: prompt.trim(),
        aspect_ratio: aspectRatio,
        duration,
        design_system_id: 'apple',
      },
    });

    if (error || !data?.job_id) {
      setStatus('failed');
      setErrorMessage(
        (typeof data?.error === 'string' && data.error) ||
          'Could not start the video job. Check the Motion API key and credits.',
      );
      return;
    }

    setJobId(String(data.job_id));
    setStatus('queued');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Internal tool</p>
          <h1 className="mt-3 font-playfair font-bold display-tight text-[clamp(2rem,5.5vw,3.5rem)]">
            Motion studio
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Describe a promotional video and Motion will render it. Generation usually takes a few
            minutes — leave this page open while it works.
          </p>
        </header>

        <section className="mt-12 grid lg:grid-cols-[1fr_1fr] gap-5 items-start">
          <div className="glass rounded-[1.75rem] p-7 space-y-6">
            <div>
              <label htmlFor="prompt" className="text-sm font-medium">
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                placeholder="A 15 second cinematic spot for Bahar Al Zafran saffron, warm golden light, slow macro shots of spices."
                className="mt-3 w-full resize-none rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <span className="text-sm font-medium">Aspect ratio</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`press rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        aspectRatio === ratio
                          ? 'border-primary/60 bg-primary/15 text-primary'
                          : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Length</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DURATIONS.map((value) => (
                    <button
                      key={value}
                      onClick={() => setDuration(value)}
                      className={`press rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        duration === value
                          ? 'border-primary/60 bg-primary/15 text-primary'
                          : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isBusy}
              className="press lift inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isBusy ? 'Generating…' : 'Generate video'}
            </button>
          </div>

          <div className="glass rounded-[1.75rem] p-7">
            <h2 className="flex items-center gap-3 font-playfair text-xl font-semibold">
              <Film className="w-5 h-5 text-primary" />
              Result
            </h2>

            {status === 'idle' && (
              <p className="mt-6 text-sm text-muted-foreground">
                Nothing generated yet. Your video will appear here.
              </p>
            )}

            {isBusy && (
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                {STATUS_COPY[status] ?? 'Working'}…
              </div>
            )}

            {status === 'failed' && (
              <p className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                {errorMessage ?? 'Something went wrong.'}
              </p>
            )}

            {status === 'completed' && videoUrl && (
              <div className="mt-6 space-y-4">
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  className="w-full rounded-2xl border border-border bg-black/40"
                />
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm text-primary"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <p className="text-xs text-muted-foreground">
                  This download link expires within the hour — save the file if you plan to reuse it.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Studio;
