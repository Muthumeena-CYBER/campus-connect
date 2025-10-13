import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { useEnvironment, useMongoDb } from "@/hooks/use-mongodb";

export const EnvironmentStatus = () => {
  const env = useEnvironment();
  const mongoStatus = useMongoDb();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Environment Configuration
          </CardTitle>
          <CardDescription>
            Current environment variables and configuration status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Environment Mode */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Environment Mode:</span>
            <Badge variant={env.isDevelopment ? "secondary" : "default"}>
              {env.mode}
            </Badge>
          </div>

          {/* MongoDB Configuration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">MongoDB Connection:</span>
              <div className="flex items-center gap-2">
                {mongoStatus.isConfigured ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <Badge variant="default">Configured</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <Badge variant="destructive">Not Configured</Badge>
                  </>
                )}
              </div>
            </div>
            
            {mongoStatus.error && (
              <Alert>
                <XCircle className="h-4 w-4" />
                <AlertDescription>{mongoStatus.error}</AlertDescription>
              </Alert>
            )}
            
            {mongoStatus.uri && (
              <div className="text-sm text-muted-foreground">
                URI Preview: {mongoStatus.uri.slice(0, 30)}...
              </div>
            )}
          </div>

          {/* Clerk Configuration */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Clerk Authentication:</span>
            <div className="flex items-center gap-2">
              {env.clerk.publishableKey ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <Badge variant="default">Configured</Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-600" />
                  <Badge variant="destructive">Not Configured</Badge>
                </>
              )}
            </div>
          </div>

          {env.isDevelopment && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Development mode: Environment status is visible. This will be hidden in production.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};