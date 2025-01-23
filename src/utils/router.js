export const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const init = (onRoute) => {
  window.addEventListener("hashchange", () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  location.hash = nextUrl;
};
