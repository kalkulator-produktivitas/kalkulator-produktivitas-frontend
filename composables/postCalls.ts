const global = useRuntimeConfig();


interface ApiResponse {
  response?: any; // Adjust the type based on the actual structure of your response
  error: string;
}

export default function postAPI() {
  const ok: Ref<boolean> = ref(false)
  const data = ref<any>(null);
  const error: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false);
  const poster = async (url: string, auth: object | undefined, queries: object | undefined) => {

    loading.value = true;
    const res: ApiResponse = await $fetch(`${global.public.baseURL}${url}`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-api-authorization": JSON.stringify(auth)
        },
        query: queries
      })

    if (res.error !== '') {
      ok.value = false;
      error.value = res.error;
    } else {
      ok.value = true;
      data.value = res.response;
    }
    loading.value = false;
    return {
      ok: ok.value,
      data: data.value,
      error: error.value,
    }
  }
  return { poster, ok, data, error, loading }
}