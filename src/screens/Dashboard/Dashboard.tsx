import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, AnswerSheet, Analytics } from '../../lib/supabase';

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [sheets, setSheets] = useState<AnswerSheet[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [sheetsResult, analyticsResult] = await Promise.all([
        supabase
          .from('answer_sheets')
          .select('*')
          .order('uploaded_at', { ascending: false })
          .limit(10),
        supabase.from('analytics').select('*').eq('user_id', user!.id).maybeSingle(),
      ]);

      if (sheetsResult.data) setSheets(sheetsResult.data);
      if (analyticsResult.data) setAnalytics(analyticsResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img className="w-10 h-10" alt="Logo" src="/div-2.svg" />
              <div className="flex flex-col">
                <div className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl">
                  EduGrade AI
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs">
                  Dashboard
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/upload')}
                className="bg-indigo-500 text-white hover:bg-indigo-600 h-10 px-6 rounded-lg"
              >
                Upload Sheets
              </Button>
              <div className="flex items-center gap-3">
                {profile?.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="h-10 px-4 rounded-lg border-gray-300"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-3xl mb-2">
            Welcome back, {profile?.full_name || 'Educator'}!
          </h1>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base">
            Here's an overview of your grading activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="[font-family:'Inter',Helvetica] font-bold text-2xl text-slate-800 mb-1">
                {analytics?.total_sheets_processed || 0}
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm">
                Total Sheets Graded
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="[font-family:'Inter',Helvetica] font-bold text-2xl text-slate-800 mb-1">
                {analytics?.average_score.toFixed(1) || '0.0'}%
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm">
                Average Score
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="[font-family:'Inter',Helvetica] font-bold text-2xl text-slate-800 mb-1">
                {Math.round((analytics?.total_processing_time || 0) / 60)}m
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm">
                Time Saved
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-xl border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl">
                Recent Answer Sheets
              </h2>
              <Button
                onClick={() => navigate('/upload')}
                className="bg-indigo-500 text-white hover:bg-indigo-600 h-10 px-4 rounded-lg text-sm"
              >
                Upload New
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading your sheets...</p>
              </div>
            ) : sheets.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-lg mb-2">
                  No answer sheets yet
                </h3>
                <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm mb-4">
                  Upload your first answer sheet to get started with AI-powered grading
                </p>
                <Button
                  onClick={() => navigate('/upload')}
                  className="bg-indigo-500 text-white hover:bg-indigo-600 h-10 px-6 rounded-lg"
                >
                  Upload Now
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {sheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/results/${sheet.id}`)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="[font-family:'Inter',Helvetica] font-medium text-slate-800 text-sm mb-1">
                          {sheet.title}
                        </div>
                        <div className="[font-family:'Inter',Helvetica] text-gray-500 text-xs">
                          {new Date(sheet.uploaded_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(sheet.status)} border-0 capitalize`}>
                      {sheet.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
