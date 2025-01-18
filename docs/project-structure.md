## Technical Specifications: Year Compass - Hackathon Build

This document outlines the technical stack and project structure for the Year Compass application, focusing on the implementation details for the 24-hour hackathon.

**1. Technology Stack:**

- **Frontend Framework:** Next.js v15 (Utilizing the App Router)
  - **Reasoning:** Next.js provides a robust framework for building React applications with features like server-side rendering (though primarily client-side for this hackathon scope), routing, and API routes. The App Router offers a modern and organized approach to building Next.js applications.
- **UI Library:** shadcn/ui
  - **Reasoning:** shadcn/ui is a collection of accessible and customizable UI components built with Radix UI and Tailwind CSS. It accelerates development by providing pre-built components that align with modern design practices and are easily adaptable.
- **Styling:** Tailwind CSS (integrated with shadcn/ui)
  - **Reasoning:** Tailwind CSS is a utility-first CSS framework that allows for rapid styling directly within the HTML/JSX. This speeds up the UI development process, which is crucial for a hackathon.
- **Language:** TypeScript
  - **Reasoning:** TypeScript adds static typing to JavaScript, improving code maintainability, readability, and reducing potential runtime errors. This is beneficial even in a short timeframe for better code organization.
- **LLM API Interaction:** **Vercel AI SDK with OpenAI Provider**
  - **Reasoning:** The Vercel AI SDK simplifies interactions with various AI providers, including OpenAI. This allows us to quickly integrate language model capabilities for generating actionable steps based on the user's resolution. We will utilize the OpenAI provider within the SDK.
- **Local Storage:** Native Browser Local Storage API
  - **Reasoning:** As outlined in the brief, all persistent data (resolution text, steps, completion status, reminder note) will be stored in the user's browser's local storage. This is a simple and readily available mechanism for client-side data persistence without requiring a backend database.

**2. Project Structure (Next.js App Router):**

```
year-compass/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components (configured)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   ├── ResolutionInput.tsx
│   │   ├── StepList.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ReminderNote.tsx
│   │   └── MilestoneMessage.tsx
│   ├── api/               # API routes
│   │   └── generate-steps/
│   │       └── route.ts    # Handles the LLM API call using Vercel AI SDK
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main planner page
│   └── global.css          # Global styles (if needed beyond Tailwind)
├── public/               # Static assets (images, etc.)
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

**Explanation of Key Directories and Files:**

- **`app/`:** The core of the Next.js App Router.
  - **`components/`:** Contains reusable UI components specific to the application.
    - **`ui/`:** Holds the configured shadcn/ui components.
    - **`ResolutionInput.tsx`:** Component for the resolution text input and "Generate Steps" button.
    - **`StepList.tsx`:** Component to display the ordered list of actionable steps with checkboxes.
    - **`ProgressBar.tsx`:** Component to render the visual progress bar.
    - **`ReminderNote.tsx`:** Component for the manual reminder note text area.
    - **`MilestoneMessage.tsx`:** Component to display celebratory messages.
  - **`api/generate-steps/route.ts`:** This file will define a Next.js Route Handler to handle the request to generate steps using the Vercel AI SDK and the OpenAI provider. It will receive the user's resolution, call the LLM, and return the generated steps.
  - **`layout.tsx`:** Defines the root layout of the application (e.g., including shared navigation if any).
  - **`page.tsx`:** The main component for the planner page, orchestrating the other components.
  - **`global.css`:** For any global CSS styles that are not handled by Tailwind.
- **`public/`:** Stores static assets like images.
- **`tailwind.config.ts`:** Configuration file for Tailwind CSS, allowing customization of themes, colors, etc.
- **`postcss.config.js`:** Configuration for PostCSS, often used with Tailwind.
- **`tsconfig.json`:** Configuration for the TypeScript compiler.
- **`package.json`:** Lists project dependencies and scripts.

**3. Component Breakdown and Data Flow:**

1. **`page.tsx`:**
   - Manages the overall state of the application, including the current resolution, steps, and reminder note. This state will likely be managed using React's `useState` hook.
   - Responsible for fetching initial data from local storage on page load.
   - Passes down relevant data and handlers to child components.
2. **`ResolutionInput.tsx`:**
   - Contains the text input field for the user's resolution.
   - Handles user input and updates the resolution state in `page.tsx`.
   - When the "Generate Steps" button is clicked, it triggers a function in `page.tsx` to send the resolution to the `/api/generate-steps` route.
3. **`/api/generate-steps/route.ts`:**
   - **Receives the resolution text from the frontend.**
   - **Utilizes the Vercel AI SDK and the OpenAI provider to call the language model.** This will involve creating an OpenAI model instance from the SDK and using a function like `generateText` or `generateObject` to get the steps.
   - **Returns the generated steps to the frontend.**
4. **`StepList.tsx`:**
   - Receives the array of steps from `page.tsx`.
   - Renders an ordered list (`<ol>`) of steps.
   - For each step, renders a `Checkbox` component from shadcn/ui, along with the step text.
   - Handles changes to the checkbox state. When a checkbox is checked/unchecked, it triggers a function in `page.tsx` to update the completion status of that step in the state and local storage.
5. **`ProgressBar.tsx`:**
   - Receives the array of steps from `page.tsx`.
   - Calculates the completion percentage based on the `isCompleted` status of each step.
   - Renders the `Progress` component from shadcn/ui, displaying the calculated percentage.
6. **`ReminderNote.tsx`:**
   - Contains a `textarea` for the user to input their reminder note.
   - Handles user input and updates the reminder note state in `page.tsx`.
   - Saves the reminder note to local storage whenever it changes.
7. **`MilestoneMessage.tsx`:**
   - Receives the completion percentage from `page.tsx`.
   - Checks if a milestone (25%, 50%, 75%, 100%) has been reached.
   - Displays the corresponding celebratory message.

**4. State Management:**

- Primarily using React's `useState` hook within `page.tsx` to manage the application's state (current resolution, steps array, reminder note).
- Data persistence will be handled directly through local storage updates within the state update handlers.

**5. Local Storage Interaction:**

- On initial page load, `page.tsx` will attempt to retrieve data (resolution, steps, reminder note) from local storage using keys defined in the `brief.md` ( `"currentResolution"`, `"resolutionSteps"`, `"reminderNote"`).
- When the resolution is updated, steps are generated, or a step's completion status changes, the corresponding data in local storage will be updated.
- The reminder note will be saved to local storage on each change to the text area.

**6. LLM API Interaction Details (Using Vercel AI SDK):**

- **Frontend to Backend Interaction:**

  - When the user clicks the "Generate Steps" button in `ResolutionInput.tsx`, the component will call a function (passed down from `page.tsx`) to initiate the step generation process.
  - This function in `page.tsx` will make a `POST` request to the Next.js API route `/api/generate-steps`.
  - The request body will contain the user's resolution text.
  - Example using `fetch`:

    ```typescript
    async function generateSteps(resolution: string) {
      const response = await fetch("/api/generate-steps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resolution }),
      });
      const data = await response.json();
      return data.steps; // Assuming the API returns an object with a 'steps' array
    }
    ```

- **Backend ( `/api/generate-steps/route.ts` ) Logic:**

  - The Route Handler will receive the `POST` request.
  - It will extract the `resolution` from the request body.
  - It will initialize the OpenAI provider from the Vercel AI SDK.
  - It will use the `generateText` function (or similar) from the SDK to call the OpenAI API to generate steps based on the resolution.
  - Example using Vercel AI SDK:

    ```typescript
    // In app/api/generate-steps/route.ts
    import { OpenAI } from "@ai-sdk/openai";

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Ensure API key is configured

    export async function POST(request: Request) {
      const { resolution } = await request.json();

      try {
        const response = await openai.generateText({
          model: "gpt-3.5-turbo-instruct", // Or a more suitable model
          prompt: `Break down the following resolution into actionable steps:\n\n${resolution}`,
        });

        const steps = response.text
          .split("\n")
          .filter((step) => step.trim() !== "")
          .map((step) => ({ text: step.replace(/^\d+\.\s*/, "") })); // Basic parsing of the generated text

        return Response.json({ steps });
      } catch (error) {
        console.error("Error generating steps:", error);
        return new Response("Failed to generate steps", { status: 500 });
      }
    }
    ```

- **Data Structure of LLM Generated Objects:**

  - The backend will return a JSON response with the following structure:

    ```json
    {
      "steps": [
        { "text": "Actionable step 1" },
        { "text": "Actionable step 2" },
        { "text": "Actionable step 3" }
        // ... more steps
      ]
    }
    ```

  - Each object in the `steps` array will have a `text` property, which is a string containing the actionable step.

- **Frontend Handling of the Response:**
  - The `generateSteps` function in `page.tsx` (or a similar handler) will receive the JSON response from the backend.
  - It will extract the `steps` array from the response.
  - This array of steps will then be used to update the application's state, causing the `StepList` component to re-render and display the generated steps. Initially, the `isCompleted` status for each step will be `false`.

**7. Deployment (Conceptual for Hackathon):**

- For a quick hackathon deployment, platforms like Vercel or Netlify, which offer seamless integration with Next.js, would be ideal. These platforms can serve the static frontend application and the Next.js API routes. Ensure environment variables (like `OPENAI_API_KEY`) are configured correctly on the deployment platform.

**8. Future Considerations (Beyond Hackathon Scope):**

- Exploring different models and parameters within the Vercel AI SDK for better step generation.
- Allowing users to edit or delete generated steps.
- Persisting data in a backend database for cross-device access.
- More sophisticated error handling and loading states during API calls.
- More advanced features like scheduling, calendar integration, and more personalized motivation messages.

This technical specification provides a detailed blueprint for building the Year Compass application within the constraints of the 24-hour hackathon, leveraging Next.js, shadcn/ui, browser local storage, and the Vercel AI SDK for seamless integration with the OpenAI language model.
