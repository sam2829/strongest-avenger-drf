import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/PostsPage.module.css";
import appStyles from "../../App.module.css";
import NoResultsImg from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router";
import Post from "./Post";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import SearchBy from "../../components/SearchBy";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Component to render the posts page
const PostsPage = ({ message, filter = "" }) => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Function to fetch posts data from the server
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  let postsContent;
  // Whilst loading, screen will display spinner
  if (!hasLoaded) {
    postsContent = (
      <Container className={appStyles.Content}>
        <Asset spinner />
      </Container>
    );
    // If there are no results for the posts
  } else if (posts.results.length === 0) {
    postsContent = (
      <Container className={appStyles.Content}>
        <Asset src={NoResultsImg} message={message} />
      </Container>
    );
    // Display the list of posts
  } else {
    postsContent = posts.results.map((post) => (
      <Post key={post.id} {...post} setPosts={setPosts} />
    ));
  }

  return (
    <>
      <Row>
        <Col lg={{ span: 3 }} className="d-none d-lg-block">
          <SearchBy />
        </Col>
        <Col lg={{ span: 6 }}>
          <PopularProfiles mobile />
          <SearchBy mobile />
          {/* Search bar */}
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search posts"
            />
          </Form>
          {/* Infinite scrolling for posts */}
          <InfiniteScroll
            children={postsContent}
            loader={<Asset spinner />}
            dataLength={posts.results.length}
            hasMore={!!posts.next}
            next={() => fetchMoreData(posts, setPosts)}
          />
        </Col>
        <Col lg={{ span: 3 }} className="d-none d-lg-block">
          <PopularProfiles />
        </Col>
      </Row>
    </>
  );
};

export default PostsPage;
