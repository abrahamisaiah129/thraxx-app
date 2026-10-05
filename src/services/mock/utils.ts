// Utility for mock delay and errors
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateNetwork = async (ms = 1000, errorProbability = 0.1) => {
  await delay(ms);
  if (Math.random() < errorProbability) {
    throw new Error('Network error. Please try again.');
  }
};
