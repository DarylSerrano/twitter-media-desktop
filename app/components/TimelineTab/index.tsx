import React, { useState, useEffect } from 'react';
import { Collapse, Alert } from 'antd';
import SearchOptions from './SearchOptions';
import searchService from '../../lib/renderer/Search';
import { User } from '../../interfaces/User';

const { Panel } = Collapse;

type SearchType = 'userId' | 'screenName' | 'any';

type SearchParams = {
  searchType: SearchType;
  searchData: string;
};

type FormValues = {
  searchData: string;
  searchType: SearchType;
};

export default function TimelineTab() {
  const [search, setSeach] = useState<SearchParams>({
    searchData: '',
    searchType: 'userId',
  });

  const [userSelected, setUserSelected] = useState<User | undefined>(undefined);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  const onSearchSubmit = (values: FormValues) => {
    setSeach(values);
    console.log(values);
  };

  const getUserInformation = async () => {
    try {
      switch (search.searchType) {
        case 'userId': {
          const user = await searchService.getUser({
            userId: search.searchData,
          });
          setUserSelected(user);
          break;
        }
        case 'screenName': {
          const user = await searchService.getUser({
            screenName: search.searchData,
          });
          setUserSelected(user);
          break;
        }
        case 'any': {
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log('Error');
      setHasError(true);
      setErrorMsg(JSON.stringify(error));
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      await getUserInformation();
    }

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      {hasError ? (
        <Alert
          type="error"
          message={errorMsg}
          closable
          afterClose={() => setHasError(false)}
        />
      ) : null}
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Search options" key="1">
          <SearchOptions onSubmit={onSearchSubmit} />
        </Panel>
        <Panel header="Timeline" key="2">
          <p>Timeline here</p>
          <p>{JSON.stringify(userSelected)}</p>
        </Panel>
      </Collapse>
    </>
  );
}
