r.defineModule('succession_module', e => {
  const log = (...args) => {
    console.log(
      `%c(succession) %c${args.join('')}`,
      'color: #7950f2; font-style: bold;',
      ''
    )
  }

  //const websocketUrl = 'ws://localhost:3000'

  // This is needed as uBlock origin blocks any "cheap" domain from websockets, because why the fuck not? EasyPrivacy sucks.
  // jelbrek.com is owned and controlled by relative.
  const websocketUrl =
    'wss://api.jelbrek.com?view-the-source-to-figure-out-why-its-on-jelbrek-com'
  log('loaded succession.')
  log(`websocket url: ${websocketUrl}`)
  const api = e('api')
  const voteForID = id => {
    log(`submitting vote for ${id}`)
    api.sequenceVote(id)
    log(`submitted vote for ${id}`)
  }
  const createWebSocket = () => {
    const ws = new WebSocket(websocketUrl)
    ws.onopen = () => {
      log('websocket connected')
      ws.send(
        JSON.stringify({
          event: 'CONNECTION',
          username: r.config.logged // This is the users username.
        })
      )
      setInterval(() => {
        ws.send(
          JSON.stringify({
            event: 'POLL'
          })
        )
      }, 3 * 60 * 1000) // 3 minutes
    }
    ws.onmessage = msg => {
      try {
        let data = JSON.parse(msg.data)
        if (data.event === 'VOTE_REQUEST') {
          voteForID(data.post)
        }
      } catch (err) {
        console.error(err)
      }
    }
    ws.onclose = () => {
      log('disconnected from server, reconnecting in 3 seconds')
      setTimeout(() => {
        createWebSocket()
      }, 3000)
    }
  }
})
