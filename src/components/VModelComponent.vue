<template>
  <div>
    <span data-cy="model-value">{{ modelValue }}</span>
    <button
      data-cy="button"
      @click="
        $emit(
          'update:modelValue',
          modelValue.length > 0 ? modelValue.substring(1) : ''
        )
      "
    >
      Remove first letter
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'QuasarTooltip',
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        // eslint-disable-next-line vue/prop-name-casing
        'onUpdate:modelValue': {
            type: Function as PropType<(payload?: string) => boolean>,
            required: false,
            default: () => true,
        },
    },

    emits: { 'update:modelValue': (payload?: string): boolean => payload !== undefined },
});
</script>
