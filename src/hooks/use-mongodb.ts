import { useState, useEffect } from 'react';
import { mongoClient, config } from '@/lib/mongodb';

export interface MongoDBStatus {
  isConfigured: boolean;
  uri: string | null;
  error: string | null;
}

/**
 * React hook to access MongoDB configuration
 * Note: This is for development/demo purposes only.
 * In production, never expose database credentials to the frontend.
 */
export const useMongoDb = (): MongoDBStatus => {
  const [status, setStatus] = useState<MongoDBStatus>({
    isConfigured: false,
    uri: null,
    error: null
  });

  useEffect(() => {
    try {
      const uri = mongoClient.getUri();
      const isValid = mongoClient.isValidUri();
      
      if (!uri) {
        setStatus({
          isConfigured: false,
          uri: null,
          error: 'MongoDB URI not configured in environment variables'
        });
        return;
      }

      if (!isValid) {
        setStatus({
          isConfigured: false,
          uri: null,
          error: 'Invalid MongoDB URI format'
        });
        return;
      }

      setStatus({
        isConfigured: true,
        uri: uri,
        error: null
      });
    } catch (error) {
      setStatus({
        isConfigured: false,
        uri: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, []);

  return status;
};

/**
 * Hook to access all environment configuration
 */
export const useEnvironment = () => {
  return {
    mongodb: {
      uri: config.mongodb.uri,
      isConfigured: !!config.mongodb.uri
    },
    clerk: {
      publishableKey: config.clerk.publishableKey
    },
    isDevelopment: import.meta.env.DEV,
    mode: import.meta.env.MODE
  };
};