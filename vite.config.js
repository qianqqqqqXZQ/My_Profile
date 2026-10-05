import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isGitHubPagesBuild = env.GITHUB_ACTIONS === 'true'

  return {
    plugins: [react()],
    base: isGitHubPagesBuild ? '/My_Profile/' : '/',
    assetsInclude: ['**/*.glb'],
  }
})
