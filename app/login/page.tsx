'use client';

import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { provider } from '@/app/const';

export default function LoginPage() {
  const handleGitHubSignIn = async () => {
    try {
      await signIn.social({
        provider: provider,
        callbackURL: '/dashboard',
      });
    } catch (error) {
      toast.error('Failed to sign in with GitHub');
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGitHubSignIn}
            className="w-full"
            variant="outline"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
