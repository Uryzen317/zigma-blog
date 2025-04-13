const AvgReadSpeed = 200; // words per minute

export function getReadTime(description: string): number {
  return Math.ceil(description.split(" ").length / AvgReadSpeed);
}
