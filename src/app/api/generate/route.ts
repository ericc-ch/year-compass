import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { z } from "zod";
import { PROMPTS } from "./prompts";

export async function POST(request: Request) {
  const res = await request.json();

  const goals = z.array(z.string()).parse(res.goals);

  const client = ModelClient(
    "https://models.inference.ai.azure.com",
    new AzureKeyCredential(process.env.GITHUB_ACCESS_TOKEN!)
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: PROMPTS.SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: PROMPTS.userPrompt(goals),
        },
      ],
      model: "gpt-4o",
      temperature: 0.5,
      max_tokens: 4096,
      top_p: 0.95,
      response_format: {
        type: "json_object",
      },
    },
  });

  if ("error" in response.body)
    throw new Error("Failed to generate resolutions");

  if (!response.body.choices[0].message.content)
    throw new Error("Failed to generate resolutions");

  const data = response.body.choices[0].message.content;

  return Response.json({ data: JSON.parse(data) });
}
