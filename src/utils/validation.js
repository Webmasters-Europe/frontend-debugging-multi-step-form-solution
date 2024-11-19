const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;

// Helper Functions
export const isEmpty = (value) => {
  return !value || !value.trim();
};

export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const hasMinLength = (value, min) => {
  return value.length >= min;
};

export const hasTwoWords = (fullName) => {
  return fullName.trim().split(' ').length >= 2;
};

// Main Validation Function
export const validate = (formData, currentStep) => {
  const errors = {};

  const {
    fullName,
    email,
    password,
    activityLevel,
    energyLevel,
    goals,
    timeCommitment,
    activityPreferences,
    diet,
    motivation,
    optionalChallenges,
    reminders,
  } = formData;

  switch (currentStep) {
    case 1:
      // Full Name Validations
      if (isEmpty(fullName)) {
        errors.fullName = 'Full Name is required';
      } else if (!hasTwoWords(fullName)) {
        errors.fullName = 'Full Name must contain at least two words';
      }

      // Email Validations
      if (isEmpty(email)) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(email)) {
        errors.email = 'Email address is invalid';
      }

      // Password Validations
      if (isEmpty(password)) {
        errors.password = 'Password is required';
      } else {
        if (!hasMinLength(password, PASSWORD_MIN_LENGTH)) {
          errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
        }
      }
      break;

    case 2:
      // Activity Level Validation
      if (isEmpty(activityLevel)) {
        errors.activityLevel = 'Activity Level is required';
      }

      // Energy Level Validation
      if (isEmpty(energyLevel)) {
        errors.energyLevel = 'Energy Level is required';
      }
      break;

    case 3:
      // Goals Validation
      if (!Array.isArray(goals) || goals.length === 0) {
        errors.goals = 'At least one goal is required';
      } else {
        goals.forEach((goal, index) => {
          if (isEmpty(goal)) {
            errors[`goals.${index}`] = 'Goal cannot be empty';
          }
        });
      }

      // Time Commitment Validation
      if (isEmpty(timeCommitment)) {
        errors.timeCommitment = 'Time Commitment is required';
      }
      break;

    case 4:
      // Personal Preferences Validation

      // Validate activityPreferences
      if (
        !Array.isArray(activityPreferences) ||
        activityPreferences.length === 0
      ) {
        errors.activityPreferences =
          'At least one activity preference is required';
      } else {
        const allowedActivities = [
          'yoga',
          'cardio',
          'strengthTraining',
          'meditation',
        ];

        activityPreferences.forEach((preference, index) => {
          if (isEmpty(preference)) {
            errors[`activityPreferences.${index}`] =
              'Preference cannot be empty';
          } else if (!allowedActivities.includes(preference)) {
            errors.activityPreferences = `Invalid activity preference selected: ${preference}`;
          }
        });
      }

      // Validate diet
      if (isEmpty(diet)) {
        errors.diet = 'Dietary preference is required';
      } else {
        const allowedDiets = [
          'none',
          'vegetarian',
          'vegan',
          'pescatarian',
          'glutenFree',
        ];
        if (!allowedDiets.includes(diet)) {
          errors.diet = 'Invalid dietary preference selected';
        }
      }
      break;

    case 5:
      // Ready to Start Validation

      // Validate motivation
      if (isEmpty(motivation)) {
        errors.motivation = 'Motivation is required';
      }

      // Validate optionalChallenges
      if (
        !Array.isArray(optionalChallenges) ||
        optionalChallenges.length === 0
      ) {
        errors.optionalChallenges =
          'At least one optional challenge must be selected';
      } else {
        const allowedChallenges = [
          'fitnessChallenge',
          'healthyEatingChallenge',
          'mindfulnessChallenge',
        ];

        optionalChallenges.forEach((challenge, index) => {
          if (isEmpty(challenge)) {
            errors[`optionalChallenges.${index}`] =
              'Optional challenge cannot be empty';
          } else if (!allowedChallenges.includes(challenge)) {
            errors.optionalChallenges = `Invalid optional challenge selected: ${challenge}`;
          }
        });
      }

      // Validate reminders
      if (isEmpty(reminders)) {
        errors.reminders = 'Preferred reminder method is required';
      } else {
        const allowedReminders = ['email', 'push', 'none'];
        if (!allowedReminders.includes(reminders)) {
          errors.reminders = 'Invalid reminder method selected';
        }
      }
      break;

    default:
      break;
  }

  return errors;
};
