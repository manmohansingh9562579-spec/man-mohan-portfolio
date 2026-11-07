export type AlgorithmName = 'bubble' | 'selection' | 'binary';

export type AlgorithmFrame = {
  values: number[];
  active: number[];
  action: string;
  comparisons: number;
  swaps: number;
  foundIndex?: number;
};

const unsortedValues = [42, 19, 63, 8, 31, 55, 27];
const sortedValues = [...unsortedValues].sort((a, b) => a - b);

/** Builds real algorithm steps from the input values for the interactive visualizer. */
export function buildAlgorithmFrames(algorithm: AlgorithmName, target = 42): AlgorithmFrame[] {
  const values = algorithm === 'binary' ? [...sortedValues] : [...unsortedValues];
  const frames: AlgorithmFrame[] = [];
  let comparisons = 0;
  let swaps = 0;
  const add = (active: number[], action: string, foundIndex?: number) => frames.push({
    values: [...values], active, action, comparisons, swaps,
    ...(foundIndex === undefined ? {} : { foundIndex }),
  });

  if (algorithm === 'bubble') {
    add([], 'Unsorted input. Compare adjacent values and swap any out-of-order pair.');
    for (let end = values.length - 1; end > 0; end -= 1) {
      for (let index = 0; index < end; index += 1) {
        comparisons += 1;
        add([index, index + 1], `Compare ${values[index]} and ${values[index + 1]}.`);
        if (values[index] > values[index + 1]) {
          [values[index], values[index + 1]] = [values[index + 1], values[index]];
          swaps += 1;
          add([index, index + 1], `Swap ${values[index + 1]} and ${values[index]}.`);
        }
      }
    }
    add([], 'Sorted in ascending order.');
    return frames;
  }

  if (algorithm === 'selection') {
    add([], 'Unsorted input. Find the smallest remaining value for each position.');
    for (let start = 0; start < values.length; start += 1) {
      let minimum = start;
      for (let index = start + 1; index < values.length; index += 1) {
        comparisons += 1;
        add([minimum, index], `Compare ${values[index]} with the current minimum ${values[minimum]}.`);
        if (values[index] < values[minimum]) minimum = index;
      }
      if (minimum !== start) {
        [values[start], values[minimum]] = [values[minimum], values[start]];
        swaps += 1;
        add([start, minimum], `Place ${values[start]} at position ${start + 1}.`);
      }
    }
    add([], 'Sorted in ascending order.');
    return frames;
  }

  let low = 0;
  let high = values.length - 1;
  add([], `Sorted input. Search for ${target} by halving the remaining range.`);
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    comparisons += 1;
    add([middle], `Probe index ${middle}: compare ${values[middle]} with ${target}.`);
    if (values[middle] === target) {
      add([middle], `Found ${target} at index ${middle}.`, middle);
      return frames;
    }
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  add([], `${target} is not in this array.`);
  return frames;
}

export const matchExample = {
  profile: {
    skills: ['TypeScript', 'React', 'MongoDB'],
    preferredRoles: ['Frontend Developer'],
    interests: ['Open source', 'Side projects'],
    availability: 'Available',
  },
  target: {
    requiredSkills: ['TypeScript', 'React'],
    requiredRoles: ['Frontend Developer'],
    interests: ['Open source', 'Hackathons'],
  },
};

/** A local preview of TeamForge's documented weighted matching formula. */
export function calculateDemoMatch() {
  const overlapRatio = (profileItems: string[], requestedItems: string[]) => {
    if (requestedItems.length === 0) return 1;
    const profileSet = new Set(profileItems.map((item) => item.trim().toLowerCase()));
    return requestedItems.filter((item) => profileSet.has(item.trim().toLowerCase())).length / requestedItems.length;
  };

  const skill = overlapRatio(matchExample.profile.skills, matchExample.target.requiredSkills);
  const role = overlapRatio(matchExample.profile.preferredRoles, matchExample.target.requiredRoles);
  const interest = overlapRatio(matchExample.profile.interests, matchExample.target.interests);
  const availability = matchExample.profile.availability === 'Available' ? 1 : 0;

  return {
    score: Math.round((skill * 0.45 + role * 0.25 + interest * 0.15 + availability * 0.15) * 100),
    breakdown: { skill: skill * 100, role: role * 100, interest: interest * 100, availability: availability * 100 },
  };
}
