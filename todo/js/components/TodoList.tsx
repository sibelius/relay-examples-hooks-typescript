// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';

import React, { SyntheticEvent } from 'react';
import {graphql, } from 'react-relay';
import {TodoList_user} from 'relay/TodoList_user.graphql';
import { useRelayEnvironment, useRefetchableFragment } from 'relay-experimental';
type Todos = TodoList_user['todos'];
type Edges = Todos['edges'];
type Edge = Edges['0'];
type Node = Edge['node'];

const Scheduler = require('scheduler');

type Props = {
  user: TodoList_user,
};

const TodoList = (props: Props) => {
  const environment = useRelayEnvironment();

  const [user, refetch] = useRefetchableFragment(graphql`
    fragment TodoList_user on User 
    @refetchable(queryName: "TodoListRefetchQuery")
    @argumentDefinitions(
      first: { type: Int, defaultValue: 3 }
      after: { type: String }
    ) {
      id
      todos(
        first: $first, after: $after
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            ...Todo_todo
          }
        }
      }
      id
      userId
      totalCount
      completedCount
      ...Todo_user
    }
  `, props.user);

  console.log('user: ', props.user, user);

  const {todos, totalCount, completedCount} = user;

  const handleMarkAllChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;

    if (todos) {
      MarkAllTodosMutation.commit(environment, complete, todos, user);
    }
  };

  const nodes: ReadonlyArray<Node> =
    todos && todos.edges
      ? todos.edges
          .filter(Boolean)
          .map((edge: Edge) => edge.node)
          .filter(Boolean)
      : [];

  const onRefetch = () => {
    Scheduler.unstable_runWithPriority(Scheduler.unstable_NormalPriority, () => {
      refetch({
        id: user.id,
      });
    });

    // Scheduler.unstable_runWithPriority(Scheduler.unstable_LowPriority, () => {
    //   refetch({
    //     id: user.id,
    //   });
    // });

    // Scheduler.unstable_runWithPriority(Scheduler.unstable_ImmediatePriority, () => {
    //   refetch({
    //     id: user.id,
    //   });
    // });

    // Scheduler.unstable_runWithPriority(Scheduler.unstable_UserBlockingPriority, () => {
    //   refetch({
    //     id: user.id,
    //   });
    // });
  };

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node: Node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
      <button onClick={onRefetch}>
        Refetch
      </button>
    </section>
  );
};

export default TodoList;
