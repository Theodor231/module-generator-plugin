<script lang="ts">
import Vue from "vue";
import rules from "@/services/helpers/validation-rules";

export default Vue.extend({
  name: "Create",

  data: () => ({
    rules,
    model: {},
    errorMessages: {} as { [value: string]: Array<string> }
  }),

  methods: {
    async submit(): Promise<void> {
      try {
        if ((this.$refs.form as Vue).validate()) {
          await this.$API.<%= lowerCase(name) %>().create({ ...this.model });
          await this.$router.push("/cities");
          await this.$store.dispatch(
            "alert/showSuccess",
            this.$t("global-alert.successful_create")
          );
        }
      } catch (e) {
        if (e.hasOwnProperty("errors")) {
          this.errorMessages = e.errors;

          setTimeout(() => {
            this.errorMessages = {};
          }, 2000);
        }
        await this.$store.dispatch("alert/showError", e.message);
      }
    }
  }
});
</script>

<template>
  <div class="fill-height d-flex justify-center">
    <div class="content full-width">
      <div class="text-h5 mb-sm-4 pa-4 pa-sm-0 primary--text">
        <span>
          {{ $t("<%= lowerCase(name) %>.form.header.create") }}
        </span>
      </div>
      <v-card class="elevation-4 pa-4" width="100%">
        <v-card-text class="pa-0">
          <v-form
            lazy-validation
            ref="form"
            class="d-flex flex-column justify-center"
          >
            <v-row class="pt-6 mx-2">
              <v-col class="py-1" cols="12">
                <v-text-field
                  v-model="model.name_ro"
                  @keyup.enter="submit"
                  :rules="[rules.required(''), rules.min(2), rules.max(255)]"
                  :label="`${$t('<%= lowerCase(name) %>.form.fields.name_ro')}*`"
                  :error-messages="errorMessages.name_ro"
                />
              </v-col>
              <v-col class="py-1" cols="12">
                <v-text-field
                  v-model="model.name_en"
                  @keyup.enter="submit"
                  :rules="[rules.required(''), rules.min(2), rules.max(255)]"
                  :label="`${$t('<%= lowerCase(name) %>.form.fields.name_en')}*`"
                  :error-messages="errorMessages.name_en"
                />
              </v-col>
              <v-col class="py-1" cols="12">
                <v-text-field
                  v-model="model.name_ru"
                  @keyup.enter="submit"
                  :rules="[rules.required(''), rules.min(2), rules.max(255)]"
                  :label="`${$t('<%= lowerCase(name) %>.form.fields.name_ru')}*`"
                  :error-messages="errorMessages.name_ru"
                />
              </v-col>
            </v-row>
            <v-row class="actions">
              <v-col class="pa-2 d-flex align-center">
                <span class="caption">
                  {{ $t("global-validation.is_required") }}
                </span>
                <v-spacer></v-spacer>
                <v-btn link to="/cities" text>
                  {{ $t("global-buttons.cancel") }}
                </v-btn>
                <v-btn @click="submit" color="primary" depressed class="ml-2">
                  {{ $t("global-buttons.confirm") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  max-width: 1000px;
}
.actions {
  margin: 4px;
  bottom: 0;
  right: 0;
}
.autocomplete {
  &::v-deep {
    .v-label {
      top: 12px !important;
    }
    .v-input__append-inner {
      margin-top: 8px !important;
    }
  }
}
</style>
