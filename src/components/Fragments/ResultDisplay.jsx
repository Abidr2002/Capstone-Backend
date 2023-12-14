/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import BMIResult from "../Elements/BMIRes";
import CaloriesResult from "../Elements/CaloriesRes";
import BodyWeightResult from "../Elements/BodyWeightRes";
import { Tabs } from "flowbite-react";

const ResultDisplay = ({ bmi, calories, bodyWeight }) => {
  const [activeTab, setActiveTab] = useState(0); // Default active tab index

  return (
    <div className="">
      <h3 className="text-center text-sky-800 text-2xl font-bold">Result</h3>
      <div className="w-full min-h-[18rem] bg-zinc-300 bg-opacity-10 rounded-[1.25rem] shadow mt-[2rem]">
        {bmi && calories && bodyWeight && (
          <Tabs active={activeTab} onChange={(index) => setActiveTab(index)}>
            <Tabs.Item title="BMI">
              {bmi !== null && <BMIResult bmi={bmi} />}
            </Tabs.Item>
            <Tabs.Item title="Calories">
              {calories !== null && <CaloriesResult calories={calories} />}
            </Tabs.Item>
            <Tabs.Item title="Body Weight">
              {bodyWeight !== null && (
                <BodyWeightResult bodyWeight={bodyWeight} />
              )}
            </Tabs.Item>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
