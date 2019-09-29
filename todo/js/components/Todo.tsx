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

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';

import React, {useState, SyntheticEvent} from 'react';
import {graphql} from 'react-relay';
import classnames from 'classnames';
import {Todo_todo} from 'relay/Todo_todo.graphql';
import {Todo_user} from 'relay/Todo_user.graphql';
import { useRelayEnvironment, useFragment } from 'relay-experimental';

type Props = {
  todo: Todo_todo,
  user: Todo_user,
};

const Todo = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const environment = useRelayEnvironment();
  const todo = useFragment(graphql`
    fragment Todo_todo on Todo {
      complete
      id
      text
    }
  `, props.todo);
  const user = useFragment(graphql`
    fragment Todo_user on User {
      id
      userId
      totalCount
      completedCount
    }
  `, props.user);

  const handleCompleteChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatusMutation.commit(environment, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    RenameTodoMutation.commit(environment, text, todo);
  };

  const removeTodo = () =>
    RemoveTodoMutation.commit(environment, todo, user);

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
