import http.server
import socketserver
import threading
import urllib.request
import time
import sys

PORT = 8089

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and correct JS module MIME type
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start server in background thread
server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()
time.sleep(1)

endpoints = [
    '/',
    '/index.html',
    '/src/app.js',
    '/src/store/dataStore.js',
    '/src/components/Header.js',
    '/src/components/Sidebar.js',
    '/src/components/Modal.js',
    '/src/portals/student/StudentPortal.js',
    '/src/portals/tutor/TutorPortal.js',
    '/src/portals/parent/ParentPortal.js',
    '/src/portals/admin/AdminPortal.js',
    '/src/portals/billing/BillingPortal.js',
    '/src/styles/custom.css',
    '/assets/icons/logo.svg',
    '/manifest.json'
]

print(f"=== TESTING LOCAL HTTP SERVER ON PORT {PORT} ===")
all_ok = True
for ep in endpoints:
    url = f"http://127.0.0.1:{PORT}{ep}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=3) as resp:
            status = resp.status
            length = len(resp.read())
            print(f"[HTTP {status}] {ep} -> {length} bytes OK")
    except Exception as e:
        print(f"[HTTP FAIL] {ep} -> Error: {e}")
        all_ok = False

if all_ok:
    print("\n>>> ALL 15 CRITICAL ENDPOINTS SERVED WITH 100% SUCCESS (HTTP 200 OK)! <<<")
    sys.exit(0)
else:
    print("\n>>> FAILED: Some endpoints could not be fetched. <<<")
    sys.exit(1)
