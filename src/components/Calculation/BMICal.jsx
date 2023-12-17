// BMIUtils.js
const calculateBMI = (weight, height) => {
  if (weight && height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  return null;
};

export { calculateBMI };
