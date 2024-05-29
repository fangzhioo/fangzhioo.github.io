import { useData as useData$ } from 'vitepress'
import type { TongrenTheme } from '../types/theme-tongren'

export const useData: typeof useData$<TongrenTheme.Config> = useData$
