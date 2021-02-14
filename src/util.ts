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
