import { interpretDreamWithOpenAI, type DreamAnalysis } from './openaiService';

export { type DreamAnalysis };

export const interpretDream = async (dreamText: string): Promise<DreamAnalysis> => {
  if (!dreamText.trim()) {
    throw new Error('Please enter your dream description');
  }

  try {
    // Use OpenAI service for interpretation
    const result = await interpretDreamWithOpenAI(dreamText);
    return result;
  } catch (error) {
    console.error('Dream interpretation error:', error);
    throw new Error('Failed to interpret dream. Please try again.');
  }
};
