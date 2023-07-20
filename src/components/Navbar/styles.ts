import styled from 'styled-components';

export const NavbarComp = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;
border-radius: 16px; /* Set the border radius */
box-shadow: 0 0 8px orangered; /* Set the box shadow with orange color */

`;

export const Left = styled.div`
  order: 1;
`;

export const Right = styled.div`
  order: 2;
`;

