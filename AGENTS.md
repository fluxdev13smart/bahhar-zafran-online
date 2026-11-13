# Project Architecture Rules

- Keep loader completion state at the app root and pass readiness down explicitly so entrance animations cannot run behind the loading screen.
- Keep ingredient imagery as shared public paths used by both product views and the loader, so readiness checks match the media visitors see.
- Use the existing Button component for redesigned controls, preserving specialized animation classes for map and WhatsApp actions.
