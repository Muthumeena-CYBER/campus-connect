// Example component showing how to use MongoDB URI in a React component
// This demonstrates the frontend pattern, but in a real application,
// you would make API calls to a backend server instead.

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useMongoDb } from "@/hooks/use-mongodb";

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

interface ConnectionResult {
  status: ConnectionStatus;
  message: string;
  timestamp: Date;
}

export const MongoDBConnectionTest = () => {
  const mongoStatus = useMongoDb();
  const [connectionHistory, setConnectionHistory] = useState<ConnectionResult[]>([]);
  const [currentStatus, setCurrentStatus] = useState<ConnectionStatus>('idle');

  // Simulate a MongoDB connection test
  // In a real application, this would be an API call to your backend
  const testConnection = async () => {
    if (!mongoStatus.isConfigured) {
      const result: ConnectionResult = {
        status: 'error',
        message: 'MongoDB URI not configured',
        timestamp: new Date()
      };
      setConnectionHistory(prev => [result, ...prev.slice(0, 4)]);
      return;
    }

    setCurrentStatus('connecting');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // This is where you would make an actual API call to your backend
      // Example: const response = await fetch('/api/mongodb/test');
      
      // Simulate success for demonstration
      const result: ConnectionResult = {
        status: 'connected',
        message: 'Successfully validated MongoDB URI format',
        timestamp: new Date()
      };

      setCurrentStatus('connected');
      setConnectionHistory(prev => [result, ...prev.slice(0, 4)]);

      // Reset status after 3 seconds
      setTimeout(() => setCurrentStatus('idle'), 3000);
    } catch (error) {
      const result: ConnectionResult = {
        status: 'error',
        message: error instanceof Error ? error.message : 'Connection failed',
        timestamp: new Date()
      };
      
      setCurrentStatus('error');
      setConnectionHistory(prev => [result, ...prev.slice(0, 4)]);
      
      // Reset status after 3 seconds
      setTimeout(() => setCurrentStatus('idle'), 3000);
    }
  };

  const getStatusIcon = (status: ConnectionStatus) => {
    switch (status) {
      case 'connecting':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: ConnectionStatus) => {
    switch (status) {
      case 'connecting':
        return <Badge variant="secondary">Connecting...</Badge>;
      case 'connected':
        return <Badge variant="default">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Idle</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          MongoDB Connection Test
        </CardTitle>
        <CardDescription>
          Test your MongoDB connection configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            {getStatusIcon(currentStatus)}
            <span className="font-medium">Connection Status</span>
          </div>
          {getStatusBadge(currentStatus)}
        </div>

        {/* MongoDB Configuration Info */}
        <div className="space-y-2">
          <h4 className="font-medium">Configuration Status:</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>MongoDB URI:</span>
              <span className={mongoStatus.isConfigured ? "text-green-600" : "text-red-600"}>
                {mongoStatus.isConfigured ? "✓ Configured" : "✗ Not configured"}
              </span>
            </div>
            {mongoStatus.uri && (
              <div className="text-xs text-muted-foreground">
                URI: {mongoStatus.uri.slice(0, 40)}...
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {mongoStatus.error && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{mongoStatus.error}</AlertDescription>
          </Alert>
        )}

        {/* Test Connection Button */}
        <Button 
          onClick={testConnection} 
          disabled={!mongoStatus.isConfigured || currentStatus === 'connecting'}
          className="w-full"
        >
          {currentStatus === 'connecting' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            'Test MongoDB Connection'
          )}
        </Button>

        {/* Connection History */}
        {connectionHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Connection History:</h4>
            <div className="space-y-1">
              {connectionHistory.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between text-sm p-2 border rounded"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span>{result.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {result.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Note */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Important:</strong> This is a demonstration component. In production applications,
            never expose database connection strings to the frontend. Always use a secure backend API
            to handle database connections and operations.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};