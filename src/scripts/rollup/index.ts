import { config } from '../../../vite.config'

import {
  build,
  InlineConfig,
  defineConfig,
  UserConfig,
} from 'vite'

// 全量打包
build(defineConfig(config as UserConfig) as InlineConfig)
