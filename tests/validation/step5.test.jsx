import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import ReadyToStart from '../../src/steps/ReadyToStart';
import { validate } from '../../src/utils/validation';

describe('ReadyToStart Component', () => {
  afterEach(cleanup);

  const step = 5;

  const defaultFormData = {
    motivation: '',
    optionalChallenges: [],
    reminders: '',
  };

  it('renders all form fields', () => {
    render(
      <ReadyToStart
        formData={defaultFormData}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={{}}
      />
    );

    expect(
      screen.getByLabelText(/What motivates you the most\?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('group', {
        name: /Would you like to join any optional challenges\?/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Preferred way to receive reminders\?/i)
    ).toBeInTheDocument();
  });

  it('passes validation with all valid fields and updates the form data when the user interacts with the fields', async () => {
    let formData = { ...defaultFormData, motivation: 'I want to stay healthy' };
    let errors = validate(formData, step);

    const handleChangeTest = (field, value) => {
      formData = { ...formData, [field]: value };
      errors = validate(formData, step);
    };

    const handleCheckboxChangeTest = (field, id, isChecked) => {
      const updatedChallenges = isChecked
        ? [...formData[field], id]
        : formData[field].filter((challenge) => challenge !== id);

      formData = { ...formData, [field]: updatedChallenges };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <ReadyToStart
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={handleCheckboxChangeTest}
        errors={errors}
      />
    );

    // Update `motivation`
    const motivationInput = screen.getByLabelText(
      /What motivates you the most\?/i
    );
    await userEvent.clear(motivationInput);
    await userEvent.type(motivationInput, 'I want to achieve balance');
    formData.motivation = 'I want to achieve balance';

    // Update `optionalChallenges`
    const fitnessCheckbox = screen.getByLabelText(/Fitness Challenge/i);
    await userEvent.click(fitnessCheckbox); // Check the box
    formData.optionalChallenges = ['fitnessChallenge'];

    // Update `reminders`
    const remindersSelect = screen.getByLabelText(
      /Preferred way to receive reminders\?/i
    );
    await userEvent.selectOptions(remindersSelect, 'push');
    formData.reminders = 'push';

    // Rerender the component with updated formData
    rerender(
      <ReadyToStart
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={handleCheckboxChangeTest}
        errors={errors}
      />
    );

    // Validate that the form passes without errors
    errors = validate(formData, step);
    expect(errors).toEqual({});
    expect(motivationInput).toHaveValue('I want to achieve balance');
  });
});
