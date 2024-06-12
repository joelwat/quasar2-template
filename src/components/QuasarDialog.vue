<template>
    <!-- notice dialogRef here -->
    <QDialog
        ref="dialogRef"
        @hide="onDialogHide"
    >
        <QCard>
            <QCardSection>{{ message }}</QCardSection>

            <!-- buttons example -->
            <QCardActions align="right">
                <QBtn
                    data-cy="ok-button"
                    color="primary"
                    label="OK"
                    @click="onOKClick"
                />
                <QBtn
                    color="primary"
                    label="Cancel"
                    @click="onCancelClick"
                />
            </QCardActions>
        </QCard>
    </QDialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QuasarDialog',
    props: {
        message: {
            type: String,
            required: true,
        },
    },

    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    emits: useDialogPluginComponent.emits,

    setup() {
    // REQUIRED; must be called inside of setup()
        const {
            dialogRef, onDialogHide, onDialogOK, onDialogCancel,
        } = useDialogPluginComponent();
        // dialogRef      - Vue ref to be applied to QDialog
        // onDialogHide   - Function to be used as handler for @hide on QDialog
        // onDialogOK     - Function to call to settle dialog with "ok" outcome
        //                    example: onDialogOK() - no payload
        //                    example: onDialogOK({ /*.../* }) - with payload
        // onDialogCancel - Function to call to settle dialog with "cancel" outcome

        return {
            // This is REQUIRED;
            // Need to inject these (from useDialogPluginComponent() call)
            // into the vue scope for the vue html template
            dialogRef,
            onDialogHide,

            // other methods that we used in our vue html template;
            // these are part of our example (so not required)
            onOKClick() {
                // on OK, it is REQUIRED to
                // call onDialogOK (with optional payload)
                onDialogOK();
                // or with payload: onDialogOK({ ... })
                // ...and it will also hide the dialog automatically
            },

            // we can passthrough onDialogCancel directly
            onCancelClick: onDialogCancel,
        };
    },
});
</script>
