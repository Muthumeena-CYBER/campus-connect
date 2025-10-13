import { SignUp } from '@clerk/clerk-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function SignUpPage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'cyber' ? 'gradient-cyber bg-clip-text text-transparent' : ''}`}>
            Join CampusHub
          </h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-elegant"
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}
