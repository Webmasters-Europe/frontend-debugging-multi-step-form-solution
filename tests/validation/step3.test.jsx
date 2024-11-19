import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import GoalSetting from '../../src/steps/GoalSetting';
import { validate } from '../../src/utils/validation';

describe('GoalSetting Component', () => {
  afterEach(cleanup);

  const step = 3;

  it('renders all form fields', () => {
    render(
      <GoalSetting
        formData={{ goals: [], timeCommitment: '' }}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={{}}
      />
    );

    // Use getByRole to target the fieldset for "What are your goals?"
    expect(
      screen.getByRole('group', { name: /What are your goals\?/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/How much time can you commit each day\?/i)
    ).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', () => {
    const formData = {
      goals: [],
      timeCommitment: '',
    };
    const errors = validate(formData, step);

    render(
      <GoalSetting
        formData={formData}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    expect(
      screen.getByText(/At least one goal is required/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Time Commitment is required/i)
    ).toBeInTheDocument();
  });

  it('displays no validation errors for valid data', () => {
    const formData = {
      goals: ['weightLoss', 'muscleGain'],
      timeCommitment: '30',
    };
    const errors = validate(formData, step);

    render(
      <GoalSetting
        formData={formData}
        handleChange={() => {}}
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });

  it('handles checkbox interactions and updates goals dynamically', async () => {
    let formData = { goals: [], timeCommitment: '' };
    let errors = validate(formData, step);

    const handleCheckboxChangeTest = (field, id, isChecked) => {
      const updatedGoals = isChecked
        ? [...formData[field], id]
        : formData[field].filter((goal) => goal !== id);

      formData = { ...formData, [field]: updatedGoals };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <GoalSetting
        formData={formData}
        handleChange={() => {}}
        handleCheckboxChange={handleCheckboxChangeTest}
        errors={errors}
      />
    );

    const weightLossCheckbox = screen.getByLabelText(/Weight Loss/i);
    const muscleGainCheckbox = screen.getByLabelText(/Muscle Gain/i);

    await userEvent.click(weightLossCheckbox);
    rerender(
      <GoalSetting
        formData={formData}
        handleChange={() => {}}
        handleCheckboxChange={handleCheckboxChangeTest}
        errors={errors}
      />
    );

    expect(weightLossCheckbox).toBeChecked();
    expect(
      screen.queryByText(/At least one goal is required/i)
    ).not.toBeInTheDocument();

    await userEvent.click(muscleGainCheckbox);
    rerender(
      <GoalSetting
        formData={formData}
        handleChange={() => {}}
        handleCheckboxChange={handleCheckboxChangeTest}
        errors={errors}
      />
    );

    expect(muscleGainCheckbox).toBeChecked();
    expect(formData.goals).toContain('weightLoss');
    expect(formData.goals).toContain('muscleGain');
  });

  it('handles select interactions and updates time commitment dynamically', async () => {
    let formData = { goals: ['weightLoss'], timeCommitment: '' };
    let errors = validate(formData, step);

    const handleChangeTest = (field, value) => {
      formData = { ...formData, [field]: value };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <GoalSetting
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    const timeCommitmentSelect = screen.getByLabelText(
      /How much time can you commit each day\?/i
    );
    await userEvent.selectOptions(timeCommitmentSelect, '30');

    rerender(
      <GoalSetting
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        handleCheckboxChange={() => {}}
        errors={errors}
      />
    );

    expect(timeCommitmentSelect).toHaveValue('30');
    expect(
      screen.queryByText(/Time Commitment is required/i)
    ).not.toBeInTheDocument();
  });
});
