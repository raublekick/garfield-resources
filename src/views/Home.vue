<template>
  <div class="home container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Garfield Neighborhood Resources</p>
        <p class="subtitle">Brought to you by the Garfield Site Council</p>
        <b-button @click="print()">Print</b-button>
      </div>
    </section>
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
    <b-table :data="filteredResources" detailed detail-key="name">
      <b-table-column label="Category" field="category" v-slot="props" sortable>
        {{ props.row.category }}
      </b-table-column>
      <b-table-column label="Name" field="name" v-slot="props" sortable>
        {{ props.row.name }}
      </b-table-column>
      <!-- <b-table-column label="Services" field="services" v-slot="props">
        {{ props.row.services }}
      </b-table-column>
      <b-table-column label="Eligibility" field="eligibility" v-slot="props">
        {{ props.row.eligibility }}
      </b-table-column> -->
      <b-table-column label="Address" field="address" v-slot="props">
        {{ props.row.address }}
      </b-table-column>
      <b-table-column label="Hours" field="hoursofoperation" v-slot="props">
        {{ props.row.hoursofoperation }}
      </b-table-column>
      <b-table-column label="Phone" field="phone" v-slot="props">
        {{ props.row.phone }}
      </b-table-column>
      <b-table-column label="Website" field="website" v-slot="props">
        <a :href="props.row.website" target="_blank" :title="props.row.name">{{
          props.row.website
        }}</a>
      </b-table-column>
      <b-table-column label="Email" field="email" v-slot="props">
        <a
          :href="'mailto:' + props.row.email"
          target="_blank"
          :title="props.row.name"
          v-if="props.row.email !== 'n/a' && props.row.email != ''"
          >{{ props.row.email }}
        </a>
        <span v-else>{{ props.row.email }}</span>
      </b-table-column>
      <b-table-column label="Tags" field="tags" v-slot="props">
        <span
          v-for="(tag, i) in props.row.tags.split(',')"
          :key="i"
          class="tag is-success mr-4"
        >
          {{ tag }}
        </span>
      </b-table-column>

      <template #detail="props">
        <div class="content">
          <strong>Services:</strong>
          <div>{{ props.row.services }}</div>
          <strong>Eligibility:</strong>
          <div>{{ props.row.eligibility }}</div>
        </div>
      </template>
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
    print() {
      window.print();
    },
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
