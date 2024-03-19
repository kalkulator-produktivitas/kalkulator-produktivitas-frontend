import { ApiSuccessResponse } from "_service/http/schema";

export type ServiceFunc<T = unknown> = (...args: any[]) => Promise<ApiSuccessResponse<T>>;

export type UnwrappedResponse<T> = T extends Promise<ApiSuccessResponse<infer U>> ? U : never;

export interface RequestState<F extends ServiceFunc> {
  data?: Ref<UnwrappedResponse<ReturnType<F>>|undefined>;
  error?: Ref<unknown>;
  loading: Ref<boolean>;
  request: (...args: Parameters<F>) => Promise<void>;
  call: (...args: Parameters<F>) => Promise<UnwrappedResponse<ReturnType<F>>>;
}

export type Resolve<T> = (data: T) => void;
export type Reject = (error: unknown) => void;

export function useRequest<
  F extends ServiceFunc = ServiceFunc,
  T extends UnwrappedResponse<ReturnType<F>> = UnwrappedResponse<ReturnType<F>>,
>(
  fn: F,
  resolve?: Resolve<T>,
  reject?: Reject,
): RequestState<F>{
  const data = ref<UnwrappedResponse<ReturnType<F>>|undefined>();
  const error = ref<unknown|undefined>();
  const loading = ref<boolean>(false);

  const request = async (...args: Parameters<F>): Promise<void> => {
    data.value = undefined;
    error.value = undefined;
    loading.value = true;

    try {
      const response = await fn(...args) as T;
      data.value = response;
      resolve?.(response);
    } catch(e) {
      error.value = e;
      reject?.(e);
    } finally {
      loading.value = false;
    }
  }

  const call = async (...args: Parameters<F>): Promise<UnwrappedResponse<ReturnType<F>>> => {
    data.value = undefined;
    error.value = undefined;
    loading.value = true;

    const response = await fn(...args) as T;
    data.value = response;
    resolve?.(response)
    return response;
  }

  return { data, loading, error, request, call };
}
