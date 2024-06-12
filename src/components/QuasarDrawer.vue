<template>
    <QDrawer
        v-model="showDrawer"
        show-if-above
        :width="200"
        :breakpoint="700"
        elevated
        data-cy="drawer"
        class="bg-primary text-white"
    >
        <QScrollArea class="fit">
            <div class="q-pa-sm">
                <div
                    v-for="n in 50"
                    :key="n"
                >
                    Drawer {{ n }} / 50
                </div>
            </div>
            <QBtn data-cy="button">
                Am I on screen?
            </QBtn>
        </QScrollArea>
    </QDrawer>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'QuasarDrawer',
    setup() {
        const showDrawer = ref(true);

        return {
            showDrawer,
        };
    },
});
</script>
