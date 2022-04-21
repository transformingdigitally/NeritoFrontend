export const simpleAction = () => (dispatch) => {
  dispatch({
    type: "TEST_ACTION",
    payload: "result_of_Test_action",
  });
};
