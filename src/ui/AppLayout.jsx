import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import { motion } from 'framer-motion';

const StyledAppLayout = styled(motion.div)`
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--color-grey-600);

  /* to make sure content is visible betwen the header and bottom nav */
  padding-top: 6.831rem;
  padding-bottom: 6.831rem;
  @media screen and (max-width: 450px) {
    padding-bottom: 8.6rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <Outlet />
      <MobileNav />
    </StyledAppLayout>
  );
}

export default AppLayout;
