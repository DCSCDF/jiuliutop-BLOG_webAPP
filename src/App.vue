<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <router-view />
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { NMessageProvider, NDialogProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui'
</script>