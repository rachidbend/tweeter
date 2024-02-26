import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StyledAppLayout = styled.div``;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
