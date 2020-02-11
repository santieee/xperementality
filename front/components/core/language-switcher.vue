<template>
  <span class="lang-switcher">
    <v-switch v-model="localeComputed" :label="localesMap[locale]"></v-switch>
  </span>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LangSwitcher',
  data: () => ({
    localesMap:{
      en: 'English',
      ru: 'Русский'
    }
  }),
  computed: {
    ...mapState({
      locale: state => state.ui.locale,
      locales: state => state.ui.locales,
    }),
    localeComputed:{
      get(){
        return this.locale == 'en' ? true : false;
      },
      set(v){
        const switchToLang = v ? 'en' : 'ru';
        this.setLang(switchToLang);
        this.$i18n.locale = switchToLang;
      }
    }
  },
  methods:{
    ...mapActions({
      setLang: 'ui/setLang'
    }),
  }
};
</script>