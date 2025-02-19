// styles.ts
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

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

export const SearchInput = styled.TextInput`
    width: 300px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #ff3b30;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonNewPost = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const ButtonModal = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #007aff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ButtonTextCreatePost = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Search = styled.View`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export const PostsContainer = styled.View`
  width: 390px;
  margin-bottom: 20px;
`;

export const PostsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 20px;
  color: #ffffff;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
`;

export const ActivityIndicatorStyled = styled(ActivityIndicator)`
  color: #ffffff;
`;

export const RightActions = styled.View`
    flex-direction: row;
`;

export const EmptyPost = styled.Text`
    color: #FFFFFF;
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
    margin-bottom: 50px;
`;

export const ContainerHeaderModal = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;