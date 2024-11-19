import FormSelect from '../components/FormSelect';
import FormCheckboxes from '../components/FormCheckboxes';

function GoalSetting({ formData, handleChange, handleCheckboxChange, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Activity & Energy</h2>
      <p className="mb-6 text-gray-700">
        Tell us a little about your activity level and energy.
      </p>

      <div className="mb-10">
        <FormCheckboxes
          legend="What are your goals?"
          options={[
            {
              id: 'weightLoss',
              name: 'goals',
              label: 'Weight Loss',
              checked: formData.goals.includes('weightLoss'),
            },
            {
              id: 'muscleGain',
              name: 'goals',
              label: 'Muscle Gain',
              checked: formData.goals.includes('muscleGain'),
            },
            {
              id: 'improveHealth',
              name: 'goals',
              label: 'Improve Health',
              checked: formData.goals.includes('improveHealth'),
            },
            {
              id: 'boostEnergy',
              name: 'goals',
              label: 'Boost Energy',
              checked: formData.goals.includes('boostEnergy'),
            },
          ]}
          onChange={(id, isChecked) =>
            handleCheckboxChange('goals', id, isChecked)
          }
          required={true}
          error={errors.goals}
        />
      </div>

      <div className="mb-4">
        <FormSelect
          id="timeCommitment"
          name="timeCommitment"
          options={[
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '45', label: '45 minutes' },
            { value: '60', label: '1 hour' },
          ]}
          onChange={handleChange}
          label="How much time can you commit each day?"
          required={true}
          error={errors.timeCommitment}
        />
      </div>
    </div>
  );
}

export default GoalSetting;
