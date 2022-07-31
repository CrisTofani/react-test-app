import { useQuery } from "@apollo/client";
import * as React from "react";
import { useParams } from "react-router-dom";
import { queryError } from "../constants/errorMessages";
import { RootQueryType } from "../types";
import { buildQuery } from "../utils/gqlQuery";
import ArtboardViewer from "./ArtboardViewer";
import ErrorMessage from "./common/ErrorMessage";
import LoadingSpinner from "./common/Loader";
import DocumentDetail from "./DocumentDetail";

type DocumentNavigatorParams = {
  documentId: string;
};

const DocumentNavigator = () => {
  const [selectedArtboard, setSelectedArtboard] = React.useState<
    number | undefined
  >();
  const { documentId } = useParams<keyof DocumentNavigatorParams>();

  const onSelectArtboard = (id: number) => setSelectedArtboard(id);

  const onRemoveArtboard = () => setSelectedArtboard(undefined);

  const query = React.useMemo(() => buildQuery(documentId), [documentId]);

  const { data, loading, error } = useQuery<RootQueryType>(query);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={queryError} />
  ) : (
    <>
      {selectedArtboard !== undefined ? (
        <ArtboardViewer
          onClose={onRemoveArtboard}
          currentAtb={selectedArtboard}
          artboards={data?.share?.version?.document?.artboards?.entries ?? []}
          onChangeArtboard={onSelectArtboard}
        />
      ) : (
        <DocumentDetail data={data} onThumbnailClick={onSelectArtboard} />
      )}
    </>
  );
};

export default DocumentNavigator;
