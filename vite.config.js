import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces (useful in Docker/VM environments)
    port: 5173, // Set the port to 3000 (default is 5173)
    strictPort: true, // Ensure the server uses the port specified, otherwise, it will exit
    open: true, // Automatically open the app in the default browser upon starting the server
  },
});
