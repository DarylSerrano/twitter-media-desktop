import React from 'react';
import { List, Button, Avatar } from 'antd';
import { User } from '../../interfaces/User';

type SelectorUserProps = {
  onSelect: (user: User) => void;
  users: User[];
  onLoadMore: () => Promise<void>;
};

export default function SelectorUser({
  onSelect,
  users,
  onLoadMore,
}: SelectorUserProps) {
  const loadMoreBtn = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={() => onLoadMore()}>Load more</Button>
    </div>
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      loadMore={loadMoreBtn}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key={`select${item.id_str}`}
              type="primary"
              onClick={() => onSelect(item)}
            >
              Select
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.profile_image_url_https} />}
            title={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <a href={`https://twitter.com/${item.screen_name}`}>
                {`${item.name} @${item.screen_name}`}
              </a>
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
