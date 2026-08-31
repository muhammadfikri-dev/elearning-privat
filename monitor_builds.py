import subprocess
import time
import json
import sys

print("Memulai pemantauan kompilasi GitHub Actions di Cloud...")
sys.stdout.flush()

for attempt in range(60): # Max 15 minutes
    res = subprocess.run(
        ['gh', 'run', 'list', '--repo', 'muhammadfikri-dev/elearning-privat', '--json', 'status,conclusion,name,databaseId'],
        capture_output=True,
        text=True
    )
    if res.returncode == 0:
        try:
            runs = json.loads(res.stdout)
            all_done = True
            lines = []
            for r in runs:
                name = r.get('name', 'Workflow')
                status = r.get('status', 'unknown')
                conclusion = r.get('conclusion') or 'in_progress'
                lines.append(f"[{name}] {status.upper()} -> {conclusion.upper()}")
                if status != 'completed':
                    all_done = False
            
            print(f"[{time.strftime('%H:%M:%S')}] " + " | ".join(lines))
            sys.stdout.flush()

            if all_done:
                print("\n🎉 SEMUA WORKFLOW TELAH SELESAI DIKOMPILASI!")
                sys.stdout.flush()
                break
        except Exception as err:
            print(f"Error parsing runs: {err}")
            sys.stdout.flush()
    time.sleep(15)
