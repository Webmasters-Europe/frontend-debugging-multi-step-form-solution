import React from 'react';

function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
              aria-current={currentStep === step.id ? 'step' : undefined}
            >
              {step.id}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  currentStep > step.id ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicator;
