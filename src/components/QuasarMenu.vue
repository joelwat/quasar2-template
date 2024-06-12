<template>
    <QBtn
        data-cy="open-menu-btn"
        label="Open menu"
    >
        <QMenu>
            <QList>
                <QItem
                    v-close-popup
                    clickable
                >
                    <QItemSection>Item 1</QItemSection>
                </QItem>
                <QItem
                    v-close-popup
                    clickable
                >
                    <QItemSection>Item 2</QItemSection>
                </QItem>
            </QList>
        </QMenu>
    </QBtn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QuasarMenu',
});
</script>
