import React, { useState, useEffect } from 'react';
import { Collapse, Alert, Skeleton } from 'antd';
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
    searchType: 'screenName',
  });

  const [didMount, setDidMount] = useState(false);

  const [userSelected, setUserSelected] = useState<User | undefined>(undefined);
  const [usersGetted, setUsersGetted] = useState<User[]>([]);

  const [userSelectorPage, setUserSelectorPage] = useState(0);
  const [selectUserExpanded, setSelectUserExpanded] = useState('');

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  const onSearchSubmit = (values: FormValues) => {
    setSeach(values);
  };

  const expandSelectUser = (isExpanded: boolean) => {
    setSelectUserExpanded(isExpanded ? 'userSelect' : '');
  };

  const onSelectUser = (user: User) => {
    setUserSelected(user);
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
          expandSelectUser(false);
          break;
        }
        case 'screenName': {
          const user = await searchService.getUser({
            screenName: search.searchData,
          });
          setUserSelected(user);
          expandSelectUser(false);
          break;
        }
        case 'any': {
          const users = await searchService.searchAnyuser(search.searchData, {
            page: userSelectorPage,
          });
          setUsersGetted(users);
          expandSelectUser(true);
          setUserSelected(undefined);
          break;
        }
        default:
          break;
      }
      setHasError(false);
      setErrorMsg('');
      setUserSelectorPage(0);
    } catch (error) {
      setHasError(true);
      setErrorMsg(error.message);
    }
  };

  const onLoadMoreUser = async () => {
    const users = await searchService.searchAnyuser(search.searchData, {
      page: userSelectorPage,
    });
    if (users.length > 0) setUserSelectorPage(userSelectorPage + 1);
    setUsersGetted((oldUsers) => [...oldUsers, ...users]);
  };

  useEffect(() => {
    async function fetchUserData() {
      await getUserInformation();
    }

    if (didMount) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setDidMount(true);
  }, []);

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
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="Search options" key="1">
          <SearchOptions onSubmit={onSearchSubmit} />
          <Collapse activeKey={selectUserExpanded}>
            <Panel header="Select user" key="userSelect">
              <SelectorUser
                onLoadMore={onLoadMoreUser}
                users={usersGetted}
                onSelect={onSelectUser}
              />
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="Timeline" key="2">
          {hasError || !userSelected ? (
            <Skeleton active />
          ) : (
            <Timeline user_id={userSelected?.id_str} />
          )}
        </Panel>
      </Collapse>
    </>
  );
}
