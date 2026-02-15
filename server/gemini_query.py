from google import genai
import os
from dotenv import load_dotenv #NOT RESOLVED!!!

load_dotenv()


def query_gemini(prompt: str) -> str:
    """
    Query Gemini API with a given input string.
    
    Args:
        prompt: The input string/prompt to send to Gemini.
        
    Returns:
        str: The response text from Gemini API.
    """
    # Configure API key from environment variable
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    
    return response.text


if __name__ == "__main__":
    # Example usage
    test_prompt = "return only a random decimal number and no other text"
    result = query_gemini(test_prompt)
    print(result)
