import React, { useEffect, useState } from "react";
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
import LoadingSection from "../LoadingSection";

export default function ReportedPosts() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReportPosts = async () => {
      const res = await api.ReportAPI.getAllReports();

      setReports(res.data);
      setIsLoading(false);
    };

    fetchReportPosts();

    return () => {
      setReports([]);
    };
  }, []);

  const handleAcceptReport = async (reportId) => {
    try {
      const res = await api.ReportAPI.deleteReport(reportId);
      const newPosts = reports.filter((report) => report.reportedPostId._id !== res.data && report);
      setReports(newPosts);
      dispatch(
        actions.toast.showToast({
          message: "Deleted Post",
          type: "success",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefuseReport = async (reportId) => {
    try {
      await api.ReportAPI.refuseReport(reportId);
      const newPosts = reports.filter((report) => report._id !== reportId);
      setReports(newPosts);

      dispatch(
        actions.toast.showToast({
          message: "Refused Report",
          type: "success",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <ReportTop>
            <div className="report-title">Reports</div>
            <div className="report-count">
              <span>{reports.length}</span>
            </div>
          </ReportTop>
          <ReportedPostList>
            {reports.map((report) => (
              <ReportedPostItem
                key={report._id}
                report={report}
                handleAccept={handleAcceptReport}
                handleRefuse={handleRefuseReport}
              />
            ))}
          </ReportedPostList>
        </>
      )}
    </>
  );
}

const ReportedPostItem = ({ report, handleAccept, handleRefuse }) => {
  return (
    <>
      <ReportedPostContainer>
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
      </ReportedPostContainer>

      <PostDetail>
        <PostDetailTop>
          <AvatarWrapper>
            <Avatar to={`/profile/${report.reportedPostId.userId._id}`}>
              <img src={report.reportedPostId.userId.avatar} alt="avatar" />
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
    </>
  );
};