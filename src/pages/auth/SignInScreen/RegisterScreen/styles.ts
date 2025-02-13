import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: "100%";
  height: 50px;
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 8px;
  padding-horizontal: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  width: "100%";
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