import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';

const StyledAppLayout = styled.div`
  min-height: 100vh;
  min-height: 100svh;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
      <MobileNav />
    </StyledAppLayout>
  );
}

export default AppLayout;
