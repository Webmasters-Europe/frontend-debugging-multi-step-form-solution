import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import Preference from '../../src/steps/Preference';
import { validate } from '../../src/utils/validation';

describe('Preference Component', () => {
  afterEach(cleanup);

  const step = 4;
  const defaultFormData = {
    activityPreferences: [],
    diet: '',
  };

  it('renders form fields', () => {
    render(
      <Preference
        formData={defaultFormData}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={{}}
      />
    );

    expect(
      screen.getByRole('group', {
        name: /What type of activities do you prefer\?/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Do you have any dietary preferences\?/i)
    ).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const errors = {
      activityPreferences: 'At least one activity preference is required',
      diet: 'Dietary preference is required',
    };

    render(
      <Preference
        formData={defaultFormData}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    expect(
      screen.getByText(/At least one activity preference is required/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Dietary preference is required/i)
    ).toBeInTheDocument();
  });

  it('handles dropdown updates dynamically', async () => {
    let formData = { ...defaultFormData };
    let errors = validate(formData, step);

    const handleChangeTest = (field, value) => {
      formData = { ...formData, [field]: value };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <Preference
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    const dietSelect = screen.getByLabelText(
      /Do you have any dietary preferences\?/i
    );

    await userEvent.selectOptions(dietSelect, 'vegan');
    rerender(
      <Preference
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    expect(dietSelect).toHaveValue('vegan');
    expect(formData.diet).toBe('vegan');
  });
});
