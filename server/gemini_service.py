"""
Author: Talha Agro
This will be the connection to Gemini (Python version)
"""

import os
import json
import base64
from typing import Optional, List, Dict, Any

import google.generativeai as genai


# Helper to convert file path to Gemini inline data
def file_to_part(file_path: str) -> Dict[str, Any]:
    with open(file_path, "rb") as f:
        file_bytes = f.read()

    base64_data = base64.b64encode(file_bytes).decode("utf-8")

    return {
        "inline_data": {
            "data": base64_data,
            "mime_type": "audio/mp3"  # adjust if needed
        }
    }


def analyze_music(
    file_path: Optional[str],
    moods: List[str],
    genres: List[str],
    custom_mood: str,
    link: str
) -> Dict[str, Any]:

    try:
        # Initialize Gemini Client
        genai.configure(api_key=os.getenv("API_KEY"))
        model = genai.GenerativeModel("gemini-2.5-flash")

        # Define JSON schema
        song_schema = {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "artist": {"type": "string"},
                "year": {"type": "string"},
                "link": {
                    "type": "string",
                    "description": "A YouTube or Spotify URL for this specific song"
                },
                "reason": {
                    "type": "string",
                    "description": "A short sentence explaining why you recommended this."
                }
            },
            "required": ["title", "artist", "year", "reason"]
        }

        response_schema = {
            "type": "object",
            "properties": {
                "recognized": {
                    "type": ["object", "null"],
                    "properties": {
                        "title": {"type": "string"},
                        "artist": {"type": "string"},
                        "year": {"type": "string"},
                        "link": {"type": "string"},
                    },
                    "description": (
                        "If an audio file was uploaded, this contains the identified song details. "
                        "If no file or not recognized, this is null."
                    )
                },
                "recommendations": {
                    "type": "array",
                    "items": song_schema,
                    "description": "A list of exactly 3 to 5 recommended songs."
                },
                "message": {
                    "type": "string",
                    "description": "A friendly, 1-sentence summary of the vibe of these songs."
                }
            },
            "required": ["recommendations", "message"]
        }

        # Build prompt
        parts = []
        prompt_text = "You are a sophisticated musicologist. "

        if file_path:
            media_part = file_to_part(file_path)
            parts.append(media_part)
            prompt_text += (
                "First, analyze the audio file provided. "
                "Identify the song title, artist, and year. "
                "Fill the 'recognized' field with this data. "
            )
        else:
            prompt_text += (
                "No audio file provided for recognition. "
                "The 'recognized' field must be null. "
            )

        prompt_text += "Next, recommend 3 to 5 songs based on the following constraints:\n"

        all_moods = moods.copy()
        if custom_mood:
            all_moods.append(custom_mood)

        if all_moods:
            prompt_text += f"- Moods: {', '.join(all_moods)}\n"

        if genres:
            prompt_text += f"- Genres: {', '.join(genres)}\n"

        if link:
            prompt_text += f"- Musical Style Reference: {link}\n"

        if file_path:
            prompt_text += (
                "- Also consider the style/genre of the recognized audio file "
                "for the recommendations.\n"
            )

        prompt_text += "Ensure the recommendations are real, existing songs. Return ONLY JSON."

        parts.append({"text": prompt_text})

        # Call Gemini
        response = model.generate_content(
            contents=parts,
            generation_config={
                "temperature": 0.5,
                "response_mime_type": "application/json",
                "response_schema": response_schema,
            },
        )

        if response.text:
            return json.loads(response.text)

        raise Exception("Empty response from AI model")

    except Exception as error:
        print("Gemini Analysis Failed:", error)
        raise
