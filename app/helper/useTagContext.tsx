"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  FC,
  ReactNode,
} from "react";

interface TagContextState {
  selectedTag: string;
}

type TagContextAction = { type: "SELECT_TAG"; payload: string };

const initialState: TagContextState = {
  selectedTag: "All",
};

const TagContext = createContext<
  | {
      state: TagContextState;
      selectTag: (tag: string) => void;
    }
  | undefined
>(undefined);

const tagReducer = (
  state: TagContextState,
  action: TagContextAction
): TagContextState => {
  switch (action.type) {
    case "SELECT_TAG":
      return { ...state, selectedTag: action.payload };
    default:
      return state;
  }
};

const TagProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tagReducer, initialState);

  const selectTag = (tag: string) => {
    dispatch({ type: "SELECT_TAG", payload: tag });
  };

  return (
    <TagContext.Provider value={{ state, selectTag }}>
      {children}
    </TagContext.Provider>
  );
};

const useTag = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used within a TagProvider");
  }
  return context;
};

export { TagProvider, useTag };
