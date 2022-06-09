import React from "react";
import {
  Avatar,
  AvatarWrapper,
  CreatedDate,
  DetailRightSide,
  GroupButton,
  NameAuthorLink,
  PostDescription,
  PostDetail,
  PostDetailTop,
  PostPhoto,
  ReportButton,
  ReportChartContainer,
  ReportContainer,
  ReportDetail,
  ReportDetailLeft,
  ReportDetailRight,
  ReportedPostContainer,
  ReportedPostList,
  ReportTop,
} from "./ReportedPostElements";
import { Icon } from "@iconify/react";
import * as api from "api";
import moment from "moment";
import * as actions from "redux/actions";
import { useDispatch } from "react-redux";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { adminState$ } from "redux/selectors";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportedPosts() {
  const { data } = useSelector(adminState$);
  const reportData = data?.reportData;
  const dispatch = useDispatch();

  const handleAcceptReport = async (reportId) => {
    try {
      await api.ReportAPI.deleteReport(reportId).then((res) => {
        dispatch(actions.handleReportAdmin.handleReportAdminRequest({ isDeleted: true, data: res.data }));

        dispatch(
          actions.toast.showToast({
            message: "Deleted Post",
            type: "success",
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefuseReport = async (reportId) => {
    try {
      await api.ReportAPI.refuseReport(reportId).then(() => {
        dispatch(actions.handleReportAdmin.handleReportAdminRequest({ isDeleted: false, data: reportId }));

        dispatch(
          actions.toast.showToast({
            message: "Refused Report",
            type: "success",
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return null;

  return (
    <ReportContainer>
      <ReportedPostList>
        <ReportTop>
          <div className="report-title">Reports</div>
          <div className="report-count">
            <span>{reportData.reports.length}</span>
          </div>
        </ReportTop>
        {reportData.reports.map((report) => (
          <ReportedPostItem
            key={report._id}
            report={report}
            handleAccept={handleAcceptReport}
            handleRefuse={handleRefuseReport}
          />
        ))}
      </ReportedPostList>
      <ReportChart dataReport={reportData.reportDataChart} />
    </ReportContainer>
  );
}

const ReportedPostItem = ({ report, handleAccept, handleRefuse }) => {
  return (
    <ReportedPostContainer>
      <div>
        <ReportDetail>
          <ReportDetailLeft>
            <div className="reason-report">
              <span>Reason: </span>
              {report.reason}
            </div>
            <div className="created-date">
              <span>Created date: </span>
              {moment(report.createdAt).format("LLL")}
            </div>
          </ReportDetailLeft>

          <ReportDetailRight>
            <GroupButton>
              <ReportButton className="success" onClick={() => handleRefuse(report._id)}>
                <Icon icon="ep:close-bold" />
              </ReportButton>
              <ReportButton className="danger" onClick={() => handleAccept(report._id)}>
                <Icon icon="bi:check-lg" />
              </ReportButton>
            </GroupButton>
          </ReportDetailRight>
        </ReportDetail>
      </div>

      <PostDetail>
        <PostDetailTop>
          <AvatarWrapper>
            <Avatar to={`/profile/${report.reportedPostId.userId._id}`}>
              <img src={report.reportedPostId.userId.avatar || DefaultAvatar} alt="avatar" />
            </Avatar>
          </AvatarWrapper>

          <DetailRightSide>
            <NameAuthorLink to={`/profile/${report.reportedPostId.userId._id}`}>
              @{report.reportedPostId.userId.name}
            </NameAuthorLink>
            <CreatedDate>{moment(report.reportedPostId.createdAt).fromNow()}</CreatedDate>
          </DetailRightSide>
        </PostDetailTop>

        <PostDescription>{report.reportedPostId.desc}</PostDescription>

        <PostPhoto src={report.reportedPostId.image.url} alt="photo" />
      </PostDetail>
    </ReportedPostContainer>
  );
};

const ReportChart = ({ dataReport }) => {
  const options = {
    responsive: true,
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "REPORT POSTS",
      },
    },
  };

  const data = {
    labels: ["Total Reports", "Deleted Reports", "RefusedReport"],
    datasets: [
      {
        label: "# of Votes",
        data: dataReport,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ReportChartContainer>
      <Pie data={data} options={options} />
    </ReportChartContainer>
  );
};
