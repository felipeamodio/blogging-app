import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #0d0f1f;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  color: #ffffff;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding-horizontal: 10px;
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
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

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  margin: 20px;
  width: 80%;
  height: 40%;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

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