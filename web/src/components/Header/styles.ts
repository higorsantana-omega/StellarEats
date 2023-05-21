import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;

  background: #ff3131;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1216px;

  .page-details {
    h1 {
      color: #111213;
      font-size: 32px;
    }

    h2 {
      color: #111213;
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`
