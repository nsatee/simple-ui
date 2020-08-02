import React from "react";
import styled from "styled-components";
import {FiX} from "react-icons/fi";
import {Button} from "../Button";
import Text from '../Text';

const Modal: React.FC<{
  children: React.ReactNode;
  title?: React.ReactNode;
}> = ({children, title = null}) => {
  return (
    <Box>
      <Header>
        <Text as="h3">{title}</Text>
        <Button buttonType="ghost" sizeType="xs" colorType="error">
          <FiX/>
        </Button>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Action>
          <Button colorType="error" buttonType="ghost">
            Cancel
          </Button>
          <Button>Accept</Button>
        </Action>
      </Footer>
    </Box>
  );
};

const Content = styled.div`
  padding: ${({theme}) => theme.spacing.md} 0;
`;

const Action = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${({theme}) => theme.spacing.sm};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({theme}) => theme.spacing.sm};
  padding-top: ${({theme}) => theme.spacing.sm};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme}) => theme.spacing.md};
`;

const Box = styled.div`
  background-color: ${({theme}) => theme.colors.background.light};
  padding: ${({theme}) => theme.spacing.md};
  width: 90vw;
  max-width: 500px;
  border-radius: 8px;
  ${({theme}) => theme.shadow.long}
`;

export default Modal;
