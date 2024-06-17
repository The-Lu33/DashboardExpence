import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  const jsonValue = JSON.stringify(value);
  await SecureStore.setItemAsync(key, jsonValue);
}

export async function getToken(key: string) {
  const jsonValue = await SecureStore.getItemAsync(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}
