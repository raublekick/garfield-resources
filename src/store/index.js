import Vue from "vue";
import Vuex from "vuex";
import * as _ from "lodash";

Vue.use(Vuex);

var getSheet = async () => {
  const sheetUrl =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    process.env.VUE_APP_SHEET_ID +
    "/values/" +
    process.env.VUE_APP_TAB_NAME +
    "?alt=json&key=" +
    process.env.VUE_APP_GDRIVE_API_KEY;
  const response = fetch(sheetUrl).then((response) => {
    return response.json();
  });
  const result = response;
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
      for (var tab = 1; tab <= state.totalFeeds; tab++) {
        const json = await getSheet(tab);
        const rows = json.values;

        // columns will be first row of data, rows will have removed first row
        var columns = rows.shift();

        for (const row of rows) {
          const formattedRow = {};

          for (var i = 0; i < columns.length; i++) {
            var column = _.camelCase(columns[i]);
            formattedRow[column] = row[i];
          }

          state.resources.push(formattedRow);
        }
      }
    },
  },
  modules: {},
});
