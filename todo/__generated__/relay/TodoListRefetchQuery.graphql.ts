/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
declare const _TodoList_user$ref: unique symbol;
export type TodoList_user$ref = typeof _TodoList_user$ref;
export type TodoListRefetchQueryVariables = {
    readonly first?: number | null;
    readonly after?: string | null;
    readonly id: string;
};
export type TodoListRefetchQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": TodoList_user$ref;
    } | null;
};
export type TodoListRefetchQuery = {
    readonly response: TodoListRefetchQueryResponse;
    readonly variables: TodoListRefetchQueryVariables;
};



/*
query TodoListRefetchQuery(
  $first: Int = 3
  $after: String
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...TodoList_user_2HEEH6
    id
  }
}

fragment TodoList_user_2HEEH6 on User {
  id
  todos(first: $first, after: $after) {
    edges {
      node {
        id
        complete
        ...Todo_todo
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  userId
  totalCount
  completedCount
  ...Todo_user
}

fragment Todo_todo on Todo {
  complete
  id
  text
}

fragment Todo_user on User {
  id
  userId
  totalCount
  completedCount
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
  },
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
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
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TodoListRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TodoList_user",
            "args": (v2/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TodoListRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "todos",
                "storageKey": null,
                "args": (v2/*: any*/),
                "concreteType": "TodoConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Todo",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "complete",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "text",
                            "args": null,
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "todos",
                "args": (v2/*: any*/),
                "handle": "connection",
                "key": "TodoList_todos",
                "filters": null
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
                "kind": "ScalarField",
                "alias": null,
                "name": "completedCount",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TodoListRefetchQuery",
    "id": null,
    "text": "query TodoListRefetchQuery(\n  $first: Int = 3\n  $after: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...TodoList_user_2HEEH6\n    id\n  }\n}\n\nfragment TodoList_user_2HEEH6 on User {\n  id\n  todos(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        complete\n        ...Todo_todo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  userId\n  totalCount\n  completedCount\n  ...Todo_user\n}\n\nfragment Todo_todo on Todo {\n  complete\n  id\n  text\n}\n\nfragment Todo_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n}\n",
    "metadata": {
      "derivedFrom": "TodoList_user",
      "isRefetchableQuery": true
    }
  }
};
})();
(node as any).hash = 'e6f8a49ede9e5cae301fd570856a2cef';
export default node;
