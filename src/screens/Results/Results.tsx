import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, AnswerSheet, GradingResult } from '../../lib/supabase';

export const Results = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [sheet, setSheet] = useState<AnswerSheet | null>(null);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && user) {
      fetchData();
    }
  }, [id, user]);

  const fetchData = async () => {
    try {
      const [sheetResult, gradingResult] = await Promise.all([
        supabase.from('answer_sheets').select('*').eq('id', id).maybeSingle(),
        supabase.from('grading_results').select('*').eq('sheet_id', id).maybeSingle(),
      ]);

      if (sheetResult.error) throw sheetResult.error;
      if (!sheetResult.data) {
        setError('Answer sheet not found');
        return;
      }

      setSheet(sheetResult.data);
      setResult(gradingResult.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-cyan-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 75) return 'bg-cyan-100';
    if (percentage >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !sheet) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="bg-white rounded-xl border-gray-100 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl mb-2">
              {error || 'Sheet not found'}
            </h2>
            <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm mb-6">
              The answer sheet you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-500 text-white hover:bg-indigo-600 h-10 px-6 rounded-lg"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <img className="w-10 h-10" alt="Logo" src="/div-2.svg" />
              <div className="flex flex-col">
                <div className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl">
                  EduGrade AI
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-gray-500 text-xs">
                  Grading Results
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="h-10 px-4 rounded-lg border-gray-300"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-3xl">
              {sheet.title}
            </h1>
            <Badge
              className={`${
                sheet.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : sheet.status === 'processing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              } border-0 capitalize`}
            >
              {sheet.status}
            </Badge>
          </div>
          <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
            Uploaded on{' '}
            {new Date(sheet.uploaded_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {sheet.status === 'processing' ? (
          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-12 text-center">
              <div className="inline-block w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-2xl mb-2">
                Processing Your Answer Sheet
              </h2>
              <p className="[font-family:'Inter',Helvetica] text-gray-600 text-base mb-8">
                Our AI is analyzing the handwritten text and evaluating the answers. This usually
                takes a few moments.
              </p>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="[font-family:'Inter',Helvetica] text-gray-700 text-sm">
                    Computer vision extracting text
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="[font-family:'Inter',Helvetica] text-gray-700 text-sm">
                    AI evaluating answers
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="[font-family:'Inter',Helvetica] text-gray-700 text-sm">
                    Generating feedback
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white rounded-xl border-gray-100">
                <CardContent className="p-8">
                  <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl mb-6">
                    Grading Summary
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div
                        className={`w-24 h-24 ${getScoreBgColor(
                          result.percentage
                        )} rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <span
                          className={`[font-family:'Inter',Helvetica] font-bold text-3xl ${getScoreColor(
                            result.percentage
                          )}`}
                        >
                          {result.percentage.toFixed(0)}%
                        </span>
                      </div>
                      <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                        Overall Score
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="[font-family:'Inter',Helvetica] font-bold text-3xl text-indigo-600">
                          {result.score}
                        </span>
                      </div>
                      <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                        Points Earned
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="[font-family:'Inter',Helvetica] font-bold text-3xl text-slate-800">
                          {result.total_score}
                        </span>
                      </div>
                      <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                        Total Points
                      </p>
                    </div>
                  </div>

                  {result.feedback && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                      <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        AI Feedback
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] text-gray-700 text-sm leading-relaxed">
                        {result.feedback}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {result.extracted_text && (
                <Card className="bg-white rounded-xl border-gray-100">
                  <CardContent className="p-8">
                    <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl mb-4">
                      Extracted Text
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="[font-family:'Inter',Helvetica] text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {result.extracted_text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="bg-white rounded-xl border-gray-100">
                <CardContent className="p-6">
                  <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-4">
                    Answer Sheet Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="[font-family:'Inter',Helvetica] text-gray-500 text-xs mb-1">
                        File Name
                      </p>
                      <p className="[font-family:'Inter',Helvetica] text-slate-800 text-sm break-all">
                        {sheet.file_name}
                      </p>
                    </div>
                    <div>
                      <p className="[font-family:'Inter',Helvetica] text-gray-500 text-xs mb-1">
                        Status
                      </p>
                      <Badge
                        className={`${
                          sheet.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        } border-0 capitalize`}
                      >
                        {sheet.status}
                      </Badge>
                    </div>
                    {sheet.processed_at && (
                      <div>
                        <p className="[font-family:'Inter',Helvetica] text-gray-500 text-xs mb-1">
                          Processed At
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-slate-800 text-sm">
                          {new Date(sheet.processed_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl border-gray-100">
                <CardContent className="p-6">
                  <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600 h-10 rounded-lg justify-start">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-10 rounded-lg border-gray-300 justify-start"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share Results
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-10 rounded-lg border-gray-300 justify-start"
                      onClick={() => navigate('/upload')}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-12 text-center">
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
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-xl mb-2">
                No Results Yet
              </h2>
              <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                This answer sheet hasn't been graded yet. Please check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};
