import styled from 'styled-components';

const StyledUserProfileFilter = styled.ul`
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

function UserProfileFilter() {
  return (
    <StyledUserProfileFilter>
      <Filter>Tweets</Filter>
      <Filter>Tweets & replies</Filter>
      <Filter>Media</Filter>
      <Filter>Likes</Filter>
    </StyledUserProfileFilter>
  );
}

export default UserProfileFilter;
