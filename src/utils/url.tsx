const hasDifferentPathnameAndSearchParameters = (
  initialParameters: Record<string, string>,
  searchParameters: Record<string, string>,
): boolean => {
  const pathnameParameters = new URLSearchParams(initialParameters);

  for (const [parameter, value] of pathnameParameters.entries()) {
    if (searchParameters[parameter] !== value) {
      return true; // Different parameter value found
    }
  }

  for (const [parameter] of Object.entries(searchParameters)) {
    if (!pathnameParameters.has(parameter)) {
      return true;
    }
  }

  return false;
};

export default hasDifferentPathnameAndSearchParameters;
