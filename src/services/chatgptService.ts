// ChatGPT integration service for dream interpretation

export interface DreamAnalysis {
  interpretation: string;
  symbols: string[];
  mood: string;
}

// Fallback interpretation service
const fallbackInterpretation = (dreamText: string): DreamAnalysis => {
  const dreamSymbols: Record<string, string> = {
    water: 'emotions, subconscious, purification',
    flying: 'freedom, ambition, escape from limitations',
    falling: 'loss of control, anxiety, fear of failure',
    animals: 'instincts, natural desires, untamed aspects',
    death: 'transformation, endings, new beginnings',
    house: 'self, psyche, different aspects of personality',
    car: 'direction in life, personal drive, control',
    snake: 'transformation, healing, hidden fears',
    fire: 'passion, destruction, purification',
    baby: 'new beginnings, innocence, potential',
  };

  const lowerText = dreamText.toLowerCase();
  const foundSymbols: string[] = [];
  
  Object.keys(dreamSymbols).forEach(symbol => {
    if (lowerText.includes(symbol)) {
      foundSymbols.push(`${symbol}: ${dreamSymbols[symbol]}`);
    }
  });
  
  const moodKeywords = {
    positive: ['happy', 'joy', 'love', 'peace', 'beautiful', 'light', 'bright'],
    negative: ['scared', 'fear', 'dark', 'lost', 'angry', 'sad', 'trapped'],
  };
  
  let mood = 'Contemplative';
  for (const [moodType, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      mood = moodType === 'positive' ? 'Positive' : 'Challenging';
      break;
    }
  }
  
  let interpretation = 'Your dream reflects your subconscious mind processing experiences and emotions. ';
  if (foundSymbols.length > 0) {
    interpretation += `Key symbols suggest themes of personal growth and emotional processing. `;
  }
  interpretation += 'Dreams often provide insight into your waking life and inner thoughts.';
  
  return { interpretation, symbols: foundSymbols, mood };
};

export const interpretDreamWithChatGPT = async (dreamText: string): Promise<DreamAnalysis> => {
  try {
    // For demo purposes, we'll use a mock ChatGPT-style response
    // In production, you would integrate with OpenAI API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock ChatGPT response with more sophisticated analysis
    const mockChatGPTResponse = generateChatGPTStyleInterpretation(dreamText);
    return mockChatGPTResponse;
    
  } catch (error) {
    console.error('ChatGPT interpretation failed:', error);
    return fallbackInterpretation(dreamText);
  }
};

const generateChatGPTStyleInterpretation = (dreamText: string): DreamAnalysis => {
  const lowerText = dreamText.toLowerCase();
  
  // More sophisticated symbol analysis
  const symbolMeanings: Record<string, string> = {
    water: 'emotional state and subconscious feelings',
    flying: 'desire for freedom and transcendence',
    falling: 'feelings of losing control or anxiety',
    animals: 'instinctual aspects of your personality',
    death: 'major life transitions or transformations',
    house: 'your sense of self and personal identity',
    car: 'your life direction and personal autonomy',
    snake: 'transformation, wisdom, or hidden fears',
    fire: 'passion, creativity, or destructive emotions',
    baby: 'new opportunities or aspects of yourself',
    chase: 'avoidance of confronting important issues',
    lost: 'feeling directionless in waking life',
    school: 'learning experiences or past anxieties',
    family: 'relationships and emotional connections'
  };
  
  const foundSymbols: string[] = [];
  Object.keys(symbolMeanings).forEach(symbol => {
    if (lowerText.includes(symbol)) {
      foundSymbols.push(`${symbol}: ${symbolMeanings[symbol]}`);
    }
  });
  
  // Determine emotional tone
  let mood = 'Reflective';
  if (lowerText.match(/happy|joy|love|peace|beautiful|light|bright|success/)) {
    mood = 'Positive and Hopeful';
  } else if (lowerText.match(/scared|fear|dark|lost|angry|sad|trapped|nightmare/)) {
    mood = 'Challenging and Processing';
  }
  
  // Generate ChatGPT-style interpretation
  let interpretation = `This dream appears to be your subconscious mind processing recent experiences and emotions. `;
  
  if (foundSymbols.length > 0) {
    interpretation += `The symbols present suggest you may be working through themes related to personal growth, relationships, or life transitions. `;
  }
  
  if (mood === 'Positive and Hopeful') {
    interpretation += `The positive emotional tone indicates you're in a good mental space and may be feeling optimistic about upcoming changes.`;
  } else if (mood === 'Challenging and Processing') {
    interpretation += `The challenging emotions in this dream suggest you're processing difficult feelings or situations, which is a healthy part of psychological growth.`;
  } else {
    interpretation += `This dream reflects a contemplative state where you're integrating various aspects of your life experience.`;
  }
  
  return {
    interpretation,
    symbols: foundSymbols,
    mood
  };
};