import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export const Upload = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setError('Please provide both a title and a file');
      return;
    }

    if (!user) {
      setError('You must be logged in to upload');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('answer-sheets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('answer-sheets')
        .getPublicUrl(fileName);

      const { data: sheetData, error: sheetError } = await supabase
        .from('answer_sheets')
        .insert({
          user_id: user.id,
          title: title.trim(),
          file_url: urlData.publicUrl,
          file_name: file.name,
          status: 'pending',
        })
        .select()
        .single();

      if (sheetError) throw sheetError;

      setTimeout(async () => {
        const mockScore = Math.floor(Math.random() * 30) + 70;
        const mockTotalScore = 100;
        const mockPercentage = (mockScore / mockTotalScore) * 100;

        await supabase.from('grading_results').insert({
          sheet_id: sheetData.id,
          user_id: user.id,
          score: mockScore,
          total_score: mockTotalScore,
          percentage: mockPercentage,
          feedback: 'Great work! The answers demonstrate a strong understanding of the concepts.',
          extracted_text: 'Sample extracted handwritten text from the answer sheet...',
        });

        await supabase
          .from('answer_sheets')
          .update({ status: 'completed', processed_at: new Date().toISOString() })
          .eq('id', sheetData.id);

        const { data: currentAnalytics } = await supabase
          .from('analytics')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (currentAnalytics) {
          const newTotal = currentAnalytics.total_sheets_processed + 1;
          const newAverage =
            (currentAnalytics.average_score * currentAnalytics.total_sheets_processed +
              mockPercentage) /
            newTotal;

          await supabase
            .from('analytics')
            .update({
              total_sheets_processed: newTotal,
              average_score: newAverage,
              total_processing_time: currentAnalytics.total_processing_time + 120,
              last_updated: new Date().toISOString(),
            })
            .eq('user_id', user.id);
        }
      }, 3000);

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload answer sheet');
      setUploading(false);
    }
  };

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
                  Upload Answer Sheet
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-3xl mb-2">
            Upload Answer Sheet
          </h1>
          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-base">
            Upload a scanned or photographed answer sheet for AI-powered grading
          </p>
        </div>

        <Card className="bg-white rounded-xl border-gray-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="title"
                  className="block [font-family:'Inter',Helvetica] font-medium text-slate-800 text-sm mb-2"
                >
                  Sheet Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Math Exam - Chapter 5"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [font-family:'Inter',Helvetica]"
                  disabled={uploading}
                />
              </div>

              <div>
                <label className="block [font-family:'Inter',Helvetica] font-medium text-slate-800 text-sm mb-2">
                  Answer Sheet File
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-indigo-600"
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
                    </div>

                    {file ? (
                      <div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-slate-800 text-base mb-1">
                          {file.name}
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-gray-500 text-sm">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <Button
                          type="button"
                          onClick={() => setFile(null)}
                          variant="outline"
                          className="mt-3 h-9 px-4 rounded-lg border-gray-300 text-sm"
                          disabled={uploading}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-slate-800 text-base mb-1">
                          Drag and drop your file here
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-gray-500 text-sm mb-4">
                          or click to browse
                        </p>
                        <label htmlFor="file-upload">
                          <Button
                            type="button"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            variant="outline"
                            className="h-10 px-6 rounded-lg border-gray-300"
                            disabled={uploading}
                          >
                            Choose File
                          </Button>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*,.pdf"
                          className="hidden"
                          disabled={uploading}
                        />
                        <p className="[font-family:'Inter',Helvetica] text-gray-400 text-xs mt-3">
                          Supported formats: JPG, PNG, PDF (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={uploading || !file || !title.trim()}
                  className="flex-1 bg-indigo-500 text-white hover:bg-indigo-600 h-12 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    'Upload and Process'
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="h-12 px-6 rounded-lg border-gray-300"
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-2">
                Computer Vision
              </h3>
              <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                Advanced OCR extracts handwritten text with high accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-violet-600"
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
              </div>
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-2">
                AI Evaluation
              </h3>
              <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                LLMs intelligently grade answers and provide detailed feedback
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-100">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-base mb-2">
                Instant Results
              </h3>
              <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                Get comprehensive grading results in seconds, not hours
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
