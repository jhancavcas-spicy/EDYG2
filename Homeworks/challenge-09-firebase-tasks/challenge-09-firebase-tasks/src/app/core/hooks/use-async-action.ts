import { signal } from '@angular/core';
import { describeError, fail, type Result } from '../firebase/firebase.helpers';

/**
 * "Custom hook" de Angular: estado de carga / error / éxito para una acción.
 *
 * Problema que resuelve: cada formulario o botón que habla con Firebase
 * necesitaba su propio `loading`, `error` y `success`, con el mismo
 * try/catch repetido. Ahora cada componente llama
 * `const action = useAsyncAction()` y usa `action.run(() => servicio.metodo())`.
 *
 * (Angular no tiene React Hooks; la adaptación idiomática es una función
 * `use*` que se llama en el contexto de inyección y devuelve signals.)
 */
export function useAsyncAction(successTimeoutMs = 4000) {
  const loading = signal(false);
  const error = signal<string | null>(null);
  const success = signal<string | null>(null);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const reset = () => {
    clearTimer();
    error.set(null);
    success.set(null);
  };

  /**
   * Ejecuta una operación que devuelve un `Result`, activa `loading` mientras
   * dura y publica el mensaje de error o de éxito.
   */
  async function run<T>(
    operation: () => Promise<Result<T>>,
    successMessage?: string,
  ): Promise<Result<T>> {
    reset();
    loading.set(true);
    let result: Result<T>;
    try {
      result = await operation();
    } catch (e) {
      const { code, message } = describeError(e);
      result = fail(code, message);
    }
    loading.set(false);

    if (result.ok) {
      if (successMessage) {
        success.set(successMessage);
        timer = setTimeout(() => success.set(null), successTimeoutMs);
      }
    } else {
      error.set(result.message);
    }
    return result;
  }

  return {
    loading: loading.asReadonly(),
    error: error.asReadonly(),
    success: success.asReadonly(),
    run,
    reset,
  };
}
