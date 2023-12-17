// NotesHistory.js
import React from "react";

const NotesHistory = ({ userData }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="w-full md:w-[31.25rem]">
      <div className="mx-4 md:mx-[1.25rem] mb-3 md:mb-5 font-bold text-lg text-gray-600">
        Notes History
      </div>
      <div className="flex mb-7">
        {userData.length > 0 ? (
          <div className="flex flex-col mx-4 md:mx-[1.25rem] py-3 md:py-7 gap-y-0.2rem rounded-md shadow overflow-auto w-full md:w-[31.25rem] h-[20rem] items-center bg-zinc-300 bg-opacity-10">
            {userData
              .sort((a, b) => b.id_result - a.id_result)
              .map((result) => (
                <div
                  key={result.id_result}
                  className="w-full md:w-[25rem] h-[6.25rem] p-4 bg-gray-100 rounded-md shadow-md mb-0.2rem"
                >
                  <p className="font-bold text-gray-800 text-center mb-0.4rem bg-red-200 rounded-md">
                    Date: {formatDate(result.date)}
                  </p>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-gray-600 text-center">
                        Age: <span className="font-bold">{result.age}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Height:{" "}
                        <span className="font-bold">{result.height}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-center">
                        BMI: <span className="font-bold">{result.bmi}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Calories:{" "}
                        <span className="font-bold">{result.calories}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-center">
                        Weight:{" "}
                        <span className="font-bold">{result.weight}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Ideal Weight:{" "}
                        <span className="font-bold">{result.ideal_weight}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center text-sky-800 text-2xl font-bold">
            No results available
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHistory;
