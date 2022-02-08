import moment from "moment";
moment.locale('sk')
moment.updateLocale("sk", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const timeFromStart = (date: undefined | string) => {
  return moment(date).startOf("minute").fromNow();
};

export const formatDate = (date: string | undefined) => {
  return moment(date).format('DD. MM. YYYY')
}

export const returnTo = (date: string | undefined) => {
  return moment(date).add(30, 'days').format('DD. MM. YYYY')

}
