@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --info: 204 94% 94%;
    --info-foreground: 199 89% 48%;

    --success: 149 80% 90%;
    --success-foreground: 160 84% 39%;

    --warning: 48 96% 89%;
    --warning-foreground: 25 95% 53%;

    --error: 0 93% 94%;
    --error-foreground: 0 84% 60%;

    --ring: 240 5.9% 10%;

    --radius: 0.5rem;
  }

  .dark,
  [data-kb-theme="dark"] {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --info: 204 94% 94%;
    --info-foreground: 199 89% 48%;

    --success: 149 80% 90%;
    --success-foreground: 160 84% 39%;

    --warning: 48 96% 89%;
    --warning-foreground: 25 95% 53%;

    --error: 0 93% 94%;
    --error-foreground: 0 84% 60%;

    --ring: 240 4.9% 83.9%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }
}

@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
}