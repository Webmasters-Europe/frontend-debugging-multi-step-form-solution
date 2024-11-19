import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import ActivityInfo from '../../src/steps/ActivityInfo';
import { validate } from '../../src/utils/validation';

describe('ActivityInfo Component', () => {
  afterEach(cleanup);

  const step = 2;

  it('renders all form fields', () => {
    render(<ActivityInfo handleChange={() => {}} errors={{}} />);

    expect(
      screen.getByLabelText(/How often do you exercise\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /How would you describe your average energy level\?/i
      )
    ).toBeInTheDocument();
  });

  it('displays validation errors for invalid data', () => {
    const formData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      activityLevel: '',
      energyLevel: '',
      goals: [],
      timeCommitment: '15',
    };
    const errors = validate(formData, step);

    render(<ActivityInfo handleChange={() => {}} errors={errors} />);

    expect(screen.getByText(/Activity Level is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy Level is required/i)).toBeInTheDocument();
  });

  it('displays no validation errors for valid data', () => {
    const formData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      activityLevel: 'moderate',
      energyLevel: 'high',
      goals: [],
      timeCommitment: '15',
    };
    const errors = validate(formData, step);

    render(<ActivityInfo handleChange={() => {}} errors={errors} />);

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });

  it('calls handleChange and updates error messages dynamically', async () => {
    let formData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      activityLevel: '',
      energyLevel: '',
      goals: [],
      timeCommitment: '15',
    };
    let errors = validate(formData, step);

    const handleChangeTest = (field, value) => {
      formData = { ...formData, [field]: value };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <ActivityInfo
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        errors={errors}
      />
    );

    const activitySelect = screen.getByLabelText(
      /How often do you exercise\?/i
    );
    const energySelect = screen.getByLabelText(
      /How would you describe your average energy level\?/i
    );

    await userEvent.selectOptions(activitySelect, '3+ times a week');
    await userEvent.selectOptions(energySelect, 'medium');

    rerender(
      <ActivityInfo
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        errors={errors}
      />
    );

    expect(
      screen.queryByText(/Activity Level is required/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Energy Level is required/i)
    ).not.toBeInTheDocument();
  });
});
