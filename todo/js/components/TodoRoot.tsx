import React from 'react';
import { useLazyLoadQuery } from 'relay-experimental'
import { graphql } from "react-relay";
import TodoApp from './TodoApp';
import ErrorBoundaryWithRetry from '../ErrorBoundaryWithRetry';

const TodoRoot = () => {
  const data = useLazyLoadQuery(graphql`
    query TodoRootQuery($userId: String) {
      user(id: $userId) {
        ...TodoApp_user
      }
    }
  `, {
    // Mock authenticated ID that matches database
    userId: 'me',
  });

  return (
    <TodoApp user={data.user} />
  );
};

const TodoRootWrapper = () => {
  return (
    <ErrorBoundaryWithRetry fallback={(error) => <div>{error.message}</div>}>
      <React.Suspense fallback={<div>Loading</div>}>
        <TodoRoot />
      </React.Suspense>
    </ErrorBoundaryWithRetry>
  );
};

export default TodoRootWrapper;
