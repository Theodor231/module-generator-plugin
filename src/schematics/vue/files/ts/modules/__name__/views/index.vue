<script lang="ts">
import Vue from "vue";
import API from "@/api/API";
import store from "@/store";
import { Dictionary } from "vue-router/types/router";
import tablePagination from "@/mixins/table-pagination";
import tableFilters from "@/mixins/table-filters";
import { parseArrayParams } from "@/services/helpers";

export default Vue.extend({
  name: "Cities",

  mixins: [tablePagination, tableFilters],

  data: () => ({
    parseArrayParams,
    filter: {} as Dictionary<string | (string | null)[]>,
    headers: [] as Array<any>,
    items: [] as Array<any>,
    loading: false as boolean,
    showMenu: false,
    x: 0,
    y: 0,
    activeItemId: null
  }),

  async beforeRouteEnter(to, from, next) {
    try {
      const params = {
        filter: to.query,
        page: {
          number: to.params.page,
          size: 50
        }
      };
      const response = await API.<%= lowerCase(name) %>().getData(params);

      next(vm => {
        vm.setFilters(params.filter);
        vm.setServerResponse(response);
      });
    } catch (e) {
      await store.dispatch("alert/showError", e.message);
    }
  },

  methods: {
    async loadData(): Promise<void> {
      this.loading = true;
      try {
        const response = await this.$API.<%= lowerCase(name) %>().getData({
          filter: this.parseArrayParams(this.filter),
          page: this.pagination,
          sort: this.getSortParams()
        });
        this.setServerResponse(response);
      } catch (e) {
        await this.$store.dispatch("alert/showError", e.message);
      }
      this.loading = false;
    },
    async deleteRow(id: number): Promise<void> {
      this.loading = true;
      try {
        await this.$API.<%= lowerCase(name) %>().delete(id);
        await this.$store.dispatch(
          "alert/showSuccess",
          this.$t("global-alert.successful_removal")
        );
        await this.loadData();
      } catch (e) {
        await this.$store.dispatch("alert/showError", e.message);
      }
      this.loading = false;
    },
    setFilters(filter: Dictionary<string | (string | null)[]>): void {
      const newFilters = this.getAvailableFilters(filter);
      if (Object.keys(newFilters).length) {
        this.showFilters = true;
      }

      this.filter = newFilters;
      this.changeActiveFilters();
    },
    setServerResponse({ items, headers }: any) {
      this.headers = [
        ...headers,
        {
          text: "",
          value: "actions",
          width: "100px",
          align: "center",
          sortable: false
        }
      ];
      this.items = items.data;
      this.totalItems = items.total;
    },
    showContextMenu(e: any, item: any) {
      this.activeItemId = item.item.id;
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
  }
});
</script>

<template>
  <div>
    <v-card class="elevation-4">
      <v-card-text>
        <v-row class="mb-2">
          <v-col cols="9" align-self="center">
            <v-btn
              depressed
              outlined
              class="pl-2 pr-3"
              link
              to="/<%= lowerCase(name) %>/create"
              color="primary"
            >
              <v-icon>mdi-view-grid-plus</v-icon>
              <span class="ml-2 body-2 text-normalize">
                {{ $t("<%= lowerCase(name) %>.buttons.create") }}
              </span>
            </v-btn>
          </v-col>
          <v-col cols="3" align-self="center" class="d-flex justify-end">
            <v-btn
              class="mr-2 mt-1"
              @click="loadData()"
              icon
              :title="$t('global-buttons.reload')"
            >
              <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn
              class="mr-2 mt-1"
              @click="toggleFilters()"
              icon
              :title="$t('global-buttons.filters')"
            >
              <v-badge
                :value="activeFilters"
                :content="activeFilters"
                offset-x="12"
                offset-y="8"
              >
                <v-icon :color="showFilters ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-badge>
            </v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-if="showFilters">
            <v-divider></v-divider>
            <v-row class="my-2">
              <v-col cols="12" class="py-0 mb-1 title font-weight-bold">
                {{ $t("global-buttons.filters") }}
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-row>
                  <v-col cols="12" sm="12" lg="4">
                    <v-text-field
                      hide-details
                      v-model="filter.name_ro"
                      @keyup.enter="applyFilters"
                      :label="$t('<%= lowerCase(name) %>.form.fields.name_ro')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" lg="4">
                    <v-text-field
                      hide-details
                      v-model="filter.name_en"
                      @keyup.enter="applyFilters"
                      :label="$t('<%= lowerCase(name) %>.form.fields.name_en')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" lg="4">
                    <v-text-field
                      hide-details
                      v-model="filter.name_ru"
                      @keyup.enter="applyFilters"
                      :label="$t('<%= lowerCase(name) %>.form.fields.name_ru')"
                    />
                  </v-col>
                  <v-col cols="12" class="my-2 py-0 d-flex justify-end">
                    <v-btn text class="mr-2" @click="resetFilters()">
                      {{ $t("global-buttons.reset") }}
                    </v-btn>
                    <v-btn outlined color="primary" @click="applyFilters()">
                      {{ $t("global-buttons.apply") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
        <v-card outlined class="table-container">
          <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
            transition="scale-transition"
          >
            <v-list class="pa-0 pt-1">
              <v-list-item
                class="d-flex flex-column pa-0 align-start"
                style="min-height: 5px"
              >
                <div class="d-flex justify-start">
                  <v-btn
                    :title="$t('global-buttons.edit')"
                    link
                    :to="`/<%= lowerCase(name) %>/edit/${activeItemId}`"
                    text
                    small
                  >
                    <v-icon size="16">
                      mdi-pencil
                    </v-icon>
                    <span class="text--accent-1">
                      {{ $t("global-buttons.edit") }}
                    </span>
                  </v-btn>
                </div>
                <div class="d-flex justify-center">
                  <v-btn
                    :title="$t('global-buttons.delete')"
                    v-confirm="{
                      title: $t('global-alert.deletion_title'),
                      message: $t('global-alert.deletion_text'),
                      callback: () => {
                        deleteRow(activeItemId);
                      }
                    }"
                    color="error"
                    text
                    small
                  >
                    <v-icon size="16">
                      mdi-delete
                    </v-icon>
                    <span class="text--accent-1">
                      {{ $t("global-buttons.delete") }}
                    </span>
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-data-table
            dense
            :items="items"
            :headers="headers"
            :loading="loading"
            :footer-props="{
              'items-per-page-options': itemsPerPageOptions
            }"
            :items-per-page.sync="pagination.size"
            :page.sync="pagination.number"
            :server-items-length="totalItems"
            :sort-by.sync="sort.sortBy"
            :sort-desc.sync="sort.sortDesc"
            @update:page="changePage()"
            @update:sort-desc="debouncedLoadData(100)"
            @update:sort-by="debouncedLoadData(100)"
            @update:items-per-page="debouncedLoadData(100)"
            @contextmenu:row="showContextMenu"
          >
            <template
              v-for="(header, headerIndex) in headers"
              v-slot:[`item.${header.value}`]="{ item }"
            >
              <v-tooltip max-width="500" :key="headerIndex" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    v-on="on"
                    class="d-inline-block text-truncate"
                    style="max-width: 200px;"
                    >{{ item[header.value] }}
                  </span>
                </template>
                <span>{{ item[header.value] }} </span>
              </v-tooltip>
            </template>
            <template #item.actions="{ item }" class="actions-div">
              <div class="d-flex text-center actions-div">
                <div class="d-flex justify-center">
                  <v-btn
                    :title="$t('global-buttons.edit')"
                    link
                    :to="`/<%= lowerCase(name) %>/edit/${item.id}`"
                    x-small
                    fab
                    text
                  >
                    <v-icon size="16">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </div>
                <div class="d-flex justify-center">
                  <v-btn
                    :title="$t('global-buttons.delete')"
                    v-confirm="{
                      title: $t('global-alert.deletion_title'),
                      message: $t('global-alert.deletion_text'),
                      callback: () => {
                        deleteRow(item.id);
                      }
                    }"
                    x-small
                    fab
                    color="error"
                    text
                  >
                    <v-icon size="16">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.table-container {
  th {
    min-width: 125px;
  }
}
.table-container td {
  white-space: nowrap !important;
}
.table-container::v-deep td:not(:last-child),
.table-container::v-deep th:not(:last-child) {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
.rent-prices th {
  width: 8em;
}

.table-container::v-deep {
  .actions-div {
    width: 1em !important;
  }
}
</style>
