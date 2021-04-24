<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <b-field>
      <b-input
        placeholder="Search..."
        type="search"
        icon="magnify"
        icon-clickable
        v-model="filter"
      >
      </b-input>
    </b-field>
    <b-table :data="filteredResources">
      <b-table-column label="Category" field="category" v-slot="props">
        {{ props.row.category }}
      </b-table-column>
      <b-table-column label="Name" field="name" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="Eligibility" field="eligibiity" v-slot="props">
        {{ props.row.eligibiity }}
      </b-table-column>
      <b-table-column label="Address" field="address" v-slot="props">
        {{ props.row.address }}
      </b-table-column>
      <b-table-column label="Hours" field="hours" v-slot="props">
        {{ props.row.hours }}
      </b-table-column>
      <b-table-column label="Phone" field="phone" v-slot="props">
        {{ props.row.phone }}
      </b-table-column>
      <b-table-column label="Website" field="website" v-slot="props">
        {{ props.row.website }}
      </b-table-column>
      <b-table-column label="Email" field="email" v-slot="props">
        {{ props.row.email }}
      </b-table-column>
      <b-table-column label="Tags" field="tags" v-slot="props">
        <span
          v-for="(tag, i) in props.row.tags.split(',')"
          :key="i"
          class="tag is-success"
        >
          {{ tag }}
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as _ from "lodash";
export default {
  name: "Home",
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    ...mapState(["resources"]),
    filteredResources() {
      var filtered = this.resources;
      if (this.filter !== "") {
        filtered = this.search(filtered, this.filter);
      }

      return filtered;
    },
  },
  methods: {
    search(collection, text) {
      return _.filter(collection, (object) => {
        var search = this.deepSearch(object, text.toLowerCase());
        return _.keys(search).length > 0;
      });
    },

    deepSearch(collection, predicate, thisArg) {
      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, thisArg);
      } else {
        var keys = _.flatten(_.tail(arguments));
        if (typeof keys === "string") {
          keys = keys.toLowerCase();
        }
        predicate = function (val) {
          if (typeof val === "string") {
            val = val.toLowerCase();
          }
          return _.includes(val, keys);
        };
      }
      var that = this;
      return _.transform(collection, function (memo, val, key) {
        var include = predicate(val, key);
        if (!include && _.isObject(val)) {
          val = that.deepSearch(val, predicate);
          include = !_.isEmpty(val);
        }
        if (include) {
          _.isArray(collection) ? memo.push(val) : (memo[key] = val);
        }
      });
    },
  },
};
</script>
