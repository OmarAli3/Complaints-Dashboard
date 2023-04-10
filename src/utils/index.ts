// Given an array of objects, group them by a key
// Usage: const grouped = groupBy('complaintDepartment')(complaints);
export const groupBy = (key: string) => (array: Record<string, any>[]) => {
  return array.reduce((result, currentValue) => {
    if (currentValue[key] in result === false) result[currentValue[key]] = [];
    result[currentValue[key]].push(currentValue);
    return result;
  }, {});
};
