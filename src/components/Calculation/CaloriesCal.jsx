// BMIUtils.js
const calculateCalories = (weight, height, age, gender) => {
  if (weight && height && age && gender) {
    if (gender === "male") {
      return 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
    } else if (gender === "female") {
      return 665.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
  }
  return null;
};

export { calculateCalories };
