import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const MOTION_BASE = 'https://api.motion.so/api/motion';

const ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:5', '21:9'];
const DURATIONS = ['<10s', '10-30s', '30s-1min', '1-5min'];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function friendlyError(status: number, upstream: unknown): string {
  const message =
    typeof upstream === 'object' && upstream !== null && 'error' in upstream
      ? String((upstream as Record<string, unknown>).error)
      : typeof upstream === 'object' && upstream !== null && 'message' in upstream
        ? String((upstream as Record<string, unknown>).message)
        : '';

  switch (status) {
    case 400:
      return message || 'Motion rejected the request. Check the prompt and options.';
    case 401:
      return 'The Motion API key is missing or invalid.';
    case 402:
      return 'Your Motion account is out of credits. Top up at motion.so and try again.';
    case 404:
      return 'That video job could not be found.';
    case 409:
      return 'A follow-up can only be sent once the job has finished.';
    default:
      return message || `Motion returned an unexpected error (${status}).`;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const apiKey = Deno.env.get('MOTION_API_KEY');
  if (!apiKey) {
    return json({ error: 'MOTION_API_KEY is not configured on the server.' }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Request body must be JSON.' }, 400);
  }

  const action = payload.action;

  try {
    if (action === 'create') {
      const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
      if (prompt.length < 3 || prompt.length > 4000) {
        return json({ error: 'Prompt must be between 3 and 4000 characters.' }, 400);
      }

      const aspectRatio =
        typeof payload.aspect_ratio === 'string' && ASPECT_RATIOS.includes(payload.aspect_ratio)
          ? payload.aspect_ratio
          : '16:9';
      const duration =
        typeof payload.duration === 'string' && DURATIONS.includes(payload.duration)
          ? payload.duration
          : '10-30s';
      const designSystemId =
        typeof payload.design_system_id === 'string' && /^[a-z]+$/.test(payload.design_system_id)
          ? payload.design_system_id
          : 'apple';

      const res = await fetch(`${MOTION_BASE}/sessions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio: aspectRatio,
          duration,
          design_system_id: designSystemId,
        }),
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        console.error('Motion create failed', res.status, body);
        return json({ error: friendlyError(res.status, body) }, res.status);
      }

      return json({ job_id: body?.job_id, status: body?.status ?? 'queued' });
    }

    if (action === 'status') {
      const jobId = typeof payload.job_id === 'string' ? payload.job_id : '';
      if (!/^[a-zA-Z0-9-]{8,64}$/.test(jobId)) {
        return json({ error: 'A valid job id is required.' }, 400);
      }

      const res = await fetch(`${MOTION_BASE}/sessions/${jobId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        console.error('Motion status failed', res.status, body);
        return json({ error: friendlyError(res.status, body) }, res.status);
      }

      return json({
        job_id: body?.job_id ?? jobId,
        status: body?.status ?? 'queued',
        error: body?.error ?? null,
        download_url: body?.output?.download_url ?? null,
        expires_at: body?.output?.expires_at ?? null,
      });
    }

    return json({ error: 'Unknown action. Use "create" or "status".' }, 400);
  } catch (err) {
    console.error('motion-video error', err);
    return json({ error: 'Could not reach the Motion service. Try again in a moment.' }, 502);
  }
});
