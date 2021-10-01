interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: '',
};

config.apiUrl = process.env.API_URL ?? '';

export function useConfig(): Config {
  return config;
}
