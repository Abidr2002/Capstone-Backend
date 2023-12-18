// BMIUtils.js
const calculateBodyWeight = (height, gender) => {
  if (gender === "male") {
    return height - 100 - (height - 100) * 0.1;
  } else if (gender === "female") {
    return height - 100 - (height - 100) * 0.15;
  }
  return null;
};

export { calculateBodyWeight };
