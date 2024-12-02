export function getProfilePicUrl(authUser) {
  return (
    ((authUser?.profilePic?.includes("https://") ||
      authUser?.profilePic?.includes("http://")) &&
      authUser?.profilePic) ||
    `http://localhost:8000/${authUser?.profilePic}`
  );
}
