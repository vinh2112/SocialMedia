import { Icon } from "@iconify/react";
import React from "react";
import {
  DashboardCardBoxed,
  DashboardCardContainer,
  DashboardCardContent,
  DashboardCardWrapper,
  DashboardContainer,
  DashboardTitle,
  DashboardChartContainer,
  DashboardTemp,
} from "./DashboardElements";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { adminState$ } from "redux/selectors";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { data } = useSelector(adminState$);

  if (!data) return null;

  return (
    <>
      <DashboardTitle>Dashboard</DashboardTitle>
      <DashboardContainer>
        <DashboardCard
          to="users"
          color="#46B5FD"
          icon={<Icon icon="fluent:people-community-28-filled" />}
          total={data.totalUsers}
          title="Total Users"
        />
        <DashboardCard
          to="posts"
          color="#FF8B4F"
          icon={<Icon icon="carbon:report" />}
          total={data.totalPosts}
          title="Total Posts"
        />

        <DashboardCard
          to="keywords"
          color="#aa66cc"
          icon={<Icon icon="akar-icons:tag" />}
          total={data.totalKeywords}
          title="Total Keywords"
        />

        <DashboardCard
          to="reports"
          color="#ffbb33"
          icon={<Icon icon="ic:round-report-gmailerrorred" />}
          total={data.totalReports}
          title="Total Reports"
        />

        <DashboardChart chartData={data.userChart} />

        <DashboardTemp></DashboardTemp>
      </DashboardContainer>
    </>
  );
}

const DashboardCard = ({ color, icon, total, title, to }) => {
  return (
    <DashboardCardContainer to={to}>
      <DashboardCardWrapper>
        <DashboardCardBoxed style={{ color: color }}>{icon}</DashboardCardBoxed>

        <DashboardCardContent>
          <div className="card-title" style={{ color: color }}>
            {title}
          </div>
          <div className="card-number">{total}</div>
        </DashboardCardContent>
      </DashboardCardWrapper>
    </DashboardCardContainer>
  );
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardChart = ({ chartData }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "NEW USERS REPORT",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };

  const labels = chartData.months;

  const data = {
    labels,
    datasets: [
      {
        label: "New user",
        data: chartData.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };
  return (
    <DashboardChartContainer>
      <Line options={options} data={data} />
    </DashboardChartContainer>
  );
};
