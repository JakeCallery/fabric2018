##Up Next
- pass client state data to all clients per frame?
  - touch / mouse points per client
  - one big array and send to all clients?

##Possible Future
- Clean up handshake code
- Track last ping time, kill client if not heard from recently

##Bugs

##DONE
- track "other" clients on each client
- Ask for name in client  
- Figure out why messages from client to server are not sending
  - Its because you are listening on WSS and not the client connection
- Do connection handshake and record name with client on server