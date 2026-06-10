// Lumora UI — public entry point.
// Prefer deep imports (`@lumora/ui/components/button`) in apps that care
// about cold-start; this barrel is fully tree-shakable regardless.

export * from "./lib/cn";
export * from "./lib/motion";

// components
export * from "./components/accordion";
export * from "./components/animated-tabs";
export * from "./components/animated-tooltip";
export * from "./components/announcement";
export * from "./components/aurora-background";
export * from "./components/avatar";
export * from "./components/badge";
export * from "./components/beam-grid";
export * from "./components/breadcrumbs";
export * from "./components/button";
export * from "./components/card";
export * from "./components/carousel";
export * from "./components/dialog";
export * from "./components/dock";
export * from "./components/file-dropzone";
export * from "./components/gradient-text";
export * from "./components/input";
export * from "./components/kbd";
export * from "./components/magnetic-button";
export * from "./components/marquee";
export * from "./components/number-ticker";
export * from "./components/otp-input";
export * from "./components/popover";
export * from "./components/progress";
export * from "./components/rating";
export * from "./components/scroll-progress";
export * from "./components/segmented-control";
export * from "./components/select";
export * from "./components/skeleton";
export * from "./components/slider";
export * from "./components/spotlight";
export * from "./components/spotlight-card";
export * from "./components/stepper";
export * from "./components/switch";
export * from "./components/text-reveal";
export * from "./components/tilt-card";
export * from "./components/timeline";
export * from "./components/toast";
export * from "./components/tooltip";
export * from "./components/typewriter";

// blocks
export * from "./blocks/auth-form";
export * from "./blocks/changelog";
export * from "./blocks/cta";
export * from "./blocks/faq";
export * from "./blocks/features";
export * from "./blocks/footer";
export * from "./blocks/hero";
export * from "./blocks/logo-strip";
export * from "./blocks/navbar";
export * from "./blocks/pricing";
export * from "./blocks/sidebar";
export * from "./blocks/stats";
export * from "./blocks/team";
export * from "./blocks/testimonials";
export * from "./blocks/topbar";

// ai
export * from "./ai/chat-widget";
export * from "./ai/command-menu";
export * from "./ai/selection-toolbar";
