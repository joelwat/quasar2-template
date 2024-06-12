<template>
    <QDate
        v-model="date"
        data-cy="date-picker"
    />

    <div>
        <QInput
            v-model="date"
            label="Scegli data"
        >
            <template #append>
                <q-btn
                    data-cy="open-date-picker-popup-button"
                    icon="event"
                    flat
                    round
                    @click="dateDialogRef.show()"
                />
            </template>
        </QInput>
        <QDialog ref="dateDialogRef">
            <QDate
                v-model="date"
                @update:model-value="dateDialogRef.hide()"
            />
        </QDialog>
    </div>

    <span data-cy="date-value">{{ date }}</span>
</template>

<script lang="ts">
import type { QDialog } from 'quasar';
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'QuasarDate',
    setup() {
        const date = ref('');
        const dateDialogRef = ref();

        return {
            date,
            dateDialogRef,
        };
    },
});
</script>
