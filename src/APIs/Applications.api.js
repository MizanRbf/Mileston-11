export const myApplicationsPromise = (email) => {
  return fetch(
    `https://career-code-server-omega.vercel.app/applications?email=${email}`
  ).then((res) => res.json());
};