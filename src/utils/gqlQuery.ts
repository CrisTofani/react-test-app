import { gql } from "@apollo/client";

export const buildQuery = (documentId?: string) => gql`
  {
    share(id: "${documentId}") {
      identifier
      version {
        document {
          name
          artboards {
            entries {
              name
              isArtboard
              files {
                url
                height
                width
                scale
                thumbnails {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
