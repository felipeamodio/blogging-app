// styles.ts
import styled from 'styled-components/native';

export const PostCard = styled.View`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  shadow-color: #000;
  height: 100px;
  shadow-offset: {
    width: 0;
    height: 2px;
  };
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const PostContent = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

export const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PostAuthor = styled.Text`
  font-size: 12px;
  color: #888;
`;

export const PostDate = styled.Text`
  font-size: 12px;
  color: #888;
`;