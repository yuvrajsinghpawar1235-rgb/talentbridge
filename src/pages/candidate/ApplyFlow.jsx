import React, { useState } from 'react';
import { applicationService } from '../../services/applicationService';

export const ApplyFlow = ({ jobId, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeId: '',
    expectedSalary: '',
    noticePeriod: 'Immediate'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await applicationService.submitApplication({ jobId, ...formData });
      onComplete();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg border p-6 bg-white shadow-sm">
      <div className="mb-6 flex justify-between border-b pb-3">
        <span className={step === 1 ? 'font-bold text-blue-600' : ''}>1. Profile Review</span>
        <span className={step === 2 ? 'font-bold text-blue-600' : ''}>2. Cover Letter & Details</span>
        <span className={step === 3 ? 'font-bold text-blue-600' : ''}>3. Final Submission</span>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold">Verify Profile Information</h3>
          <p className="text-sm text-gray-600 mt-2">Default resume selected: <strong>Software_Dev_2026.pdf</strong></p>
          <button onClick={handleNext} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cover Letter</label>
            <textarea
              className="w-full border rounded p-2 mt-1"
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            />
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Review Application</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold">Confirm Submission</h3>
          <p className="text-sm mt-2">You are applying for Job ID: #{jobId}</p>
          <div className="mt-6 flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
            <button 
              onClick={handleSubmit} 
              disabled={submitting} 
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};