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

import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation';

import React from 'react';
import {graphql, RelayProp} from 'react-relay';
import { useFragment, useRelayEnvironment } from 'relay-experimental';
import {TodoListFooter_user} from 'relay/TodoListFooter_user.graphql';
type Todos = TodoListFooter_user['todos'];
type Edges = Todos['edges'];
type Edge = Edges['0'];

type Props = {
  user: TodoListFooter_user,
};

const TodoListFooter = (props: Props) => {
  const environment = useRelayEnvironment();

  const user = useFragment(graphql`
    fragment TodoListFooter_user on User @argumentDefinitions(
      first: { type: Int, defaultValue: 3 }
      after: { type: String }
    ) {
      id
      userId
      completedCount
      todos(
        first: $first, after: $after
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
          }
        }
      }
      totalCount
    }
  `, props.user);

  const {todos, completedCount, totalCount} = user;

  const completedEdges: ReadonlyArray<Edge | null> =
    todos && todos.edges
      ? todos.edges.filter(
          (edge: Edge | null) => edge && edge.node && edge.node.complete,
        )
      : [];

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(
      environment,
      {
        edges: completedEdges,
      },
      user,
    );
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? '' : 's'} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoListFooter;
