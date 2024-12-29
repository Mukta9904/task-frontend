"use client";

const DashboardChart = ({ stats }: { stats: any }) => {
  const {
    totalTasks = 0,
    completedPercentage = 0,
    pendingPercentage = 0,
    averageCompletionTime = 0,
    pendingTasks = { total: 0, totalElapsedTime: 0, totalRemainingTime: 0 },
  } = stats;

  return (
    <div className="p-6 rounded-lg shadow-md ">
      {/* Top Summary Section */}
      <h3 className="text-xl font-semibold mb-4">Summary</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-400 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>
        <div className="p-4 bg-green-500 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
          <p className="text-2xl font-bold">{Math.round(completedPercentage)}%</p>
        </div>
        <div className="p-4 bg-red-500 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Pending tasks</h3>
          <p className="text-2xl font-bold">{Math.round(pendingPercentage)}%</p>
        </div>
        <div className="p-4 bg-yellow-500 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Average Completion Time</h3>
          <p className="text-2xl font-bold">{averageCompletionTime.toFixed(1)} hrs</p>
        </div>
      </div>
      {/* Pending Tasks Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Pending Tasks Details</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-500 rounded-lg text-center">
            <h4 className="text-lg font-semibold">Total Pending Tasks</h4>
            <p className="text-2xl font-bold">{pendingTasks.total}</p>
          </div>
          <div className="p-4 bg-gray-500 rounded-lg text-center">
            <h4 className="text-lg font-semibold">Total Elapsed Time</h4>
            <p className="text-2xl font-bold">
              {Math.round(pendingTasks.totalElapsedTime)} hrs
            </p>
          </div>
          <div className="p-4 bg-gray-500 rounded-lg text-center">
            <h4 className="text-lg font-semibold">Remaining Time</h4>
            <p className="text-2xl font-bold">
              {Math.round(pendingTasks.totalRemainingTime)} hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
