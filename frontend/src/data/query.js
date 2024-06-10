// src/queries.js
import { gql } from '@apollo/client';

export const GET_BOOK_DATA = gql`
  query Books {
  books {
    author
    coverPhotoURL
    readingLevel
    title
  }
}
`;
