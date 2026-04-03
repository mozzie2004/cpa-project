import type { api as ApiType, setApiLang as SetApiLangType } from './api';

function mockFetch(body: unknown, ok = true, status = 200) {
  return vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(body)
    } as unknown as Response)
  );
}

let api: typeof ApiType;
let setApiLang: typeof SetApiLangType;

const BASE_URL = 'https://test-api.example.com';
const API_KEY = 'test-api-key';

beforeEach(async () => {
  vi.stubEnv('VITE_BASE_URL', BASE_URL);
  vi.stubEnv('VITE_API_KEY', API_KEY);
  vi.resetModules();

  const module = await import('./api');
  api = module.api;
  setApiLang = module.setApiLang;

  setApiLang('en');
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('api.postForm', () => {
  it('sends POST request with form data and returns response', async () => {
    const formPayload = {
      name: 'John',
      method: 'telegram' as const,
      contact: '@john'
    };
    const mockResponse = {
      message: 'Success',
      data: formPayload
    };
    globalThis.fetch = mockFetch(mockResponse);

    const result = await api.postForm(formPayload);

    expect(globalThis.fetch).toHaveBeenCalledWith(`${BASE_URL}/en/form`, {
      headers: expect.objectContaining({
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(formPayload)
    });
    expect(result).toEqual(mockResponse);
  });
});

describe('setApiLang', () => {
  it('switches language used in request URLs', async () => {
    const mockData = {
      description: 'Russian description',
      tiles: [{ title: 'Tile', text: 'Text' }]
    };
    globalThis.fetch = mockFetch(mockData);

    setApiLang('ru');
    await api.getTasks();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/ru/tasks`,
      expect.any(Object)
    );
  });

  it('affects all subsequent requests', async () => {
    const mockBenefits = {
      title: 'Title',
      description: 'Desc',
      benefits: ['B1']
    };
    globalThis.fetch = mockFetch(mockBenefits);

    setApiLang('ru');
    await api.getBenefits();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/ru/benefits`,
      expect.any(Object)
    );
  });
});

describe('HTTP error responses', () => {
  it('throws on non-ok GET response', async () => {
    globalThis.fetch = mockFetch(null, false, 500);

    await expect(api.getTasks()).rejects.toThrow('API error: 500');
  });

  it('throws on non-ok POST response', async () => {
    globalThis.fetch = mockFetch(null, false, 400);

    const payload = {
      method: 'email' as const,
      contact: 'test@test.com'
    };
    await expect(api.postForm(payload)).rejects.toThrow('API error: 400');
  });
});
