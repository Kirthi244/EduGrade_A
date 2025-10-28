import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';

export const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,rgba(99,102,241,0.05)_0%,rgba(139,92,246,0.05)_50%,rgba(6,182,212,0.05)_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img className="w-12 h-12" alt="Logo" src="/div-2.svg" />
            <div className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-2xl">
              EduGrade AI
            </div>
          </div>
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-3xl mb-2">
            Welcome Back
          </h1>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base">
            Sign in to access your grading dashboard
          </p>
        </div>

        <Card className="bg-white rounded-2xl border-gray-100 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? 'Signing in...' : 'Continue with Google'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Secure authentication powered by Supabase
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-indigo-500 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-indigo-500 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <span className="text-indigo-500 font-medium">
              Sign in with Google to get started
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
