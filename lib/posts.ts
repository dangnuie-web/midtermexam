import { gql } from 'graphql-request';
import { graphqlClient } from './graphql-client';

export interface Post {
  _id: string;
  title: string;
  writer: string;
  createdAt: string;
  images: string[];
  contents: string;
}

const BOARD_FIELDS = gql`
  fragment BoardFields on Board {
    _id
    title
    writer
    contents
    images
    createdAt
  }
`;

const FETCH_BOARDS = gql`
  ${BOARD_FIELDS}
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      ...BoardFields
    }
  }
`;

const FETCH_BOARD = gql`
  ${BOARD_FIELDS}
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      ...BoardFields
    }
  }
`;

const CREATE_BOARD = gql`
  ${BOARD_FIELDS}
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      ...BoardFields
    }
  }
`;

const UPDATE_BOARD = gql`
  ${BOARD_FIELDS}
  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {
      ...BoardFields
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const FILE_STORAGE_BASE_URL = 'https://storage.googleapis.com/';

export function resolveImageUrl(path: string): string {
  return path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')
    ? path
    : `${FILE_STORAGE_BASE_URL}${path}`;
}

function normalizeImages(images: string[]): string[] {
  return images.filter((image) => image.trim() !== '').map(resolveImageUrl);
}

export async function getPosts(): Promise<Post[]> {
  const data = await graphqlClient.request<{ fetchBoards: Post[] }>(FETCH_BOARDS, { page: 1 });
  return data.fetchBoards.map((post) => ({ ...post, images: normalizeImages(post.images) }));
}

export async function getPost(id: string): Promise<Post | undefined> {
  try {
    const data = await graphqlClient.request<{ fetchBoard: Post }>(FETCH_BOARD, { boardId: id });
    return { ...data.fetchBoard, images: normalizeImages(data.fetchBoard.images) };
  } catch {
    return undefined;
  }
}

export async function addPost(data: {
  title: string;
  writer: string;
  contents: string;
  password: string;
  images: string[];
}): Promise<Post> {
  const result = await graphqlClient.request<{ createBoard: Post }>(CREATE_BOARD, {
    createBoardInput: {
      title: data.title,
      writer: data.writer,
      contents: data.contents,
      password: data.password,
      images: data.images,
    },
  });
  return result.createBoard;
}

export async function updatePost(
  id: string,
  password: string,
  data: {
    title: string;
    contents: string;
    images: string[];
  }
): Promise<Post> {
  const result = await graphqlClient.request<{ updateBoard: Post }>(UPDATE_BOARD, {
    boardId: id,
    password,
    updateBoardInput: {
      title: data.title,
      contents: data.contents,
      images: data.images,
    },
  });
  return result.updateBoard;
}

export async function deletePost(id: string): Promise<void> {
  await graphqlClient.request(DELETE_BOARD, { boardId: id });
}
