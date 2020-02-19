import React from 'react';
import styled from 'styled-components';
import IconGoogle from 'components/Common/Icons/SocialMedia/Google';
import IconFacebook from 'components/Common/Icons/SocialMedia/Facebook';

const Wrapper = styled.div`
  align-items: center;
`;

const Text = styled.div`
  box-sizing: content-box;
  border: 0;
  height: auto;
  margin-bottom: .6rem;
  outline: 0;
  position: relative;
  text-align: center;
  overflow: visible;
  :before {
    background: #eaeaea;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 100%;
  }
  :after {
    background-color: #fff;
    color: #4b4b4b;
    content: attr(data-content);
    display: inline-block;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.6rem;
    padding: 0 .5em;
    position: relative;
  }
`;

const ButtonGoogle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.6rem;
  border: 0;
  background: #fc5a5a;
  border-radius: 3rem;
  cursor: not-allowed;
  :focus {
    outline: 0;
  }
  span {
    margin-left: .4rem;
    color: white;
    font-size: .7rem;
  }
`;

const ButtonFacebook = styled(ButtonGoogle)`
  background: #3b5998;
  margin-top: 10px;
`;

const LoginSocial = () => {
  return (
    <Wrapper>
      <Text data-content="Or" />
      <ButtonGoogle>
        <IconGoogle />
        <span>Continue with Google</span>
      </ButtonGoogle>
      <ButtonFacebook>
        <IconFacebook />
        <span>Continue with Facebook</span>
      </ButtonFacebook>
    </Wrapper>
  );
};

export default LoginSocial;
