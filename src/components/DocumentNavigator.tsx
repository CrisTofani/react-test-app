import { useQuery } from "@apollo/client";
import * as React from "react";
import { useParams } from "react-router-dom";
import { RootQueryType } from "../types";
import { buildQuery } from "../utils/gqlQuery";
import Loader from "./common/loader";
import DocumentDetail from "./DocumentDetail";

type DocumentNavigatorParams = {
  documentId: string;
};

const DocumentNavigator = () => {
  const [selecteArtboard, setSelectedArtboard] = React.useState<
    number | undefined
  >();
  const { documentId } = useParams<keyof DocumentNavigatorParams>();

  const onSelectArtboard = (id: number) => setSelectedArtboard(id);

  const query = React.useMemo(() => buildQuery(documentId), [documentId]);

  const { data, loading, error } = useQuery<RootQueryType>(query);

  return loading ? (
    <Loader />
  ) : (
    <>
      {selecteArtboard ? (
        <></>
      ) : (
        <DocumentDetail
          data={data}
          error={error}
          onThumbnailClick={onSelectArtboard}
        />
      )}
    </>
  );
};

export default DocumentNavigator;
