// MongoDB connection utility for frontend applications
// Note: This is for educational purposes. In production, you should never
// expose database connection strings to the frontend. Use a backend API instead.

// Access environment variables in Vite (must be prefixed with VITE_)
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;

// MongoDB connection class for frontend usage
export class MongoDBClient {
  private uri: string;

  constructor() {
    this.uri = MONGODB_URI;
    
    if (!this.uri) {
      console.error("VITE_MONGODB_URI is not defined in the environment variables.");
      throw new Error("MongoDB URI is not configured");
    }
  }

  // Get the MongoDB URI
  getUri(): string {
    return this.uri;
  }

  // Validate connection string format
  isValidUri(): boolean {
    try {
      return this.uri.startsWith('mongodb://') || this.uri.startsWith('mongodb+srv://');
    } catch {
      return false;
    }
  }

  // Log connection status (for development)
  logConnectionInfo(): void {
    console.log("MongoDB Connection Info:", {
      hasUri: !!this.uri,
      isValid: this.isValidUri(),
      uriPreview: this.uri ? `${this.uri.slice(0, 20)}...` : 'Not set'
    });
  }
}

// Create a singleton instance
export const mongoClient = new MongoDBClient();

// Environment configuration
export const config = {
  mongodb: {
    uri: MONGODB_URI,
  },
  // Add other environment variables here
  clerk: {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_c2F2ZWQtbW9sbHktMTQuY2xlcmsuYWNjb3VudHMuZGV2JA",
  }
};

// Utility function to check if all required environment variables are loaded
export const validateEnvironment = (): void => {
  const requiredVars = ['VITE_MONGODB_URI'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  console.log('✅ All required environment variables are loaded');
};