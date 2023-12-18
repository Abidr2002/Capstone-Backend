// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const NotesHistory = ({ userData }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // Pembentukan format tanggal yang diinginkan
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    return formattedDate;
  };

  return (
      <div className="flex mb-7">
        {userData.length > 0 ? (
          <div className="flex flex-col mx-[100px] py-7 gap-y-2 rounded-md shadow overflow-auto w-[500px] h-[400px] items-center bg-zinc-300 bg-opacity-10">
            {userData
              .sort((a, b) => b.id_result - a.id_result)
              .map((result) => (
                <div key={result.id_result} className="w-[400px] h-[100px] p-4 bg-gray-100 rounded-md shadow-md mb-3">
                  {/* Tampilkan data pengguna, sesuaikan dengan properti yang ada pada objek userData */}
                  <p className="font-bold text-gray-800 text-center mb-2 bg-red-200 rounded-md">Date: {formatDate(result.date)}</p>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-gray-600 text-center">
                        Age : <span className="font-bold">{result.age}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Height : <span className="font-bold">{result.height}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-center">
                        BMI : <span className="font-bold">{result.bmi}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Calories : <span className="font-bold">{result.calories}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-center">
                        Weight : <span className="font-bold">{result.weight}</span>
                      </p>
                      <p className="text-gray-600 text-center">
                        Ideal Weight : <span className="font-bold">{result.ideal_weight}</span>
                      </p>
                    </div>
                  </div>

                  {/* ... (tampilkan properti lainnya) */}
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center text-sky-800 text-2xl font-bold">No results available</div>
        )}
      </div>
  );
};

export default NotesHistory;
