import { useLoaderData, useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { getUserData } from '../../services/apiUser';
import { IoMdPersonAdd } from 'react-icons/io';
import Tweet from './../../ui/Tweet';
import { useUser } from '../../hooks/authHooks/useUser';
import { IconUserOutline } from '../../styles/Icons';

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
const UserInfoContainer = styled.div`
  position: relative;
  top: -5.5rem;

  margin-bottom: -3rem;
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 1.963rem 2.761rem 3.523rem 2rem;
  display: flex;
  box-shadow: var(--shadow-100);
  gap: 2rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    flex-direction: column;
    padding-bottom: 2.3rem;
    top: -2rem;
    gap: 1.1rem;
    margin-bottom: 0rem;
  }
`;
const UserAvatar = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 0.8rem;
  border: 0.4rem solid var(--color-white);
  box-shadow: var(--shadow-100);
  position: relative;
  top: -8.161rem; // 5.4 + 2.761
  margin-bottom: -8.161rem;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-500);
  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 12.243rem;
    height: 12.243rem;
    margin: 0 auto;
    top: -9.6rem;
    margin-bottom: -8.161rem;
    border: 0.3rem solid var(--color-white);
  }
`;

const UserAvatarPlaceHolder = styled(IconUserOutline)`
  display: block;
  width: 16rem;
  height: 16rem;
  color: var(--color-white);
  border-radius: 0.8rem;
  border: 0.4rem solid var(--color-white);
  box-shadow: var(--shadow-100);
  position: relative;
  top: -8.161rem;
  margin-bottom: -8.161rem;

  background-color: var(--color-grey-500);
  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 12.243rem;
    height: 12.243rem;
    margin: 0 auto;
    top: -9.6rem;
    margin-bottom: -8.161rem;
    border: 0.3rem solid var(--color-white);
  }
`;

const UserName = styled.p`
  font-family: var(--font-poppings);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-100);
  letter-spacing: -0.035em;
`;

const Description = styled.p`
  font-family: var(--font-noto);
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.452rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
  text-align: left;
  max-width: 43rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    text-align: center;
    margin-bottom: 1.3rem;
  }
`;

const FollowButton = styled.button`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  align-self: flex-start;
  border: 2px solid var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  padding: 0.8rem 2.4rem;
  color: var(--color-white);
  background-color: var(--color-blue-100);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
  transition: background var(--transition-200), color var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }

  @media screen and (max-width: 450px) {
    margin: 0 auto;
  }
`;

const FollowIcon = styled(IoMdPersonAdd)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

const InfoContainer = styled.div`
  /* width: 100%; */
`;

const UserAndStatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  margin-bottom: 2.2rem;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
  }
`;
const StatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
const Stat = styled.p`
  font-family: var(--font-poppings);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-grey-100);
  letter-spacing: -0.035em;
`;
const StatSpan = styled.span`
  font-weight: 500;
  color: var(--color-grey-300);
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

const Filters = styled.ul`
  background-color: var(--color-white);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);

  padding: 2.6rem 2rem 3.1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
`;

const Filter = styled.li`
  font-family: var(--font-poppings);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  list-style: none;

  color: var(--color-grey-300);
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.524rem;
`;

function UserProfile() {
  const { id } = useParams();
  const { user, isLoadingUser } = useUser();
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);
  const { userProfile, isLoading, error } = useGetUserData(id);
  if (isLoading || isLoadingUser || isLoadingCurrentUser) return <Spinner />;
  if (error) toast.error(error.message);
  console.log(currentUser);
  return (
    <StyledUserProfile>
      {userProfile.background_image ? (
        <BackgroundImage src={userProfile.background_image} />
      ) : (
        <BackgroundImagePlaceHolder></BackgroundImagePlaceHolder>
      )}

      <PageContainer>
        <UserInfoContainer>
          {userProfile.avatar_image ? (
            <UserAvatar src={userProfile.avatar_image} />
          ) : (
            <UserAvatarPlaceHolder />
          )}

          <InfoContainer>
            <UserAndStatContainer>
              <UserName>{userProfile.user_name}</UserName>
              <StatContainer>
                <Stat>
                  {userProfile.following.length}
                  <StatSpan>Following</StatSpan>
                </Stat>
                <Stat>
                  {userProfile.followers.length}
                  <StatSpan>Followers</StatSpan>
                </Stat>
              </StatContainer>
            </UserAndStatContainer>

            <Description>
              {userProfile.user_description
                ? userProfile.user_description
                : 'This user has not added a description yet!'}
            </Description>
          </InfoContainer>
          <FollowButton>
            <FollowIcon /> Follow
          </FollowButton>
        </UserInfoContainer>
        <ContentContainer>
          <Filters>
            <Filter>Tweets</Filter>
            <Filter>Tweets & replies</Filter>
            <Filter>Media</Filter>
            <Filter>Likes</Filter>
          </Filters>
          <TweetsContainer>
            {userProfile.tweets.map(tweet => (
              <Tweet
                key={tweet.id}
                user={{
                  userAvatar: userProfile.avatar_image,
                  userName: userProfile.user_name,
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
