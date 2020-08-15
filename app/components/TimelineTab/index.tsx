import React, { useState, useEffect } from 'react';
import { Collapse, Alert } from 'antd';
import Timeline from '../Timeline';
import SearchOptions from './SearchOptions';
import searchService from '../../lib/renderer/Search';
import SelectorUser from './SelectorUser';
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

  const [usersGetted, setUsersGetted] = useState<User[]>([]);

  const [selectUserExpanded, setSelectUserExpanded] = useState('');

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  const onSearchSubmit = (values: FormValues) => {
    setSeach(values);
    console.log(values);
  };

  const expandSelectUser = (isExpanded: boolean) => {
    setSelectUserExpanded(isExpanded ? 'userSelect' : '');
  };

  const onSelectUser = (user: User) => {
    setUserSelected(user);
    console.log(`Selected user: ${user}`);
    expandSelectUser(false);
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
          const users = await searchService.searchAnyuser(search.searchData);
          setUsersGetted(users);
          expandSelectUser(true);
          break;
        }
        default:
          break;
      }
      setHasError(false);
      setErrorMsg('');
    } catch (error) {
      console.log('Error');
      setHasError(true);
      setErrorMsg(error.message);
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
          showIcon
          type="error"
          message={errorMsg}
          closable
          afterClose={() => setHasError(false)}
        />
      ) : null}
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Search options" key="1">
          <SearchOptions onSubmit={onSearchSubmit} />
          <Collapse activeKey={selectUserExpanded}>
            <Panel header="Select user" key="userSelect">
              <SelectorUser users={usersGetted} onSelect={onSelectUser} />
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="Timeline" key="2">
          {hasError || !userSelected ? null : (
            <Timeline user_id={userSelected?.id_str} />
          )}
        </Panel>
      </Collapse>
    </>
  );
}
