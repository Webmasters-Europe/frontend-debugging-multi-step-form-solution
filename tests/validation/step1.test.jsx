import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import AccountInfo from '../../src/steps/AccountInfo';
import { validate } from '../../src/utils/validation';

describe('AccountInfo Component', () => {
  afterEach(cleanup);

  const step = 1;

  it('renders all form fields', () => {
    render(
      <AccountInfo
        formData={{ fullName: '', email: '', password: '' }}
        handleChange={() => {}}
        errors={{}}
      />
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('displays validation errors for invalid data', () => {
    const formData = { fullName: '', email: '', password: '' };
    const errors = validate(formData, step);

    render(
      <AccountInfo
        formData={formData}
        handleChange={() => {}}
        errors={errors}
      />
    );

    expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('displays no validation errors for valid data', () => {
    const formData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    };
    const errors = validate(formData, step);

    render(
      <AccountInfo
        formData={formData}
        handleChange={() => {}}
        errors={errors}
      />
    );

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/must be at least 6 characters/i)
    ).not.toBeInTheDocument();
  });

  it('calls handleChange and updates error messages dynamically', async () => {
    let formData = { fullName: '', email: '', password: '' };
    let errors = validate(formData, step);

    const handleChangeTest = (field, value) => {
      formData = { ...formData, [field]: value };
      errors = validate(formData, step);
    };

    const { rerender } = render(
      <AccountInfo
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        errors={errors}
      />
    );

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.type(fullNameInput, 'John');

    rerender(
      <AccountInfo
        formData={formData}
        handleChange={({ target }) =>
          handleChangeTest(target.name, target.value)
        }
        errors={errors}
      />
    );

    expect(
      screen.getByText(/Full Name must contain at least two words/i)
    ).toBeInTheDocument();
  });

  it('retains user input in form fields', () => {
    const formData = {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'securepassword',
    };
    const errors = validate(formData, step);

    render(
      <AccountInfo
        formData={formData}
        handleChange={() => {}}
        errors={errors}
      />
    );

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Jane Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('jane.doe@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('securepassword');
  });
});
