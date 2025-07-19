// OpenAI service for dream interpretation

export interface DreamAnalysis {
  interpretation: string;
  symbols: string[];
  mood: string;
}

// Direct fetch to Supabase function
export const interpretDreamWithOpenAI = async (dreamText: string): Promise<DreamAnalysis> => {
  try {
    // Use the correct function endpoint URL from Supabase
    const functionUrl = 'https://ycbpwgqlhilpqyvjxiaw.supabase.co/functions/v1/59600a81-2d3f-4ab8-9fab-857493b4b6ac';
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dreamText })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      console.error('Function Error:', result.error);
      throw new Error(result.error);
    }

    return {
      interpretation: result.interpretation || 'Unable to interpret dream at this time.',
      symbols: result.symbols || [],
      mood: result.mood || 'Contemplative'
    };
    
  } catch (error) {
    console.error('OpenAI interpretation failed:', error);
    
    // Fallback interpretation
    return {
      interpretation: 'Your dream reflects your subconscious mind processing experiences and emotions. Dreams often provide insight into your waking life and inner thoughts.',
      symbols: [],
      mood: 'Contemplative'
    };
  }
};