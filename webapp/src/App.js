import React, { Component } from 'react';
import './App.css';

import {
  SearchkitManager,
  SearchkitProvider,
  Layout,
  LayoutBody,
  TopBar,
  SideBar,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  HitsStats,
  SelectedFilters,
  SearchBox,
  Hits,
  RefinementListFilter
} from 'searchkit';

import 'searchkit/release/theme.css';

const sk = new SearchkitManager('http://localhost:9200')

const Tweet = (props) => (
  <div style={{padding: '1rem'}}>
    <strong>{props.result._source.user.screen_name} {props.result._source.representative.party}</strong>: {props.result._source.text}
  </div>
)

export default () => (
  <SearchkitProvider searchkit={sk}>
    <Layout>
      <TopBar>
        <SearchBox autofocus searchOnChange />
      </TopBar>

      <LayoutBody>
        <SideBar>
          <RefinementListFilter
            id="politicians"
            title="Politikere"
            field="user.name"
            size={10}
          />

          <RefinementListFilter
            id="parties"
            title="Partier"
            field="representative.party"
            size={10}
          />
        </SideBar>

        <LayoutResults>
          <ActionBar>
            <ActionBarRow>
              <HitsStats />
              <SelectedFilters />
            </ActionBarRow>
          </ActionBar>

          <Hits hitsPerPage={10} itemComponent={Tweet} />
        </LayoutResults>
      </LayoutBody>
    </Layout>
  </SearchkitProvider>
);
