import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import {
  DashboardCardBoxed,
  DashboardCardContainer,
  DashboardCardContent,
  DashboardCardWrapper,
  DashboardContainer,
  DashboardReport,
} from "./DashboardElements";
import * as api from "api";
import LoadingSection from "components/LoadingSection";

const initialTotal = {
  totalUsers: 0,
  totalPosts: 0,
  totalReports: 0,
};

export default function Dashboard() {
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await api.AdminAPI.getTotal();

        setTotal(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.reponse);
      }
    };

    getTotal();

    return () => setTotal(null);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <DashboardContainer>
          <DashboardCard
            color="#46B5FD"
            icon={<Icon icon="fluent:people-community-28-filled" />}
            total={total.totalUsers}
            title="Total Users"
          />
          <DashboardCard
            color="#FF8B4F"
            icon={<Icon icon="carbon:report" />}
            total={total.totalPosts}
            title="Total Posts"
          />

          <DashboardReport>
            <div className="report-title">Report posts</div>
            <div className="report-count">{total.totalReports}</div>
          </DashboardReport>
        </DashboardContainer>
      )}
    </>
  );
}

const DashboardCard = ({ color, icon, total, title }) => {
  return (
    <DashboardCardContainer>
      <DashboardCardWrapper>
        <DashboardCardBoxed style={{ color: color }}>{icon}</DashboardCardBoxed>

        <DashboardCardContent>
          <div className="card-number">{total}</div>
          <div className="card-title">{title}</div>
        </DashboardCardContent>
      </DashboardCardWrapper>
    </DashboardCardContainer>
  );
};
