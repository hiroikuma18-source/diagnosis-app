export function calculateResult(answers: Record<string, number>[]): string {
  const total: Record<string, number> = {};
  answers.forEach((ans) => {
    Object.entries(ans).forEach(([key, value]) => {
      total[key] = (total[key] || 0) + Number(value);
    });
  });
  let maxKey = "";
  let maxValue = -Infinity;
  Object.entries(total).forEach(([key, value]) => {
    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
    }
  });
  return maxKey;
}
