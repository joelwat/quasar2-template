<template>
  <div />
</template>

<script lang="ts">
import { Dialog } from 'quasar';
import { defineComponent, ref, onMounted } from 'vue';

// Use ReturnType to capture the actual return type from Dialog.create
type DialogChainObject = ReturnType<typeof Dialog.create>;

export default defineComponent({
    name: 'DialogWrapper',
    props: {
        component: {
            type: Object,
            required: true,
        },
        componentProps: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        const dialogRef = ref<DialogChainObject | null>(null);

        onMounted(() => {
            // Use setTimeout to ensure the component is fully mounted
            setTimeout(() => {
                dialogRef.value = Dialog.create({
                    component: props.component,
                    // props forwarded to your custom component
                    componentProps: props.componentProps,
                });
            }, 0);
        });

        return {
            dialogRef
        };
    },
});
</script>
