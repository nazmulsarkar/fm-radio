import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroller";
import { Container, Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import RadioList from "./RadioList";
import RadioListItemPlaceholder from "./RadioListItemPlaceholder";

export default observer(function RadioDashboard() {
  const { radioStore } = useStore();
  const { loadRadios, radioRegistry, setPagingParams, pagination } = radioStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadRadios().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (radioRegistry.size <= 1) loadRadios();
  }, [radioRegistry.size, loadRadios]);

  return (
    <Container>
      <Grid>
        <Grid.Column width="16">
          {radioStore.loadingInitial && !loadingNext ? (
            <>
              <RadioListItemPlaceholder />
              <RadioListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <RadioList />
            </InfiniteScroll>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </Container>
  );
});
