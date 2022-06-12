const WebSocket = require('ws')

const server = new WebSocket.Server({
    port: 7070
})

const ENC = new TextDecoder("utf-8")

let admins = []
let clients = []

server.on('connection', function(socket)
{
    socket.on('message', function(msg)
    {
        switch(ENC.decode(msg))
        {
            case 'c':
                clients.push(socket)
                break

            case 'a':
                admins.push(socket)
                break

            case '0':
                if(clients.includes(socket))
                {
                    for(let admin of admins)
                        admin.send('0')
                }

                break

            case '1':
                if(clients.includes(socket))
                {
                    for(let admin of admins)
                        admin.send('1')
                }

                break

            case 'ai':
                if(admins.includes(socket))
                {
                    for(let client of clients)
                        client.send('ai')
                }

                break
        }
    })

    socket.on('close', function(socket)
    {
        clients = clients.filter((e) => e !== socket)
        admins = admins.filter((e) => e !== socket)
    })
})