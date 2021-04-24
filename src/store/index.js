import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var getSheet = async (sheet) => {
  const sheetUrl =
    "https://spreadsheets.google.com/feeds/list/15362jwxTcCx-pYv1Jz6DS2_Ckn5tjCqSZU6Q8Z4QLFE/" +
    sheet +
    "/public/values?alt=json";
  const response = await fetch(sheetUrl);
  const result = await response.json();
  return result;
};

export default new Vuex.Store({
  state: {
    resources: [],
    totalFeeds: 1,
  },
  mutations: {},
  actions: {
    async loadData({ state }) {
      const data = [];
      for (var tab = 1; tab <= state.totalFeeds; tab++) {
        const json = await getSheet(tab);
        const rows = json.feed.entry;

        for (const row of rows) {
          const formattedRow = {};

          for (const key in row) {
            if (key.startsWith("gsx$")) {
              /* The actual row names from your spreadsheet
               * are formatted like "gsx$title".
               * Therefore, we need to find keys in this object
               * that start with "gsx$", and then strip that
               * out to get the actual row name
               */
              formattedRow[key.replace("gsx$", "")] = row[key].$t;
            }
          }

          state.resources.push(formattedRow);
        }

        console.log(
          data
        ); /* do anything you want with the reformatted data here */
      }
      // fetch(
      //   "https://spreadsheets.google.com/feeds/list/1mc3YOhcmHnVykhPrDZWtnIMg3W-6rVU1nTfIPVzouQM/1/public/values?alt=json"
      // )
      //   .then((res) => res.json())
      //   .then((json) => {
      //     const rows = json.feed.entry;

      //     for (const row of rows) {
      //       const formattedRow = {};

      //       for (const key in row) {
      //         if (key.startsWith("gsx$")) {
      //           /* The actual row names from your spreadsheet
      //            * are formatted like "gsx$title".
      //            * Therefore, we need to find keys in this object
      //            * that start with "gsx$", and then strip that
      //            * out to get the actual row name
      //            */

      //           formattedRow[key.replace("gsx$", "")] = row[key].$t;
      //         }
      //       }

      //       data.push(formattedRow);
      //     }

      //     console.log(
      //       data
      //     ); /* do anything you want with the reformatted data here */
      //   });

      // state.resources = data;
    },
  },
  modules: {},
});
