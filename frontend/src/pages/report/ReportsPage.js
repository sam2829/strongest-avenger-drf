import React, { useEffect, useState } from 'react'
import styles from "../../styles/ReportsPage.module.css"
import appStyles from "../../App.module.css";
import NoResultsImg from "../../assets/no-results.png";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/UseRedirect";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Report from "../report/Report"

const ReportsPage = ( { message } ) => {

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
        // Function to fetch reports data from the server
        const {
          data
        } = await axiosReq.get(`/report/`);
        setReports(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
        }
    };

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
    reportsContent = reports.results.map((report) => {
    // Check if the current user is the owner of the report
    if (report.owner === currentUser.username) {
      return <Report key={report.id} {...report} setReports={setReports} />;
    } else {
      history.push("/")
    }
  });
}

  return (
    <>
      <h1 className={`${styles.Heading} mt-3`}>My Reports</h1>
      <div>{reportsContent}</div>
    </>

  )
}

export default ReportsPage