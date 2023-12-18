/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { calculateBMI } from "../components/Calculation/BMICal";
import { calculateCalories } from "../components/Calculation/CaloriesCal";
import { calculateBodyWeight } from "../components/Calculation/BodyWeightCal";
import InputForm from "../components/Elements/InputForm";
import ResultDisplay from "../components/Fragments/ResultDisplay";
import ChartComponent from "../components/Fragments/ChartComponent";
import NotesHistory from "../components/Fragments/NotesHistory";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

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
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-fitlife-hub.vercel.app/get-calc"
      );
      setUserData(response.data.userData);
      console.log("Data fetched successfully:", response.data);
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
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return (
    <body className="min-h-screen">
      <div className="text-center py-5">
        <h1 className="text-sky-800 text-2xl font-bold">Calc BMI!</h1>
        <h4 className="text-zinc-500 font-normal text-xl">
          Welcome to Calc it! <br />
          Maintaining a healthy weight is crucial for overall well-being. <br />
          Discover your Body Mass Index, Calories needs, and ideal weight with
          our calculator.
        </h4>
      </div>

      <div className="flex flex-col md:flex-row mx-4 md:mx-[2rem] justify-between gap-4 py-10">
        <div className="w-full md:w-[31.25rem]">
          <div className="text-center text-sky-800 text-2xl font-bold">
            Calc It!
          </div>
          <div className="text-center text-zinc-500 font-normal text-xl">
            Input your details here
          </div>
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

        <div className="w-full md:w-[31.25rem]">
          <ResultDisplay
            bmi={bmi}
            calories={calories}
            bodyWeight={bodyWeight}
          />
        </div>
      </div>

      {auth ? (
        <>
          <div className="text-center text-sky-800 text-2xl font-bold mt-6 md:mt-10">
            Result History
          </div>
          <div className="flex flex-col md:flex-row justify-center md:space-x-1.6rem py-6 md:py-10 gap-1.6rem">
            <NotesHistory userData={userData} />

            <div className="w-full md:w-[31.25rem]">
              <div className="mx-4 md:mx-[1.25rem] mb-3 md:mb-5 font-bold text-lg text-gray-600">
                Calculation Track
              </div>
              <div className="relative">
                <ChartComponent userData={userData} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-sky-800 text-2xl font-bold">
          Login to track your calculations
        </div>
      )}
    </body>
  );
};
export default Calculator;
