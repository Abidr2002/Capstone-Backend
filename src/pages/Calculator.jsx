/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { calculateBMI } from "../components/Utils/BMICal";
import { calculateCalories } from "../components/Utils/CaloriesCal";
import { calculateBodyWeight } from "../components/Utils/BodyWeightCal";
import InputForm from "../components/Elements/InputForm";
import ResultDisplay from "../components/Fragments/ResultDisplay";
import axios from "axios";
import { useAuth } from "../components/hooks/AuthContext";
import NotesHistory from "../components/Fragments/NotesHistory";

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
  const [userData, setUserData] = useState([]);

  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/get-calc");
      // Lakukan sesuatu dengan data yang diterima dari server, misalnya memperbarui state
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
    const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

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
      const res = await axios.post("http://localhost:8888/save-calc", dataToSend);
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
      <h1 className="text-center text-sky-800 text-2xl font-bold">Calc BMI!</h1>
      <h4 className="text-center text-zinc-500 font-normal text-xl">
        Welcome to Calc it! <br />
        Maintaining a healthy weight is crucial for overall well-being. <br />
        Discover your Body Mass Index, Calories needs, and ideal weight with our calculator.
      </h4>

      <div className="flex mx-[100px] justify-between py-10 gap-x-20">
        <div className="w-[500px] h-[282px]">
          <h3 className="text-center text-sky-800 text-2xl font-bold">Calc It!</h3>
          <h5 className="text-center text-zinc-500 font-normal text-xl">Input ur details here</h5>
          <InputForm gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} age={age} setAge={setAge} handleCalculate={handleCalculate} />
          <ErrorMessage message={errorMessage} />
        </div>
        <div className="w-[500px] h-[282px">
          <ResultDisplay bmi={bmi} calories={calories} bodyWeight={bodyWeight} />
        </div>
      </div>
      {auth ? (
        <>
          <div className="text-center text-sky-800 text-2xl font-bold mt-10">Result History</div>
          <div className="flex flex-col md:flex-row justify-center md:space-x-1.6rem py-6 md:py-10 gap-1.6rem">
            <div>
              <div className="mx-[100px] mb-3 font-bold text-lg text-gray-600">Notes History</div>
              <div className="relative"> <NotesHistory userData={userData} /></div>
            </div>
           
            <div className="w-full md:w-[31.25rem]">
              <div className="mx-4 md:mx-[1.25rem] mb-3 md:mb-5 font-bold text-lg text-gray-600">Calculation Track</div>
              <div className="relative"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-sky-800 text-2xl font-bold">Login to track your caclculations</div>
      )}
    </body>
  );
};

export default Calculator;
