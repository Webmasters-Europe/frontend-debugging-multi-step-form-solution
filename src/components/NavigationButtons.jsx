import React from 'react';

function NavigationButtons({
  currentStep,
  totalSteps,
  handlePrev,
  handleNext,
  handleSubmit,
}) {
  return (
    <div className="flex justify-between mt-10">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="px-8 py-2.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Previous
        </button>
      )}
      {currentStep < totalSteps && (
        <button
          type="button"
          onClick={handleNext}
          className="ml-auto px-11 py-2.5 bg-teal-600 text-sm font-semibold text-white shadow-sm rounded-md hover:bg-teal-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Next
        </button>
      )}
      {currentStep === totalSteps && (
        <button
          type="submit"
          onClick={handleSubmit}
          className="ml-auto px-10 py-2.5 bg-teal-600 text-sm font-semibold text-white shadow-sm rounded-md hover:bg-teal-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
