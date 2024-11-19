import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormCheckboxes from '../components/FormCheckboxes';

function ReadyToStart({
  formData,
  handleChange,
  handleCheckboxChange,
  errors,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ready to Start</h2>
      <p className="mb-6 text-gray-700">
        We are ready to guide you! Set your preferences and begin your journey.
      </p>

      <div className="mb-4">
        <FormInput
          htmlFor="motivation"
          label="What motivates you the most?"
          type="text"
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          error={errors.motivation}
          placeholder="e.g. I want to feel more energized"
          required={true}
        />
      </div>

      <div className="mb-10">
        <FormCheckboxes
          legend="Would you like to join any optional challenges?"
          options={[
            {
              id: 'fitnessChallenge',
              name: 'optionalChallenges',
              label: 'Fitness Challenge',
              checked: formData.optionalChallenges.includes('fitnessChallenge'),
            },
            {
              id: 'healthyEatingChallenge',
              name: 'optionalChallenges',
              label: 'Healthy Eating Challenge',
              checked: formData.optionalChallenges.includes(
                'healthyEatingChallenge'
              ),
            },
            {
              id: 'mindfulnessChallenge',
              name: 'optionalChallenges',
              label: 'Mindfulness Challenge',
              checked: formData.optionalChallenges.includes(
                'mindfulnessChallenge'
              ),
            },
          ]}
          onChange={(id, isChecked) =>
            handleCheckboxChange('optionalChallenges', id, isChecked)
          }
          required={true}
          error={errors.optionalChallenges}
        />
      </div>

      <div className="mb-4">
        <FormSelect
          id="reminders"
          name="reminders"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'push', label: 'Push Notification' },
            { value: 'none', label: 'None' },
          ]}
          onChange={handleChange}
          label="Preferred way to receive reminders?"
          required={true}
          error={errors.reminders}
        />
      </div>
    </div>
  );
}

export default ReadyToStart;
