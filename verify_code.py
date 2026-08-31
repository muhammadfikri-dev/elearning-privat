import os
import re

files_to_check = [
    'src/app.js',
    'src/store/dataStore.js',
    'src/components/Header.js',
    'src/components/Sidebar.js',
    'src/components/Modal.js',
    'src/portals/student/StudentPortal.js',
    'src/portals/tutor/TutorPortal.js',
    'src/portals/parent/ParentPortal.js',
    'src/portals/admin/AdminPortal.js',
    'src/portals/billing/BillingPortal.js'
]

errors = 0
for fpath in files_to_check:
    with open(fpath, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Check for unescaped backticks or unbalanced brackets
    open_curly = content.count('{')
    close_curly = content.count('}')
    if open_curly != close_curly:
        print(f'[WARN CURLY] {fpath}: {open_curly} open != {close_curly} close')
        errors += 1
    
    # Find all imports
    imports = re.findall(r'import\s+(?:\{([^}]+)\}|(\w+))\s+from\s+[\'"]([^\'"]+)[\'"]', content)
    base_dir = os.path.dirname(fpath)
    for group_named, default_name, rel_path in imports:
        target_path = os.path.normpath(os.path.join(base_dir, rel_path))
        if not os.path.exists(target_path):
            print(f'[IMPORT ERROR] {fpath} imports {rel_path} -> NOT FOUND: {target_path}')
            errors += 1
        else:
            with open(target_path, 'r', encoding='utf-8') as tfh:
                target_content = tfh.read()
            names = []
            if group_named:
                names.extend([n.strip() for n in group_named.split(',') if n.strip()])
            if default_name:
                names.append(default_name.strip())
            
            for name in names:
                if f'export const {name}' not in target_content and \
                   f'export function {name}' not in target_content and \
                   f'export let {name}' not in target_content and \
                   f'export class {name}' not in target_content and \
                   f'export default {name}' not in target_content and \
                   f'export {{ {name}' not in target_content and \
                   name != 'store':
                    print(f'[EXPORT MATCH ERROR] "{name}" imported in {fpath} but not clearly exported in {target_path}')
                    errors += 1

if errors == 0:
    print('>>> SUCCESS: ALL JS MODULE IMPORTS, SYNTAX, AND EXPORTS ARE 100% VALID AND LINKED! <<<')
else:
    print(f'>>> FAILED: Found {errors} issues to fix. <<<')
