import { useLoaderData, useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { getUserData } from '../../services/apiUser';
import { IoMdPersonAdd } from 'react-icons/io';

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

const PlaceHolder = styled.div`
  width: 100%;
  height: 10rem;
  background-color: red;
`;

const InfoContainer = styled.div`
  width: 100%;
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

function UserProfile() {
  const { id } = useParams();
  const { userProfile, isLoading, error } = useGetUserData(id);
  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <StyledUserProfile>
      <BackgroundImage src={userProfile.background_image} />
      <PageContainer>
        <UserInfoContainer>
          <UserAvatar src={userProfile.avatar_image} />
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
        <PlaceHolder></PlaceHolder>
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
