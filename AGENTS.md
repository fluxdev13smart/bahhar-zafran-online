# Project Architecture Rules

- Keep loader completion state at the app root and pass readiness down explicitly so entrance animations cannot run behind the loading screen.