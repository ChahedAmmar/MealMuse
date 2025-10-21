import dotenv from "dotenv";
dotenv.config();
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page.
`;

export default async function getRecipe(ingredientsArr,props) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("Invalid or empty ingredients array.");
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",  content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! always start with the name of the recipe ${props.vegan ? "Let it be vegan." : ""} ${props.health ? "Let it be healthy." : ""}` },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || `Request failed with status ${res.status}`);
    }

    return data.choices?.[0]?.message?.content || "No recipe received.";
  } catch (err) {
    console.error("Recipe fetch error:", err);
    throw new Error("Failed to fetch recipe.");
  }
}
