const areArraysEqual = (array1: string[], array2: string[]): boolean => {
  if (array1.length !== array2.length) {
    return false; // Arrays have different lengths
  }

  for (const [index, element] of array1.entries()) {
    if (element !== array2[index]) {
      return false; // Arrays have different elements
    }
  }

  return true; // Arrays are the same
};

export default areArraysEqual;
