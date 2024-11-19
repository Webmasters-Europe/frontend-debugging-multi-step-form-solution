# Assignment: Completing the Multi-Step Wizard Form

In this assignment, you will complete a multi-step wizard form by adding two final steps, Step 4 (Personal Preferences) and Step 5 (Ready to Start), bringing the total number of steps to five. Your tasks include:

- Fixing any failing components so that all existing tests pass.
- Adding two new steps with validation logic.
- Writing tests to ensure the new steps are functional and robust.

Below are detailed requirements for the two new steps and their associated tests.

## Adding Step 4 and Step 5 to the Multi-Step Wizard Form

This section outlines the requirements for implementing Step 4: Personal Preferences and Step 5: Ready to Start. Your implementation should maintain consistency with the existing form design and functionality while ensuring robust validation and comprehensive test coverage.

### Step 4: Personal Preferences

This step gathers information about the user’s preferred activities and dietary preferences.

#### Inputs

- **Checkboxes**: Allow users to select one or more activities. Options include:
  - Yoga
  - Cardio
  - Strength Training
  - Meditation
- **Dropdown (Select)**: Allow users to specify their dietary preferences. Options include:
  - None
  - Vegetarian
  - Vegan
  - Gluten-Free

Display the following text in this step: “Let us know your preferences to make the experience personal.”

#### What to Test

1. Rendering of Form Fields:

- **Activity Checkboxes**:
  - Verify that checkboxes for activities are rendered and grouped under the label “What type of activities do you prefer?”
  - Ensure that all activity options (Yoga, Cardio, Strength Training, Meditation) are present and selectable.
- **Dietary Preferences Dropdown**:
  - Confirm that the dropdown for dietary preferences is rendered with the label “Do you have any dietary preferences?”
  - Ensure that all dietary options (None, Vegetarian, Vegan, Gluten-Free) are available for selection.

2. Validation of User Input:

- **Activity Preferences Validation**:
  - Attempt to proceed without selecting any activities and verify that an error message appears stating “At least one activity preference is required.”
  - Select one or more activities and ensure that the error message disappears upon valid input.
- **Dietary Preferences Validation**:
  - Attempt to proceed without selecting a dietary preference and verify that an error message appears stating “Dietary preference is required.”
  - Select a dietary preference and ensure that the error message disappears upon valid input.

3. Dynamic Updates to Form Data:

- **Activity Checkboxes Interaction**:
  - Select and deselect activity checkboxes and confirm that the activityPreferences array in the form data updates accordingly.
- **Dietary Preferences Dropdown Interaction**:
  - Change the selection in the dietary preferences dropdown and verify that the diet field in the form data updates to reflect the current selection.

#### Test Summary for Step 4: Personal Preferences

- **Test Case 1**: Verifies that all form fields (activity checkboxes and dietary preferences dropdown) are rendered correctly with the appropriate labels and options.
- **Test Case 2**: Ensures validation errors appear when no activities or dietary preferences are selected and disappear when valid inputs are provided.
- **Test Case 3**: Confirms that interacting with the form elements (selecting activities and dietary preferences) dynamically updates the form data.

### Step 5: Ready to Start

This step collects motivational information, enables users to join optional challenges, and allows them to choose their preferred reminder method.

#### Inputs

- **Short Text Input**: A field for users to describe what motivates them the most. Placeholder: “What motivates you the most?”
- **Checkboxes**: Options to join one or more optional challenges, including:
  - Fitness Challenge
  - Healthy Eating Challenge
  - Mindfulness Challenge
- **Dropdown (Select)**: A field to specify how users want to receive reminders. Options include:
  - Email
  - Push Notifications
  - None

Display the following text in this step: “We are ready to guide you! Set your preferences and begin your journey.”

#### What to Test

1. Rendering of Form Fields:

- **Motivational Input Field**:
  - Verify that the motivational input field is rendered with the label “What motivates you the most?” and the placeholder text is correctly displayed.
- **Optional Challenges Checkboxes**:
  - Confirm that checkboxes for optional challenges are rendered and grouped under the label “Would you like to join any optional challenges?”
  - Ensure that all challenge options (Fitness Challenge, Healthy Eating Challenge, Mindfulness Challenge) are present and selectable.
- **Reminders Dropdown**:
  - Check that the dropdown for reminder preferences is rendered with the label “Preferred way to receive reminders?”
  - Ensure that all reminder options (Email, Push Notifications, None) are available for selection.

2. Validation and Dynamic Updates of User Input:

- **Form Validation**:
  - Enter valid inputs for all fields:
    - Type a non-empty string into the motivation field.
    - Optionally select one or more challenges (since they are optional, the form should accept both selecting and not selecting any challenges).
    - Select a valid option from the reminders dropdown.
    - Ensure that the form passes validation without any errors when all inputs are valid.
- **Dynamic Updates to Form Data**:
  - Confirm that typing into the motivation field updates the motivation field in the form data.
  - Verify that selecting or deselecting challenges updates the optionalChallenges array in the form data.
  - Ensure that changing the selection in the reminders dropdown updates the reminders field in the form data.

#### Test Summary for Step 5: Ready to Start

- **Test Case 1**: Verifies that all form fields (motivation input, optional challenges checkboxes, and reminders dropdown) are rendered correctly with the appropriate labels and options.
- **Test Case 2**: Ensures the form passes validation with valid inputs and confirms that user interactions (typing in the motivation field, selecting/deselecting challenges, choosing a reminder option) dynamically update the form data accurately.

## License and Usage Terms

© Webmaster Europe e.V. All rights reserved.

This material is provided exclusively for participants in courses offered by Webmaster Europe e.V. By accessing or using this code, you acknowledge that it is intended solely for educational use within the context of Webmaster Europe e.V. programs. Redistribution, sharing, or copying of this material outside of the enrolled course environment is strictly prohibited. The content is designed to support your learning objectives as a student of Webmaster Europe e.V. and is not authorized for use in any commercial projects, public repositories, or applications beyond course purposes.

As a participant, you agreed to these terms as part of the enrollment agreement with Webmaster Europe e.V., which includes additional information on acceptable use, restrictions, and guidelines. Please refer to that document for further details.

The author and Webmaster Europe e.V. retain all rights to this material, including the codebase and instructional content. Unauthorized commercial use or open-source distribution of this material is strictly prohibited and may result in removal from the program and potential legal action.

For questions regarding these terms, please contact Webmaster Europe e.V. for clarification.
