import FormInput from '../components/FormInput';

function AccountInfo({ formData, handleChange, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Welcome to BrightPath Wellness!
      </h2>
      <p className="mb-6 text-gray-700">
        Let’s create your account and begin your wellness journey.
      </p>

      <div className="mb-4">
        <FormInput
          htmlFor="fullName"
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          required={true}
        />
      </div>

      <div className="mb-4">
        <FormInput
          htmlFor="email"
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
          required={true}
        />
      </div>

      <div className="mb-4">
        <FormInput
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          required={true}
        />
      </div>
    </div>
  );
}

export default AccountInfo;
