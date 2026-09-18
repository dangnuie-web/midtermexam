import { API_GRAPHQL_ENDPOINT } from './graphql-client';

const UPLOAD_FILE_MUTATION = `
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('operations', JSON.stringify({ query: UPLOAD_FILE_MUTATION, variables: { file: null } }));
  formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
  formData.append('0', file);

  const response = await fetch(API_GRAPHQL_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0]?.message ?? '이미지 업로드에 실패했습니다.');
  }
  return result.data.uploadFile.url as string;
}
