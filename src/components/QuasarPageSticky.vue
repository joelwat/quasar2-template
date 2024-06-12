<template>
    <QPageSticky
        position="bottom-right"
        :offset="[18, 18]"
    >
        <QBtn
            data-cy="button"
            rounded
            color="accent"
            icon="arrow_forward"
        >
            {{ title }}
        </QBtn>
    </QPageSticky>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QuasarPageSticky',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
});
</script>
