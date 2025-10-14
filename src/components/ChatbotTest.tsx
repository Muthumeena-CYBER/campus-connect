import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sendChatMessage } from '@/lib/api/enhanced-chat';

const testQueries = [
  "How do I borrow a book?",
  "How do I pre-order food?",
  "How do I submit an assignment?",
  "How do I register for events?",
  "What can students do?",
  "How do I change my theme?",
  "What's the weather today?",
  "Help me with library services"
];

export const ChatbotTest: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<Array<{query: string, response: string, success: boolean}>>([]);

  const handleTest = async (testQuery?: string) => {
    const queryToTest = testQuery || query;
    if (!queryToTest.trim()) return;

    setLoading(true);
    try {
      const result = await sendChatMessage(queryToTest);
      setResponse(result.reply);
      
      if (!testQuery) {
        setTestResults(prev => [...prev, {
          query: queryToTest,
          response: result.reply,
          success: result.success
        }]);
      }
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    for (const testQuery of testQueries) {
      await handleTest(testQuery);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chatbot Test Interface</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a test query..."
              onKeyPress={(e) => e.key === 'Enter' && handleTest()}
            />
            <Button onClick={() => handleTest()} disabled={loading}>
              {loading ? 'Testing...' : 'Test Query'}
            </Button>
          </div>
          
          <Button onClick={runAllTests} variant="outline" className="w-full">
            Run All Test Queries
          </Button>

          {response && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <h4 className="font-semibold mb-2">Response:</h4>
                <div className="whitespace-pre-wrap text-sm">{response}</div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results ({testResults.length} queries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.success ? "Success" : "Failed"}
                      </Badge>
                      <span className="font-medium">Query {index + 1}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <strong>Query:</strong> {result.query}
                      </div>
                      <div>
                        <strong>Response:</strong>
                        <div className="whitespace-pre-wrap text-sm bg-background p-2 rounded mt-1">
                          {result.response}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sample Test Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {testQueries.map((testQuery, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleTest(testQuery)}
                className="justify-start text-left h-auto p-2"
              >
                {testQuery}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotTest;
