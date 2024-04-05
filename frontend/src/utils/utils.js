import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

// Function to fetch more data
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Send a GET request to fetch more data using axios
    const { data } = await axiosReq.get(resource.next);
    // Update the resource state with the new data
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // Ensure that there are no duplicate results by checking the IDs
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Function to handle following actions
export const followHelper = (profile, clickedProfile, following_id) => {
  const { id, is_owner, followers_count, following_count } = profile;

  // Check if the profile being interacted with is the clicked profile
  return id === clickedProfile.id
    ? // If yes, update followers count and following ID
      { ...profile, followers_count: followers_count + 1, following_id }
    : is_owner
      ? // If it's the profile of the logged-in user, update following count
        { ...profile, following_count: following_count + 1 }
      : // Otherwise, return the profile unchanged
        profile;
};

// Function to handle unfollowing actions
export const unfollowHelper = (profile, clickedProfile) => {
  const { id, is_owner, followers_count, following_count } = profile;

  // Check if the profile being interacted with is the clicked profile
  return id === clickedProfile.id
    ? // If yes, update followers count and following ID
      { ...profile, followers_count: followers_count - 1, following_id: null }
    : // If it's the profile of the logged-in user, update following count
      is_owner
      ? { ...profile, following_count: following_count - 1 }
      : // Otherwise, return the profile unchanged
        profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
