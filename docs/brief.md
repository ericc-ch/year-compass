## Year Compass

**Overview:**

A simple web application designed to help users achieve their New Year's resolutions by breaking them down into actionable steps using AI. The app will store all resolution data locally in the user's browser, except for the calls to the Language Model (LLM) API.

**Core Features:**

1. **Resolution Input:**

   - **Simple Text Field:** Users can enter their New Year's resolution in a straightforward text box.
   - **"Generate Steps" Button:** Triggers the AI to process the resolution.

2. **AI-Powered Step Generation:**

   - **Backend AI Processing:** Upon clicking "Generate Steps," the user's resolution is sent to a backend service (we'll assume an existing or quickly deployable AI service for this hackathon).
   - **Actionable Step Output:** The AI returns a list of actionable steps related to the resolution.

3. **Displaying Actionable Steps:**

   - **Ordered List:** The generated steps are displayed in a clear, numbered list below the input, persisting in the browser's local storage.
   - **Checkbox per Step:** Each step has a checkbox allowing the user to mark it as complete. This completion status is also stored locally.

4. **Basic Progress Tracking:**
   - **Visual Progress Bar:** A progress bar at the top of the resolution section visually represents the percentage of completed steps for that specific resolution. Calculation: (Number of completed steps / Total number of steps) \* 100. This is calculated dynamically based on the locally stored step completion status.

**Enhanced Features (Prioritized for Hackathon Feasibility - Local):**

1. **Saving Resolution Locally:**

   - The user's resolution text and the generated steps (including their completion status) are automatically saved to the browser's local storage.
   - Upon revisiting the page, the last entered resolution and its steps will be loaded.

2. **Reminders (Extremely Simplified - Manual):**

   - **No Automated Reminders:** Due to the lack of a backend and user accounts, automated reminders are removed.
   - **Visual "Reminder Note":** A simple text area where the user can optionally write down a manual reminder related to their resolution. This note will also be stored locally.

3. **Motivation and Encouragement:**
   - **Celebrate Milestones (Basic):** When a user completes a significant portion of their steps (e.g., 25%, 50%, 75%, 100%), a simple celebratory message is displayed (e.g., "Great job, you're 25% there!", "Halfway there! Keep going!"). This is triggered client-side based on the local progress.

**User Flows:**

**A. New/Returning User:**

1. **Arrive at the Website:** The user lands on the homepage.
2. **Previous Resolution (If Any):** If a resolution was previously entered and saved in local storage, it is automatically loaded and displayed with its steps and completion status.

**B. Adding a New Resolution:**

1. **User on Planner Page:** The user is on the main page.
2. **Input Resolution:** User types their resolution in the text field.
3. **Generate Steps:** User clicks the "Generate Steps" button.
4. **AI Processing:** The resolution is sent to the backend for AI processing.
5. **Display Steps:** The generated actionable steps are displayed below the input, each with a checkbox.
6. **Local Storage Update:** The new resolution text and generated steps (with initial incomplete status) are saved to the browser's local storage, overwriting any previous resolution.
7. **Progress Bar Update:** A progress bar appears or updates, showing 0% completion initially.

**C. Completing a Step:**

1. **User Checks a Checkbox:** The user clicks the checkbox next to a completed step.
2. **Visual Feedback:** The checkbox is marked as checked.
3. **Local Storage Update:** The completion status of that specific step is updated in the browser's local storage.
4. **Progress Bar Update:** The progress bar updates to reflect the increased completion percentage, calculated based on the locally stored data.

**D. Setting a Manual Reminder Note:**

1. **Find Reminder Note Section:** A text area labeled "Reminder Note" is visible on the page.
2. **Enter Reminder:** The user types their reminder note in the text area.
3. **Local Storage Update:** The content of the reminder note is saved to the browser's local storage. Upon revisiting the page, this note will be displayed.

**E. Experiencing Milestone Celebrations:**

1. **User Completes Steps:** The user checks off steps, increasing their progress.
2. **Milestone Reached:** When the completion percentage reaches 25%, 50%, 75%, or 100%.
3. **Celebratory Message Display:** A brief, encouraging message appears near the progress bar (e.g., a small pop-up or text update), triggered by client-side logic.

**Data Model (Conceptual - Local Storage Keys):**

- `"currentResolution"`: Stores the text of the current resolution (String).
- `"resolutionSteps"`: Stores an array of step objects. Each step object might have:
  - `text`: The step text (String).
  - `isCompleted`: Boolean indicating completion status.
- `"reminderNote"`: Stores the text of the manual reminder note (String).

**UI Considerations (High-Level):**

- **Extremely Simple Design:** Focus on the absolute essentials.
- **Clear Hierarchy:** Make it obvious where to input the resolution and view the steps.
- **Progress Bar Prominence:** Ensure the progress bar is easily visible.
- **Intuitive Controls:** Make checkboxes and the reminder note area clear and straightforward.

**Out of Scope (for this 24-Hour Hackathon - Local Storage):**

- **User Accounts/Sign-in/Sign-up:** All data is local.
- **Server-Side Data Persistence:** No database or backend for storing user data (except for the LLM API call).
- **Automated Reminders (Push Notifications, Email):** Reminders are manual and visual only.
- **Calendar View:** Removed from scope for hackathon.

## Year Compass - Hackathon Scope (Simplified - Local Storage)

