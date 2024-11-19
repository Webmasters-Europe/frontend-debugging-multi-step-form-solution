import FormSelect from '../components/FormSelect';
import FormCheckboxes from '../components/FormCheckboxes';

function Preference({ formData, handleChange, handleCheckboxChange, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Preferences</h2>
      <p className="mb-6 text-gray-700">
        Let us know your preferences to make the experience personal.
      </p>

      <div className="mb-10">
        <FormCheckboxes
          legend="What type of activities do you prefer?"
          options={[
            {
              id: 'yoga',
              name: 'activityPreferences',
              label: 'Yoga',
              checked: formData.activityPreferences.includes('yoga'),
            },
            {
              id: 'cardio',
              name: 'activityPreferences',
              label: 'Cardio',
              checked: formData.activityPreferences.includes('cardio'),
            },
            {
              id: 'strengthTraining',
              name: 'activityPreferences',
              label: 'Strength Training',
              checked:
                formData.activityPreferences.includes('strengthTraining'),
            },
            {
              id: 'meditation',
              name: 'activityPreferences',
              label: 'Mediation',
              checked: formData.activityPreferences.includes('meditation'),
            },
          ]}
          onChange={(id, isChecked) =>
            handleCheckboxChange('activityPreferences', id, isChecked)
          }
          required={true}
          error={errors.activityPreferences}
        />
      </div>

      <div className="mb-4">
        <FormSelect
          id="diet"
          name="diet"
          options={[
            { value: 'none', label: 'None' },
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'pescatarian', label: 'Pescatarian' },
            { value: 'glutenFree', label: 'Gluten-Free' },
          ]}
          onChange={handleChange}
          label="Do you have any dietary preferences?"
          required={true}
          error={errors.diet}
        />
      </div>
    </div>
  );
}

export default Preference;
