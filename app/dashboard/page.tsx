import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  // Get session using auth.api.getSession() in server component
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Get GitHub access token and idToken
  let githubToken = null;
  try {
    const tokenResponse = await auth.api.getAccessToken({
      body: {
        providerId: "github",
      },
      headers: await headers(),
    });
    githubToken = tokenResponse;
  } catch (error) {
    console.error("Failed to get GitHub token:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-6">
          {/* Session Information */}
          <div className="rounded-lg border bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold mb-4">Session Information</h2>
            <div className="space-y-2">
              <p><strong>User ID:</strong> {session.user.id}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Name:</strong> {session.user.name}</p>
              {session.user.image && (
                <div>
                  <strong>Avatar:</strong>
                  <img
                    src={session.user.image}
                    alt="User avatar"
                    className="mt-2 h-16 w-16 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* GitHub Token Information */}
          {githubToken && (
            <div className="rounded-lg border bg-white dark:bg-zinc-900 p-6">
              <h2 className="text-xl font-semibold mb-4">GitHub Token Information</h2>
              <div className="space-y-2 font-mono text-sm">
                <p><strong>Access Token:</strong> {githubToken.accessToken?.substring(0, 20)}...</p>
                {githubToken.idToken && (
                  <p><strong>ID Token:</strong> {githubToken.idToken.substring(0, 20)}...</p>
                )}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 font-sans">
                  Note: Tokens are truncated for security. Access token can be used to call GitHub API.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Client-side component for sign out */}
        <DashboardClient />
      </div>
    </div>
  );
}
