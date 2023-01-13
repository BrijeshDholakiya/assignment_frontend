export const handleFormData = (item, removeItemArr) => {
  const newData = {};
  if (!item) return newData;
  Object.entries(item)?.forEach(([key, value]) => {
    if (value !== "-") newData[key] = value;
  });
  return newData;
};
