<template>
    <QPage class="row items-center justify-evenly">
        <ExampleComponent
            :title="t('title')"
            active
            :todos="todos"
            :meta="meta"
        />
    </QPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { definePage } from 'vue-router/auto';
import ExampleComponent from '@/components/ExampleComponent.vue';
import type { Todo, Meta } from '@/components/models';

definePage({
    name: 'index',
    path: '/',
});

const { t } = useI18n();

const todos = ref<Todo[]>([
    {
        id: 1,
        content: 'ct1',
    },
    {
        id: 2,
        content: 'ct2',
    },
    {
        id: 3,
        content: 'ct3',
    },
    {
        id: 4,
        content: 'ct4',
    },
    {
        id: 5,
        content: 'ct5',
    },
]);
const meta = ref<Meta>({
    totalCount: 1200,
});
</script>
