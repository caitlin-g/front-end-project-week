import axios from "axios";

export const NOTES_FETCH_START = "NOTES_FETCH_START";
export const NOTES_FETCH_COMPLETE = "NOTES_FETCH_COMPLETE";
export const NOTES_FETCH_ERROR = "NOTES_FETCH_ERROR";
export const NOTES_DELETE_START = "NOTES_DELETE_START";
export const NOTES_DELETE_COMPLETE = "NOTES_DELETE_COMPLETE";
export const NOTES_DELETE_ERROR = "NOTES_DELETE_ERROR";
export const NOTES_ADD_START = "NOTES_ADD_START";
export const NOTES_ADD_COMPLETE = "NOTES_ADD_COMPLETE";
export const NOTES_ADD_ERROR = "NOTES_ADD_ERROR";
export const SET_UPDATE_NOTE = "SET_UPDATE_NOTE";
export const NOTES_UPDATE_START = "NOTES_UPDATE_START";
export const NOTES_UPDATE_COMPLETE = "NOTES_UPDATE_COMPLETE";
export const NOTES_UPDATE_ERROR = "NOTES_UPDATE_ERROR";

export const getNotes = () => {
  return dispatch => {
    dispatch({ type: NOTES_FETCH_START });
    axios
      .get("http://localhost:3300/api/notes")
      .then(response => {
        console.log("RESPONSE DATA", response);
        dispatch({ type: NOTES_FETCH_COMPLETE, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: NOTES_FETCH_ERROR, payload: err });
      });
  };
};

export const addNewNote = note => dispatch => {
  dispatch({ type: NOTES_ADD_START });

  axios
    .post("http://localhost:3300/api/notes", note)
    .then(response => {
      dispatch({ type: NOTES_ADD_COMPLETE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: NOTES_ADD_ERROR, payload: err });
    });
};

export const setUpdateNote = id => {
  return {
    type: SET_UPDATE_NOTE,
    payload: id
  };
};

export const updateNote = note => dispatch => {
  dispatch({ type: NOTES_UPDATE_START });
  axios
    .put(`http://localhost:3300/api/notes/${note.id}`, note)
    .then(response => {
      dispatch({ type: NOTES_UPDATE_COMPLETE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: NOTES_UPDATE_ERROR, payload: err });
    });
};

export const deleteNote = id => dispatch => {
  dispatch({ type: NOTES_DELETE_START });
  axios
    .delete(`http://localhost:3300/api/notes/${id}`)
    .then(response => {
      console.log(response);
      dispatch({ type: NOTES_DELETE_COMPLETE, payload: response.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: NOTES_DELETE_ERROR, payload: err });
    });
};
