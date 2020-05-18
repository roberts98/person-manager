import React, { createContext, useReducer, useEffect } from 'react';

import { getUsers } from '../services/user.service';

export interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
}

type EditUserObject = Partial<User>;

export enum Actions {
  addUsers,
  editUser,
  removeUser,
  setLoading,
  setError,
}

type SetLoadingAction = {
  type: Actions.setLoading;
  payload: boolean;
};

type SetErrorAction = {
  type: Actions.setError;
  payload: string;
};

type AddUsersAction = {
  type: Actions.addUsers;
  payload: User[];
};

type EditUserAction = {
  type: Actions.editUser;
  payload: {
    id: string;
    data: EditUserObject;
  };
};

type RemoveUserAction = {
  type: Actions.removeUser;
  payload: string;
};

type Action =
  | AddUsersAction
  | EditUserAction
  | RemoveUserAction
  | SetLoadingAction
  | SetErrorAction;
type Dispatch = (action: Action) => void;
type State = {
  users: User[];
  isLoading: boolean;
  error: string;
};

const initialState = {
  users: (JSON.parse(window.localStorage.getItem('users')!) as User[]) || [],
  isLoading: false,
  error: '',
};

const UserContext = createContext<{ state: State; dispatch: Dispatch }>({
  state: initialState,
  dispatch: () => null,
});

function updateUsersLs(users: User[]): void {
  window.localStorage.setItem('users', JSON.stringify(users));
}

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.setLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case Actions.addUsers:
      updateUsersLs(action.payload);

      return {
        ...state,
        users: action.payload,
      };

    case Actions.editUser:
      const updatedUsers = state.users.map((user) => {
        if (user.login.uuid === action.payload.id) {
          return {
            ...user,
            ...action.payload.data,
          };
        } else {
          return user;
        }
      });
      updateUsersLs(updatedUsers);

      return { ...state, users: updatedUsers };

    case Actions.removeUser:
      const newUsers = state.users.filter((user) => user.login.uuid !== action.payload);
      updateUsersLs(newUsers);

      return { ...state, users: newUsers };

    default:
      return state;
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: Actions.setLoading, payload: true });
        const response = await getUsers();
        const users = response.data.results as User[];
        dispatch({ type: Actions.addUsers, payload: users });
        dispatch({ type: Actions.setLoading, payload: false });
      } catch (error) {
        dispatch({ type: Actions.setLoading, payload: false });
        dispatch({ type: Actions.setError, payload: 'Something went wrong' });
      }
    }

    if (state.users.length === 0) {
      fetchData();
    }
  }, [state.users]);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
