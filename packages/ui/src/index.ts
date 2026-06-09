// Lumora UI — public entry point.
// Prefer deep imports (`@lumora/ui/components/button`) in apps that care
// about cold-start; this barrel is fully tree-shakable regardless.

export * from "./lib/cn";
export * from "./lib/motion";

// components
export * from "./components/accordion";
export * from "./components/animated-tabs";
export * from "./components/animated-tooltip";
export * from "./components/aurora-background";
export * from "./components/beam-grid";
export * from "./components/button";
export * from "./components/dialog";
export * from "./components/dock";
export * from "./components/gradient-text";
export * from "./components/input";
export * from "./components/magnetic-button";
export * from "./components/marquee";
export * from "./components/number-ticker";
export * from "./components/scroll-progress";
export * from "./components/spotlight";
export * from "./components/spotlight-card";
export * from "./components/switch";
export * from "./components/text-reveal";
export * from "./components/tilt-card";
export * from "./components/typewriter";

// blocks
export * from "./blocks/cta";
export * from "./blocks/faq";
export * from "./blocks/features";
export * from "./blocks/footer";
export * from "./blocks/hero";
export * from "./blocks/navbar";
export * from "./blocks/pricing";
export * from "./blocks/testimonials";

// ai
export * from "./ai/chat-widget";
export * from "./ai/command-menu";
export * from "./ai/selection-toolbar";
