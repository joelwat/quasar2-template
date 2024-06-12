<template>
    <QCheckbox
        v-model="checked"
        data-cy="checkbox"
    />
    <QToggle
        v-model="toggled"
        data-cy="toggle"
    />

    <QRadio
        v-model="selected"
        val="Value1"
        data-cy="radio-1"
    >
        Value1
    </QRadio>
    <QRadio
        v-model="selected"
        val="Value2"
        data-cy="radio-2"
    >
        Value2
    </QRadio>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'QuasarCheckboxAndToggle',
    setup() {
        const checked = ref();
        const toggled = ref();
        const selected = ref();

        return {
            checked,
            toggled,
            selected,
        };
    },
});
</script>
