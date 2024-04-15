import React, { useEffect, useState } from 'react'
import appStyles from "../../App.module.css";
import NoResultsImg from "../../assets/no-results.png";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/UseRedirect";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ReportsPage = ( message ) => {

  const [reports, setReports] = useState({
      results: []
  });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  useRedirect("loggedOut");
  const history = useHistory();


  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Function to fetch posts data from the server
        const {
          data
        } = await axiosReq.get(`/report/`);
          setReports(data);
          console.log(data)
          setHasLoaded(true);
      } catch (err) {
        console.log(err);
        }
    };

    const isOwner = reports.results.every(report => report.owner === currentUser.username);

    if (!isOwner) {
      history.push("/");
    }

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReports();
    }, 1000);

    return () => {
        clearTimeout(timer);
    };
  }, [currentUser, history]);

  let reportsContent;
  // Whilst loading, screen will display spinner
  if (!hasLoaded) {
    reportsContent = (
      <Container className={appStyles.Content}>
        <Asset spinner />
      </Container>
    );
    // If there are no results for the reports
  } else if (reports.results.length === 0) {
    reportsContent = (
      <Container className={appStyles.Content}>
        <Asset src={NoResultsImg} message={message} />
      </Container>
    );
    // Display the list of reports
  } else {

    reportsContent = reports.results.map((report, index) => (
      <Container className={appStyles.Content} key={index}>
        <p>ID: {report.id}</p>
        <p>Owner: {report.owner}</p>
        <p>Post: {report.post}</p>
        <p>Created At: {report.created_at}</p>
        <p>Reason: {report.reason}</p>
        <p>Description: {report.description}</p>
        {report.resolved ? <p>Resolved: True</p> : <p>Resolved: False</p>}
      </Container>
    ));
  }

  return (
    <>
      <div>My Reports</div>
      <div>{reportsContent}</div>
    </>

  )
}

export default ReportsPage