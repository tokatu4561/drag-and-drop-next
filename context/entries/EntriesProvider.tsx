import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces/entry";
import { EntriesContext } from "./EntriesContext";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

type EntriesActionType =
  | { type: "Add-Entry"; payload: Entry }
  | { type: "Update-Enrtry"; payload: Entry }
  | { type: "Refresh-Data"; payload: Entry[] };

const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "Update-Enrtry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case "Refresh-Data":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};

export const EntriesProvider: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    // const { data } = await axios.post<Entry>("/api/entries", { description });

    const entry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "Add-Entry", payload: entry });
  };

  const updateEntry = async (entry: Entry, isShowSnackBar = true) => {
    try {
      // const { _id, description, status } = entry;
      // const { data } = await axios.put<Entry>(`/api/entries/${_id}`, {
      //   description,
      //   status,
      // });

      dispatch({ type: "Update-Enrtry", payload: entry });

      if (isShowSnackBar)
        enqueueSnackbar("更新しました", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    // const { data } = await axios.get<Entry[]>("/api/entries");
    // const data = await axios.get<string>("/dummy-data.json");
    const data = await fetch("/dummy-data.json")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const entries = response.entries;
        dispatch({ type: "Refresh-Data", payload: entries });
      });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
