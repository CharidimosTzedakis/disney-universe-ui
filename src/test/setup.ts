import { vi, beforeAll } from 'vitest';

beforeAll(() => {
  global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn().mockReturnValue("value"),
  }));
});