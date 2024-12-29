"use client";

const PriorityTable = ({ priorityData }: { priorityData: any[] }) => {
  return (
    <div className="p-1 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Priority Table</h2>
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2 text-left text-gray-300">Priority</th>
            <th className="border border-gray-600 px-4 py-2 text-left text-gray-300">Pending Tasks</th>
            <th className="border border-gray-600 px-4 py-2 text-left text-gray-300">Time Lapsed (hrs)</th>
            <th className="border border-gray-600 px-4 py-2 text-left text-gray-300">Time to Finish (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {priorityData.map((item) => (
            <tr key={item.priority} className="even:bg-gray-700 odd:bg-gray-800">
              <td className="border border-gray-600 px-4 py-2 text-gray-300">
                Priority {item.priority}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-gray-300">
                {item.pendingTasks}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-gray-300">
                {Math.round(item.timeLapsed)}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-gray-300">
                {Math.round(item.timeToFinish)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriorityTable;
