import {
  GET_SETTINGS_INFO_START,
  GET_SETTINGS_INFO_SUCCESS,
  GET_SETTINGS_INFO_FAILURE,

  UPDATE_BOARD_NAME,
  UPDATE_BOARD_NAME_SUCCESS,
  UPDATE_BOARD_NAME_FAILURE,

  UPDATE_BOARD_LOGO,
  UPDATE_BOARD_LOGO_SUCCESS,
  UPDATE_BOARD_LOGO_FAILURE
} from './constants';

import {
  getAdminSettingsInfoAPI,
  updateAdminBoardNameAPI,
  updateAdminBoardLogoAPI
} from './api';

/**
 * get all the info needed for settings page
 * @return {action}
 */
export const getAdminSettingsInfo = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_SETTINGS_INFO_START });

    getAdminSettingsInfoAPI().then(
      data => dispatch({ type: GET_SETTINGS_INFO_SUCCESS, payload: data.data }),
      error => dispatch({ type: GET_SETTINGS_INFO_FAILURE, payload: error })
    )
  };
};

/**
 * update the current board name
 * @param {string} newBoardName
 * @return {action}
 */
export const updateAdminBoardName = (newBoardName) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_BOARD_NAME });

    updateAdminBoardNameAPI(newBoardName).then(
      data => {
        // After updating the board name, need to ensure it changed and then update the name in AdminHeader somehow
        dispatch({ type: GET_SETTINGS_INFO_START });
        getAdminSettingsInfoAPI().then(
          data => {
            // data is refreshed
            dispatch({type: GET_SETTINGS_INFO_SUCCESS, payload: data.data});

            // TODO: update the board name in AdminHeader here
          },
          error => dispatch({ type: GET_SETTINGS_INFO_FAILURE, payload: error })
        );

        // eventually in this branch there will be a success action returned
        dispatch({ type: UPDATE_BOARD_NAME_SUCCESS, payload: data.data })
      },
      error => dispatch({ type: UPDATE_BOARD_NAME_FAILURE, payload: error })
    );
  }
};

/**
 * update the current board logo
 * @param {string} newBoardLogoURL
 * @return {action}
 */
export const updateAdminBoardLogo = (newBoardLogoURL) => {
  dispatch({ type: UPDATE_BOARD_LOGO });

  updateAdminBoardLogoAPI(newBoardLogoURL).then(
    data => {
      // After updating the board logo, need to ensure it changed and then update the logo in AdminHeader somehow
      dispatch({ type: GET_SETTINGS_INFO_START });
        getAdminSettingsInfoAPI().then(
          data => {
            // data is refreshed
            dispatch({type: GET_SETTINGS_INFO_SUCCESS, payload: data.data});

            // TODO: update the board logo in AdminHeader or whatever here
          },
          error => dispatch({ type: GET_SETTINGS_INFO_FAILURE, payload: error })
        );

      // eventually in this branch there will be a success action returned
      dispatch({ type: UPDATE_BOARD_LOGO_SUCCESS, payload: data.data })
    },
    error => dispatch({ type: UPDATE_BOARD_LOGO_FAILURE, payload: error })
  )
};