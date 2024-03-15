import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { useUser } from '../../hooks/authHooks/useUser';
import UserHeader from '../user/UserHeader';
import TweetView from '../tweetView/TweetView';
import { useState } from 'react';
import TweetsFilter from './TweetsFilter';

const StyledUserProfile = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 29.751rem;
  object-fit: cover;
  object-position: center;
`;
const BackgroundImagePlaceHolder = styled.div`
  width: 100%;
  height: 29.751rem;
  background-color: var(--color-grey-400);
`;

const PageContainer = styled.div`
  padding: 0 5.4rem;
  max-width: calc(107.3rem + (5.4rem * 2));
  margin: 0 auto;

  @media screen and (max-width: 450px) {
    max-width: 100%;
    padding: 0 1.66rem;
  }
`;

// MainContianer

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 30.4rem 1fr;
  gap: 2.4rem;
  align-items: start;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.524rem;
`;

// This is the main UserProfile component
function UserProfile() {
  const [filteredTweets, setFilteredTweets] = useState([]);
  // Get the user ID from the URL parameters
  const { id } = useParams();

  // Fetch the current user and their loading state
  const { user, isLoadingUser } = useUser();

  // Fetch the current user's profile and its loading state
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);

  // Fetch the profile of the user specified in the URL parameters, along with its loading state and any error that occurred
  const { userProfile, isLoading, error } = useGetUserData(id);

  // If any of the data is still loading, display a loading spinner
  if (isLoading || isLoadingUser || isLoadingCurrentUser) return <Spinner />;

  // If there was an error fetching the data, display an error message
  if (error) toast.error(error.message);

  // Extract the necessary data from the userProfile object
  const { background_image, avatar_image, user_name, tweets } = userProfile;

  return (
    <StyledUserProfile>
      {background_image ? (
        <BackgroundImage src={background_image} />
      ) : (
        <BackgroundImagePlaceHolder></BackgroundImagePlaceHolder>
      )}
      <PageContainer>
        <UserHeader currentUser={currentUser} userProfile={userProfile} />
        <ContentContainer>
          <TweetsFilter
            tweets={tweets}
            handleFilterTweets={setFilteredTweets}
            userId={id}
          />
          <TweetsContainer>
            {filteredTweets.map(tweet => (
              <TweetView
                key={tweet.id}
                user={{
                  userAvatar: avatar_image,
                  userName: user_name,
                }}
                currentUserAvatar={currentUser.avatar_image}
                tweet={tweet}
              />
            ))}
          </TweetsContainer>
        </ContentContainer>
      </PageContainer>
    </StyledUserProfile>
  );
}

export default UserProfile;

// this one works
// json_build_array('newz');

// b9628375-9682-4879-a408-45e7e2b8b9db

// Using the loader
// const userProfile = useLoaderData();
/*
const userProfileQuery = userId => ({
  queryKey: ['profile', userId],
  queryFn: async () => getUserData(userId),
});

export const userProfileLoader =
  queryClient =>
  async ({ params }) => {
    const query = userProfileQuery(params.id);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  */

/*
  CREATE OR REPLACE FUNCTION add_follower(target_id uuid, new_follower JSON)
RETURNS VOID AS $$
DECLARE
    json_column_name TEXT;
    new_array JSON;
    old_array JSON;
BEGIN
    -- Fetch the existing JSON array
    SELECT followers 
    INTO old_array 
    FROM profiles
    WHERE id = target_id;

    -- Construct a new JSON array with the new follower included
    new_array := ARRAY_APPEND(old_array, new_follower);

    -- Update the JSON column by prepending the new item to the existing JSON array
    UPDATE profiles
    SET followers = new_array
    WHERE id = target_id;
END;
$$ LANGUAGE plpgsql;
  */
