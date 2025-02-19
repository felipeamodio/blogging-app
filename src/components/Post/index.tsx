import * as S from "./styles";

interface PostProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function Post({ title, content, author, createdAt }: PostProps) {
  return (
    <S.PostCard>
      <S.PostTitle>{title}</S.PostTitle>
      <S.PostContent>{content}</S.PostContent>
      <S.PostFooter>
        <S.PostAuthor>Por: {author}</S.PostAuthor>
        <S.PostDate>
          {new Date(createdAt).toLocaleDateString()}
        </S.PostDate>
      </S.PostFooter>
    </S.PostCard>
  );
}