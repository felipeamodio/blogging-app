import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color:#0d0f1f;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  color: #FFFFFF;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 8px;
  padding-horizontal: 10px;
  margin-bottom: 10px;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 16;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #007aff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;