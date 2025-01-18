const SYSTEM_MESSAGE = `
Your task is to expand user's new year resolution into actionable steps.

Each step only be a sentence long.

For example:
User input:
\`\`\`json
{
  "goals": [
    "I want to go to the gym",
    "I want to train my cat",
    "I want to be better at drawing",
    "I want to lose weight"
  ]
}

\`\`\`

Expanded resolution:
\`\`\`json
{
  "goals": [
    {
      "goal": "I want to go to the gym",
      "steps": [
        {
          "step": "Find a gym that is conveniently located.",
          "isCompleted": false
        },
        {
          "step": "Research different gym membership options.",
          "isCompleted": false
        },
        {
          "step": "Sign up for a gym membership.",
          "isCompleted": false
        },
        {
          "step": "Pack my gym bag the night before.",
          "isCompleted": false
        },
        {
          "step": "Schedule gym time into my calendar.",
          "isCompleted": false
        },
        {
          "step": "Try out a new piece of equipment.",
          "isCompleted": false
        },
        {
          "step": "Ask a gym staff member for workout advice.",
          "isCompleted": false
        },
        {
          "step": "Attend a group fitness class.",
          "isCompleted": false
        },
        {
          "step": "Go to the gym at least twice a week.",
          "isCompleted": false
        },
        {
          "step": "Find a gym buddy for motivation.",
          "isCompleted": false
        }
      ]
    },
    {
      "goal": "I want to train my cat",
      "steps": [
        {
          "step": "Research positive reinforcement training methods for cats.",
          "isCompleted": false
        },
        {
          "step": "Buy some high-value treats your cat loves.",
          "isCompleted": false
        },
        {
          "step": "Start with a simple trick like sitting.",
          "isCompleted": false
        },
        {
          "step": "Practice training for short sessions daily.",
          "isCompleted": false
        },
        {
          "step": "Use a clicker if it helps your cat learn.",
          "isCompleted": false
        },
        {
          "step": "Reward successful attempts with treats and praise.",
          "isCompleted": false
        },
        {
          "step": "Be patient and consistent with your cat.",
          "isCompleted": false
        },
        {
          "step": "Introduce a new trick each week.",
          "isCompleted": false
        },
        {
          "step": "Create a designated training area.",
          "isCompleted": false
        },
        {
          "step": "Celebrate small training victories.",
          "isCompleted": false
        }
      ]
    },
    {
      "goal": "I want to be better at drawing",
      "steps": [
        {
          "step": "Gather basic drawing supplies like pencils and paper.",
          "isCompleted": false
        },
        {
          "step": "Start by practicing basic shapes and lines.",
          "isCompleted": false
        },
        {
          "step": "Find drawing tutorials online or in books.",
          "isCompleted": false
        },
        {
          "step": "Dedicate 15 minutes each day to drawing practice.",
          "isCompleted": false
        },
        {
          "step": "Focus on drawing from real life objects.",
          "isCompleted": false
        },
        {
          "step": "Try sketching different textures and forms.",
          "isCompleted": false
        },
        {
          "step": "Experiment with different drawing techniques.",
          "isCompleted": false
        },
        {
          "step": "Join an online drawing community for feedback.",
          "isCompleted": false
        },
        {
          "step": "Don't be afraid to make mistakes while learning.",
          "isCompleted": false
        },
        {
          "step": "Celebrate your drawing progress, no matter how small.",
          "isCompleted": false
        }
      ]
    },
    {
      "goal": "I want to lose weight",
      "steps": [
        {
          "step": "Consult a doctor or nutritionist for guidance.",
          "isCompleted": false
        },
        {
          "step": "Start tracking your daily calorie intake.",
          "isCompleted": false
        },
        {
          "step": "Increase your intake of fruits and vegetables.",
          "isCompleted": false
        },
        {
          "step": "Reduce your consumption of sugary drinks.",
          "isCompleted": false
        },
        {
          "step": "Aim for at least 30 minutes of exercise most days.",
          "isCompleted": false
        },
        {
          "step": "Prepare more meals at home.",
          "isCompleted": false
        },
        {
          "step": "Find healthy snack alternatives.",
          "isCompleted": false
        },
        {
          "step": "Drink more water throughout the day.",
          "isCompleted": false
        },
        {
          "step": "Weigh yourself weekly to monitor progress.",
          "isCompleted": false
        },
        {
          "step": "Celebrate non-scale victories like increased energy.",
          "isCompleted": false
        }
      ]
    }
  ]
}

\`\`\`
`.trim();

const userPrompt = (goals: string[]) =>
  `
Here is the user's new year resolution:

${goals.map((goal) => `- ${goal}`).join("\n")}

---

Please expand upon it and provide the actionable steps.
Please respond in JSON format.
`.trim();

export const PROMPTS = {
  SYSTEM_MESSAGE,
  userPrompt,
};
