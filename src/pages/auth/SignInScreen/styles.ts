import styled from "styled-components/native";

export const ContainerOptions = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const ContainerButtonOptions = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #ccc;
  width: 50%;
  height: 106px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 10px;
  border-radius: 12px;
`;

export const ButtonOptionsText = styled.Text`
  color: #007aff;
  font-weight: 400;
  font-size: 16px;
`;

export const TitleModal = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;