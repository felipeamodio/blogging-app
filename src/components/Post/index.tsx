import { View, Text, StyleSheet } from 'react-native';

interface PostProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function Post({ title, content, author, createdAt }: PostProps) {
  return (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{content}</Text>
      <View style={styles.postFooter}>
        <Text style={styles.postAuthor}>Por: {author}</Text>
        <Text style={styles.postDate}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    height: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postAuthor: {
    fontSize: 12,
    color: "#888",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
});