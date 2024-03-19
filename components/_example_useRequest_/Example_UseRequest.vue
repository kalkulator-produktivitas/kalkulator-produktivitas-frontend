<!-- EXAMPLE ONLY. DELETE IF NOT NEEDED -->

<script setup lang="ts">
import { login } from '_service/auth/service';
import { ErrorApiResponse } from '_service/http/schema';
import { useRequest } from 'composables/useRequest';

const { data, loading, call, error } = useRequest(login);

const onLoginClick = async() => {
  try {
    const res = await call('username', 'password');
    console.log('access token: ', res.access_token);
  } catch(e) {
    if (e instanceof ErrorApiResponse) {
      console.error(`ERROR | code: ${e.code} | message: ${e.message}`)
    }
    console.error('UNKNOWN ERROR: ', (e as any)?.message ?? 'Unknown Error')
  }
}
</script>

<template>
  <div>
    <button @click="() => onLoginClick()">Login</button>
    <h1 v-if="data">{{ data.access_token }}</h1>
    <h1 v-if="error">{{ (error as any)?.message ?? 'Unknown error' }}</h1>
  </div>
  <div v-if="loading">
    <span>Loading ....</span>
  </div>
</template>