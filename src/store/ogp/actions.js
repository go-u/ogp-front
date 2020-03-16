import { BaseRequest } from '../api'

export async function GetRanking (context) {
  const hasFetched = context.state.rankingItems.length > 0
  if (!hasFetched) {
    const rankingItems = await BaseRequest({ url: '/api/stats', method: 'get' })
      .then(res => res.data)
      .catch(err => { console.error(err) })
    context.commit('ranking', { rankingItems: rankingItems })
  }
}

export async function GetTweets (context, { fqdn }) {
  const tweets = await BaseRequest({ url: `/api/ogps/${fqdn}`, method: 'get' })
    .then(res => res.data)
    .catch(err => { console.error(err) })
  return tweets
}
