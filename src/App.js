import React from "react";
import styled from "styled-components";

import Form from "./components/Form/Form";

const StyledApp = styled.div`
  background-color: white;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

function App() {
  return (
    <StyledApp>
      <h1>Become a volunteer</h1>
      <Form />
    </StyledApp>
  );
}

export default App;
