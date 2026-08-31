import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 5000

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    def log_message(self, format, *args):
        # Clean log
        print(f"[PrivatGo Server] {self.address_string()} - {args[0]}")

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    url = f"http://localhost:{PORT}"
    
    print("=" * 60)
    print("🎓 PRIVATGO E-LEARNING & LES PRIVAT PLATFORM")
    print(f"🚀 Server lokal berjalan di: {url}")
    print("⚡ Membuka browser default...")
    print("💡 Tekan Ctrl+C di terminal ini untuk menghentikan server.")
    print("=" * 60)

    webbrowser.open(url)

    try:
        with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server dihentikan. Sampai jumpa!")
        sys.exit(0)
    except Exception as e:
        print(f"\n⚠️ Terjadi kesalahan saat menjalankan port {PORT}: {e}")
        # fallback port
        with socketserver.TCPServer(("", 5001), QuietHandler) as httpd:
            print("🚀 Berjalan pada port alternatif: http://localhost:5001")
            webbrowser.open("http://localhost:5001")
            httpd.serve_forever()

if __name__ == '__main__':
    main()
