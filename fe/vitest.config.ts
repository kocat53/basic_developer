import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  // 설정을 합칠때 사용
  viteConfig,
  // vitest 설정
  defineConfig({
    test: {
      environment: 'jsdom', // 'node': be환경 || 'jsdom': fe환경
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
