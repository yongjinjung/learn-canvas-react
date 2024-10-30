import styled from 'styled-components';
const CardContainer = styled.div.attrs({ className: 'card-container' })`
  border: 2px solid #393939;
  padding: 24px;
  border-radius: 6px;
  ${props =>
    props.$dark &&
    `
    background-color: black;
    color: white;
    border: none;
    `}
`;

function Card() {
  return (
    <CardContainer $dark={true}>
      <h2>Styled Components</h2>
      <p>이것은 Styled-Components로 만든 카드입니다.</p>
    </CardContainer>
  );
}

export default Card;