import { URL } from 'url'
import { Agent } from 'http'
import HttpsProxyAgent from 'https-proxy-agent/dist/agent'

export const getUniqueElems = <T>(array: T[], num: number): T[] => {
  const set: Set<T> = new Set()
  while (set.size !== num) {
    set.add(array[Math.floor(Math.random() * array.length)])
  }
  return Array.from(set)
}

export const getAgent = (): Agent | undefined => {
  if (process.env.http_proxy) {
    const url = new URL(process.env.http_proxy)
    if (url.hostname && url.port) {
      const port = parseInt(url.port)
      if (port) {
        const proxyOpt = {
          host: url.hostname,
          port: port,
        }
        return new HttpsProxyAgent(proxyOpt) as Agent
      }
    }
  }
}

export const sleep = (msec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, msec))

export const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i)
    ;[arr[k], arr[i - 1]] = [arr[i - 1], arr[k]]
  }
  return arr
}
