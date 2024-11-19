import FormSelect from '../components/FormSelect';

function ActivityInfo({ handleChange, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Activity & Energy</h2>
      <p className="mb-6 text-gray-700">
        Tell us a little about your activity level and energy.
      </p>

      <div className="mb-4">
        <FormSelect
          id="activityLevel"
          name="activityLevel"
          options={[
            { value: 'never', label: 'Never' },
            { value: 'rarely', label: 'Rarely' },
            { value: '1-2 times a week', label: '1-2 times a week' },
            { value: '3+ times a week', label: '3+ times a week' },
          ]}
          onChange={handleChange}
          label="How often do you exercise?"
          required={true}
          error={errors.activityLevel}
        />
      </div>

      <div className="mb-4">
        <FormSelect
          id="energyLevel"
          name="energyLevel"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          onChange={handleChange}
          label="How would you describe your average energy level?"
          required={true}
          error={errors.energyLevel}
        />
      </div>
    </div>
  );
}

export default ActivityInfo;
