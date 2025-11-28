'use client';

import { authClient, signOut, useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { provider } from '@/app/const';

export function DashboardClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !session) return;

    authClient
      .getAccessToken({
        providerId: provider,
      })
      .then((res) => {
        setAccessToken(res?.data?.accessToken ?? res?.accessToken ?? null);
      });
  }, [session, isPending]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    router.push('/login');
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-lg border bg-white dark:bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold mb-4">Client-Side Auth Test</h2>
        <div className="space-y-4 font-mono text-sm">
          <div>
            <p className="text-zinc-500 mb-1">useSession():</p>
            <pre className="bg-zinc-100 dark:bg-zinc-800 rounded p-3 overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
          <div>
            <p className="text-zinc-500 mb-1">getAccessToken(google):</p>
            <pre className="bg-zinc-100 dark:bg-zinc-800 rounded p-3 overflow-auto">
              {accessToken ? `${accessToken.substring(0, 30)}...` : 'null'}
            </pre>
          </div>
        </div>
      </div>

      <Button onClick={handleSignOut} variant="destructive">
        Sign Out
      </Button>
    </div>
  );
}
