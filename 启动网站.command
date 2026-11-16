#!/bin/zsh
cd "${0:A:h}"
python3 - <<'PY'
import http.server,functools,webbrowser,os
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(http.server.SimpleHTTPRequestHandler,directory=os.getcwd()))
url=f'http://127.0.0.1:{server.server_port}/'
print('Movora:',url,'\nClose this Terminal window to stop.')
webbrowser.open(url)
server.serve_forever()
PY
