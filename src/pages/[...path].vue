<template>
  <QPage class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <QBtn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </QPage>
</template>

<script setup lang="ts">
import {
    QPage,
    QBtn,
} from 'quasar';

defineOptions({
    name: 'ErrorNotFound',
});
</script>
