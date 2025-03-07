import React, { useState } from "react";

export default function TrainingLoadCalculator() {
  const [lift, setLift] = useState("Squat");
  const [oneRM, setOneRM] = useState("");
  const [results, setResults] = useState(null);
  const [variationRatios, setVariationRatios] = useState({
    Squat: {
      FrontSquat: 0.85,
      SplitSquat: 0.5,
      RFESplitSquat: 0.45,
      StepUp: 0.4,
      RDL: 0.75,
      GoodMorning: 0.5,
    },
    Bench: {
      InclineBench: 0.8,
      FloorPress: 0.9,
      DBBench: 0.3,
      DBInclineBench: 0.35,
      PushPress: 0.8,
    },
    Deadlift: {
      TrapBarJump: 0.4,
      SplitStanceTrapBarDeadlift: 0.8,
      SingleLegTrapBarDeadlift: 0.35,
      TrapBarRDL: 0.7,
      SplitStanceTrapBarRDL: 0.6,
    },
    Clean: {
      HangClean: 0.85,
      HighPull: 0.75,
      CleanPullFromFloor: 1.1,
      CleanPullFromHang: 1.05,
      OneArmDBSnatch: 0.25,
    },
  });

  const percentages = [
    35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120
  ];

  const roundToNearest2_5 = (num) => Math.round(num / 2.5) * 2.5;

  const calculateLoad = () => {
    if (!oneRM) return;
    const baseLoads = percentages.map((p) => ({
      percent: p,
      weight: roundToNearest2_5(oneRM * (p / 100)),
    }));
    const variationLoads =
      variationRatios[lift] && Object.entries(variationRatios[lift]).map(([name, ratio]) => ({
        name,
        loads: percentages.map((p) => ({
          percent: p,
          weight: roundToNearest2_5(oneRM * ratio * (p / 100)),
        })),
      }));
    setResults({ baseLoads, variationLoads });
  };

  const handleRatioChange = (exercise, newRatio) => {
    setVariationRatios((prev) => ({
      ...prev,
      [lift]: {
        ...prev[lift],
        [exercise]: parseFloat(newRatio),
      },
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      calculateLoad();
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Training Load Calculator</h1>
      <label className="block mb-2">Select Lift:</label>
      <select
        value={lift}
        onChange={(e) => setLift(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      >
        {Object.keys(variationRatios).map((liftName) => (
          <option key={liftName} value={liftName}>{liftName}</option>
        ))}
      </select>
      <label className="block mb-2">Enter 1RM:</label>
      <input
        type="number"
        value={oneRM}
        onChange={(e) => setOneRM(e.target.value)}
        onKeyDown={handleKeyPress}
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={calculateLoad}
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Calculate Training Loads
      </button>
      {results && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Training Loads for {lift}</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">%</th>
                <th className="border border-gray-300 px-4 py-2">Weight (lbs)</th>
              </tr>
            </thead>
            <tbody>
              {results.baseLoads.map(({ percent, weight }, index) => (
                <tr key={percent} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="border border-gray-300 px-4 py-2">{percent}%</td>
                  <td className="border border-gray-300 px-4 py-2">{weight} lbs</td>
                </tr>
              ))}
            </tbody>
          </table>
          {results.variationLoads && results.variationLoads.map(({ name, loads }) => (
            <div key={name} className="mt-4">
              <h3 className="text-lg font-bold mb-2">{name} (Based on {lift} 1RM)</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">%</th>
                    <th className="border border-gray-300 px-4 py-2">Weight (lbs)</th>
                  </tr>
                </thead>
                <tbody>
                  {loads.map(({ percent, weight }, index) => (
                    <tr key={percent} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border border-gray-300 px-4 py-2">{percent}%</td>
                      <td className="border border-gray-300 px-4 py-2">{weight} lbs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
