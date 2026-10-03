# Project Architecture Rules

- The loader owns initial readiness and signals the page title animation only after its exit completes, preventing hidden animations behind the overlay.