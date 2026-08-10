# Motion video generation integration

Wire the Mosaic Motion API (`motion.so`) into Bahar Al Zafran so promotional videos can be generated from a prompt without exposing the API key in the browser.

## How it works

```text
Browser  ->  backend function "motion-video"  ->  api.motion.so
             (holds MOTION_API_KEY)
   action: "create"  -> returns job_id
   action: "status"  -> returns status + download_url when ready
```

The browser never sees the key. It calls the backend function, gets a `job_id`, then polls every few seconds until the video is ready and plays it back.

## Steps

1. **Store the key** — save the Mosaic Motion API key (starts with `motion_`) as a backend secret named `MOTION_API_KEY`. You get it from your account at motion.so.
2. **Backend function `motion-video`** — one function, two actions:
   - `create`: POST `https://api.motion.so/api/motion/sessions` with `prompt`, `aspect_ratio`, `duration`, and `design_system_id`. Returns `job_id`.
   - `status`: GET `https://api.motion.so/api/motion/sessions/{job_id}`. Returns `status` and, once complete, `output.download_url`.
   - Maps upstream errors to clear messages: invalid key, out of credits, job not found.
3. **Admin-only generator page** at `/studio` — a prompt box, aspect-ratio and length selectors, a Generate button, a live status indicator, and an inline player with a download link when finished. Styled with the existing obsidian-saffron glass design system.
4. **Polling** — the page polls the `status` action every 5 seconds while the job is `queued`/`running`, stops on `completed` or `failed`, and shows a friendly message on failure.

## Notes

- Jobs are billed to the Motion account that owns the key, and generation takes minutes, not seconds — the UI is built around that wait.
- Download URLs from Motion expire, so a finished video should be downloaded and saved promptly if it will be reused on the site.
- Nothing on the public marketing pages changes; this only adds a new internal page.
