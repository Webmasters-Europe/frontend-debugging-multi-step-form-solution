import { useState } from 'react';

import ProgressIndicator from './components/ProgressIndicator';
import NavigationButtons from './components/NavigationButtons';
import AccountInfo from './steps/AccountInfo';
import ActivityInfo from './steps/ActivityInfo';
import GoalSetting from './steps/GoalSetting';
import Preference from './steps/Preference';
import ReadyToStart from './steps/ReadyToStart';

import { validate } from './utils/validation';

function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    activityLevel: 'never',
    energyLevel: 'low',
    goals: [],
    timeCommitment: '15',
    activityPreferences: [],
    diet: 'none',
    motivation: '',
    optionalChallenges: [],
    reminders: 'email',
  });

  const formSteps = [
    { id: 1, name: 'Account Info', component: AccountInfo },
    { id: 2, name: 'Activity Info', component: ActivityInfo },
    { id: 3, name: 'Goal Setting', component: GoalSetting },
    { id: 4, name: 'Personal Preferences', component: Preference },
    { id: 5, name: 'Ready to Start', component: ReadyToStart },
  ];

  // ===== Event Handlers =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (field, id, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: isChecked
        ? [...prev[field], id]
        : prev[field].filter((item) => item !== id),
    }));
  };

  // ===== Form Navigation =====
  const handleNext = () => {
    if (handleValidation()) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStepIndex(stepIndex - 1);
  };

  // ===== Form Validation & Submission =====
  const handleValidation = () => {
    const validationErrors = validate(formData, stepIndex);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      alert('Form submitted successfully!');
      console.log('Submitted Data:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-32 mx-4">
        <div className="overflow-hidden rounded-lg bg-white shadow max-w-[600px] mx-auto">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-center my-6">
              Let's get you started!
            </h1>

            <ProgressIndicator steps={formSteps} currentStep={stepIndex} />

            <form onSubmit={handleSubmit} className="relative mt-10">
              {formSteps.map((s) => {
                const StepComponent = s.component;
                return (
                  <div
                    key={s.id}
                    className={`transition-opacity duration-500 ${
                      stepIndex === s.id
                        ? 'opacity-100'
                        : 'opacity-0 absolute w-full'
                    }`}
                    aria-hidden={stepIndex !== s.id}
                  >
                    {stepIndex === s.id && (
                      <StepComponent
                        formData={formData}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        errors={errors}
                      />
                    )}
                  </div>
                );
              })}

              {/* Navigation Buttons */}
              <NavigationButtons
                currentStep={stepIndex}
                totalSteps={formSteps.length}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
