<template>
  <QLayout>
    <component
      :is="component"
      v-bind="$attrs"
    />
  </QLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LayoutContainer',
    inheritAttrs: false,
    props: {
        component: {
            type: Object,
            required: true,
        },
    },
});
</script>
