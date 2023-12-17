/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { calculateBMI } from "../components/Utils/BMICal";
import { calculateCalories } from "../components/Utils/CaloriesCal";
import { calculateBodyWeight } from "../components/Utils/BodyWeightCal";
import InputForm from "../components/Elements/InputForm";
import ResultDisplay from "../components/Fragments/ResultDisplay";
import ChartComponent from "../components/Fragments/ChartComponent";
import axios from "axios";
import { useAuth } from "../components/hooks/AuthContext";

const ErrorMessage = ({ message }) => {
  return <div className="text-red-500 text-sm mt-2">{message}</div>;
};

const Calculator = () => {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBMI] = useState(null);
  const [calories, setCalories] = useState(null);
  const [bodyWeight, setbodyWeight] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { auth } = useAuth();
  const [bmiData, setBmiData] = useState([]);
  const [dates, setDates] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [heightData, setHeightData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-fitlife-hub.vercel.app/get-calc"
      );

      const userData = response.data.userData;

      const formattedUserData = userData.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));

      const bmiData = formattedUserData.map((item) => item.bmi);
      const dates = formattedUserData.map((item) =>
        item.date.toLocaleDateString()
      );
      const weightData = formattedUserData.map((item) => item.weight);
      const heightData = formattedUserData.map((item) => item.height);

      console.log(dates);

      setBmiData(bmiData);
      setDates(dates);
      setWeightData(weightData);
      setHeightData(heightData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  const handleCalculate = async () => {
    if (!gender || !weight || !height || !age) {
      setErrorMessage("Please fill the columns");
      return;
    }

    const calculatedBMI = calculateBMI(weight, height);
    setBMI(calculatedBMI);

    const calculatedCalories = calculateCalories(weight, height, age, gender);
    setCalories(calculatedCalories);

    const calculatedbodyWeight = calculateBodyWeight(height, gender);
    setbodyWeight(calculatedbodyWeight);

    setErrorMessage("");

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const dataToSend = {
      date: formattedDate,
      age,
      weight,
      height,
      bmi: calculatedBMI,
      calories: calculatedCalories,
      bodyWeight: calculatedbodyWeight,
    };

    try {
      const res = await axios.post(
        "https://back-end-fitlife-hub.vercel.app/save-calc",
        dataToSend
      );
      console.log("Data saved successfully:", res);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <body className="min-h-screen">
      <h1 className="text-center text-sky-800 text-2xl font-bold">Calc BMI!</h1>
      <h4 className="text-center text-zinc-500 font-normal text-xl">
        Welcome to Calc it! <br />
        Maintaining a healthy weight is crucial for overall well-being. <br />
        Discover your Body Mass Index, Calories needs, and ideal weight with our
        calculator.
      </h4>

      <div className="flex mx-[100px] justify-between py-10 gap-x-20">
        <div className="w-[500px] h-[282px]">
          <h3 className="text-center text-sky-800 text-2xl font-bold">
            Calc It!
          </h3>
          <h5 className="text-center text-zinc-500 font-normal text-xl">
            Input ur details here
          </h5>
          <InputForm
            gender={gender}
            setGender={setGender}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            age={age}
            setAge={setAge}
            handleCalculate={handleCalculate}
          />
          <ErrorMessage message={errorMessage} />
        </div>
        <div className="w-[500px] h-[282px">
          <ResultDisplay
            bmi={bmi}
            calories={calories}
            bodyWeight={bodyWeight}
          />
        </div>
      </div>
      {auth ? (
        <>
          <p className="text-center text-sky-800 text-2xl font-bold mt-10">
            Result History
          </p>
          <div className="flex mx-[100px] justify-between py-10 gap-x-20">
            <div className="w-[500px] h-[282px]">Card</div>
            <div className="w-[500px] h-[282px">
              <ChartComponent
                bmiData={bmiData}
                dates={dates}
                weightData={weightData}
                heightData={heightData}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-sky-800 text-2xl font-bold">
          Login to track your caclculations
        </div>
      )}
    </body>
  );
};

export default Calculator;
