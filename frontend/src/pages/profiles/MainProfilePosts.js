import React from "react";
import Asset from "../../components/Asset";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";

// Functional component for displaying main profile posts
const MainProfilePosts = ({ profile, profilePosts, setProfilePosts }) => {
  return (
    <>
      {/* Title indicating whose posts are being displayed */}
      <h4 className="text-center mt-5">{profile?.owner}'s posts</h4>
      {/* Check if there are posts to display */}
      {profilePosts.results.length ? (
        // Display posts using infinite scroll
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        // Display message and image if there are no posts
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );
};

export default MainProfilePosts;
