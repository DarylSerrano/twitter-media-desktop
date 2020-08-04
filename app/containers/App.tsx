import React, { ReactNode } from 'react';
import AppLayout from '../components/AppLayout';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return <AppLayout>{children}</AppLayout>;
}
