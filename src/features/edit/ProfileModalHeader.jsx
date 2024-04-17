/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconClose, IconSave } from '../../styles/Icons';
import SmallSpinner from '../../ui/SmallSpinner';

const StyledProfileModalHeader = styled.div``;

// HEADER
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-bottom: 0.8rem;
  margin-bottom: 2.4rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const CloseButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  color: var(--color-grey-100);
  transition: color var(--transition-200);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--color-blue-100);
  }
`;

const CloseIcon = styled(IconClose)`
  height: 2.2rem;
  width: 2.2rem;
  color: inherit;
`;

const Heading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);
`;

const SaveButton = styled.button`
  border: 0.2rem solid var(--color-blue-100);
  padding: 0.38rem 1.3rem 0.52rem 1.2rem;
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-transform: capitalize;
  background-color: var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  margin-left: auto;
  color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  transition: color var(--transition-200), background var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
    background-color: transparent;

    span {
      border: 0.2rem solid var(--color-blue-100);
      border-bottom-color: var(--color-white);
    }
  }
`;

const SaveIcon = styled(IconSave)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

function ProfileModalHeader({ isPending, onClose }) {
  return (
    <Header>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <Heading>edit profile</Heading>
      {/* when saving, show a spinner */}
      <SaveButton type="submit">
        {!isPending && <SaveIcon />}
        {isPending && <SmallSpinner />} save
      </SaveButton>
    </Header>
  );
}

export default ProfileModalHeader;
