import { getAllUserIds, getUserById } from 'adapters/db/user';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { User } from 'types';
import { Layout } from '../../components/Layout';

const UserPage: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Layout>
      {user.firstName}
      <br />
      {user.lastName}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllUserIds().map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error('Required param is missing');
  }
  const user = getUserById(params.id.toString());
  return {
    props: {
      user,
    },
  };
};

export default UserPage;
