/**
 *
 * Another way to export directly your functional component.
 */
export const ParticipantLoginGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
};
