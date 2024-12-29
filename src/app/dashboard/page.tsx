"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import Sidebar from "@/components/Sidebar";
import DashboardChart from "@/components/DashboardChart";
import PriorityTable from "@/components/PriorityTable";
import Wrapper from "@/components/Wrapper";
import Logout from "@/components/Logout";
const Dashboard = () => {
  const [stats, setStats] = useState();
  const [priorityStats, setPriorityStats] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        try {
          const statsResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/stats`,
            { headers }
          );
          if (statsResponse.data) setStats(statsResponse.data);
        } catch (error) {
          console.log("Error fetching stats:", error);
        }
        try {
          const priorityResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/priority-table`,
            { headers }
          );
          if (priorityResponse.data.stats) setPriorityStats(priorityResponse.data.stats);
        } catch (error) {
          console.log("Error fetching priority stats:", error);
        }
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Wrapper>
      <div className="flex">
        <Sidebar />
        <main className="p-8 w-full">
          <h1 className="text-4xl font-bold"> Task Dashboard</h1>
          <div>{stats && <DashboardChart stats={stats} />}</div>
          {/* Priority Table */}
          <div>
            {priorityStats && <PriorityTable priorityData={priorityStats} />}
          </div>
        </main>
        <Logout />
      </div>
    </Wrapper>
  );
};

export default Dashboard;
