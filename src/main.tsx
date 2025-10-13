import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load and validate environment variables
import { validateEnvironment, mongoClient } from "./lib/mongodb";

// Validate environment variables on startup
try {
  validateEnvironment();
  
  // Log MongoDB connection info (development only)
  if (import.meta.env.DEV) {
    mongoClient.logConnectionInfo();
  }
} catch (error) {
  console.error("Environment validation failed:", error);
}

createRoot(document.getElementById("root")!).render(<App />);
