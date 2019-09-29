/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { TodoListFooter_user$ref } from "./TodoListFooter_user.graphql";
import { TodoList_user$ref } from "./TodoList_user.graphql";
declare const _TodoApp_user$ref: unique symbol;
export type TodoApp_user$ref = typeof _TodoApp_user$ref;
export type TodoApp_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly " $fragmentRefs": TodoListFooter_user$ref & TodoList_user$ref;
    readonly " $refType": TodoApp_user$ref;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "kind": "Fragment",
  "name": "TodoApp_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 3
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "userId",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoListFooter_user",
      "args": (v0/*: any*/)
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoList_user",
      "args": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = 'a97d57e8eb835cc1c225388e6a6d5cdb';
export default node;
